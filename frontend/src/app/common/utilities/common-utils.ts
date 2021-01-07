import {TypeUtils} from "$common/utilities/type-utils";
import {Constants} from "$common/constants/Constants";

export const nullIfEmpty = (v: any):any =>  (v ? v : null);

export function strEndsWith(str, suffix) {
  return str.indexOf(suffix, str.length - suffix.length) !== -1;
}


export function isEmptyString(str: string) {
  if (!str) return true;
  return TypeUtils.isString(str) && str.trim().length === 0;
}

export function dashIfEmpty(str: string) {
  return str ? str : '-';
}

export function formatNumberLocal(val: number):string {
  return val && !isNaN(val) ? Number(val).toLocaleString(Constants.DEFAULT_LOCALE) : null;
}
