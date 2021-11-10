import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {ServerService} from './server.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  submitButton: boolean = true;   // submit button status

  constructor(
    private formBuilder: FormBuilder,
    private serverService: ServerService,
    private router: Router
  ) {

  }

  ngOnInit(): void {
  }

  /**
   * Form controls (inputs)
   */
  contactForm = this.formBuilder.group({
    contactName: ['', Validators.required],
    contactEmail: ['', Validators.compose([Validators.required, Validators.email])]
  });

  /**
   * Get Error Message according to Validation
   *
   * @returns String String to show beneath the Input Element
   * @returns Boolean True if validations pass
   */
  getErrorMessage = (): string | boolean => {
    if (this.contactForm.controls["contactName"].invalid) {                      // Name Validation Error
      return "Name is required !";
    } else if (this.contactForm.controls["contactEmail"].invalid) {        // Email Validation Error (Required)
      return "Email is required !";
    }
    return true;
  }

  /**
   * Submit form
   */
  onSubmit = (): void => {
    this.submitButton = true;     // disable submit button
    let validationResult = this.getErrorMessage();   // check validation and return result

    if (typeof validationResult === "string") {
      window.alert("There was an Error :\n" + validationResult);    // if validation Error
    }
    else {                     // if validation pass then build object and send it to server
      let user: User = {
        name: this.contactForm.value['contactName'],
        email: this.contactForm.value['contactEmail']
      }
      this.serverService.sendUser(user).subscribe(
        (result) => {
          this.contactForm.reset();    // set all fields to null
          this.submitButton = true;     // enable submit button
          this.router.navigateByUrl("result/" + result.name).then((state) => {
            if(!state){
              window.alert("There was an error in navigation. pls try again in a few moments.");  // if navigation fails
            }
          });
        }
      );
    }
  }

  /**
   * Disable / Enable submit button according to validations
   */
  checkSubmitButton = (): void => {
    let validationResult = this.getErrorMessage();   // check validation and return result

    if (typeof validationResult === "string") {
      this.submitButton = true;                  // if error
    } else {
      this.submitButton = false;                // if pass
    }
  }

}

/**
 * Interface for user details
 */
interface User {
  name: string;
  email: string;
}
