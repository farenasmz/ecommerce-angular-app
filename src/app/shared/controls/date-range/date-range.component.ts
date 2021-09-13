import {
  Component,
  EventEmitter,
  forwardRef,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { DateRangeModule } from './date-range.module';
import { DateComponent } from '../date/date.component';
import {
  NG_VALUE_ACCESSOR,
  ControlValueAccessor,
  FormBuilder,
  FormGroup,
} from '@angular/forms';

export interface Value {
  from: number;
  to: number;
}
export interface Placeholder {
  from: string;
  to: string;
}

@Component({
  selector: 'app-date-range',
  templateUrl: './date-range.component.html',
  styleUrls: ['./date-range.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DateRangeComponent),
      multi: true,
    },
  ],
})
export class DateRangeComponent implements OnInit, ControlValueAccessor {
  value!: Value;
  @Input() placeholder!: Placeholder;
  @Output() changed = new EventEmitter<Value>();
  @Output() closed = new EventEmitter<void>();
  form!: FormGroup;

  private propagateChange: any = () => {};
  private propagateOnTouched: any = () => {};

  constructor(private fb: FormBuilder) {}
  ngOnInit(): void {
    this.form = this.fb.group({
      from: new Date(),
      to: new Date(),
    });
  }

  get min(): Date {
    const from = this.form.controls.from.value;
    return from ? new Date(from) : new Date();
  }

  get max(): Date {
    const to = this.form.controls.to.value;
    return to ? new Date(to) : new Date();
  }

  writeValue(value: Value): void {
    this.form.patchValue(value || {});
  }
  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.propagateOnTouched = fn;
  }

  setDiasbledState(isDisabled: boolean): void {
    if (isDisabled) {
      this.form.disable();
    } else {
      this.form.enable();
    }
  }

  onChanged() {
    const value = { ...this.form.value };
    this.propagateChange(value);
    this.changed.emit(value);
  }

  onClosed() {
    this.propagateOnTouched();
    this.closed.emit();
  }
}
