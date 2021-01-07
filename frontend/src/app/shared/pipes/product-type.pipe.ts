import { Pipe, PipeTransform } from '@angular/core';
import {TranslatePipe} from "$root/node_modules/@ngx-translate/core";

@Pipe({
  name: 'productType'
})
export class ProductTypePipe extends TranslatePipe implements PipeTransform {

  transform(value: string): string {
    return value ? super.transform('producttype.'+value) : value;
  }

}
