import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { Invoice } from '../shared/invoice';
import { Customer } from './../shared/customer';
import { InvoiceService } from './../invoice.service';
import { CustomerService } from './../customer.service';

@Component({
  selector: 'app-invoice-list',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.css']
})
export class InvoiceListComponent implements OnInit {
  invoices: Invoice[];
  customers: Customer[];

  constructor(
    private invoiceService: InvoiceService,
    private customerService: CustomerService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.invoiceService.getInvoices()
      .subscribe(invoices => {
        this.invoices = invoices;
      });
    this.customerService.getCustomers()
      .subscribe(customers => {
        this.customers = customers;
      });
  }

  getCustomer(id: number): Customer {
    return this.customers.find(customer => customer.id === id);
  }

  goToInvoiceForm(): void {
    this.router.navigate(['/invoice-form']);
  }
}
