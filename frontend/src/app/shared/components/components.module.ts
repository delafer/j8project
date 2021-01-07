import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {NgbDropdownModule, NgbProgressbarModule} from "$root/node_modules/@ng-bootstrap/ng-bootstrap";
import {FileNamePipe} from "$pipes/file-name.pipe";
import {DragDropDirective} from "$directives/drag-drop.directive";
import {FileSizePipe} from "$pipes/file-size.pipe";
import {EnumAsArrayPipe} from "$pipes/enum-as-array.pipe";
import {StripPipe} from "$shared/pipes";
import {RomanizePipe} from "$pipes/romanize.pipe";
import {StepByStepComponent} from './step-by-step/step-by-step.component';
import {MessageboxComponent} from "$shared/components/messagebox/messagebox.component";

@NgModule({
  imports: [
    CommonModule,
    NgbProgressbarModule,
    NgbDropdownModule,
  ],
  declarations: [
    FileNamePipe,
    FileSizePipe,
    DragDropDirective,
    EnumAsArrayPipe,
    StripPipe,
    RomanizePipe,
    StepByStepComponent,
    MessageboxComponent
  ],
    exports: [
        FileNamePipe,
        FileSizePipe,
        DragDropDirective,
        EnumAsArrayPipe,
        StripPipe,
        RomanizePipe,
        StepByStepComponent,
       MessageboxComponent
    ]
})
export class ComponentsModule { }
