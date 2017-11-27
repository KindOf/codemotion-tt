import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Customer } from './../shared/customer';
import { CustomerService } from './../customer.service';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {
  customers: Customer[];

  constructor(
    private customerService: CustomerService,
    private router: Router
  ) { }

  ngOnInit() {
    this.customerService.getCustomers()
      .subscribe(customers => {
        this.customers = customers;
      });
    this.customerService.customerCreatedEvent
      .subscribe(event => {
        this.customers.push(event);
      });
  }

  editCustomer(customer: Customer) {
    this.customerService.customerToEdit = customer;
    this.router.navigate(['/customer-form']);
  }

}
