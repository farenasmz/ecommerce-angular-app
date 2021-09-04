import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'ecommerce-angular-app';

  /**
   *
   */
  constructor(private fireStore: AngularFirestore) {}

  ngOnInit(): void {
    this.fireStore
      .collection('test')
      .snapshotChanges()
      .subscribe((data) => {
        console.log(data.map((d) => d.payload.doc.data()));
      });
  }
}
