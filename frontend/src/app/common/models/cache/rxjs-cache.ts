import {Observable, Subject} from "$root/node_modules/rxjs";

export class RxJsCache<T> {

  reloadItems$;
  cacheItems$: Observable<T>;

  constructor() {
    this.reloadItems$ = new Subject<void>();
  }

  forceReload(): void {
    this.reloadItems$.next();
    this.cacheItems$ = null;
  }

}
