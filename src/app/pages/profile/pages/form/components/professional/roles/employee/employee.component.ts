import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Dictionaries } from '@app/store/dictionaries';
import { RecruiteForm } from '../recruiter/recruiter.component';
import { ExperienceForm } from './experience/experience.component';
import { controlEntities, mapControls } from '@app/shared/utils/form';

export interface EmployeeForm {
  specialization: string;
  skills: string[];
  qualification: string;
  expectedSalary: number;
  experiences: ExperienceForm[];
}

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss'],
})
export class EmployeeComponent implements OnInit, OnDestroy {
  @Input() parent!: FormGroup;
  @Input() name!: string;
  @Input() value!: EmployeeForm | RecruiteForm;
  @Input() dictionaries!: Dictionaries | null;
  form!: FormGroup;
  controls!: controlEntities;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      expectedSalary: [
        null,
        {
          updateOn: 'blur',
          validators: [Validators.required],
        },
      ],
      specialization: [
        { value: null, disabled: true },
        {
          updateOn: 'change',
          validators: [Validators.required],
        },
      ],
      qualification: [
        { value: null, disabled: true },
        {
          updateOn: 'change',
          validators: [Validators.required],
        },
      ],
      skills: [
        { value: null, disabled: true },,
        {
          updateOn: 'change',
          validators: [Validators.required],
        },
      ],
    });

    this.controls = {
      specialization: {
        items: this.dictionaries?.specializations.controlItems,
        changed: () => {},
      },
      qualification: {
        items: this.dictionaries?.qualifications.controlItems,
        map: () => {},
      },
      skills: {
        items: this.dictionaries?.skills.controlItems,
        map: () => {},
      },
    };

    if (this.value) {
      this.form.patchValue(this.value);
    }

    this.parent.addControl(this.name, this.form);
  }

  ngOnDestroy(): void {
    this.parent.removeControl(this.name);
  }
}
