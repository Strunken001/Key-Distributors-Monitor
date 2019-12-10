import { Injectable } from '@angular/core';

import * as JsEncryptModule from 'jsencrypt';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EncryptionService {
  randomNumber: any;
  today = Date.now();
  constructor() { }

  decrypt(hash) {
    const decrypt = new JsEncryptModule.JSEncrypt();
    decrypt.setPrivateKey(environment.PRIV_ENC_KEY);
    const data = decrypt.decrypt(hash);
    return data;
  }

  encrypt(data: any) {
    console.log('encrypting: ' + data);
    const encrypt = new JsEncryptModule.JSEncrypt();
    encrypt.setPublicKey(environment.PUB_ENC_KEY);
    const hash = encrypt.encrypt(data);
    return hash;
  }

  encrypt2(data: any) {
    console.log('encrypting: ' + data);
    const encrypt = new JsEncryptModule.JSEncrypt();
    encrypt.setPublicKey(environment.PUB_ENC_KEY);
    const hash = encrypt.encrypt(data);
    return hash;
  }

  getRequestID() {
    const customerId = this.generateNumber();
    return customerId;
  }

  generateNumber() {
    this.randomNumber = null;
    this.randomNumber =
      environment.CHANNEL_SHORTNAME +
       this.today +
      Math.floor(Math.random() * (999999999 - 10000000 + 1) + 10000000);
    return this.randomNumber;
  }

}
