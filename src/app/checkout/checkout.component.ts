import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from '../users/users.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {
  checkoutForm = {} as FormGroup;

  constructor(
    private fb: FormBuilder,
    private usersService: UsersService) {
  }

  ngOnInit(): void {
    this.initCheckoutForm();
    this.getInfoFormValues();
  }

  private initCheckoutForm() {
    this.checkoutForm = this.fb.group({
      infoForm: this.fb.group({
        firstName: ['', [Validators.required]],
        lastName: ['', [Validators.required]],
        phoneNumber: ['', [Validators.required]],
        address: ['', [Validators.required]],
        ward: ['', [Validators.required]],
        district: ['', [Validators.required]],
        city: ['', [Validators.required]]
      }),
      deliveryForm: this.fb.group({
        deliveryMethodId: ['', [Validators.required]]
      }),
      paymentForm: this.fb.group({
        paymentMethod: ['', [Validators.required]]
      })
    })
  }

  private getInfoFormValues() {
    this.usersService.getCurrentUser().subscribe(userDetail => {
      this.checkoutForm.get('infoForm')?.patchValue(userDetail);
    });
  }
}
