import { Response } from '@angular/http';
import { Router } from '@angular/router';
import { Component, ViewChild, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { ProductService } from '../../product.service';

@Component({
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css'],
  selector: 'app-product-form'
})
export class ProductFormComponent implements OnInit {
  @ViewChild('f') form: NgForm;
  isEditing = false;

  constructor(
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit() {
    if (this.productService.productToEdit) {
      this.isEditing = true;
      const product = {
        name: this.productService.productToEdit.name,
        price: this.productService.productToEdit.price
      };
      setTimeout(() => {
        this.form.form.setValue(product);
      }, 1);
    }
  }

  private updateProduct(): Promise<Response> {
    this.router.navigate(['/products']);
    return this.productService.updateProduct(
      this.productService.productToEdit.id,
      this.form.value
    );
  }

  private createProduct(): Promise<any> {
    return this.productService.createProduct(this.form.value);
  }

  onSubmit() {
    const req = this.isEditing ? this.updateProduct() : this.createProduct();
    req.catch(err => {
      console.log('Error: ', err);
    });
    this.productService.productToEdit = null;
  }
}
