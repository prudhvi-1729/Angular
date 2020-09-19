import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { map } from 'rxjs/operators';
import { Product } from './models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db:AngularFireDatabase) { }

  create(product){
    return this.db.list('/products').push(product);
  }

  getAll(){
    //return this.db.list('/products').valueChanges();
    return this.db.list('/products',ref => ref.orderByChild('name'))
   .snapshotChanges().pipe( 
    map(actions => 
      actions.map(a => ({ key: a.payload.key, data: a.payload.val(),title: a.payload.val() as string,
        price: a.payload.val() as number,
        category: a.payload.val() as string,
        imageUrl: a.payload.val() as string}))
  ));
  }

  get(productId){
    return this.db.object('/products/'+productId).valueChanges();
  }

  update(productId,product){
    return this.db.object('/products/'+productId).update(product)
  }

  delete(productId){
    return this.db.object('/products/'+productId).remove();
  }

}
