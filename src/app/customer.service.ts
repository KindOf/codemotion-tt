import { Injectable, EventEmitter } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

import { Customer } from './shared/customer';

@Injectable()
export class CustomerService {
  customerToEdit: Customer;
  customerCreatedEvent: EventEmitter<Customer> = new EventEmitter();

  constructor(
    private http: Http
  ) { }

  getCustomers(): Observable<Customer[]> {
    return this.http.get('/api/customers')
      .map(res => res.json());
  }

  getCustomer(id: number): Observable<Customer> {
    return this.http.get(`/api/customers/${id}`)
      .map(res => res.json());
  }

  createCustomer(customer: Customer) {
    return this.http.post('/api/customers', customer).toPromise()
    .then(res => {
        this.customerCreatedEvent.emit(res.json());
        return res;
      });
  }

  updateCustomer(id: number, updatedCustomer: Customer): Promise<Response> {
    return this.http.put(
      `/api/customers/${id}`,
      updatedCustomer)
      .toPromise();
  }

}
