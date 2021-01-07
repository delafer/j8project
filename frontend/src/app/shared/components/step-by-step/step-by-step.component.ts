import {Component, Input, OnInit, Output} from '@angular/core';
import {Subject} from "$root/node_modules/rxjs";
import {EventEmitter} from "$root/node_modules/@angular/core";

@Component({
  selector: 'step-by-step',
  templateUrl: './step-by-step.component.html',
  styleUrls: ['./step-by-step.component.scss']
})
export class StepByStepComponent implements OnInit {

  constructor() { }

  @Input()
  steps: number;

  @Input()
  activeStep: number;


  stepsArray: number[];

  @Output()
  onPage = new EventEmitter<number>();

  ngOnInit() {
    this.stepsArray =  Array.from({length:this.steps},(v,k)=>k+1);
  }

  gotoStep(step: number) {
    if (step < this.activeStep) {
      this.onPage.next(step);
    }
  }
}
