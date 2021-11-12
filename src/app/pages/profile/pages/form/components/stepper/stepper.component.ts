import { Component, OnDestroy, OnInit } from '@angular/core';
import { StepperService } from './services/stepper.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss'],
})
export class StepperComponent implements OnInit, OnDestroy {
  constructor(private service: StepperService) {}
  private destroy = new Subject<any>();

  ngOnDestroy(): void {
    this.destroy.next(null);
    this.destroy.complete();
  }

  ngOnInit(): void {
    this.service.next$.pipe(takeUntil(this.destroy)).subscribe(() => {
      this.service.onNext();
    });
  }

  get steps() {
    return this.service.steps;
  }

  get activeStep() {
    return this.service.activeStep;
  }

  isActive(index: number): boolean {
    return index === this.activeStep.index;
  }

  isComplete(index: number): boolean {
    return index < this.activeStep.index;
  }

  isFirst(): boolean {
    return this.activeStep.index === 0;
  }

  isLast(): boolean {
    return this.activeStep.index === this.steps.length - 1;
  }

  onNext() {
    //this.service.onNext();
    this.service.check.next('next');
  }
  onPrev() {
    this.service.onPrev();
  }
  onComplete() {
    this.service.check.next('complete');
  }
  onCancel() {
    this.service.cancel.next();
  }
}
