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

  private numbers: number[];
  private names: string[];

  constructor(private _apiService: ApiService, private _cryptoService: CryptoService) {

    this.numbers = [980, 4, 67, 37, 88, 2];
    this.names = ["Kornelia", "Kamila", "Klaudia"];
  }

  ngOnInit() {
    let res = this.someMeth(100, 45);
    console.log(`APP res = ${res}`);

    let otherNumbers: number[] = this.numbers.map(n => n);
    console.log(otherNumbers);

    console.log("For IN");

    for (let nameId in this.names) {
      console.log(`Index: ${nameId} = ${this.names[nameId]}`);
    }

    console.log("FOR OF");

    for (let name of this.names) {
      console.log(name);
    }

  }

  someMeth(x: stringOrNumber, y: stringOrNumber): stringOrNumber {
    let result: stringOrNumber = "";

    if (typeof x === "string")
      result = x + y;
    if (typeof x === "number" && typeof y === "number")
      result = x + y;
    else
      result = x.toString() + y.toString();
    return result;
  }

  startRequest(): void {
    let plainText: string = "Piotr Ernest Klimaszewski lorem ipsum dolor ... $#%";
    let encrypted = this._cryptoService.Encrypt(plainText);
    console.log(`Encrypted: ${encrypted}`);

    let decrypted = this._cryptoService.Decrypt(encrypted);
    console.log(`Decrypted: ${decrypted}`);

   
  }

}
