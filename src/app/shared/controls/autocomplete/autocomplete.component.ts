import {
  Component,
  EventEmitter,
  forwardRef,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import {
  NG_VALUE_ACCESSOR,
  ControlValueAccessor,
  FormControl,
} from '@angular/forms';
import { AutocompleteModule } from './autocomplete.module';
import {
  takeUntil,
  distinctUntilChanged,
  startWith,
  map,
  filter,
} from 'rxjs/operators';
import { ControlItem } from '@app/models/frontend/control-item';
import { Value } from '@app/models/frontend';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AutocompleteComponent),
      multi: true,
    },
  ],
})
export class AutocompleteComponent
  implements OnInit, OnDestroy, ControlValueAccessor
{
  @Input() items!: ControlItem[];
  @Input() placeholder!: string;
  @Output() changed = new EventEmitter<Value>();
  formControl = new FormControl();
  options$!: Observable<ControlItem[]>;
  private destroy = new Subject<any>();
  private propagateChange: any = () => {};
  private propagateOnTouched: any = () => {};

  constructor() {}

  ngOnInit(): void {
    this.options$ = this.formControl.valueChanges.pipe(
      startWith(''),
      filter((value) => typeof value === 'string' || typeof value === 'object'),
      map((value) => (typeof value == 'string' ? value : value.label)),
      map((label) => (label ? this.filter(label) : this.items.slice()))
    );
    this.formControl.valueChanges
      .pipe(takeUntil(this.destroy), distinctUntilChanged())
      .subscribe((item) => {
        const value = typeof item === 'object' ? item.value : null;

        this.propagateChange(value);
        this.changed.emit(value);
      });
  }
  ngOnDestroy(): void {
    this.destroy.next(null);
    this.destroy.complete();
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any) {
    this.propagateOnTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    if (isDisabled) {
      this.formControl.disable();
    } else {
      this.formControl.enable();
    }
  }

  private filter(value: string): ControlItem[] {
    const filterValue = value.toLowerCase();
    return this.items.filter((items) =>
      items.label.toLocaleLowerCase().includes(filterValue)
    );
  }

  writeValue(obj: any): void {
    const selectedOption = this.items.find((item) => item.value == obj);
    this.formControl.setValue(selectedOption);
  }

  displayFn(item?: ControlItem): string {
    return item ? item?.label : '';
  }

  onBlur(): void {
    this.propagateOnTouched();
  }
}
