import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {
  checkoutForm = {} as FormGroup;

  constructor(
    private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.initCheckoutForm();
  }

  private initCheckoutForm() {
    this.checkoutForm = this.fb.group({
      infoForm: this.fb.group({
        firstName: ['', [Validators.required]],
        lastName: ['', [Validators.required]],
        phoneNumber: [{ value: '', disabled: true }, [Validators.required]],
        address: ['', [Validators.required]],
        wardId: ['', [Validators.required]],
        districtId: ['', [Validators.required]],
        cityId: ['', [Validators.required]]
      }),
      deliveryForm: this.fb.group({
        deliveryMethodId: ['', [Validators.required]]
      }),
      paymentForm: this.fb.group({
        paymentMethod: ['', [Validators.required]]
      })
    })
  }
}
