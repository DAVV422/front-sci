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
    selector: 'app-edit-emergency',
    standalone: true,
    imports: [FormsModule, ReactiveFormsModule, RouterLink, AngularSvgIconModule, NgClass, 
        NgIf, ButtonComponent, NgFor],
    templateUrl: './edit-emergency.component.html'
})

export class EditEmergencyComponent implements OnInit {
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

    ngOnInit() { 
        this.activatedRoute.params
        .pipe(tap(({ id }) => { this.emergency_id = id })).subscribe();

        this.emergencyService.getById(this.emergency_id).subscribe(
            (resp: any) => {
                this.emergency = resp.data;
            }
        )

    }

    onSubmit(): void {
        console.log("actualiza");
    }

    private assignDefaultIfEmpty(value: string, defaultValue: string): string {
        return value === '' ? defaultValue : value;
      }
      

    update(){
        const { name, duration, location_description, date, hour, state } = this.form.value;
        const nameUpdated = this.assignDefaultIfEmpty(name, this.emergency.name); 
        const durationUpdated = this.assignDefaultIfEmpty(duration, this.emergency.duration); 
        const location_descriptionUpdated = this.assignDefaultIfEmpty(location_description, this.emergency.location_description!);         
        const hourUpdated = this.assignDefaultIfEmpty(hour, this.emergency.hour); 
        const stateUpdated = this.assignDefaultIfEmpty(state, this.emergency.state); 
        this.emergencyService.update({ id: this.emergency_id, name: nameUpdated, duration: durationUpdated, location_description: location_descriptionUpdated,
            hour: hourUpdated, state: stateUpdated
        }).subscribe(
            (resp) => {
                console.log(resp);
                this.router.navigate(['sci/emergencies/show', this.emergency_id]);
            }
        )
    }

}