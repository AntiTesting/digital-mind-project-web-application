import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  NgForm,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Developer } from '../model/developer';
import { User } from '../model/user';
import { DigitalProfile } from '../model/digitalprofile';
import { LoginService } from '../../services/login.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogBoxInvalidFormComponent } from '../dialog-box-invalid-form/dialog-box-invalid-form.component';
import { Router } from '@angular/router';
import { Language } from '../model/language';
import { Database } from '../model/database';
import { Framework } from '../model/framework';


@Component({
  selector: 'app-developer',
  templateUrl: './developer.component.html',
  styleUrls: ['./developer.component.css'],
})
export class DeveloperComponent implements OnInit {

  mismatch: boolean = false;
  registered: boolean = false;
  TempDev: Developer;
  userDev: any;
  pass: string = '';
  registerForm!: FormGroup;

  language: Language;
  database: Database;
  frameWork: Framework;

  languagesList: Array<string> = [
    'JavaScript',
    'Python',
    'Java',
    'C#',
    'C++',
    'TypeScript',
    'Shell',
    'C',
    'Ruby',
  ];
  databasesList: Array<string> = [
    'MySQL',
    'Oracle',
    'PostgreSQL',
    'Microsoft SQL Server',
    'MongoDB',
  ];
  frameworksList: Array<string> = [
    'Angular',
    'ASP.NET Core',
    'Django',
    'React',
    'Vue.js',
  ];
  digitalProfile: DigitalProfile;

  constructor(private service: LoginService, private formBuilder: FormBuilder, public dialog: MatDialog, private router: Router) {
    this.digitalProfile = {} as DigitalProfile;
    this.language = {} as  Language;
    this.database = {} as Database;
    this.frameWork = {} as Framework;
    this.userDev = {} as any;
    this.TempDev = {} as Developer;
    this.registerForm = this.formBuilder.group({
      first_name: new FormControl('', { validators:  [Validators.required], updateOn: 'change' }),
      last_name: new FormControl('', { validators:  [Validators.required], updateOn: 'change' }),
      phone:new FormControl('', { validators:  [Validators.required, Validators.minLength(9), Validators.maxLength(9), Validators.pattern('^[0-9]*$')], updateOn: 'change' }),
      email: new FormControl('', { validators:  [Validators.required, Validators.email, Validators.pattern('[a-z0-9]+@[a-z]+\.[a-z]{2,3}')], updateOn: 'change' }),
      password: new FormControl('', { validators:  [Validators.required, Validators.minLength(8), Validators.maxLength(16)], updateOn: 'change' }),
      password_confirm: new FormControl('', { validators: [Validators.required, Validators.minLength(8), Validators.maxLength(16)], updateOn: 'change' }),
      languages: [''],
      databases: [''],
      frameworks: [''],
    },
    {
      validators: this.MustMatch( 'password', 'password_confirm')
    },
    );
  }

  ngOnInit(): void {
    this.setEmailValidation();
    this.setPhoneValidation();
    this.setPaswordValidation();
    
  }

  getLanguages(){
    return this.registerForm.get('languages')?.value;
  }
  getDatabases(){
    return this.registerForm.get('databases')?.value;
  }

  getFrameworks(){
    return this.registerForm.get('frameworks')?.value;
  }


  AddProgrammingLanguages(){
    for (let i = 0; i < this.registerForm.get('languages')?.value.length; i++) {
      this.language.name = this.registerForm.get('languages')?.value.at(i);
      this.language.description = "I am expert with programming language " + this.registerForm.get('languages')?.value.at(i);
      if(this.language.name === 'JavaScript'){
        this.language.iconLink = "https://upload.wikimedia.org/wikipedia/commons/9/99/Unofficial_JavaScript_logo_2.svg";
      }
      else if(this.language.name === 'Python'){
        this.language.iconLink = "https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg";
      }
      else if (this.language.name === 'Java'){
        this.language.iconLink = "https://icon-library.com/images/java-icon-png/java-icon-png-15.jpg";
      }
      else if (this.language.name === "C#"){
        this.language.iconLink = "https://upload.wikimedia.org/wikipedia/commons/0/0d/C_Sharp_wordmark.svg";
      }
      else if (this.language.name === 'C++'){
        this.language.iconLink = "https://upload.wikimedia.org/wikipedia/commons/1/18/ISO_C%2B%2B_Logo.svg";
      }
      else if (this.language.name === 'TypeScript'){
        this.language.iconLink = "https://upload.wikimedia.org/wikipedia/commons/4/4c/Typescript_logo_2020.svg";
      }
      else if (this.language.name === 'Shell'){
        this.language.iconLink = "https://upload.wikimedia.org/wikipedia/commons/4/4b/Bash_Logo_Colored.svg";
      }
      else if (this.language.name === 'C'){
        this.language.iconLink = "https://upload.wikimedia.org/wikipedia/commons/3/35/The_C_Programming_Language_logo.svg";
      }
      else {
        this.language.iconLink = "https://e7.pngegg.com/pngimages/383/488/png-clipart-ruby-on-rails-programming-language-computer-programming-logo-ruby-ruby-scripting-language-thumbnail.png";
      }
      this.service.postLenguage(this.language, this.digitalProfile.id).subscribe((response2:any) => {
        console.log(response2);
      });
    }
  }

  AddDatabases(){
    for (let i = 0; i < this.registerForm.get('databases')?.value.length; i++){
      this.database.name = this.registerForm.get('databases')?.value[i];
      this.database.description = "I am expert with database" + this.registerForm.get('databases')?.value[i];
      if(this.database.name === 'MySQL'){
        this.database.iconLink = "https://pngimg.com/uploads/mysql/mysql_PNG22.png";
      }
      else if(this.database.name === 'Oracle'){
        this.database.iconLink = "https://www.iconshock.com/image/Stroke/Database/oracle/";
      }
      else if (this.database.name === 'PostgreSQL'){
        this.database.iconLink = "https://upload.wikimedia.org/wikipedia/commons/2/29/Postgresql_elephant.svg";
      }
      else if (this.database.name === 'Microsoft SQL Server'){
        this.database.iconLink = "https://i.pinimg.com/originals/ae/09/c5/ae09c54080a6ae50d58459ea3193835c.png";
      }
      else {
        this.database.iconLink = "https://logodix.com/logo/2090013.jpg";
      }
      this.service.postDatabase(this.database, this.digitalProfile.id).subscribe((response:any) => {
        console.log(response);
      });    
    }
  }

  AddFrameworks(){
    for(let i= 0; i < this.registerForm.get('frameworks')?.value.length; i++){
      this.frameWork.name = this.registerForm.get('frameworks')?.value[i];
      this.frameWork.description = "I am expert with framework " + this.registerForm.get('frameworks')?.value[i];
      if(this.frameWork.name === 'Angular'){
        this.frameWork.iconLink = "https://upload.wikimedia.org/wikipedia/commons/c/ca/AngularJS_logo.svg";
      }
      else if(this.frameWork.name === 'ASP.NET Core'){
        this.frameWork.iconLink = "https://ih0.redbubble.net/image.366684650.5673/flat,750x,075,f-pad,750x1000,f8f8f8.u1.jpg";
      }
      else if (this.frameWork.name === 'Django'){
        this.frameWork.iconLink = "https://th.bing.com/th/id/OIP.XltbHSe7XNacUtF12tymrgHaCl?pid=ImgDet&rs=1";
      }
      else if(this.frameWork.name === 'React'){
        this.frameWork.iconLink = "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg";
      }
      else if (this.frameWork.name === 'Vue.js'){
        this.frameWork.iconLink = "https://upload.wikimedia.org/wikipedia/commons/9/95/Vue.js_Logo_2.svg";
      }
      this.service.postFramework(this.frameWork, this.digitalProfile.id).subscribe((response:any) => {
        console.log(response);
      });
    }

    
  }

  AddInfoToProfile() {
    if(this.registerForm.get('languages')?.value.length > 0)
        this.AddProgrammingLanguages();
      
      if(this.registerForm.get('databases')?.value.length > 0)
        this.AddDatabases();
      
      if(this.registerForm.get('frameworks')?.value.length > 0)
        this.AddFrameworks();
  }

  GetDigitalProfile() {
    this.service.getDigitalProfileByDeveloperId(this.userDev.id).subscribe((response:any) => {
      this.digitalProfile = response;  
      console.log("Digital Profile Into Languages: " + JSON.stringify(this.digitalProfile));
    });
    var req = new XMLHttpRequest();
    req.open('GET', `http://localhost:8080/api/v1/digital_profiles//developer/${this.userDev.id}`, false);
    req.send(null);
    console.log('Get Digital Profile response');
    console.log(req.responseText);
    if (req.status == 200) {
      this.digitalProfile = JSON.parse(req.responseText);
      console.log('Digital Profile: ' + JSON.stringify(this.digitalProfile));
      this.AddInfoToProfile();
    }
  }

  AddDigitalProfile() {
    var req = new XMLHttpRequest();
    req.open('GET', `http://localhost:8080/api/v1/users/searchByEmail/${this.registerForm.get("email")?.value}`, false);
    req.send(null);
    console.log('Get User response');
    console.log(req.responseText);
    if (req.status == 200) {
      this.userDev = JSON.parse(req.responseText);
      console.log('User assigned to userDev');
      console.log(this.userDev);
      this.digitalProfile.name = "Digital Profile " + this.registerForm.get("first_name")?.value;
      var req2 = new XMLHttpRequest();
      req2.open('POST', `http://localhost:8080/api/v1/digital_profiles/${this.userDev.id}`, false);
      req2.setRequestHeader('Content-Type', 'application/json');
      req2.send(JSON.stringify(this.digitalProfile));
      console.log('Post Digital Profile');
      console.log(req2.responseText);
      if (req2.status == 201) {
        this.GetDigitalProfile();
      }
    }

  
  }

  AddDeveloper() {
    this.TempDev.firstName =  this.registerForm.get('first_name')?.value;
    this.TempDev.lastName =  this.registerForm.get('last_name')?.value;
    this.TempDev.phone =  this.registerForm.get('phone')?.value;
    this.TempDev.email =  this.registerForm.get('email')?.value;
    this.TempDev.password =  this.registerForm.get('password')?.value;
    this.TempDev.description =  'I am a developer';
    this.TempDev.role =  'developer';
    this.TempDev.image = 'https://d500.epimg.net/cincodias/imagenes/2016/07/04/lifestyle/1467646262_522853_1467646344_noticia_normal.jpg';
    this.TempDev.bannerImage = 'https://thumbs.dreamstime.com/b/internet-information-technology-businessman-hand-showing-concept-75784736.jpg';

    var req = new XMLHttpRequest();
    req.open('POST', 'http://localhost:8080/api/v1/developers', false);
    req.setRequestHeader('Content-Type', 'application/json');
    req.send(JSON.stringify(this.TempDev));
    console.log('Post Developer');
    console.log(req.responseText);
    if (req.status == 201) {
      this.AddDigitalProfile();
    }
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
        this.AddDeveloper();
        this.dialog.open(DialogBoxInvalidFormComponent, { 
          data: {message: 'You have registered successfully! You will be redirect to login page to Log In'}
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

  //Properties
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