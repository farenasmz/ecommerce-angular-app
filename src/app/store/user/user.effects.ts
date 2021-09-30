import {
  map,
  catchError,
  take,
  tap,
  withLatestFrom,
  switchMap,
} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, of, from } from 'rxjs';
import { environment } from '@src/environments/environment';
import { User, EmailPasswordCredentials } from './user.models';
import * as fromActions from './user.actions';
import { NotificationService } from '@app/services';
import firebase from 'firebase/compat/app';

type Action = fromActions.All;

@Injectable()
export class UserEffects {
  constructor(
    private actions: Actions,
    private afAuto: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router,
    private notification: NotificationService
  ) {}

  signUpEmail: Observable<Action> = createEffect(() =>
    this.actions.pipe(
      ofType(fromActions.Types.SIGN_UP_EMAIL),
      map((action: fromActions.SignUpEmail) => action.credentials),
      switchMap((credentials: EmailPasswordCredentials) =>
        //Convierte una promesa a observable
        from(
          this.afAuto.createUserWithEmailAndPassword(
            credentials.email,
            credentials.password
          )
        ).pipe(
          //Si la operación es exitosa ejecutará el tap
          tap(() => {
            firebase
              .auth()
              .currentUser?.sendEmailVerification(
                environment.actionCodeSettings
              );
          }),
          map(
            (signUpState) =>
              new fromActions.SignUpEmailSuccess(
                signUpState.user ? signUpState.user.uid : ''
              ),
            catchError((error) => {
              //Crea un observable
              this.notification.error(error.message);
              return of(new fromActions.SignUpEmailError(error));
            })
          )
        )
      )
    )
  );

  signInEmail: Observable<Action> = createEffect(() =>
    this.actions.pipe(
      ofType(fromActions.Types.SIGN_IN_EMAIL),
      map((action: fromActions.SignInEmail) => action.credentials),
      switchMap((credentials: EmailPasswordCredentials) =>
        //Convierte una promesa a observable
        from(
          this.afAuto.signInWithEmailAndPassword(
            credentials.email,
            credentials.password
          )
        ).pipe(
          switchMap((signInState) =>
            this.afs
              .doc<User>(
                `users/${signInState.user ? signInState.user.uid : ''}`
              )
              .valueChanges()
              .pipe(
                //Tomar primer valor
                take(1),
                map(
                  (user) =>
                    new fromActions.SignInEmailSuccess(
                      signInState.user ? signInState.user.uid : '',
                      user || null
                    )
                )
              )
          ),
          catchError((error) => {
            this.notification.error(error.message);
            //Crea un observable
            return of(new fromActions.SignInEmailError(error));
          })
        )
      )
    )
  );

  signOutEmail: Observable<Action> = createEffect(() =>
    this.actions.pipe(
      ofType(fromActions.Types.SIGN_OUT_EMAIL),
      switchMap(() =>
        //Convierte una promesa a observable
        from(this.afAuto.signOut()).pipe(
          map(() => new fromActions.SignOutEmail()),
          catchError((error) => {
            this.notification.error(error.message);
            //Crea un observable
            return of(new fromActions.SignOutEmailError(error));
          })
        )
      )
    )
  );

  init: Observable<Action> = createEffect(() =>
  this.actions.pipe(
    ofType(fromActions.Types.INIT),
    switchMap(() => this.afAuto.authState.pipe(take(1))),
    switchMap(authState =>
      {
if(authState)
{
return this.afs.doc<User>(`users/${authState.uid}`).valueChanges().pipe(
  take(1),
  map(user => new fromActions.InitAuthorized(authState.uid, user || null)),
  catchError(err => of(new fromActions.InitError(err.message)))
);
}
else
{
  return of(new fromActions.InitUnAuthorized());
}
      })
    )
  )
);
}
