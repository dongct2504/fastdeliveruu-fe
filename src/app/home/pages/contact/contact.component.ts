import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  contactForm = {} as FormGroup;

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.contactForm = this.fb.group({
      lastName: ['', [Validators.required]],
      firstName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', [Validators.required]],
      message: ['', [Validators.required]]
    });
  }

  onSubmit(): void {
    if (this.contactForm.invalid) return;

    console.log('Form Submitted', this.contactForm.value);
    this.toastr.success('Message sent successfully!');
    this.contactForm.reset();
  }
}
