import { Component, OnInit, EventEmitter } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormArray,
  Validators } from '@angular/forms';

import { Customer } from '../../shared/customer';
import { ProductService } from './../../product.service';
import { CustomerService } from './../../customer.service';
import { InvoiceService } from '../../invoice.service';
import { Product } from '../../shared/product';
import { InvoiceItem } from '../../shared/invoice-item';

@Component({
  selector: 'app-invoice-form',
  templateUrl: './invoice-form.component.html',
  styleUrls: ['./invoice-form.component.css']
})
export class InvoiceFormComponent implements OnInit {
  showAlert: boolean;
  showModal = false;
  modal = '';
  customers: Customer[];
  products: Product[];
  invoiceForm: FormGroup;
  productAddedEvent: EventEmitter<InvoiceItem> = new EventEmitter();
  quantityUpdated: EventEmitter<{invoiceItemIndex: number, invoiceItem: InvoiceItem}> = new EventEmitter();
  totalUpdatedEvent: EventEmitter<number> = new EventEmitter();

  constructor(
    private customerService: CustomerService,
    private productService: ProductService,
    private invoiceService: InvoiceService,
  ) { }

  ngOnInit() {
    this.invoiceForm = new FormGroup({
      id: new FormControl(),
      isSaved: new FormControl(false),
      customer: new FormControl(null, Validators.required),
      product: new FormGroup({
        p: new FormControl()
      }),
      products: new FormArray([], Validators.required),
      invoiceItems: new FormArray([], Validators.required),
      discount: new FormControl(0),
      total: new FormControl(0, Validators.required)
    });

    this.totalUpdatedEvent.subscribe(event => {
      if (this.invoiceForm.value.isSaved) {
        this.invoiceService.updateTotal(this.invoiceForm.value)
          .then(res => {
            console.log('total updated');
          });
      }
    });

    this.invoiceForm.valueChanges
      .subscribe(changes => {
        if (this.invoiceForm.valid && !this.invoiceForm.value['isSaved']) {
          this.onSubmit();
        }
      });

    this.quantityUpdated.subscribe(event => {
      if (this.invoiceForm.value.isSaved) {
        this.updateTotal();
        this.invoiceService.updateInvoiceItemQuantity(event.invoiceItem, this.invoiceForm.value)
          .then(res => {
            this.showAndHideAlert();
          });
      }
    });

    this.productAddedEvent.subscribe(event => {
      if (this.invoiceForm.value.isSaved && this.invoiceForm.value['id']) {
        this.invoiceService.addInvoiceItem(event, this.invoiceForm.value)
          .then(() => {
            this.showAndHideAlert();
          });
      }
    });

    this.invoiceForm.controls['discount'].valueChanges
      .subscribe(changes => {
        this.updateTotal();
        if (this.invoiceForm.value.isSaved) {
          this.invoiceService.updateDiscountAndTotal(this.invoiceForm.value)
            .then(() => {
              this.showAndHideAlert();
            });
        }
      });

    this.invoiceForm.controls['customer'].valueChanges
      .subscribe(changes => {
        if (this.invoiceForm.value.isSaved) {
          this.invoiceService.updateCustomerId(changes, this.invoiceForm.value)
            .then(() => {
              this.showAndHideAlert();
            });
        }
      });

    this.customerService.getCustomers()
      .subscribe(customers => {
        this.customers = customers;
      });
    this.customerService.customerCreatedEvent
      .subscribe(event => {
        this.customers.push(event);
        this.showModal = !this.showModal;
      });
    this.productService.getProducts()
      .subscribe(products => {
        this.products = products;
      });
    this.productService.productCreatedEvent
      .subscribe(event => {
        this.products.push(event);
        this.showModal = !this.showModal;
      });
  }

  toggleModal(name) {
    this.modal = name || '';
    this.showModal = !this.showModal;
  }

  addProduct(product: Product) {
    (<FormArray>this.invoiceForm.controls['products']).push(new FormControl(product));
    (<FormArray>this.invoiceForm.controls['invoiceItems']).push(new FormControl(new InvoiceItem(product.id, 1)));
    this.products.splice(this.products.findIndex(prod => prod.id === product.id), 1);
    this.updateTotal();
    this.productAddedEvent.emit(new InvoiceItem(product.id, 1));
  }

  getTotal(): number {
    return this.invoiceForm.value.products
      .map(product => product.price)
      .reduce((acc, curr, index) => {
        acc += curr * this.invoiceForm.value.invoiceItems[index].quantity;
        return acc;
      }, 0) * (1 - (this.invoiceForm.value.discount / 100));
  }

  updateTotal() {
    this.invoiceForm.controls['total'].patchValue(this.getTotal());
  }

  updateQuantity(index: number, value: InvoiceItem) {
    this.quantityUpdated.emit({invoiceItemIndex: index, invoiceItem: value});
    this.updateTotal();
    this.invoiceForm.controls['invoiceItems'].updateValueAndValidity();
  }

  onSubmit() {
    if (!this.invoiceForm.value.isSaved) {
      this.invoiceForm.controls['isSaved'].patchValue(true);
      this.updateTotal();
      this.invoiceService.createInvoice(this.invoiceForm.value)
      .then(res => {
          const responseBody = res[1].json();
          const invoiceId = responseBody.id;
          this.invoiceForm.controls['id'].patchValue(invoiceId);
          this.patchInvoiceItems(res[0]);
          this.showAndHideAlert();
        });
    }
  }

  private patchInvoiceItems(res) {
    res.forEach(response => {
      const body = response.json();
      const invoiceItemId = body.id;

      const invoiceItemIndex = this.invoiceForm.value.invoiceItems.findIndex(item => {
        return item.product_id === body.product_id;
      });
      const invoiceItem = this.invoiceForm.value.invoiceItems[invoiceItemIndex];
      invoiceItem.id = invoiceItemId;

      (<FormArray>this.invoiceForm.controls['invoiceItems'])
      .removeAt(invoiceItemIndex);

      (<FormArray>this.invoiceForm.controls['invoiceItems'])
        .insert(invoiceItemIndex, new FormControl(invoiceItem));
    });
  }

  private showAndHideAlert() {
    this.showAlert = true;
    setTimeout(() => {
      this.showAlert = false;
    }, 1000);
  }
}
