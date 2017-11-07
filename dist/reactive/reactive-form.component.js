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
    }
    ReactiveFormComponent.prototype.ngOnInit = function () {
        var _this = this;
        // this.form = new FormGroup({
        //   name: new FormControl(''),
        //   username: new FormControl('')
        // });
        this.form = this.fb.group({
            name: ['', [forms_1.Validators.minLength(3), forms_1.Validators.maxLength(6)]],
            username: ['', forms_1.Validators.minLength(3)]
        });
        this.form.valueChanges.subscribe(function (data) {
            console.log(data);
            _this.nameError = '';
            _this.usernameError = '';
            var name = _this.form.get('name');
            var username = _this.form.get('username');
            if (name.invalid && name.dirty) {
                if (name.errors['required']) {
                    _this.nameError = 'Name is required';
                }
                if (name.errors['minlength']) {
                    _this.nameError = 'Name must be at least 3 characters.';
                }
                if (name.errors['maxlength']) {
                    _this.nameError = 'Name must be max 6 characters.';
                }
            }
            if (username.invalid && username.dirty) {
                if (username.errors['required']) {
                    _this.usernameError = 'Username is required';
                }
                if (username.errors['minlength']) {
                    _this.usernameError = 'Username must be at least 3 characters.';
                }
            }
        });
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