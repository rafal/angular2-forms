import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder,  Validators } from '@angular/forms';

@Component({
  selector: 'reactive-form',
  templateUrl: './app/reactive/reactive-form.component.html'
})
export class ReactiveFormComponent implements OnInit {
  form: FormGroup;


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

    console.log(this.form); 
  }

  processForm(){
    console.log('processing', this.form.value);
  }
}