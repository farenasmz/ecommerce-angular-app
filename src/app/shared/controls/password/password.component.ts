import {
  Component,
  EventEmitter,
  forwardRef,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

type passwordType = 'password' | 'text';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PasswordComponent),
      multi: true,
    },
  ],
})
export class PasswordComponent implements OnInit, ControlValueAccessor {
  private propagateChange: any = () => {};
  private propagateTouched: any = () => {};
  value!: string;
  isDisable!: boolean;
  passwordType!: passwordType;
  @Input() placeholder!: string;
  @Output() changed = new EventEmitter<string>();

  constructor() {
    this.passwordType = 'password';
  }

  ngOnInit(): void {}

  writeValue(value: string): void {
    this.value = value;
  }
  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.propagateTouched = fn;
  }

  setDisabledState(isDisable: boolean) {
    this.isDisable = isDisable;
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

  togglePassword(): void {
    this.passwordType = this.passwordType == 'password' ? 'text' : 'password';
  }
}
