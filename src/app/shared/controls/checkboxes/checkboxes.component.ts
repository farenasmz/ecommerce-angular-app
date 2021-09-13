import {
  Component,
  EventEmitter,
  forwardRef,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { Value } from '@app/models/frontend';
import { ControlItem } from '../../../models/frontend/control-item/index';
export { ControlItem, Value } from '@app/models/frontend';

@Component({
  selector: 'app-checkboxes',
  templateUrl: './checkboxes.component.html',
  styleUrls: ['./checkboxes.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxesComponent),
      multi: true,
    },
  ],
})
export class CheckboxesComponent implements OnInit, ControlValueAccessor {
  value!: Value[];
  isDisabled!: boolean;
  @Input() items!: ControlItem[];
  @Output() changed = new EventEmitter<Value[]>();
  private propagateChange: any = () => {};
  private prograpateOnTouched: any = () => {};

  constructor() {}

  ngOnInit(): void {}

  writeValue(obj: Value[]): void {
    this.value = obj;
  }
  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.prograpateOnTouched = fn;
  }
  setDisabledState(isDisabled: boolean) {
    this.isDisabled = isDisabled;
  }

  onChanged(value: Value, event: Event) {
    const { target } = event;
    const result = (target as HTMLInputElement).checked;
    const selected = this.getSelected(value, result);
    this.value = selected;
    this.propagateChange(selected);
    this.changed.emit(selected);
  }

  isChecked(value: Value): boolean {
    return this.value && this.value.includes(value);
  }

  private getSelected(value: Value, checked: boolean): Value[] {
    const selected: Value[] = this.value ? [...this.value] : [];

    if (checked) {
      if (!selected.includes(value)) {
        selected.push(value);
      } else {
        const index = selected.indexOf(value);
        selected.splice(index, 1);
      }
    }

    return selected.length ? selected : [];
  }
}
