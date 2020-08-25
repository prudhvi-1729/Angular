import { Injectable } from '@angular/core';
import { AngularFireDatabase, snapshotChanges } from '@angular/fire/database';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private db:AngularFireDatabase) { }


getCategories(){
   return this.db.list('/category',ref => ref.orderByChild('name'))
   .snapshotChanges().pipe(
    map(actions => 
      actions.map(a => ({ key: a.payload.key,data:a.payload.val()}))
  ));
}
}