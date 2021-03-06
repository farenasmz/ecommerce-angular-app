import { ProfesionalForm } from './components/professional/professional.component';
import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Observable, Subject, takeUntil } from 'rxjs';
import * as fromDictionaries from '@app/store/dictionaries/dictionaries.models';
import * as fromSelectors from '@app/store/dictionaries/dictionaries.selectors';
import { StepperService } from './components/stepper/services/stepper.service';
import * as fromRoot from '@app/store';
import { select, Store } from '@ngrx/store';
import { PersonalForm } from './components/personal/personal.component';
import * as fromUser from '@app/store/user';
import { ActivatedRoute, Router } from '@angular/router';

export interface ProfileForm {
  personal: PersonalForm | null;
  professional: ProfesionalForm | null;
}

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormComponent implements OnInit, OnDestroy {
  private destroy = new Subject<any>();
  dictionaries$!: Observable<fromDictionaries.Dictionaries>;
  dictionaryIsReady$!: Observable<boolean>;
  private user!: fromUser.User;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public service: StepperService,
    private store: Store<fromRoot.State>
  ) {}
  ngOnDestroy(): void {
    this.destroy.next(null);
    this.destroy.complete();
  }

  ngOnInit(): void {
    this.user = this.route.snapshot.data.user;

    this.dictionaries$ = this.store.pipe(
      select(fromSelectors.getDictionaries)
    ) as Observable<any>;
    this.dictionaryIsReady$ = this.store.pipe(
      select(fromSelectors.getIsReady)
    ) as Observable<boolean>;

    this.service.init([
      {
        key: 'professional',
        label: 'Professional',
      },
      {
        key: 'personal',
        label: 'Personal',
      },
    ]);

    this.service.complete$.pipe(takeUntil(this.destroy)).subscribe(() => {
      console.log('completado');
    });

    this.service.cancel$.pipe(takeUntil(this.destroy)).subscribe(() => {
      console.log('Cancelado');
    });
  }

  onChangedPersonal(data: PersonalForm): void {
    console.log(data);
  }

  onChangedProfessional(data: ProfesionalForm) {
    console.log('Professional Form' + data);
  }
}
