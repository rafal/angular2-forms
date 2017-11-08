import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'reactive-form',
  templateUrl: './app/reactive/reactive-form.component.html'
})
export class ReactiveFormComponent implements OnInit {
  form: FormGroup;
  formErrors = {
    name: '',
    username: '',
    addresses: [
      { city: '', country: '' }
    ]
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
    },
    addresses: {
      city: {
        required: 'City is required',
        minLength: 'City mus be 3 chars'
      },
      country: {
        required: 'Country required'
      }
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
      username: ['', Validators.minLength(3)],
      addresses: this.fb.array([
        this.createAddress()
      ])
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

      this.validateAddresses();
  }

  validateAddresses(){
    // grab addresses formarray
    let addresses = <FormArray>this.form.get('addresses');

    //clear form errors
    this.formErrors.addresses = [];

    //loop through however many form groups are in the form array
    let n = 1;
    while (n <= addresses.length){

      // add clear errors back
      this.formErrors.addresses.push({city: '', country: ''});

      // grab specific group (address)
      let address = <FormGroup>addresses.at(n-1);

      // validate that specifc group
      for (let field in address.controls){
        //get the form control
        let input = address.get(field);

        // do the validation and save errors to formerrors if necessary
        if (input.invalid && input.dirty){
          for ( let error in input.errors){
            this.formErrors.addresses[n-1][field] = this.validationMessages.addresses[field][error];
          }
        }
      }
      n++;
    }
  }

  createAddress(){
    return this.fb.group({
      city: ['', Validators.minLength(3)],
      country: ['']
    });
  }

  addAddress(){
    let addresses = <FormArray>this.form.get('addresses');
    addresses.push(this.createAddress());
  }

  removeAddress(i){
    let addresses = <FormArray>this.form.get('addresses');
    addresses.removeAt(i);
  }

  processForm(){
    console.log('processing', this.form.value);
  }
}