import {
  Component,
  OnInit,
  forwardRef,
  Output,
  Input,
  EventEmitter,
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
  ],
})
export class InputComponent implements OnInit, ControlValueAccessor {
  @Input() placeHolder: string = '';
  @Output() changed = new EventEmitter<string>();
  value: string = '';
  isDisable: boolean = false;
  private propagateChange: any = () => {};
  private propagateTouched: any = () => {};

  constructor() {}

  ngOnInit(): void {}

  writeValue(obj: any): void {
    this.value = obj;
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.propagateTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisable = isDisabled;
  }

  onKeyUp(event: Event): void {
    const { target } = event;
    this.value = (target as HTMLInputElement).value;
    this.propagateChange(this.value);
    this.changed.emit(this.value);
  }

  onBlur(): void {
    this.propagateTouched();
  }
}
