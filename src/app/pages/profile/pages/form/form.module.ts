import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FilesUploadModule } from '@app/shared';
import {
  FormFieldModule,
  InputModule,
  AutocompleteModule,
} from '@app/shared/controls';
import { SpinnerModule } from '@app/shared';

import { FormRoutingModule } from './form-routing.module';
import { FormComponent } from './form.component';
import { StepperModule } from './components/stepper/stepper.module';
import { PersonalComponent } from './components/personal/personal.component';
import { ProfessionalComponent } from './components/professional/professional.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UserPhotoModule } from '@app/shared/layouts/user-photo/user-photo.module';
import { RadiosModule } from '@app/shared/controls/radios/radios.module';
import { SelectModule } from '@app/shared/controls/select/select.module';
import { CheckboxesModule } from '../../../../shared/controls/checkboxes/checkboxes.module';
import { DateRangeModule } from '../../../../shared/controls/date-range/date-range.module';
import { EmployeeComponent } from './components/professional/roles/employee/employee.component';
import { RecruiterComponent } from './components/professional/roles/recruiter/recruiter.component';
import { ExperienceComponent } from './components/professional/roles/employee/experience/experience.component';
import { ButtonModule } from '@app/shared/buttons/button/button.module';

@NgModule({
  declarations: [
    FormComponent,
    PersonalComponent,
    ProfessionalComponent,
    EmployeeComponent,
    RecruiterComponent,
    ExperienceComponent,
  ],
  imports: [
    CommonModule,
    FormRoutingModule,
    StepperModule,
    FormFieldModule,
    FilesUploadModule,
    SpinnerModule,
    ReactiveFormsModule,
    InputModule,
    AutocompleteModule,
    UserPhotoModule,
    RadiosModule,
    SelectModule,
    CheckboxesModule,
    DateRangeModule,
    ButtonModule,
  ],
})
export class FormModule {}
