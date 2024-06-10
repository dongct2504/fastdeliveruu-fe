import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-test-errors',
  templateUrl: './test-errors.component.html',
  styleUrls: ['./test-errors.component.css']
})
export class TestErrorsComponent implements OnInit {
  apiUrl = environment.apiUrl;

  validationErrors: any;

  constructor(private httpClient: HttpClient) {
  }

  ngOnInit(): void {
  }

  get404NotFound() {
    this.httpClient.get(`${this.apiUrl}/errors/not-found`).subscribe(response => {
      console.log(response);
    });
  }

  get400BadRequest() {
    this.httpClient.get(`${this.apiUrl}/errors/bad-request`).subscribe(response => {
      console.log(response);
    });
  }

  get409Conflict() {
    this.httpClient.get(`${this.apiUrl}/errors/conflict`).subscribe(response => {
      console.log(response);
    });
  }

  get400ValidationErrors() {
    this.httpClient.get(`${this.apiUrl}/errors/validation-error`).subscribe(response => {
      console.log(response);
    }, err => {
      console.log(err);
      this.validationErrors = err;
    });
  }

  get500InternalServerError() {
    this.httpClient.get(`${this.apiUrl}/errors/internal-server-error`).subscribe(response => {
      console.log(response);
    });
  }
}
