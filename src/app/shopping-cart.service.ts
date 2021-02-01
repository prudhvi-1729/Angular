import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Product } from './models/product';
import { take } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private db:AngularFireDatabase) {}
  
  create(){
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    });
  }

  private getCart(cartId:string){
    return this.db.object('/shopping-carts/'+cartId);
  }

  getOrCreateId(){
    let cartId = localStorage.getItem('cartId');
      if(!cartId) {
        this.create().then(result =>
        localStorage.setItem('cartId',result.key ) );
        return cartId;
      }
      return cartId;

}
  
  addToCart(product:Product){
    let cartId = this.getOrCreateId();
    let items$ = this.db.object("/shopping-carts/"+cartId+"/items/"+product.key);
    items$.valueChanges().pipe(take(1)).subscribe(item => {
      if(item) items$.update({ quantity:1 });
      else
      items$.update({product:product.data,quantity:1});
    })
  }

}
