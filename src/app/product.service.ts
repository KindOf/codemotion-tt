import { Injectable, EventEmitter } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { Product } from './shared/product';

@Injectable()
export class ProductService {
  productToEdit: Product;
  productCreatedEvent: EventEmitter<Product> = new EventEmitter();

  constructor(
    private http: Http
  ) { }

  getProducts(): Observable<Product[]> {
    return this.http.get('/api/products')
      .map(res => res.json());
  }

  getProductById(id): Observable<Response> {
    return this.http.get(`/api/products/${id}`);
  }

  createProduct(product: Product): Promise<Response> {
    return this.http.post('/api/products', product).toPromise()
      .then(res => {
        this.productCreatedEvent.emit(res.json());
        return res;
      });
  }

  updateProduct(id: number, updatedProduct: Product): Promise<Response> {
    return this.http.put(
      `/api/products/${id}`,
      updatedProduct)
      .toPromise();
  }
}
