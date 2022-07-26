import { Recruiter } from './../../../../../../models/backend/user/roles/recruiter';
import { Injectable } from '@angular/core';
import { ProfileForm } from '../../form.component';
import { EmployeeForm } from '../../components/professional/roles/employee/employee.component';
import { Employee, User, UserCreateRequest } from '@app/store/user';
import { Dictionaries } from '@app/store/dictionaries/dictionaries.models';
import { RecruiterForm } from './../../components/professional/roles/recruiter/recruiter.component';
import { USER_PROVIDED_EFFECTS } from '@ngrx/effects';

@Injectable()
export class MapperService {
  constructor() {}

  userToForm(user: User): ProfileForm {
    return {
      personal: {
        name: user ? user.name : null,
        photoUrl: user ? user.photoUrl : null,
        country: user ? user.country : null,
      },
      professional: {
        about: user ? user.about : null,
        role: user ? this.getFormRole(user) : null,
        rolId: user.roleId || null,
      },
    };
  }

  private getFormRole(user: User): EmployeeForm | RecruiterForm | null {
    if (user.roleId === 'employee') {
      const role = user.role as Employee;

      const formRole: EmployeeForm = {
        expectedSalary: role.expectedSalary,
        specialization: role.specialization?.id || null,
        qualification: role.qualification?.id || null,
        skills: role?.skills?.map((x) => x.id) || null,
        experiences: role.experiences,
      };

      return formRole;
    }

    if (user.roleId === 'employee') {
      const role = user.role as Recruiter;
      const formRole: RecruiterForm = {
        companyName: role.companyName,
        employeesCount: role.employeeCount,
        experiences: [],
      };

      return formRole;
    }

    return null;
  }

  formToUserCreate(
    form: ProfileForm,
    dictionaries: Dictionaries
  ): UserCreateRequest {
    return {
      name: form.personal?.name || null,
      photoUrl: form.personal?.photoUrl || null,
      roleId: form.professional?.rolId,
      country: form.personal?.country || null,
      about: form.professional?.about,
    };
  }

  private getRole(
    form: ProfileForm,
    dictionaries: Dictionaries
  ): Employee | Recruiter | null {
    if (form.professional?.rolId === 'employee') {
      const formRole = form.professional.role as EmployeeForm;
      const role: Employee = {
        expectedSalary: formRole.expectedSalary,
        specialization:
          dictionaries.specializations.items.find(
            (x) => x.id === formRole.specialization
          ) || null,
        qualification:
          dictionaries.qualifications.items.find(
            (x) => x.id === formRole.qualification
          ) || null,
        skills: formRole.skills.map((id) =>
          dictionaries.skills.items.find((x) => x.id === id)
        ),
        experiences: formRole.experiences,
      };
    }

    if (form.professional?.rolId === 'recruiter') {
      const formRole = form.professional.role as RecruiterForm;
      const role: Recruiter = {
        companyName: formRole.companyName,
        employeeCount: formRole.employeesCount,
      };
    }

    return null;
  }

  formToUserUpdate(
    form: ProfileForm,
    user: User,
    dictionaries: Dictionaries
  ): User {
    return {
      uid: user.uid,
      email: user.email,
      created: user.created,
      name: form.personal?.name || null,
      photoUrl: form.personal?.photoUrl || null,
      roleId: form.professional?.rolId,
      country: form.personal?.country || null,
      about: form.professional?.about,
      role: this.getRole(form, dictionaries),
    };
  }
}
