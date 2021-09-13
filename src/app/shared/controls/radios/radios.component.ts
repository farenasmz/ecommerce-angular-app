import {
  Component,
  EventEmitter,
  forwardRef,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { ControlItem, Value } from '@app/models/frontend';
export { ControlItem, Value } from '@app/models/frontend';

@Component({
  selector: 'app-radios',
  templateUrl: './radios.component.html',
  styleUrls: ['./radios.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RadiosComponent),
      multi: true,
    },
  ],
})
export class RadiosComponent implements OnInit, ControlValueAccessor {
  value!: Value;
  isDisabled!: boolean;
  private propagateChange: any = () => {};
  private propagateOnTouched: any = () => {};
  @Output() changed = new EventEmitter<Value>();
  @Input() items!: ControlItem[];
  constructor() {}
  ngOnInit(): void {}

  writeValue(obj: any): void {
    this.value = obj;
  }
  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.propagateOnTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  onChanged(value: Value): void {
    this.value = value;
    this.propagateChange(value);
    this.changed.emit(value);
  }

  isChecked(value: Value): boolean {
    return this.value === value;
  }
}
