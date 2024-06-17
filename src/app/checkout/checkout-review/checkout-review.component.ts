import { Component, Input, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { CustomerCartService } from 'src/app/customer-cart/customer-cart.service';
import { ShoppingCartDto } from 'src/app/shared/models/shoppingCarts/shoppingCartDto';
import { CheckoutService } from '../checkout.service';
import { ToastrService } from 'ngx-toastr';
import { FormGroup } from '@angular/forms';
import { CreateOrderRequest } from 'src/app/shared/models/orders/createOrderRequest';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-checkout-review',
  templateUrl: './checkout-review.component.html',
  styleUrls: ['./checkout-review.component.css']
})
export class CheckoutReviewComponent implements OnInit {
  @Input() checkoutForm?: FormGroup;

  faAngleLeft = faAngleLeft;
  faAngleRight = faAngleRight;

  customerCart?: ShoppingCartDto[];

  constructor(
    private customerCartService: CustomerCartService,
    private router: Router,
    private checkoutService: CheckoutService,
    private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.getCustomerCart();
  }

  getCustomerCart() {
    this.customerCartService.getCustomerCart().subscribe(customerCart => {
      this.customerCart = customerCart;
    });
  }

  submitOrder() {
    if (!this.customerCart || this.customerCart.length === 0) {
      this.toastr.error('Không có sản phẩm nào!');
      return;
    }

    if (!this.checkoutForm || this.checkoutForm.invalid) {
      this.toastr.error('Vui lòng chọn hoặc điền vào hết các ô trống!');
      return;
    }

    const infoFormValues = this.checkoutForm.get('infoForm')?.value;
    const deliveryFormValues = this.checkoutForm.get('deliveryForm')?.value;
    const paymentFormValues = this.checkoutForm.get('paymentForm')?.value;

    if (infoFormValues && deliveryFormValues && paymentFormValues) {
      const createOrderRequest: CreateOrderRequest = {
        ...infoFormValues,
        ...deliveryFormValues,
        ...paymentFormValues
      };

      switch (createOrderRequest.paymentMethod) {
        case 'cash':
          this.submitCashOrder(createOrderRequest);
          break;
        case 'vnpay':
          this.submitVnpayOrder(createOrderRequest);
          break;
      }
    }
  }

  private submitCashOrder(createOrderRequest: CreateOrderRequest) {
    this.checkoutService.createCheckoutCashOrder(createOrderRequest).subscribe(paymentResponse => {
      const navigationExtras: NavigationExtras = { queryParams: paymentResponse }
      this.customerCartService.removeTotalQuantity();
      if (paymentResponse.isSuccess) {
        this.router.navigate(['/checkout/success'], navigationExtras);
      } else {
        this.router.navigate(['/checkout/failed'], navigationExtras);
      }
    });
  }

  private submitVnpayOrder(createOrderRequest: CreateOrderRequest) {
    this.checkoutService.createCheckoutVnpayOrder(createOrderRequest).subscribe(vnpayUrl => {
      if (vnpayUrl) {
        this.customerCartService.removeTotalQuantity();
        window.location.href = vnpayUrl;
      }
    });
  }
}
