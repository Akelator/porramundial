import { LangService } from "./../../lang/lang.service";
import { Router } from "@angular/router";
import {
  Component,
  OnInit,
  OnDestroy,
  HostListener,
  ElementRef,
  ViewChild
} from "@angular/core";
import { AuthService } from "src/app/core/auth/services/auth.service";
import { UserSummary } from "src/app/core/auth/models/user";
import { LangDirective } from "../../lang/lang.directive";

@Component({
  selector: "tool-bar",
  templateUrl: "./tool-bar.component.html",
  styleUrls: ["./tool-bar.component.scss"]
})
export class ToolBarComponent extends LangDirective
  implements OnInit, OnDestroy {
  @ViewChild("userSettings", { static: false }) userSettings: ElementRef;
  @ViewChild("userSettingsBTN", { static: false }) userSettingsBTN: ElementRef;

  userData: UserSummary;

  _sub;

  userSettingsToggled: boolean;

  constructor(
    private authService: AuthService,
    private router: Router,
    public langService: LangService
  ) {
    super(langService);
  }

  ngOnInit() {
    this._sub = this.authService.userData$.subscribe(userData => {
      this.userData = userData;
      if (!this.userData) {
        this.router.navigate([""]);
      }
    });
  }

  ngOnDestroy() {
    this._sub.unsubscribe();
  }

  @HostListener("document:mousedown", ["$event"])
  onclick(e) {
    if (this.userSettings) {
      const subjectivePath = e.path || (e.composedPath && e.composedPath());
      const path: ElementRef[] = subjectivePath
        ? subjectivePath.map(p => new ElementRef(p))
        : new Array<ElementRef>();
      if (
        !path.some(
          p =>
            p.nativeElement === this.userSettings.nativeElement ||
            p.nativeElement === this.userSettingsBTN.nativeElement
        )
      ) {
        this.userSettingsToggled = false;
      }
    }
  }

  onBack() {
    this.router.navigate([""]);
  }

  onLogIn() {
    this.router.navigate(["auth/login"]);
  }
  onSignUp() {
    this.router.navigate(["auth/sign-up"]);
  }

  onLogOut() {
    this.onUserSettings();
    setTimeout(() => {
      this.authService.SignOut().then(() => {
        this.router.navigate([""]);
      });
    }, 300);
  }

  onProfile() {
    this.onUserSettings();
    this.router.navigate(["settings/profile"]);
  }

  onLang() {
    this.langService.changeLang("eng");
  }

  onUserSettings(event = null) {
    if (event) {
      event.stopPropagation();
    }
    this.userSettingsToggled = !this.userSettingsToggled;
  }
}
