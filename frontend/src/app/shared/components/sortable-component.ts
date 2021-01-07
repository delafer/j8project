import {EventEmitter, Output, QueryList, ViewChildren} from "@angular/core";
import {NgbdSortableHeaderDirective} from "$directives/ngbd-sortable-header.directive";
import {SortEvent} from "$models/common/sort-event";
import {Observable, of} from "rxjs";

export const compare = (v1, v2) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;

export abstract class SortableComponent {

  @ViewChildren(NgbdSortableHeaderDirective) headers: QueryList<NgbdSortableHeaderDirective>;

  onSort(sortParam: SortEvent) {

    console.log(`onSort: column: ${sortParam.column} direction: ${sortParam.direction}`);

    // resetting other headers
    this.headers.forEach(header => {
      if (header.sortable !== sortParam.column) {
        header.direction = '';
      }
    });

    // sorting countries
    if (sortParam.direction === '') {
      console.log('Unsorted');
    } else {
      console.log(`Direction: ${sortParam.direction}`);
    }
    //this.sortOrderChanged.emit(sortParam);
    this.doSort(sortParam);
  }

  handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
  abstract doSort(sortParam: SortEvent);

}
