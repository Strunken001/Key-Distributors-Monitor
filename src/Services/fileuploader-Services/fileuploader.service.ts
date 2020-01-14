import { Injectable } from '@angular/core';
import { HttpResponse, HttpErrorResponse, HttpClient, HttpEventType, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Subscription, BehaviorSubject } from 'rxjs';
import * as _ from 'lodash';
import { environment } from 'environments/environment';
import { EncryptionService } from 'Services/utility-Services/encryption.service';
import { RolesService } from 'Services/utility-Services/roles.service';
import { tap, catchError, map, retry, takeUntil } from 'rxjs/operators';
import { ErrorHandlingService } from 'Services/utility-Services/error-handling.service';
import { ResponseUpload } from 'Utilities/_models/Interface';
import { FileConverterService } from 'Utilities/file-converter.service';
import { componentDestroyed } from '@w11k/ngx-componentdestroyed';

export enum FileQueueStatus {
  Pending,
  Success,
  Error,
  Progress
}

export class FileQueueObject {
  public file: any;
  public status: FileQueueStatus = FileQueueStatus.Pending;
  public progress = 0;
  public request: Subscription = null;
  public response: HttpResponse<any> | HttpErrorResponse = null;
  testF: any;

  constructor(file: any) {
    this.file = file;
  }

  // actions
  public upload = () => { /* set in service */ };
  public cancel = () => { /* set in service */ };
  public remove = () => { /* set in service */ };

  // statuses
  public isPending = () => this.status === FileQueueStatus.Pending;
  public isSuccess = () => this.status === FileQueueStatus.Success;
  public isError = () => this.status === FileQueueStatus.Error;
  public inProgress = () => this.status === FileQueueStatus.Progress;
  public isUploadable = () => this.status === FileQueueStatus.Pending || this.status === FileQueueStatus.Error;

}

@Injectable({
  providedIn: 'root'
})



export class FileuploaderService {
  public url = `${environment.BASE_URL}${environment.KDMonitor_Api}${'/UploadStockFile'}`;

  private _queue: BehaviorSubject<FileQueueObject[]>;
  private _files: FileQueueObject[] = [];
  contnt: any;

  constructor(private http: HttpClient,
    private enc: EncryptionService, private roles: RolesService,
    private errorhandler: ErrorHandlingService, private base64converter: FileConverterService) {
    this._queue = <BehaviorSubject<FileQueueObject[]>>new BehaviorSubject(this._files);
  }

  // the queue
  public get queue() {
    return this._queue.asObservable();
  }

  // public events
  public onCompleteItem(queueObj: FileQueueObject): any {
    return { queueObj };
  }

  // public functions
  public addToQueue(data: any) {
    // add file to the queue
    _.each(data, (file: any) => this._addToQueue(file));
  }

  public clearQueue() {
    // clear the queue
    this._files = [];
    this._queue.next(this._files);
  }

  public uploadAll() {
    // upload all except already successfull or in progress
    _.each(this._files, (queueObj: FileQueueObject) => {
      console.log(this._files);
      if (queueObj.isUploadable()) {
        this._upload(queueObj);
      }
    });
  }

  // private functions
  private _addToQueue(file: any) {

    const queueObj = new FileQueueObject(file);
    // set the individual object events
    queueObj.upload = () => this._upload(queueObj);
    queueObj.remove = () => this._removeFromQueue(queueObj);
    queueObj.cancel = () => this._cancel(queueObj);

    // push to the queue
    this._files.push(queueObj);
    this._queue.next(this._files);
  }

  private _removeFromQueue(queueObj: FileQueueObject) {
    _.remove(this._files, queueObj);
  }

  private _upload(queueObj: FileQueueObject) {
    // create form data for file
    let reqqw;
    console.log(queueObj.file)
    const reader = new FileReader();
    reader.readAsDataURL(queueObj.file);
    reader.onload = () => {
      if (queueObj.file) {
        reqqw = {
          Channel: environment.KDChannel,
          RequestId: this.enc.encrypt(this.enc.getRequestID()),
          SessionId: '',
          FileName: queueObj.file.name,
          PrincipalCode: this.enc.encrypt(this.roles.getCodeOnLogin()),
          FileContent: reader.result.toString().split(',')[1]
        }
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        console.log(JSON.stringify(reqqw));
        this.http
          .post<any>(this.url, reqqw, { headers })
          .pipe(
            retry(2),
            catchError(this.errorhandler.handleError),
            // tslint:disable-next-line: no-shadowed-variable
            map((res: ResponseUpload) => {
              // console.log(JSON.stringify(res))
              return res;
            })
          ).pipe(takeUntil(componentDestroyed(this))).subscribe(
            (res: ResponseUpload) => {
              console.log(JSON.stringify(res))
              if (res.responseCode === '00') {
                this._uploadComplete(queueObj);
              } else {
                this._uploadFailed(queueObj);
                console.log(JSON.stringify(res.responseDescription))
              }
            }
          )
      }
      return queueObj;

    };
  }

  private _cancel(queueObj: FileQueueObject) {
    // update the FileQueueObject as cancelled
    queueObj.request.unsubscribe();
    queueObj.progress = 0;
    queueObj.status = FileQueueStatus.Pending;
    this._queue.next(this._files);
  }

  private _uploadProgress(queueObj: FileQueueObject, event: any) {
    // update the FileQueueObject with the current progress
    const progress = Math.round(100 * event.loaded / event.total);
    queueObj.progress = progress;
    queueObj.status = FileQueueStatus.Progress;
    this._queue.next(this._files);
  }

  private _uploadComplete(queueObj: FileQueueObject) {
    // update the FileQueueObject as completed
    queueObj.progress = 100;
    queueObj.status = FileQueueStatus.Success;
    // queueObj.response = response;
    this._queue.next(this._files);
    this.onCompleteItem(queueObj);
  }

  private _uploadFailed(queueObj: FileQueueObject) {
    // update the FileQueueObject as errored
    queueObj.progress = 0;
    queueObj.status = FileQueueStatus.Error;
    // queueObj.response = response;
    this._queue.next(this._files);
  }


  subscribeUpload(data: FileQueueObject) {

    let reqqw;
    this.base64converter.fileObservable.pipe(takeUntil(componentDestroyed(this))).subscribe(resFile => {
      if (resFile) {
        this.contnt = resFile;
        // console.log('file resp' + resFile);
      }
    });
    if (this.contnt) {
      reqqw = {
        Channel: environment.KDChannel,
        RequestId: this.enc.encrypt(this.enc.getRequestID()),
        SessionId: '',
        FileName: this.base64converter.uploadedFileProperties.name,
        PrincipalCode: this.enc.encrypt(this.roles.getCodeOnLogin()),
        FileContent: this.contnt
      }

      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      console.log(JSON.stringify(reqqw));
      return this.http
        .post<any>(this.url, reqqw, { headers })
        .pipe(
          retry(2),
          catchError(this.errorhandler.handleError),
          // tslint:disable-next-line: no-shadowed-variable
          map((res: ResponseUpload) => {
            console.log(JSON.stringify(res))
            return res;
          })
        );
    }
  }

  handleInputChange(file) {
    const reader = new FileReader();
    reader.onloadend = this._handleReaderLoaded.bind(this);
    reader.readAsDataURL(file);
  }

  _handleReaderLoaded(e) {
    const reader = e.target;
    const base64result = reader.result.substr(reader.result.indexOf(',') + 1);
    this.contnt = base64result;
  }

  getBase64(file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {

      console.log(reader.result);
    };

  }

  // tslint:disable-next-line: use-life-cycle-interface
  ngOnDestroy() {
  }

}
