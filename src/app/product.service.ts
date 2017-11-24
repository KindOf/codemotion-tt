import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { Product } from './shared/product';
import { Response } from '@angular/http/src/static_response';

@Injectable()
export class ProductService {

  constructor(
    private http: Http
  ) { }

  getProductById(id): Observable<Response> {
    return this.http.get(`/api/products/${id}`);
  }
}
