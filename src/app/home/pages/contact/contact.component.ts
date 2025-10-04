import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  contactForm = {} as FormGroup;

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.contactForm = this.fb.group({
      name: ['', [
        Validators.required
      ]],
      email: ['', [
        Validators.required, Validators.email
      ]],
      subject: ['', [
        Validators.required
      ]],
      message: ['', [
        Validators.required
      ]]
    });
  }

  onSubmit(): void {
    console.log('Form Submitted', this.contactForm.value);
    this.toastr.success('Tin nhắn đã gửi thành công!');
    this.contactForm.reset();
  }
}
