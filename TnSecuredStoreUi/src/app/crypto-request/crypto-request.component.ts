import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import * as CryptoJS from 'crypto-js';
import { CryptoService } from '../crypto.service';

@Component({
  selector: 'app-crypto-request',
  templateUrl: './crypto-request.component.html',
  styleUrls: ['./crypto-request.component.css']
})
export class CryptoRequestComponent implements OnInit {

  constructor(private _apiService: ApiService, private _cryptoService: CryptoService) { }

  ngOnInit(): void {
  }

  startRequest(): void {
    let plainText: string = "Marlon Brando";
    let encrypted = this._cryptoService.encrypt(plainText);
    console.log(`Encrypted: ${encrypted}`);
    let decrypted = this._cryptoService.decrypt(encrypted);
    console.log(`Decrypted: ${decrypted}`);
  }

}
