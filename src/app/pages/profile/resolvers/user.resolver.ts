import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { select, Store } from '@ngrx/store';
import * as fromRoot from 'app/store';
import * as fromUser from 'app/store/user';
import { filter, Observable, take } from 'rxjs';

@Injectable()
export class UserResolver implements Resolve<fromUser.User> {
  constructor(private store: Store<fromRoot.State>) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): fromUser.User | Observable<fromUser.User> | Promise<fromUser.User> {
    return this.store.pipe(
      select(fromUser.getUser),
      filter((user: any) => !!user),
      take(1)
    );
  }
}
