import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TranslateModule} from '@ngx-translate/core';
import {EuroCurrencyPipe} from "$pipes/euroCurrency.pipe";
import {Nl2brPipe} from "$shared/pipes";
import {NgbdSortableHeaderDirective} from "$directives/ngbd-sortable-header.directive";
import {HoverDirective} from "$directives/hover.directive";
import {SpinnerComponent} from './animations/spinner/spinner.component';
import {ZeroIfNullPipe} from './pipes/zero-if-null.pipe';
import {NgbdFilterableDirective} from './directives/ngbd-filterable.directive';
import {AutofocusDirective} from './directives/autofocus.directive';
import {ProductTypePipe} from './pipes/product-type.pipe';
import {OrderTranslatePipe} from './pipes/order-translate.pipe';
import {NgbProgressbarModule} from "$root/node_modules/@ng-bootstrap/ng-bootstrap";
import {ComponentsModule} from "$shared/components";

// import { BrandingDirective } from './directives/branding.directive';

@NgModule({
  imports: [
    CommonModule,
    NgbProgressbarModule,
    ComponentsModule
  ],
  declarations: [
    EuroCurrencyPipe,
    Nl2brPipe,
    ZeroIfNullPipe,
    NgbdSortableHeaderDirective,
    HoverDirective,
    SpinnerComponent,
 //   MessageboxComponent,
    OrderTranslatePipe,
    NgbdFilterableDirective,
    AutofocusDirective,
    ProductTypePipe,
    // RomanizePipe,
    // DragDropDirective,
    // FileNamePipe
  ],
  exports: [
    TranslateModule,
    EuroCurrencyPipe,
    Nl2brPipe,
    ZeroIfNullPipe,
    OrderTranslatePipe,
    NgbdSortableHeaderDirective,
    HoverDirective,
    SpinnerComponent,
    ProductTypePipe,
    // RomanizePipe,
    AutofocusDirective,
    ComponentsModule
    // DragDropDirective
  ]
})
export class SharedModule { }
