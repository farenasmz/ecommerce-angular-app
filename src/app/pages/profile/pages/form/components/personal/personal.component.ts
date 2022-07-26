import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { StepperService } from '../stepper/services/stepper.service';
import { Dictionaries } from '@app/store/dictionaries/dictionaries.models';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { regexErrors } from '@app/shared/utils/regex';
import { markFormGroupTouched } from '../../../../../../shared/utils/form';

export interface PersonalForm {
  name: string | null;
  photoUrl: string | null;
  country: string | null;
}

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PersonalComponent implements OnInit, OnDestroy {
  @Input() value!: PersonalForm;
  @Input() dictionaries!: Dictionaries | null;
  @Output() changed = new EventEmitter<PersonalForm>();
  form!: FormGroup;
  regexErrors = regexErrors;

  private destroy = new Subject<any>();

  constructor(
    private stepper: StepperService,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnDestroy(): void {
    this.destroy.next(null);
    this.destroy.complete();
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      photoUrl: [null],
      name: [
        null,
        {
          updateOn: 'blur',
          validators: [Validators.required, Validators.maxLength(128)],
        },
      ],
      country: [
        null,
        { updateOn: 'change', validators: [Validators.required] },
      ],
    });

    if (this.value) {
      this.form.patchValue(this.value);
    }

    this.stepper.check$.pipe(takeUntil(this.destroy)).subscribe((type) => {
      if (!this.form.valid) {
        markFormGroupTouched(this.form);
        this.form.updateValueAndValidity();
        this.cdr.detectChanges();
      } else {
        this.changed.emit(this.form.value);
      }
      this.stepper[type].next(this.form.valid);
    });
  }

  onPhotoChanged(url: any): void {
    console.log('URL' + url);
    if (url) {
      this.form.controls.potoUrl.setValue(url);
    }
  }
}
