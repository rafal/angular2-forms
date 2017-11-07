import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder,  Validators } from '@angular/forms';

@Component({
  selector: 'reactive-form',
  templateUrl: './app/reactive/reactive-form.component.html'
})
export class ReactiveFormComponent implements OnInit {
  form: FormGroup;
  nameError: string;
  usernameError: string;


  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    // this.form = new FormGroup({
    //   name: new FormControl(''),
    //   username: new FormControl('')
    // });
    this.form = this.fb.group({
      name: [''],
      username: ['']
    });

    this.form.valueChanges.subscribe(data =>{
      console.log(data);

      let name = this.form.get('name');
      let username = this.form.get('username');

      if (name.invalid && name.dirty){
        this.nameError = 'Name is required';
      }

      if (username.invalid && username.dirty){
        this.usernameError = 'Username is required';
      }  
    });
  }

  processForm(){
    console.log('processing', this.form.value);
  }
}