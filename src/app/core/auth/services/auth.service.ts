import { BrowserStorageService } from "./../../browser-storage/browser-storage.service";
import { UserSummary } from "../models/user";
import { Injectable, NgZone } from "@angular/core";
import { auth, User } from "firebase/app";
import { AngularFireAuth } from "@angular/fire/auth";
import {
  AngularFirestore,
  AngularFirestoreDocument
} from "@angular/fire/firestore";
import { Router } from "@angular/router";
import { BehaviorSubject, Observable, of } from "rxjs";
import { PopupService } from "src/app/shared/components/popup/popup.service";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  user: User;

  _userData$ = new BehaviorSubject<UserSummary>(null); // Save logged in user data
  userData$ = this._userData$.asObservable();

  _errors$ = new BehaviorSubject<{ mail: string; pass: string }>({
    mail: null,
    pass: null
  });

  errors$ = this._errors$.asObservable();
  constructor(
    public afs: AngularFirestore, // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,
    public ngZone: NgZone, // NgZone service to remove outside scope warning
    private popupService: PopupService,
    private browserStorageService: BrowserStorageService,
    private db: AngularFirestore
  ) {
    /* Saving user data in localstorage when
    logged in and setting up null when logged out */
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.user = user;
        this._userData$.next(user);
        this.browserStorageService.volatile.store("user", this.user);
        this.getUserProperties().subscribe(props => {
          this.userProperties = props;
        });
      } else {
        this.browserStorageService.volatile.store("user", null);
      }
    });
  }

  // Sign in with email/password
  SignIn(email, password) {
    return this.afAuth.auth
      .signInWithEmailAndPassword(email, password)
      .then(result => {
        this.ngZone.run(() => {
          this.router.navigate([""]);
        });
        this.SetUserData(result.user);
      })
      .catch(error => {
        this.manageErrors(error);
      });
  }

  // Sign up with email/password
  SignUp(email, password) {
    return this.afAuth.auth
      .createUserWithEmailAndPassword(email, password)
      .then(result => {
        /* Call the SendVerificaitonMail() function when new user sign
        up and returns promise */

        this.SendVerificationMail();
        this.SetUserData(result.user);
      })
      .catch(error => {
        this.manageErrors(error);
      });
  }

  setLang() {
    return (this.afAuth.auth.languageCode = "ES");
  }

  // Send email verfificaiton when new user sign up
  SendVerificationMail() {
    return this.afAuth.auth.currentUser.sendEmailVerification().then(() => {
      this.router.navigate(["auth/verify-email-request"]);
    });
  }

  // Reset Forggot password
  ForgotPassword(passwordResetEmail) {
    return this.afAuth.auth
      .sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        //TODO! quitar este alert
        window.alert("Password reset email sent, check your inbox.");
      })
      .catch(error => {
        this.manageErrors(error);
      });
  }

  // Returns true when user is looged in and email is verified
  get isLoggedIn(): boolean {
    const user = this.browserStorageService.volatile.retrieve("user");
    return user !== null && user.emailVerified !== false ? true : false;
  }

  // Sign in with Google
  GoogleAuth() {
    return this.AuthLogin(new auth.GoogleAuthProvider());
  }

  // Auth logic to run auth providers
  AuthLogin(provider) {
    return this.afAuth.auth
      .signInWithPopup(provider)
      .then(result => {
        this.ngZone.run(() => {
          this.router.navigate(["dashboard"]);
        });
        this.SetUserData(result.user);
      })
      .catch(error => {
        this.manageErrors(error);
      });
  }

  /* Setting up user data when sign in with username/password,
  sign up with username/password and sign in with social auth
  provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
  SetUserData(user) {
    console.log(user);
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );
    const userData: UserSummary = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
      phoneNumber: user.phoneNumber
    };
    return userRef.set(userData, {
      merge: true
    });
  }

  UpdateProfile(name, photo) {
    this.user.updateProfile({ displayName: name, photoURL: photo }).then(
      result => {
        console.log(result);
      },
      error => {
        console.log(error);
      }
    );
  }

  // Sign out
  SignOut() {
    return this.afAuth.auth.signOut().then(() => {
      this.browserStorageService.volatile.clear("user");
      this._userData$.next(null);
      this.router.navigate([""]);
    });
  }

  private manageErrors(error) {
    switch (error.code) {
      case "auth/user-not-found":
        this.onError(error, "mail");
        break;
      case "auth/invalid-email":
        this.onError(error, "mail");
        break;
      case "auth/email-already-in-use":
        this.onError(error, "mail");
        break;
      case "auth/wrong-password":
        this.onError(error, "pass");
        break;
      case "auth/weak-password":
        this.onError(error, "pass");
        break;
      default:
        this.popupService.alert(error);
        break;
    }
  }

  private onError(error, type) {
    const errors = this._errors$.value;
    errors[type] = error.message;
    this._errors$.next(errors);
  }

  clearErrors() {
    this._errors$.next({ mail: null, pass: null });
  }

  userProperties;

  getUserProperties(): Observable<any> {
    return this.db
      .collection(`user-data`)
      .doc(this.user.uid)
      .valueChanges();
  }

  createItem(item) {
    this.userProperties.push(item);
  }
}
