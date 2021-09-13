import {
  Component,
  EventEmitter,
  forwardRef,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
type Value = number;

@Component({
  selector: 'app-date',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DateComponent),
      multi: true,
    },
  ],
})
export class DateComponent implements OnInit, ControlValueAccessor {
  value!: Value;
  isDisabled!: boolean;
  @Input() placeholder!: string;
  @Input() minDate!: Date;
  @Input() maxDate!: Date;
  @Output() changed = new EventEmitter<Value>();

  get inputValue(): Date {
    return this.value ? new Date(this.value) : new Date();
  }

  private propagateChange: any = () => {};
  private propagateTouched: any = () => {};

  constructor() {}
  writeValue(obj: Value): void {
    this.value = obj;
  }
  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.propagateTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  onChanged(event: MatDatepickerInputEvent<Date>): void {
    const value = event.value ? event.value.getTime() : new Date().getTime();
    this.value = value;
    this.propagateChange(value);
    this.changed.emit(value);
  }

  onClosed() {
    this.propagateTouched();
  }
  ngOnInit(): void {}
}
