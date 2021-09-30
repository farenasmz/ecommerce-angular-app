import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import {
  regexEmail,
  regexErrors,
  markFormGroupTouched,
} from '@app/shared/utils';
import * as fromRoot from '@app/store';
import * as fromUser from '@app/store/user';
import { select, Store } from '@ngrx/store';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegistrationComponent implements OnInit {
  form!: FormGroup;
  regexErrors = regexErrors;
  loading$!: Observable<boolean | null>;

  constructor(private fb: FormBuilder, private store: Store<fromRoot.State>) {}

  ngOnInit(): void {
    this.loading$ = this.store.pipe(select(fromUser.getLoading));
    this.form = this.fb.group(
      {
        email: [
          null,
          {
            updateOn: 'blur',
            validators: [
              Validators.required,
              Validators.maxLength(128),
              Validators.pattern(regexEmail.email),
            ],
          },
        ],
        password: [
          null,
          {
            updateOn: 'blur',
            validators: [
              Validators.required,
              Validators.maxLength(128),
              Validators.pattern(regexEmail.password),
            ],
          },
        ],
        passwordRepeat: [
          null,
          {
            updateOn: 'blur',
            validators: [
              Validators.required,
              Validators.maxLength(128),
              Validators.pattern(regexEmail.password),
            ],
          },
        ],
      },
      { validator: this.repeatPasswordValidator }
    );
  }

  private repeatPasswordValidator(group: FormGroup): {
    [key: string]: boolean;
  } | null {
    const password = group.get('password');
    const passwordRepeat = group.get('passwordRepeat');

    return password?.value && passwordRepeat?.value !== passwordRepeat?.value
      ? { repeat: true }
      : null;
  }

  onSubmit(): void {
    if (this.form.valid) {
      const value = this.form.value;
      const credentials: fromUser.EmailPasswordCredentials = {
        email: value.email,
        password: value.password,
      };
      this.store.dispatch(new fromUser.SignUpEmail(credentials));
    } else {
      markFormGroupTouched(this.form);
    }
  }
}
