import { Component, OnInit } from '@angular/core';
import {Company} from "../model/company";
import { User } from '../model/user';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import { LoginService } from '../../services/login.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogBoxInvalidFormComponent } from '../dialog-box-invalid-form/dialog-box-invalid-form.component';
import {Router} from "@angular/router";
import { DigitalProfile } from '../model/digitalprofile';
@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {

  registered: boolean = false;
  TempComp: Company;
  pass:string = "";
  registerForm!: FormGroup;
  digitalProfile: DigitalProfile;

  constructor(private service: LoginService, private formBuilder: FormBuilder, public dialog: MatDialog, private router: Router) {
    
    this.TempComp = {} as Company;
    this.digitalProfile = {} as DigitalProfile;

    this.registerForm = this.formBuilder.group({
      first_name: new FormControl('', { validators:  [Validators.required], updateOn: 'change' }),
      last_name: new FormControl('', { validators:  [Validators.required], updateOn: 'change' }),
      phone:new FormControl('', { validators:  [Validators.required, Validators.minLength(9), Validators.maxLength(9), Validators.pattern('^[0-9]*$')], updateOn: 'change' }),
      email: new FormControl('', { validators:  [Validators.required, Validators.email], updateOn: 'change' }),
      password: new FormControl('', { validators:  [Validators.required, Validators.minLength(8), Validators.maxLength(16)], updateOn: 'change' }),
      password_confirm: new FormControl('', { validators: [Validators.required, Validators.minLength(8), Validators.maxLength(16)], updateOn: 'change' }),
      company_name: ["", Validators.required],
      ruc: ["", Validators.required],
      owner_name: ["", Validators.required],
      address: ["", Validators.required],
      country: ["", Validators.required],
      city: ["", Validators.required]
    },
    {
      validators: this.MustMatch( 'password', 'password_confirm')
    },
    );
  }

  ngOnInit(): void {
    this.setEmailValidation();
    this. setPhoneValidation();
    this.setPaswordValidation();
  }

  Add(){
    this.TempComp.address = this.registerForm.get('address')?.value;
    this.TempComp.bannerImage = 'https://blog.vantagecircle.com/content/images/size/w1000/2019/03/7-Ways-to-Build-a-Strong-Company-Culture.png';
    this.TempComp.city = this.registerForm.get('city')?.value;
    this.TempComp.country = this.registerForm.get('country')?.value;
    this.TempComp.description =  'I am a recruiter';
    this.TempComp.email =  this.registerForm.get('email')?.value;
    this.TempComp.firstName =  this.registerForm.get('first_name')?.value;
    this.TempComp.image = 'https://d500.epimg.net/cincodias/imagenes/2016/07/04/lifestyle/1467646262_522853_1467646344_noticia_normal.jpg';
    this.TempComp.lastName =  this.registerForm.get('last_name')?.value;
    this.TempComp.name=  this.registerForm.get('company_name')?.value;
    this.TempComp.owner =  this.registerForm.get('owner_name')?.value;
    this.TempComp.password =  this.registerForm.get('password')?.value;
    this.TempComp.phone =  this.registerForm.get('phone')?.value;
    this.TempComp.role =  'company';
    this.TempComp.ruc =  this.registerForm.get('ruc')?.value;
    this.service.postCompany(this.TempComp).subscribe((response:any) => {
      console.log(this.TempComp);
    });
  }

  openDialog() {
    if (this.registerForm.invalid) {
      if(this.registerForm.get('password')?.value !== this.registerForm.get('password_confirm')?.value) {
        this.dialog.open(DialogBoxInvalidFormComponent, { 
          data: {message: 'Please confirm the same password!'},
        });
      }
      else{
        this.dialog.open(DialogBoxInvalidFormComponent, { 
          data: {message: 'Please fill all the required fields!'},
        });
      }
    }
    else {
      this.verifyDeveloperUnregistered();
      if(!this.registered) {
        this.Add();
        this.dialog.open(DialogBoxInvalidFormComponent, { 
          data: {message: 'You have successfully registered!'},
        });
        this.router.navigate(['/login']);
      }
      else {
        this.dialog.open(DialogBoxInvalidFormComponent, { 
          data: {message: 'This email is already registered!'},
        });
      }
      
    }
  }

  get email() {
    return this.registerForm.get('email');
  }
  get password() {
    return this.registerForm.get('password');
  }

  get phone() {
    return this.registerForm.get('phone');
  }

  get first_name() {
    return this.registerForm.get('first_name');
  }

  get password_confirm() {
    return this.registerForm.get('password_confirm');
  }
  
  get last_name() {
    return this.registerForm.get('last_name');
  }

  get company_name() {
    return this.registerForm.get('company_name');
  }

  get ruc() {
    return this.registerForm.get('ruc');
  }

  get owner_name() {
    return this.registerForm.get('owner_name');
  }

  get address() {
    return this.registerForm.get('address');
  }

  get country() {
    return this.registerForm.get('country');
  }

  get city() {
    return this.registerForm.get('city');
  }
  

  setEmailValidation() {
    const emailControl = this.registerForm.get('email');
      //Default validation
    emailControl?.setValidators([Validators.required, Validators.email, Validators.pattern('[a-z0-9]+@[a-z]+\.[a-z]{2,3}')]);
    this.registerForm.get('email')?.valueChanges.subscribe(value => {
      if (value === 'admin@digitalmind.com') {
        this.registerForm.get('email')?.setValidators([Validators.required]);
      } else {
        this.registerForm.get('email')?.setValidators([Validators.required, Validators.email, Validators.pattern('[a-z0-9]+@[a-z]+\.[a-z]{2,3}')]);
      }
        this.registerForm.get('email')?.updateValueAndValidity();
    });
  }

  setPhoneValidation() {
    const phoneControl = this.registerForm.get('phone');
    phoneControl?.setValidators([Validators.required, Validators.pattern('^[0-9]*$'), Validators.minLength(9), Validators.maxLength(9)]);
    this.registerForm.get('phone')?.valueChanges.subscribe(value => {
      if (value.length < 9 || value.length > 9) {
        this.registerForm.get('phone')?.setValidators([Validators.required, Validators.minLength(9), Validators.maxLength(9)]);
      } else {
        this.registerForm.get('phone')?.setValidators([Validators.required, Validators.pattern('^[0-9]*$')]);
      }
        this.registerForm.get('phone')?.updateValueAndValidity();
    });
  }



  MustMatch( password: any, password_confirm: any) {
    return (formGroup: FormGroup) => {
      const passwordControl = formGroup.controls[password];
      const passwordConfirmControl = formGroup.controls[password_confirm];

      if (passwordConfirmControl.errors && !passwordConfirmControl.errors['mustMatch']) {
        return;
      }
      if (passwordControl.value !== passwordConfirmControl.value) {
        passwordConfirmControl.setErrors({ MustMatch: true });
      } else {
        passwordConfirmControl.setErrors(null);
      }
    };
  }
  
  setPaswordValidation() {
    const passwordControl = this.registerForm.get('password');

    this.registerForm.get('password')?.valueChanges.subscribe(value => {
      if (value.length < 8 || value.length > 16) {
        this.registerForm.get('password')?.setValidators([Validators.required, Validators.minLength(8), Validators.maxLength(16)]);
      } else {
        this.registerForm.get('password')?.setValidators([Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*]).{8,16}$')]);
      }
        this.registerForm.get('password')?.updateValueAndValidity();
    });
  }
  verifyDeveloperUnregistered() {
    this.registered = false;
    var req = new XMLHttpRequest();
    req.open('GET', `http://localhost:8080/api/v1/users/searchByEmail/${this.registerForm.get("email")?.value}`, false);
    req.send(null);
    if (req.status == 200) {
      var user = JSON.parse(req.responseText);
      if (user.email == this.registerForm.get('email')?.value) {
        this.registered = true;
      }
    }
    
  }
}
