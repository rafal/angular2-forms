"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var ReactiveFormComponent = (function () {
    function ReactiveFormComponent(fb) {
        this.fb = fb;
        this.formErrors = {
            name: '',
            username: '',
            addresses: [
                { city: '', country: '' }
            ]
        };
        this.validationMessages = {
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
    }
    ReactiveFormComponent.prototype.ngOnInit = function () {
        this.buildForm();
    };
    ReactiveFormComponent.prototype.buildForm = function () {
        var _this = this;
        // this.form = new FormGroup({
        //   name: new FormControl(''),
        //   username: new FormControl('')
        // });
        this.form = this.fb.group({
            name: ['', [forms_1.Validators.minLength(3), forms_1.Validators.maxLength(6)]],
            username: ['', forms_1.Validators.minLength(3)],
            addresses: this.fb.array([
                this.createAddress()
            ])
        });
        this.form.valueChanges.subscribe(function (data) { return _this.validateForm(); });
    };
    ReactiveFormComponent.prototype.validateForm = function () {
        // loop over formErrors field names
        for (var field in this.formErrors) {
            // clear input field errors
            this.formErrors[field] = '';
            //grab input field by name
            var input = this.form.get(field);
            if (input.invalid && input.dirty) {
                // figure out the type of error
                // loop over the formErrros field names  
                for (var error in input.errors) {
                    // assign that type of error message to a variable
                    this.formErrors[field] = this.validationMessages[field][error];
                }
            }
        }
        this.validateAddresses();
    };
    ReactiveFormComponent.prototype.validateAddresses = function () {
        // grab addresses formarray
        var addresses = this.form.get('addresses');
        //clear form errors
        this.formErrors.addresses = [];
        //loop through however many form groups are in the form array
        var n = 1;
        while (n <= addresses.length) {
            // add clear errors back
            this.formErrors.addresses.push({ city: '', country: '' });
            // grab specific group (address)
            var address = addresses.at(n - 1);
            // validate that specifc group
            for (var field in address.controls) {
                //get the form control
                var input = address.get(field);
                // do the validation and save errors to formerrors if necessary
                if (input.invalid && input.dirty) {
                    for (var error in input.errors) {
                        this.formErrors.addresses[n - 1][field] = this.validationMessages.addresses[field][error];
                    }
                }
            }
            n++;
        }
    };
    ReactiveFormComponent.prototype.createAddress = function () {
        return this.fb.group({
            city: ['', forms_1.Validators.minLength(3)],
            country: ['']
        });
    };
    ReactiveFormComponent.prototype.addAddress = function () {
        var addresses = this.form.get('addresses');
        addresses.push(this.createAddress());
    };
    ReactiveFormComponent.prototype.removeAddress = function (i) {
        var addresses = this.form.get('addresses');
        addresses.removeAt(i);
    };
    ReactiveFormComponent.prototype.processForm = function () {
        console.log('processing', this.form.value);
    };
    return ReactiveFormComponent;
}());
ReactiveFormComponent = __decorate([
    core_1.Component({
        selector: 'reactive-form',
        templateUrl: './app/reactive/reactive-form.component.html'
    }),
    __metadata("design:paramtypes", [forms_1.FormBuilder])
], ReactiveFormComponent);
exports.ReactiveFormComponent = ReactiveFormComponent;
//# sourceMappingURL=reactive-form.component.js.map