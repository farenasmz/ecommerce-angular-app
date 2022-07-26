import { Action } from '@ngrx/store';
import { User, EmailPasswordCredentials } from './user.models';
import { UserCreateRequest } from '.';

export enum Types {
  INIT = '[USER] Init: Start',
  INIT_AUTHORIZED = '[USER] Init: AUTHORIZED',
  INIT_UNAUTHORIZED = '[USER] Init: UNAUTHORIZED',
  INIT_ERROR = '[USER] Init: ERROR',

  SIGN_IN_EMAIL = '[User] Login con email: Start',
  SIGN_IN_EMAIL_SUCCESS = '[User] Login con email: Success',
  SIGN_IN_EMAIL_ERROR = '[User] Login con email: ERROR',

  SIGN_UP_EMAIL = '[User] Sign Up con email: Start',
  SIGN_UP_EMAIL_SUCCESS = '[User] Sign Up con email: Success',
  SIGN_UP_EMAIL_ERROR = '[User] Sign Up con email: ERROR',

  SIGN_OUT_EMAIL = '[User] Sign Out con email: Start',
  SIGN_OUT_EMAIL_SUCCESS = '[User] Sign Out con email: Success',
  SIGN_OUT_EMAIL_ERROR = '[User] Sign Out con email: ERROR',

  CREATE = '[User] Create: Start',
  CREATE_SUCCESS = '[User] Create: Success',
  CREATE_ERROR = '[User] Create: ERROR',

  UPDATE = '[User] Update: Start',
  UPDATE_SUCCESS = '[User] Update: Success',
  UPDATE_ERROR = '[User] Update: ERROR',
}

//INIT

export class Init implements Action {
  readonly type = Types.INIT;

  constructor() {}
}

export class InitAuthorized implements Action {
  readonly type = Types.INIT_AUTHORIZED;

  constructor(public uid: string, public User: User | null) {}
}

export class InitUnAuthorized implements Action {
  readonly type = Types.INIT_UNAUTHORIZED;

  constructor() {}
}

export class InitError implements Action {
  readonly type = Types.INIT_ERROR;

  constructor(error: string) {}
}

//SIGN IN

export class SignInEmail implements Action {
  readonly type = Types.SIGN_IN_EMAIL;

  constructor(public credentials: EmailPasswordCredentials) {}
}

export class SignInEmailSuccess implements Action {
  readonly type = Types.SIGN_IN_EMAIL_SUCCESS;

  constructor(public uid: string, public user: User | null) {}
}

export class SignInEmailError implements Action {
  readonly type = Types.SIGN_IN_EMAIL_ERROR;

  constructor(public error: string) {}
}

//SIGN UP

export class SignUpEmail implements Action {
  readonly type = Types.SIGN_UP_EMAIL;

  constructor(public credentials: EmailPasswordCredentials) {}
}

export class SignUpEmailSuccess implements Action {
  readonly type = Types.SIGN_UP_EMAIL_SUCCESS;

  constructor(public uid: string) {}
}

export class SignUpEmailError implements Action {
  readonly type = Types.SIGN_UP_EMAIL_ERROR;

  constructor(public error: string) {}
}

//SIGN OUT
export class SignOutEmail implements Action {
  readonly type = Types.SIGN_OUT_EMAIL;

  constructor() {}
}

export class SignOutEmailSuccess implements Action {
  readonly type = Types.SIGN_OUT_EMAIL_SUCCESS;

  constructor() {}
}

export class SignOutEmailError implements Action {
  readonly type = Types.SIGN_OUT_EMAIL_ERROR;

  constructor(public error: string) {}
}

//Create
export class Create implements Action {
  readonly type = Types.CREATE;

  constructor(public user: UserCreateRequest) {}
}

export class CreateSuccess implements Action {
  readonly type = Types.CREATE_SUCCESS;

  constructor(public user: User) {}
}

export class CreateError implements Action {
  readonly type = Types.CREATE_ERROR;

  constructor(public error: string) {}
}

//UPDATE
export class Update implements Action {
  readonly type = Types.UPDATE;

  constructor(public user: User) {}
}

export class UpdateSuccess implements Action {
  readonly type = Types.UPDATE_SUCCESS;

  constructor(public user: User) {}
}

export class UpdateError implements Action {
  readonly type = Types.UPDATE_ERROR;

  constructor(public error: string) {}
}

export type All =
  | Init
  | InitAuthorized
  | InitUnAuthorized
  | InitError
  | SignInEmail
  | SignInEmailSuccess
  | SignInEmailError
  | SignUpEmail
  | SignUpEmailSuccess
  | SignUpEmailError
  | SignOutEmail
  | SignOutEmailSuccess
  | SignOutEmailError
  | Create
  | CreateSuccess
  | CreateError
  | Update
  | UpdateSuccess
  | UpdateError;
