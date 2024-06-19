import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs';
import { AuthenticateService } from 'src/app/authenticate/authenticate.service';
import { UpdateUserRequest } from 'src/app/shared/models/authenticate/updateUserRequest';
import { UsersService } from 'src/app/users/users.service';

@Component({
  selector: 'app-checkout-info',
  templateUrl: './checkout-info.component.html',
  styleUrls: ['./checkout-info.component.css']
})
export class CheckoutInfoComponent {
  @Input() checkoutForm?: FormGroup;

  constructor(
    private authenticateService: AuthenticateService,
    private usersService: UsersService,
    private toastr: ToastrService) {
  }

  saveUserInformation() {
    this.authenticateService.currentUser$.pipe(take(1)).subscribe(appUser => {
      if (this.checkoutForm && appUser) {
        const infoFormValues = this.checkoutForm.get('infoForm')?.value;

        const updateUserRequest: UpdateUserRequest = {
          id: appUser.id,
          ...infoFormValues
        }

        this.usersService.updateUser(appUser.id, updateUserRequest).subscribe(() => {
          this.toastr.success('Đã lưu thành công!');
        });
      }
    });
  }
}
