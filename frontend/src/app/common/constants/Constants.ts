export class Constants  {

  static readonly MAX_FETCH_ENTRIES: number = 500;
  static readonly ENTRIES_PRO_PAGE: number = 10;
  static readonly TASKS_CACHE_SIZE: number = 1;
  static readonly TASKS_REFRESH_PERIOD: number = 15000; /*15 sec*/
  static readonly CURRENT_TASKS_GET_PERIOD: number = 5000;

  static readonly DEFAULT_LOCALE: string = 'en-EN';
  static readonly LANG_DEFAULT: string = Constants.DEFAULT_LOCALE.slice(0, 2);
  static readonly AVAILABLE_LANGS: string[] = ['en','de','ru'];


}

