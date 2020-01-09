import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { PopupData } from "./popup";
import { PopupService } from "./popup.service";

@Component({
  selector: "popup",
  templateUrl: "./popup.component.html",
  styleUrls: ["./popup.component.scss"]
})
export class PopupComponent implements OnInit {
  isVisible$: Observable<boolean>;
  data$: Observable<PopupData>;
  constructor(private biPopupService: PopupService) {
    this.data$ = this.biPopupService.popupData$;
    this.isVisible$ = this.biPopupService.isVisible$;
  }

  ngOnInit() {}

  onAccept() {
    //this.biPopupService.updateOutputValue(this.formValue.value);
    this.biPopupService.clickButton(true);
  }

  onCancel() {
    this.biPopupService.clickButton(false);
  }
}
