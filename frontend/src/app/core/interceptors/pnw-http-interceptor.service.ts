import { Injectable, Optional } from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import { Observable } from 'rxjs';
import { UuidGenerator } from "$core/utils/uuid-generator";
import { OAuthStorage, OAuthResourceServerErrorHandler, OAuthModuleConfig } from 'angular-oauth2-oidc';
import { environment } from '$root/src/environments/environment';
import {finalize, tap} from "$root/node_modules/rxjs/internal/operators";
import {SpinnerService} from "$shared/animations/spinner/spinner.service";
import {catchError} from "$root/node_modules/rxjs/operators";
import {Urls} from "$environment/urls";

@Injectable()
export class PnwHttpInterceptor implements HttpInterceptor {


  private interceptedUrls;
  private static count: number = 0;

  constructor(
    private authStorage: OAuthStorage,
    private errorHandler: OAuthResourceServerErrorHandler,
    private spinner: SpinnerService,
    @Optional() private moduleConfig: OAuthModuleConfig
  ) {
    this.prepareCheckUrls();
  }

  private prepareCheckUrls() {
    this.interceptedUrls = [];
    this.interceptedUrls.push(Urls.serverUrl);
    this.interceptedUrls.push(Urls.companysearchBackendUrl);
    this.interceptedUrls.push(Urls.camundaUrl);
    this.interceptedUrls.push(Urls.agencyUrl);
    this.interceptedUrls.push(Urls.mailUrl);
    this.interceptedUrls.push(Urls.debtUrl);
    this.interceptedUrls.push(Urls.documentUrl);
    this.interceptedUrls.push(Urls.claimUrl);
    this.interceptedUrls.push(Urls.salesUrl);
  }

  private checkUrl(url: string): boolean {
    let found = this.interceptedUrls.find(u => url.startsWith(u));
    return !!found;
  }

  private checkBackgroundTasks(url): boolean {
    if (url.endsWith(`${Urls.wrappedEngineRestUrl}/tasks/count`)) return true;
    return false;
  }

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let uuid: string = UuidGenerator.getUUID();
    let url = req.url.toLowerCase();

    if (!this.checkUrl(url)) return next.handle(req);

    let ignore: boolean = this.checkBackgroundTasks(url);

    this.onLoadingStart(ignore);

    let token = this.authStorage.getItem('access_token');
    let header = 'Bearer ' + token;

    let headers = req.headers
      .set('Authorization', header)
      .set('X-B3-TraceId', uuid) //128 or 64 lower-hex encoded bits (required !!!) <-- setting ELK tracee id
      .set('X-B3-SpanId', uuid.slice(-8)); //64 lower-hex encoded bits (required !!!) both [traceId & spanId] should be set to work properly

    req = req.clone({ headers });
    let cancelled = true;
    return  next.handle(req)
      .pipe(
      tap((event: HttpEvent<any>) => {
        cancelled = false;
        if (event instanceof HttpResponse) {
          this.onLoadingFinish(ignore);
        }
      }),
      catchError( error => {
        cancelled = false;
        this.onLoadingFinish(ignore);
        throw error;
      })
      ,finalize(() => {
        // console.log(`cancelled: ${cancelled}`);
        if (cancelled) this.onLoadingFinish(ignore);
      })
    );
  }

  private onLoadingStart(ignore: boolean = false) {
    if (ignore) return ;
    PnwHttpInterceptor.count++;
    // console.log(`onStart: ${PnwHttpInterceptor.count}`);
    this.spinner.showGlobal();
  }

  private static lastZero : number = 0;
  private static readonly LONGEST_TTL : number = 60000; // 60 seconds

  private onLoadingFinish(ignore: boolean = false) {
    if (PnwHttpInterceptor.count > 0) PnwHttpInterceptor.count--;

    // console.log(`onClose: ${PnwHttpInterceptor.count}`);

    if (0 === PnwHttpInterceptor.count) {
      this.spinner.hideGlobal();
      PnwHttpInterceptor.lastZero = Date.now();
    } else
    if (Date.now() - PnwHttpInterceptor.lastZero > PnwHttpInterceptor.LONGEST_TTL)  {
      console.log(`onClose: forced`);
      PnwHttpInterceptor.count = 1;
      this.onLoadingFinish();
    }
  }
}
