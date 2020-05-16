import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { EntryModel } from '../models/EntryModel';

@Injectable({
  providedIn: 'root'
})
export class CryptoService {

  private _key = CryptoJS.enc.Utf8.parse('veg3fKZS5s7TDKAP');
  private _iv = CryptoJS.enc.Utf8.parse('FzyYnk2MZgagc4m9');

  private EncryptToWords(plainText: string): CryptoJS.WordArray {

    let encrypted: CryptoJS.WordArray = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(plainText), this._key,
      {
        keySize: 128 / 8,
        iv: this._iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
      });
    return encrypted;
  }

  private DecryptFromWords(encrypted: CryptoJS.WordArray): string {

    let decrypted: CryptoJS.DecryptedMessage = CryptoJS.AES.decrypt(encrypted, this._key,
      {
        keySize: 128 / 8,
        iv: this._iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
      });
    return decrypted.toString(CryptoJS.enc.Utf8);
  }

  Encrypt(plainText: string): string {

    let encrypted: CryptoJS.WordArray = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(plainText), this._key,
      {
        keySize: 128 / 8,
        iv: this._iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
      });
    return encrypted.toString();
  }

  Decrypt(encrypted: string): string {

    let decrypted: CryptoJS.DecryptedMessage = CryptoJS.AES.decrypt(encrypted, this._key,
      {
        keySize: 128 / 8,
        iv: this._iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
      });
    return decrypted.toString(CryptoJS.enc.Utf8);
  }

  public EncryptEntry(entry: EntryModel): EntryModel {

    let encrypted = new EntryModel();
    encrypted.title = this.Encrypt(entry.title);

    if (entry.email)
      encrypted.email = this.Encrypt(entry.email);

    if (entry.login)
      encrypted.login = this.Encrypt(entry.login);

    if (entry.password)
      encrypted.password = this.Encrypt(entry.password);

    if (entry.url)
      encrypted.url = this.Encrypt(entry.url);

    encrypted.id = entry.id;
    encrypted.authorId = entry.authorId;
    encrypted.rowGuid = entry.rowGuid;
    encrypted.createdOn = entry.createdOn;
    encrypted.modifiedOn = entry.modifiedOn;
    encrypted.isActive = entry.isActive;
    encrypted.isRemoved = entry.isRemoved;

    return encrypted;
  }

  public DecryptEntry(entry: EntryModel): EntryModel {

    let decrypted = new EntryModel();
    decrypted.title = this.Decrypt(entry.title);

    if (entry.email)
      decrypted.email = this.Decrypt(entry.email);

    if (entry.login)
      decrypted.login = this.Decrypt(entry.login);

    if (entry.password)
      decrypted.password = this.Decrypt(entry.password);

    if (entry.url)
      decrypted.url = this.Decrypt(entry.url);


    decrypted.id = entry.id;
    decrypted.authorId = entry.authorId;
    decrypted.rowGuid = entry.rowGuid;
    decrypted.createdOn = entry.createdOn;
    decrypted.modifiedOn = entry.modifiedOn;
    decrypted.isActive = entry.isActive;
    decrypted.isRemoved = entry.isRemoved;
    return decrypted;
  }

  public DecryptEntryList(entryList: EntryModel[]): EntryModel[] {

    let list: EntryModel[] = [];

    entryList.map(em => {
      list.push(this.DecryptEntry(em));
    });

    return list;
  }

}
