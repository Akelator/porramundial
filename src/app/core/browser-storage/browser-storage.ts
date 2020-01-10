import { filter, map } from "rxjs/operators";
import { LocalStorageService } from "ngx-webstorage";
import { Observable, Subject, merge } from "rxjs";

export interface IBrowserStorage {
  add(raw: string, value: any): void;

  remove(raw: string, value: any): void;

  store(raw: string, value: any): void;

  retrieve(raw: string): any;

  clear(raw?: string): void;

  observe(raw: string, withInitialValue: boolean): Observable<any>;
}

export class BrowserStorage implements IBrowserStorage {
  private subject = new Subject<any>();

  constructor(private key: string, private localStorage: LocalStorageService) {}

  add(raw: string, value: any) {
    const contents = this.localStorage.retrieve(this.key);
    let array;
    if (!contents || !contents[raw]) {
      array = [];
    } else {
      array = contents[raw];
    }
    if (!(array instanceof Array)) {
      array = [array];
    }
    array.push(value);
    this.store(raw, array);
  }

  remove(raw: string, value: any) {
    const contents = this.localStorage.retrieve(this.key);
    let array;
    if (!contents || !contents[raw]) {
      array = [];
    } else {
      array = contents[raw];
    }
    if (!(array instanceof Array)) {
      array = [array];
    }
    const idx = array.findIndex(
      x => JSON.stringify(x) === JSON.stringify(value)
    );
    if (idx !== -1) {
      array.splice(idx, 1);
    }
    this.store(raw, array);
  }

  store(raw: string, value: any) {
    let contents = this.localStorage.retrieve(this.key);
    if (!contents) {
      contents = {};
    }
    contents[raw] = value;
    this.localStorage.store(this.key, contents);
    this.subject.next({
      key: `localstorage.${this.key}.${raw}`,
      payload: value
    });
  }

  retrieve(raw: string) {
    const contents = this.localStorage.retrieve(this.key);
    if (!contents) {
      return null;
    }
    return contents[raw];
  }

  clear(raw?: string) {
    if (!raw) {
      return this.localStorage.clear(this.key);
    }
    const contents = this.localStorage.retrieve(this.key);
    if (!contents) {
      return this.localStorage.clear(this.key);
    }
    if (contents[raw]) {
      delete contents[raw];
      this.localStorage.store(this.key, contents);
    }
  }

  observe(raw: string, withInitialValue: boolean = false): Observable<any> {
    const mqKey = `localstorage.${this.key}.${raw}`;
    const o$ = new Observable(observer => {
      if (withInitialValue) {
        const full = this.localStorage.retrieve(this.key);
        observer.next({ key: mqKey, payload: full ? full[raw] : null });
      }
    });
    return merge(o$, this.subject.asObservable()).pipe(
      filter(m => m.key === mqKey),
      map(m => m.payload)
    );
  }
}
