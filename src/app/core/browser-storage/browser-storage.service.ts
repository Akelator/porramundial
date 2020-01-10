import { Injectable } from "@angular/core";
import { LocalStorageService } from "ngx-webstorage";
import { BrowserStorage, IBrowserStorage } from "./browser-storage";

@Injectable({ providedIn: "root" })
export class BrowserStorageService {
  volatile: IBrowserStorage;
  global: IBrowserStorage;

  constructor(private localStorage: LocalStorageService) {
    this.volatile = new BrowserStorage("volatile", this.localStorage);
    this.global = new BrowserStorage("global", this.localStorage);
  }
}
