import { BrowserStorageService } from "./../../core/browser-storage/browser-storage.service";
import { BehaviorSubject } from "rxjs";
import { Injectable } from "@angular/core";
import { lang } from "./lang";

@Injectable({
  providedIn: "root"
})
export class LangService {
  private _currentLang$ = new BehaviorSubject<string>(null);
  currentLang$ = this._currentLang$.asObservable();

  public _translations$ = new BehaviorSubject<any>(null);
  translations$ = this._translations$.asObservable();

  constructor(private browserStorageService: BrowserStorageService) {
    const currentLang = this.browserStorageService.global.retrieve(
      "current-lang"
    );
    if (currentLang) {
      this._currentLang$.next(currentLang);
    } else {
      this.browserStorageService.global.store("current-lang", lang.default);
      this._currentLang$.next(lang.default);
    }
    this.currentLang$.subscribe(currentLang => {
      this._translations$.next(lang[currentLang]);
    });
  }

  changeLang(lang: string) {
    const mierda = this._currentLang$.value === "esp" ? "eng" : "esp";
    this.browserStorageService.global.store("current-lang", mierda);
    this._currentLang$.next(mierda);
  }
}
