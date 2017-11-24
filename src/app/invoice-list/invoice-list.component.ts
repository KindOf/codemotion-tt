import { Component, OnInit } from '@angular/core';

import { Invoice } from '../shared/invoice';
import { InvoiceService } from './../invoice.service';

@Component({
  selector: 'app-invoice-list',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.css']
})
export class InvoiceListComponent implements OnInit {
  invoices: Invoice[];
  showModal = false;

  constructor(
    private invoiceService: InvoiceService
  ) { }

  ngOnInit(): void {
    this.invoiceService.getInvoices()
      .subscribe(invoices => {
        this.invoices = invoices;
      });
  }

  toggleModal(): void {
    this.showModal = !this.showModal;
  }
}
