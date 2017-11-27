import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { forkJoin } from 'rxjs/observable/forkJoin';

import { Invoice } from './shared/invoice';
import { InvoiceItem } from './shared/invoice-item';
import { NewInvoice } from './shared/newInvoice';

@Injectable()
export class InvoiceService {

  constructor(
    private http: Http
  ) { }

  getInvoices(): Observable<Invoice[]> {
    return this.http.get('/api/invoices')
      .map(res => res.json());
  }

  getInvoiceById(id: number): Promise<Response> {
    return this.http.get(`/api/invoices/${id}`).toPromise();
  }

  getInvoiceItems(invoiceId: number): Observable<InvoiceItem[]> {
    return this.http.get(`/api/invoices/${invoiceId}/items`)
      .map(res => res.json());
  }

  getInvoiceItemById(id: number, invoiceId: number): Promise<Response> {
    return this.http.get(`/api/invoices/${invoiceId}/items/${id}`).toPromise();
  }

  getInvoiceItemsForInvoice(invoiceId: number): Promise<Response> {
    return this.http.get(`/api/invoices/${invoiceId}/items`).toPromise();
  }

  updateTotal(formValue: NewInvoice): Promise<Response> {
    const invoice = new Invoice(formValue.customer.id, formValue.discount, formValue.total);

    return this.http.put(`/api/invoices/${formValue.id}`, invoice).toPromise();
  }

  updateCustomerId(customer_id: number, formValue: NewInvoice) {
    const update = {
      customer_id,
      discout: formValue.discount,
      total: formValue.total
    };

    return this.http.put(`/api/invoices/${formValue.id}`, update).toPromise();
  }

  updateInvoiceItemQuantity(invoiceItem: InvoiceItem, invoice: NewInvoice): Promise<Response[]> {
    const updatedInvoice = {
      customer_id: invoice.customer.id,
      discount: invoice.discount,
      total: invoice.total
    };
    return Promise.all([
        this.updateInvoice(invoice.id, updatedInvoice),
        this.http.put(`/api/invoices/${invoice.id}/items/${invoiceItem.id}`, invoiceItem).toPromise()
      ]);
  }

  updateInvoice(invoiceId, updatedInvoice) {
    return this.http.put(`/api/invoices/${invoiceId}`, updatedInvoice).toPromise();
  }

  updateDiscountAndTotal(formValue: NewInvoice) {
    const update = {
      customer_id: formValue.customer.id,
      discount: formValue.discount,
      total: formValue.total
    };

    return this.http.put(`/api/invoices/${formValue.id}`, update).toPromise();
  }

  addInvoiceItem(invoiceItem: InvoiceItem, invoice: NewInvoice) {
    const updatedInvoice = {
      customer_id: invoice.customer.id,
      discount: invoice.discount,
      total: invoice.total
    };

    return Promise.all([
      this.http.post(`/api/invoices/${invoice.id}/items`, invoiceItem).toPromise(),
      this.updateInvoice(invoice.id, updatedInvoice)
    ]);
  }

  createInvoice(newInvoice: NewInvoice): Promise<any> {
    const invoiceItems = newInvoice.invoiceItems;
    const invoice = new Invoice(newInvoice.customer.id, newInvoice.discount, newInvoice.total);

    return this.http.post('/api/invoices', invoice)
      .toPromise()
      .then(i => {
        const createInvoiceItemRequests =
          invoiceItems.map(item => this.http.post(`/api/invoices/${i.json().id}/items`, item));
        return Promise.all([
          forkJoin(createInvoiceItemRequests).toPromise(),
          Promise.resolve(i)
        ]);
      });
  }

}
