import { NgClass, NgFor, NgIf } from '@angular/common';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { Attend, Emergency, Form201 } from '../../interfaces/emergency.interface';
import { tap } from 'rxjs';
import { EmergencyService } from '../../services/emergency.service';
import { AttendTableItemComponent } from '../../components/atten-table-item/attend-table-item.component';
import { EquipmentTable2ItemComponent } from '../../components/equipment-table2-item/equipment-table2-item.component';
import { Equipment, Resource } from '../../../equipment/interfaces/equipment.interface';
import { EquipmentService } from '../../../equipment/services/equipment.service';
import { ResourceTableComponent } from '../../components/resource-table/resource-table.component';
import * as L from 'leaflet';

@Component({
    selector: 'app-show-emergency',
    standalone: true,
    imports: [FormsModule, ReactiveFormsModule, RouterLink, AngularSvgIconModule, NgClass, 
        NgIf, ButtonComponent, NgFor, AttendTableItemComponent, ResourceTableComponent],
    templateUrl: './show-emergency.component.html'
})

export class ShowEmergencyComponent implements OnInit, AfterViewInit {
    form!: FormGroup;
    submitted = false;
    public disable: boolean = true;
    emergency_id: string = "";
    public emergency: Emergency = <Emergency>{};
    public attends: Attend[] = [];
    public equipments: Resource[] = [];
    private map!: L.Map;
    public coordinates: { lat: number, lng: number }[] = [];
    
    constructor(
        private readonly _formBuilder: FormBuilder,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private emergencyService: EmergencyService,
        private equipmentService: EquipmentService
    ) {
        this.form = this._formBuilder.group({
            name: ['', [Validators.required, Validators.email]],
            location_description: ['', [Validators.required]],
            date: ['', [Validators.required]],
            hour: ['', [Validators.required]],
            state: ['', [Validators.required]],
            duration: ['', [Validators.required]],
          });
     }

     ngAfterViewInit(): void {
        this.initMap();
      }

    ngOnInit() { 
        this.activatedRoute.params
        .pipe(tap(({ id }) => { this.emergency_id = id })).subscribe();

        this.emergencyService.getById(this.emergency_id).subscribe(
            (resp: any) => {
                this.emergency = resp.data;
                L.marker({ lat:this.emergency.coordinates![0], lng: this.emergency.coordinates![1]}).addTo(this.map);
                this.map.setView({ lat:this.emergency.coordinates![0], lng: this.emergency.coordinates![1]}, 13);
                try{
                    const markerIcon = L.divIcon({
                        className: 'custom-marker',
                        html: `<div style="background-color:black; width: 15px; height: 15px; border-radius: 50%;"></div>`
                      });
                    L.marker({ lat:this.emergency.coordinates_pc![0], lng: this.emergency.coordinates_pc![1]}, { icon: markerIcon}).addTo(this.map);
                    this.map.setView({ lat:this.emergency.coordinates_pc![0], lng: this.emergency.coordinates_pc![1]}, 13);
                } catch(error) {
                    console.log('No hay coordenadas de PC')
                }
                try{
                    const markerIcon = L.divIcon({
                        className: 'custom-marker',
                        html: `<div style="background-color:green; width: 15px; height: 15px; border-radius: 50%;"></div>`
                      });
                    L.marker({ lat:this.emergency.coordinates_e![0], lng: this.emergency.coordinates_e![1]}, { icon: markerIcon}).addTo(this.map);
                    this.map.setView({ lat:this.emergency.coordinates_e![0], lng: this.emergency.coordinates_e![1]}, 13);
                } catch(error) {
                    console.log('No hay coordenadas de E')
                }
            }
        )

        this.emergencyService.getAttends(this.emergency_id).subscribe(
            (resp: any) => {
                console.log(resp);
                this.attends = resp.data;
            }
        )

        this.equipmentService.getResource(this.emergency_id).subscribe(
            (resp: any) => {
                console.log(resp);
                this.equipments = resp.data;
            }
        )

    }

    onSubmit(): void {
        if (this.form.invalid) {
          this.form.markAllAsTouched();
          return;
        }
        this.disable = true;
    }

    update(id: string): void {
        this.router.navigate(['sci/emergencies/edit', id]);
    }

    forms(id : string): void {
        this.router.navigate(['sci/emergencies/forms', id]);
    }


    private initMap(): void {
        this.map = L.map('map').setView([0, 0], 2);
    
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(this.map);
    
        this.addMarkers();
      }

      private addMarkers(): void {
        if (this.coordinates) {
          this.coordinates.forEach(coord => {
            L.marker([coord.lat, coord.lng]).addTo(this.map);
          });
        }
      }
}