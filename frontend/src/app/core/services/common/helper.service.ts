import {Injectable} from '@angular/core';
import {SortEvent} from "$models/common/sort-event";
import {TranslateService} from "$root/node_modules/@ngx-translate/core";

export const compareAsc = (v1, v2) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;
export const compareDesc = (v1, v2) => v1 < v2 ? 1 : v1 > v2 ? -1 : 0;

export declare type SortMethod = (v1: any, v2: any) => number;

const na = (v: any): any => (v ? v : '');
const ns = (v: string, translate: TranslateService): string => (v ? translate.instant(v) : '');
const nsl = (v: string): string => (v ? v.toLowerCase() : '');

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor(private translate: TranslateService) { }

  getSortFunction(sort: SortEvent): SortMethod {

    if (!sort || !sort.onClient ) {
      return null;
    }

    const asc = sort.direction === 'asc';
    let result: SortMethod;

    if (sort.sortMethod === '') {
      result = (v1: string, v2: string): number =>  asc ? compareAsc(na(v1), na(v2)) : compareDesc(na(v1), na(v2));
    } else
    if (sort.sortMethod === 'ignoreCase') {
      result = (v1: string, v2: string): number => asc ? compareAsc(nsl(v1), nsl(v2)) : compareDesc(nsl(v1), nsl(v2));
    } else
    if (sort.sortMethod === 'translate') {
      result = (v1: string, v2: string): number => asc ? compareAsc(ns(v1, this.translate), ns(v2, this.translate)) : compareDesc(ns(v1, this.translate), ns(v2, this.translate));
    }

    return result;
  }
}
