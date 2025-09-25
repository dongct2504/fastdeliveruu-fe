import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-checkout-navigate',
  templateUrl: './checkout-navigate.component.html',
  styleUrls: ['./checkout-navigate.component.css']
})
export class CheckoutNavigateComponent {
  @Input() checkoutForm?: FormGroup;
  @Input() formName = '';

  @Input() leftText = '';
  @Input() rightText = '';

  faAngleLeft = faAngleLeft;
  faAngleRight = faAngleRight;
}
