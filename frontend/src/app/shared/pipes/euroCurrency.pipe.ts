import { Pipe, PipeTransform } from '@angular/core';
import {CurrencyPipe} from "$root/node_modules/@angular/common";

@Pipe({
  name: 'euroCurrency'
})
export class EuroCurrencyPipe extends CurrencyPipe implements PipeTransform {

  // @ts-ignore
  transform(value: number, currencyCode: string = 'EUR', display: 'code' | 'symbol' | 'symbol-narrow' | string | boolean = 'symbol', digitsInfo: string = '0.2-2', locale: string = 'de'): string | null {
    if(!currencyCode)currencyCode = 'EUR';
    return super.transform(value, currencyCode, display, digitsInfo, locale);
  }

}
