import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Emergency, Form201 } from '../../interfaces/emergency.interface';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { EmergencyService } from '../../services/emergency.service';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { ButtonComponent } from 'src/app/shared/components/button/button.component';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { tap } from 'rxjs';
import { Form201Service } from '../../services/form201.service';

@Component({
    selector: 'app-show-forms-emergency',
    standalone: true,
    imports: [FormsModule, ReactiveFormsModule, RouterLink, AngularSvgIconModule, NgClass, NgIf, ButtonComponent, NgFor],
    templateUrl: 'show-forms-emergency.component.html'
})

export class ShowFormsEmergencyComponent implements OnInit {
    form!: FormGroup;
    submitted = false;
    public disabled: boolean = true;
    emergency_id: string = "";
    public emergency: Emergency = <Emergency>{};
    public forms201: Form201 [] = [];

    constructor(
        private readonly _formBuilder: FormBuilder,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private emergencyService: EmergencyService,
        private form201Service: Form201Service
    ) { 
        
    }

    ngOnInit() { 
        this.activatedRoute.params
        .pipe(tap(({ id }) => { this.emergency_id = id })).subscribe();

        this.emergencyService.getById(this.emergency_id).subscribe(
            (resp: any) => {
                this.emergency = resp.data;
                console.log(this.emergency);
                this.form201Service.getByEmergency(this.emergency.id!).subscribe((response: any) => {
                    this.forms201 = response.data;
                    console.log(this.forms201);
                })
            }
        )
    }

    onSubmit(): void {

    }
}