import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {KeycloakService} from '$app/core/services';
import {ToasterService} from "$service/common/toaster.service";
import {strEndsWith} from "$common/utilities/common-utils";
import {CLAIM_TASK_URL} from "$service/task.service";
import {AccountService} from "$service/account.service";
import {Urls} from "$environment/urls";
import {ProcessService} from "$service/process.service";
import {LimitRequestService} from '$service/limit-request.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(
    private authenticationService: KeycloakService,
    private toastrService: ToasterService
  ) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError((err, xxx) => {
      if (err.status === 401) {
        console.log('Reloading page!');
        // auto logout if 401 response returned from api
        this.authenticationService.logout();
        // location.reload(true);
      } else if (this.customErrorHandling(err)) {
        // handle TOO_MANY_REQUESTS at concrete Service:
        return throwError(err);
      }

      this.errorMsg(request, err, err.status);


      // // FIXME to be FACHLICH defined
      // if (err.status != 404 && err.status > 299) {
      //   this.toastrService.error(err.status);
      // }
      const error = err.error ? `${err.error.error} : ${err.error.error_description}` : JSON.stringify(err.error);
      return throwError(error);
    }));
  }

  customErrorHandling(err: any): boolean {
    if (err.status === 412) return true;
    if (err.status === 429) return true;
    if (err.status === 500 && strEndsWith(err.url, CLAIM_TASK_URL)) return true;
    if (err.status === 400 && err.url.startsWith(AccountService.debtUrlCR)) return true;
    if (err.status === 400 && err.url.startsWith(Urls.documentUrl)) return true;
    if (err.status === 404 && err.url.startsWith(AccountService.debtUrlCR)) return true;
    if (err.url.startsWith(AccountService.debtUrlFiles)) return true;
    if (err.url.startsWith(ProcessService.submitClaimUrl)) return true;
    return false;
  }


  errorMsg(request: HttpRequest<any>, error, httpCode: number) {
    let msg: string;
    if (httpCode === 401 || httpCode === 404) return;
    let httpFamily: number = (httpCode / 100) >> 0;
    if (httpFamily === 4 || httpFamily === 5) {
      if (httpCode === 451) {
      let blacklistMsg = error.url.includes('manualretrieve')?'Dieses Unternehmen / diese Person steht auf der Ausschlussliste, es kann keine Auskunft angefordert werden.':'Leider konnte kein Kreditlimit ermittelt werden.'
        msg = `<b>Bei der Verarbeitung ist ein fachlicher Fehler aufgetreten.</b><hr/><span class="msg">${blacklistMsg}<br/>
               Kontaktdaten:<br/>
               <div class="contact-brand"></div></span>`;
      } else {
        msg = httpFamily === 4 ?
          `<b>Bei der Verarbeitung ist ein fachlicher Fehler aufgetreten.</b><hr/>
               <span class="msg">Bitte kontaktieren Sie die Abteilung Kredit und teilen uns die unten angezeigte Fehlernummer mit.<br/>
               Kontaktdaten:<br/>
               <div class="contact-brand"></div></span>`
          :
          `<b>Bei der Verarbeitung ist ein technischer Fehler aufgetreten.</b><hr/>
               <span class="msg">Bitte versuchen Sie es in einigen Minuten erneut. Sollte der Fehler anschließend weiterhin bestehen, kontaktieren Sie bitte die Abteilung Kredit und teilen uns die unten angezeigte Fehlernummer mit.<br/>
               Kontaktdaten:<br/>
               <div class="contact-brand"></div></span>`;
      }
      let corrId: string = request.headers.get('X-B3-TraceId');
      if (!corrId) {
        corrId = 'nicht vorhanden';
      }

      const template = `${msg}<hr/>
              <div class="contact-phone errormsg"><i class="fa fa-phone"></i>&nbsp;<span>Phone</span></div>
              <div class="contact-mail errormsg"><i class="fa fa-envelope-o"></i>&nbsp;<span>E-Mail</span></div>
              <hr/><div class="errormsg">Fehlernummer: ${corrId}</div>`;
      this.toastrService.error(template);
    }
  }

}
