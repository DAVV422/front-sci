import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { ButtonComponent } from 'src/app/shared/components/button/button.component';
import { Attend, Emergency, Form201 } from '../../interfaces/emergency.interface';
import { tap } from 'rxjs';
import { EmergencyService } from '../../services/emergency.service';
import { AttendTableItemComponent } from '../../components/atten-table-item/attend-table-item.component';

@Component({
    selector: 'app-show-emergency',
    standalone: true,
    imports: [FormsModule, ReactiveFormsModule, RouterLink, AngularSvgIconModule, NgClass, NgIf, ButtonComponent, NgFor, AttendTableItemComponent],
    templateUrl: 'show-emergency.component.html'
})

export class ShowEmergencyComponent implements OnInit {
    form!: FormGroup;
    submitted = false;
    public disabled: boolean = true;
    emergency_id: string = "";
    public emergency: Emergency = <Emergency>{};
    public attends: Attend[] = [];
    
    constructor(
        private readonly _formBuilder: FormBuilder,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private emergencyService: EmergencyService
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

        this.emergencyService.getAttends(this.emergency_id).subscribe(
            (resp: any) => {
                console.log(resp);
                this.attends = resp.data;
            }
        )
    }

    onSubmit(): void {
        if (this.form.invalid) {
          this.form.markAllAsTouched();
          return;
        }
        this.disabled = true;
        const { email, password, name, lastName, cellphone, birthdate, grade } = this.form.value;     
    }

    forms(id : string): void {
        this.router.navigate(['sci/emergencies/forms', id]);
    }
}