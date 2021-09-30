import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromRoot from './store';
import * as fromDictionaries from './store/dictionaries';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'ecommerce-angular-app';

  constructor(private store: Store<fromRoot.State>) {}

  ngOnInit(): void {
    this.store.dispatch(new fromDictionaries.Read());


    // this.fireStore
    //   .collection('test')
    //   .snapshotChanges()
    //   .subscribe((data) => {
    //     console.log(data.map((d) => d.payload.doc.data()));
    //   });
  }
}
