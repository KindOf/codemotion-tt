import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

import { Invoice } from './shared/invoice';
import { InvoiceItem } from './shared/invoice-item';

@Injectable()
export class InvoiceService {

  constructor(
    private http: Http
  ) { }

  getInvoices(): Observable<Invoice[]> {
    return this.http.get('/api/invoices')
      .map(res => res.json());
  }

  getInvoiceItems(invoiceId: number): Observable<InvoiceItem[]> {
    return this.http.get(`/api/invoices/${invoiceId}/items`)
      .map(res => res.json());
  }

}
