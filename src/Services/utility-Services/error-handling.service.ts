import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlingService {

  constructor() { }

  public handleError(err: HttpErrorResponse) {
    let errorMessage = '';

    if (err.error instanceof ErrorEvent) {
      // A client-side or network error has occured. Handle it accordingly
      errorMessage = `An error occured: ${err.error.message}`;
    } else {
      // The backend returned an unsuccesful response code.
      // The response body may contain clues as to what went wrong
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }


}
