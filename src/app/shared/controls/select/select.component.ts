import {
  Component,
  EventEmitter,
  forwardRef,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { ControlItem, Value } from '@app/models/frontend';
export { ControlItem, Value } from '@app/models/frontend';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true,
    },
  ],
})
export class SelectComponent implements OnInit, ControlValueAccessor {
  value!: Value;
  isDisabled!: boolean;
  @Input() items!: ControlItem[];
  @Input() placeholder!: string;
  @Output() changed = new EventEmitter<Value>();
  private propagateChange: any = () => {};
  private propagateTouched: any = () => {};

  constructor() {}
  ngOnInit(): void {}

  writeValue(value: Value): void {
    this.value = value;
  }
  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.registerOnTouched = fn;
  }

  setDisabledState(isDisable: boolean): void {
    this.isDisabled = isDisable;
  }

  onChanged(event: MatSelectChange): void {
    const value = event.value ? event.value : null;
    this.value = value;
    this.propagateChange(value);
    this.changed.emit(value);
  }

  onBlur(): void {
    this.propagateChange();
  }
}
