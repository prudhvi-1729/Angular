import { Component } from '@angular/core';
import { ProductService } from '../product.service';
import { CategoryService } from '../category.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../models/product';
import { ShoppingCartService } from '../shopping-cart.service';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
products:Product[] = [];
filteredProducts:Product[];
categories$;
category:string;
  constructor(public cartservice: ShoppingCartService,route: ActivatedRoute,productService: ProductService,categoryService: CategoryService) { 
     productService.getAll()
     .switchMap(products => {
       this.products = products;
       return route.queryParamMap;
     })
     .subscribe(params=>{
        this.category = params.get('category');
        
        this.filteredProducts = (this.category)?
           this.products.filter(p=>p.data.category === this.category) :
           this.products;
         });
     this.categories$= categoryService.getCategories();
    }

    addToCart(products:Product){
      this.cartservice.addToCart(products);
    }
}
