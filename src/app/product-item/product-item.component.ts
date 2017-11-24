import { ProductService } from './../product.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {
  @Input() invoiceItem;
  product;

  constructor(
    private productService: ProductService
  ) {
  }

  ngOnInit() {
    this.productService.getProductById(this.invoiceItem.product_id).subscribe(res => {
      this.product = res.json();
    });
  }
}
