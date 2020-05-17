import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import * as CryptoJS from 'crypto-js';
import { CryptoService } from '../crypto.service';

type stringOrNumber = string | number;

@Component({
  selector: 'app-crypto-request',
  templateUrl: './crypto-request.component.html',
  styleUrls: ['./crypto-request.component.css']
})
export class CryptoRequestComponent implements OnInit {

  constructor(private _apiService: ApiService, private _cryptoService: CryptoService) {

  }

  ngOnInit() {
    
  }

  

  startRequest(): void {
    let plainText: string = "Piotr Ernest Klimaszewski lorem ipsum dolor ... $#%";
    let encrypted = this._cryptoService.Encrypt(plainText);
    console.log(`Encrypted: ${encrypted}`);

    let decrypted = this._cryptoService.Decrypt(encrypted);
    console.log(`Decrypted: ${decrypted}`);

   
  }

}
