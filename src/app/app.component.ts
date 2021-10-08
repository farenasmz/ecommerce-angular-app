import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as fromRoot from './store';
import * as fromUsers from './store/user';
import * as fromDictionaries from './store/dictionaries';
import { Observable } from 'rxjs';
import * as fromUser from '@app/store/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'ecommerce-angular-app';
  isAuthorized$!: Observable<boolean>;
  constructor(private store: Store<fromRoot.State>) {}

  ngOnInit(): void {
    this.isAuthorized$ = this.store.pipe(select(fromUsers.getIsAuthorized));
    this.store.dispatch(new fromUsers.Init());
    this.store.dispatch(new fromDictionaries.Read());

    // this.fireStore
    //   .collection('test')
    //   .snapshotChanges()
    //   .subscribe((data) => {
    //     console.log(data.map((d) => d.payload.doc.data()));
    //   });
  }

  onSignOut(): void {
    this.store.dispatch(new fromUsers.SignOutEmail());
  }

  SuperClick():void{
    this.store.dispatch(new fromUsers.Init());
  }
}
