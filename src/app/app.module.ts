import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';


import { AppComponent } from './app.component';
import { InvoiceService } from './invoice.service';
import { ProductService } from './product.service';
import { InvoiceListComponent } from './invoice-list/invoice-list.component';
import { InvoiceItemComponent } from './invoice-list/invoice-item/invoice-item.component';
import { ProductItemComponent } from './product-item/product-item.component';


@NgModule({
  declarations: [
    AppComponent,
    InvoiceListComponent,
    InvoiceItemComponent,
    ProductItemComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
  ],
  providers: [
    InvoiceService,
    ProductService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
