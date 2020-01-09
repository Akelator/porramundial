import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, Subject, of } from "rxjs";
import { PopupData, PopupOutput } from "./popup";
import { flatMap, take } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class PopupService {
  private _isVisible$ = new BehaviorSubject<boolean>(false);
  isVisible$ = this._isVisible$.asObservable();

  private _onButtonClick$ = new Subject<boolean>();
  onButtonClick$ = this._onButtonClick$.asObservable();

  private _popupData$ = new BehaviorSubject<PopupData>(null);
  popupData$ = this._popupData$.asObservable();

  clickButton(option: boolean) {
    this._onButtonClick$.next(option);
  }

  private onClickButton(): Observable<PopupOutput> {
    this._isVisible$.next(true);
    const popupData = this._popupData$.value;
    return of(null).pipe(
      flatMap(() =>
        this.onButtonClick$.pipe(
          take(1),
          flatMap(option => {
            this._isVisible$.next(false);
            const output: PopupOutput = {
              confirm: option,
              value: popupData.output ? popupData.output.value : null
            };
            return of(output);
          })
        )
      )
    );
  }

  waitPopup(poputData: PopupData): Observable<PopupOutput> {
    this._popupData$.next(poputData);
    return this.onClickButton();
  }

  updateOutputValue(value) {
    this._popupData$.value.output.value = value;
    this._popupData$.next(this._popupData$.value);
  }

  alert(msg) {
    const data: PopupData = {
      title: null,
      content: msg,
      options: false,
      output: null
    };
    this.waitPopup(data).subscribe();
  }
}
