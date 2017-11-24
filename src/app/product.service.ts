import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class ProductService {

  constructor(
    private http: Http
  ) { }

  getProductById(id) {
    return this.http.get(`/api/products/${id}`);
  }
}
