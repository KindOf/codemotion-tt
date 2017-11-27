import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { Product } from '../shared/product';
import { ProductService } from './../product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[];

  constructor(
    private productService: ProductService,
    private router: Router
  ) { }

  ngOnInit() {
    this.productService.getProducts()
      .subscribe(products => {
        this.products = products;
      });
    this.productService.productCreatedEvent
      .subscribe(event => {
        this.products.push(event);
      });
  }

  editProduct(product: Product) {
    this.productService.productToEdit = product;
    this.router.navigate(['/product-form']);
  }

}
