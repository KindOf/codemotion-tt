import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class InvoiceService {

  constructor(
    private http: Http
  ) { }

  getInvoices() {
    return this.http.get('/api/invoices')
      .map(res => res.json());
  }

  getInvoiceItems(invoiceId: number) {
    return this.http.get(`/api/invoices/${invoiceId}/items`)
      .map(res => res.json());
  }

}
