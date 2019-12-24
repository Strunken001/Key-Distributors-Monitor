import { Component, OnInit, EventEmitter, ViewChild, Output } from '@angular/core';
import { FileuploaderService, FileQueueObject } from 'Services/fileuploader-Services/fileuploader.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {
  uplqueue = false;
  @Output() onCompleteItem = new EventEmitter();

  @ViewChild('fileInput', {static: false}) fileInput;
  queue: Observable<FileQueueObject[]>;
  constructor(public uploader: FileuploaderService) { }

  ngOnInit() {
    this.queue = this.uploader.queue;
    this.uploader.onCompleteItem = this.completeItem;
  }

  completeItem = (item: FileQueueObject) => {
    this.onCompleteItem.emit({ item });
  }

  addToQueue() {
    const fileBrowser = this.fileInput.nativeElement;
    this.uploader.addToQueue(fileBrowser.files);
    this.uplqueue = true
  }

}
