import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder,  Validators } from '@angular/forms';

@Component({
  selector: 'reactive-form',
  templateUrl: './app/reactive/reactive-form.component.html'
})
export class ReactiveFormComponent implements OnInit {
  form: FormGroup;
  formErrors = {
    name: '',
    username: ''
  };
  validationMessages = {
    name: {
      required: 'Name is required',
      minlength: 'Name must 3 at least 3 chars',
      maxlength: 'Name must be max 6 chars'
    },
    username: {
      required: 'Username is required',
      minlength: 'Username must be at least 3 chars'
    }
  };


  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.buildForm();
  }

  buildForm(){
    // this.form = new FormGroup({
    //   name: new FormControl(''),
    //   username: new FormControl('')
    // });
    this.form = this.fb.group({
      name: ['', [Validators.minLength(3), Validators.maxLength(6)]],
      username: ['', Validators.minLength(3)]
    });

    this.form.valueChanges.subscribe(data => this.validateForm());

  }

  validateForm(){
      // loop over formErrors field names
      for (let field in this.formErrors){
        // clear input field errors
        this.formErrors[field] = '';

        //grab input field by name
        let input = this.form.get(field);

        if (input.invalid && input.dirty) {
          // figure out the type of error
          // loop over the formErrros field names
          for (let error in input.errors){
            // assign that type of error message to a variable
            this.formErrors[field] = this.validationMessages[field][error];
          }
        }
      }

  }

  processForm(){
    console.log('processing', this.form.value);
  }
}