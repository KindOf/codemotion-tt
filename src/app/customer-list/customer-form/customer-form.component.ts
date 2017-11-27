import { Component, ViewChild, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Response } from '@angular/http';
import { Router } from '@angular/router';

import { CustomerService } from '../../customer.service';

@Component({
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.css'],
  selector: 'app-customer-form'
})
export class CustomerFormComponent implements OnInit {
  @ViewChild('f') form: NgForm;
  isEditing = false;

  constructor(
    private customerService: CustomerService,
    private router: Router
  ) {
  }

  ngOnInit() {
    if (this.customerService.customerToEdit) {
      this.isEditing = true;
      const customer = {
        name: this.customerService.customerToEdit.name,
        address: this.customerService.customerToEdit.address,
        phone: this.customerService.customerToEdit.phone
      };
      setTimeout(() => {
        this.form.form.setValue(customer);
      }, 1);
    }
  }

  private updateCustomer(): Promise<Response> {
    this.router.navigate(['/customers']);
    return this.customerService.updateCustomer(
      this.customerService.customerToEdit.id,
      this.form.value
    );
  }

  private createCustomer(): Promise<any> {
    return this.customerService.createCustomer(this.form.value);
  }

  onSubmit() {
    const req = this.isEditing ? this.updateCustomer() : this.createCustomer();
    req.catch(err => {
        console.log('Error:', err);
      });
    this.customerService.customerToEdit = null;
  }
}
