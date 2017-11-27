import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { InvoiceService } from './invoice.service';
import { ProductService } from './product.service';
import { CustomerService } from './customer.service';
import { InvoiceListComponent } from './invoice-list/invoice-list.component';
import { InvoiceFormComponent } from './invoice-list/invoice-form/invoice-form.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductFormComponent } from './product-list/product-form/product-from.component';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { CustomerFormComponent } from './customer-list/customer-form/customer-form.component';

const routes: Routes = [
  { path: '', redirectTo: 'invoices', pathMatch: 'full' },
  { path: 'invoices', component: InvoiceListComponent },
  { path: 'products', component: ProductListComponent },
  { path: 'customers', component: CustomerListComponent },
  { path: 'product-form', component: ProductFormComponent },
  { path: 'customer-form', component: CustomerFormComponent },
  { path: 'invoice-form', component: InvoiceFormComponent },
  { path: '**', redirectTo: 'invoices' }
];

@NgModule({
  declarations: [
    AppComponent,
    InvoiceListComponent,
    InvoiceFormComponent,
    ProductListComponent,
    CustomerListComponent,
    ProductFormComponent,
    CustomerFormComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes, {useHash: true})
  ],
  providers: [
    InvoiceService,
    ProductService,
    CustomerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
