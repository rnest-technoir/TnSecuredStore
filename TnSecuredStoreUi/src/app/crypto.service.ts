import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class CryptoService {

  private _key = CryptoJS.enc.Utf8.parse('veg3fKZS5s7TDKAP');
  private _iv = CryptoJS.enc.Utf8.parse('FzyYnk2MZgagc4m9');

  //constructor(private _key: string, private _iv: string) { }
  constructor() { }

  encrypt(plainText: string): string {

    let encrypted: CryptoJS.WordArray = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(plainText), this._key,
      {
        keySize: 128 / 8,
        iv: this._iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
      });
    return encrypted.ciphertext;
  }

  decrypt(encrypted: string): string {

    let decrypted: CryptoJS.DecryptedMessage = CryptoJS.AES.decrypt(encrypted, this._key,
      {
        keySize: 128 / 8,
        iv: this._iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
      });
    return decrypted.toString(CryptoJS.enc.Utf8);
  }

}
