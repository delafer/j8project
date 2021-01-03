import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HelloWorldComponent } from './hello-world/hello-world.component';
import {ReactiveFormsModule} from "@angular/forms";
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ToastrModule} from "ngx-toastr";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";

export function HttpLoaderFactory(httpClient: HttpClient) {
    return new TranslateHttpLoader(httpClient,  '/assets/i18n/', '-lang.json');
}


@NgModule({
  declarations: [
    AppComponent,
    HelloWorldComponent

  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule,
        HttpClientModule,
        FontAwesomeModule,
        ToastrModule.forRoot({
            //disableTimeOut: true,
            closeButton: true,
            //autoDismiss: true,
            maxOpened: 6,
            timeOut: 300000,
            positionClass: 'toast-bottom-right',
            progressBar: true,
            progressAnimation: 'increasing'
        }),
        BrowserAnimationsModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        })
    ],
  providers: [],
  bootstrap: [HelloWorldComponent]
})
export class AppModule { }
