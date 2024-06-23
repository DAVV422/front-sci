import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Emergency, Form201 } from '../../interfaces/emergency.interface';

@Component({
    selector: 'app-show-forms-emergency',
    standalone: true,
    imports: [],
    templateUrl: 'show-forms-emergency.component.html'
})

export class ShowFormsEmergencyComponent implements OnInit {
    form!: FormGroup;
    submitted = false;
    public disabled: boolean = true;
    emergency_id: string = "";
    public emergency: Emergency = <Emergency>{};
    public form201: Form201 = <Form201>{};

    constructor() { }

    ngOnInit() { }
}