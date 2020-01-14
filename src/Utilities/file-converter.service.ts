import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
/*
  Sample Usage: See Account Upgrade Component.
 */
@Injectable({
  providedIn: 'root'
})
export class FileConverterService {
  public fileSource = new BehaviorSubject<any>(null);
  fileObservable = this.fileSource.asObservable();
  fileProperty: any = {};

  constructor() {}

  /**
   * File upload detected, structure the data
  */
  public onFileChanged(event: any) {
    // const file = event.target.files[0];
    const file = event;
    if (
      (file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' && file.size < 30000000)
    ) {
      this.convertFile = file; // Convert File is a TS Accessor that processes the file.
    } else if (file.size > 30000000) {
      // Handle file type error
      console.error('Error, File Size Exceeded');
    } else if (file.type !== 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
      // Handle file type error
      console.error('Error, Invalid File Format');
    }
  }
  /**
   * convert to base64
  */
  public set convertFile(file: any) {
    const selectedFile = file;
    switch (selectedFile.type) {
      case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': {
        // Read File
        this.converter(selectedFile.type, selectedFile);
        this.fileProperties = selectedFile;
        break;
      }
    }
  }
  public converter(target, fileToLoad) {
    const fileReader = new FileReader();
    let format = target;
    // Onload of file read the file content
    fileReader.onload = (fileLoadedEvent: any) => {
      format = fileLoadedEvent.target.result.split(',')[1];
      // converted file
        this.fileSource.next(format);
    };
    // Convert data to base64
    fileReader.readAsDataURL(fileToLoad);
  }
  set fileProperties(selectedFile) {
    this.fileProperty = {
      name: selectedFile.name.split('.')[0],
      type: selectedFile.type.split('/')[1]
    };
  }
  get uploadedFileProperties() {
    return this.fileProperty;
  }
}
