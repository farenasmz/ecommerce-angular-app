import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy,
  Output,
  ChangeDetectorRef,
} from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { StepperService } from '../stepper/services/stepper.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Input, EventEmitter } from '@angular/core';
import { Dictionaries } from '@app/store/dictionaries';
import { regexErrors } from '@app/shared/utils/regex';
import { ThrowStmt } from '@angular/compiler';
import { markFormGroupTouched } from '@app/shared';
import { RecruiteForm } from './roles/recruiter/recruiter.component';
import { EmployeeForm } from './roles/employee/employee.component';

export interface ProfesionalForm {
  about: string;
  rolId: string;
  role: RecruiteForm | EmployeeForm;
}

@Component({
  selector: 'app-professional',
  templateUrl: './professional.component.html',
  styleUrls: ['./professional.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfessionalComponent implements OnInit, OnDestroy {
  private destroy = new Subject<any>();
  @Input() value!: ProfesionalForm;
  @Input() dictionaries!: Dictionaries | null;
  @Output() changed = new EventEmitter<ProfesionalForm>();
  form!: FormGroup;
  regexErrors = regexErrors;

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
      roleId: [
        null,
        {
          updateOn: 'change',
          validators: [Validators.required],
        },
      ],
      about: [
        null,
        {
          updateOn: 'blur',
          validators: [Validators.required],
        },
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
}
