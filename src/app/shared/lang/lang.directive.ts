import { LangService } from "./lang.service";
import { OnDestroy } from "@angular/core";
import { Directive } from "@angular/core";

@Directive({
  selector: "[lang]"
})
export class LangDirective implements OnDestroy {
  txt;
  currentLang: string;
  _s1;
  _s2;
  constructor(public langService: LangService) {
    this._s1 = this.langService.translations$.subscribe(
      translations => (this.txt = translations)
    );
    this._s2 = this.langService.currentLang$.subscribe(
      currentLang => (this.currentLang = currentLang)
    );
  }
  ngOnDestroy() {
    this._s1.unsubscribe();
    this._s2.unsubscribe();
  }
}
