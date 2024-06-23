import { Component, OnInit } from '@angular/core';
import { ButtonComponent } from 'src/app/shared/components/button/button.component';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { Router, RouterLink } from '@angular/router';
import { User } from 'src/app/modules/user/interfaces/user.interface';
import { UserService } from 'src/app/modules/auth/services/user.service';
import { NgClass, NgFor } from '@angular/common';
import { EmergencyService } from '../../services/emergency.service';
import * as L from 'leaflet';

@Component({
  selector: 'app-create-user',
  standalone: true,
  imports: [ ButtonComponent, ReactiveFormsModule, FormsModule, AngularSvgIconModule, RouterLink, NgFor, NgClass ],  
  templateUrl: './create-emergency.component.html',
  styleUrl: './create-emergency.component.scss'
})
export class CreateEmergencyComponent implements OnInit {
  public users: User[] = [];
  form!: FormGroup;
  public map!: L.Map;
  public marker!: L.Marker;

  constructor(
    private readonly _formBuilder: FormBuilder,
    private userService: UserService,
    private emergencyService: EmergencyService,
    private readonly router: Router
  ){
    this.form = this._formBuilder.group({
      name: ['', [Validators.required]],
      location: ['', [Validators.required]],
      type: ['', [Validators.required]],
      date: ['', [Validators.required]],
      hour: ['', [Validators.required]],
      comandante: ['', [Validators.required]],
      coordinates: [[], [Validators.required]]
    });
  }
  
  ngOnInit(): void {
    this.getUsers();
    this.initMap();
  }

  private initMap(): void {
    const boliviaCoords: L.LatLngExpression = [-16.2902, -63.5887];
    this.map = L.map('map', {
      center: boliviaCoords,
      zoom: 6
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);

    this.marker = L.marker(boliviaCoords).addTo(this.map);

    this.map.on('click', (e: L.LeafletMouseEvent) => {
      const { lat, lng } = e.latlng;
      this.form.get('coordinates')?.setValue([lat, lng]);
      console.log(`Latitude: ${lat}, Longitude: ${lng}`);
      this.marker.setLatLng(e.latlng);
      console.log(this.form.value);
    });
  }

  getUsers(){
    this.userService.getAll().subscribe((resp:any) =>{
      this.users = resp.data;
    });
  }

  onSubmit(){
    const {name, location, type, date, hour, comandante, coordinates} = this.form.value;
    const emergency = this.emergencyService.create({ 
      name, location_description: location, type, date, state: "En curso", hour, duration:"", coordinates
    }).subscribe((resp: any) => {
      return resp.data;
    });
    console.log(emergency);
    this.router.navigate(['/sci/emergencies']);
  }
}
