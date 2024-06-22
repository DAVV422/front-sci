import { Component, OnInit } from '@angular/core';
import { ButtonComponent } from 'src/app/shared/components/button/button.component';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { Router, RouterLink } from '@angular/router';
import { User } from 'src/app/modules/user/interfaces/user.interface';
import { UserService } from 'src/app/modules/auth/services/user.service';
import { NgClass, NgFor } from '@angular/common';
import { EmergencyService } from '../../services/emergency.service';

@Component({
  selector: 'app-create-user',
  standalone: true,
  imports: [ ButtonComponent, ReactiveFormsModule, FormsModule, AngularSvgIconModule, RouterLink, NgFor, NgClass ],  
  templateUrl: './create-emergency.component.html',
  styleUrl: './create-emergency.component.scss'
})
export class CreateEmergencyComponent implements OnInit{
  public users: User[] = [];
  form!: FormGroup;

  constructor(
    private readonly _formBuilder: FormBuilder,
    private userService: UserService,
    private emergencyService: EmergencyService,
    private readonly router: Router
  ){
    this.getUsers();
    this.form = this._formBuilder.group({
      name: ['', [Validators.required]],
      location: ['', [Validators.required]],
      type: ['', [Validators.required]],
      date: ['', [Validators.required]],
      hour: ['', [Validators.required]],
      comandante: ['', [Validators.required]]
    });
  }
  
  ngOnInit(): void {    
  }

  getUsers(){
    this.userService.getAll().subscribe((resp:any) =>{
      this.users = resp.data;
    });
  }

  onSubmit(){
    const {name, location, type, date, hour, comandante} = this.form.value;
    const emergency = this.emergencyService.create({ 
      name, locationDescription: location, type, date, state: "En curso", hour, duration:""
    }).subscribe((resp: any) => {
      return resp.data;
    });
    console.log(emergency);
    this.router.navigate(['/sci/emergencies']);
  }
}
