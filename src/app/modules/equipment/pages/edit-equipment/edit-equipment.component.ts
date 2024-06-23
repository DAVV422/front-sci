import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { EquipmentService } from '../../services/equipment.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Equipment } from '../../interfaces/equipment.interface';
import { NgClass, NgFor } from '@angular/common';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { ButtonComponent } from 'src/app/shared/components/button/button.component';

@Component({
  selector: 'app-edit-equipment',
  standalone: true,
  imports: [ButtonComponent, ReactiveFormsModule, FormsModule, AngularSvgIconModule, RouterLink, NgFor, NgClass],
  templateUrl: './edit-equipment.component.html',
  styleUrl: './edit-equipment.component.scss'
})
export class EditEquipmentComponent implements OnInit {

  form!: FormGroup;
  statuses = ['Disponible', 'En uso', 'En mantenimiento', 'Dado de baja'];
  equipment!: Equipment;

  constructor(
    private readonly _formBuilder: FormBuilder,
    private equipmentService: EquipmentService,
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) {
    this.form = this._formBuilder.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      utilization: ['', [Validators.required]],
      acquisitionDate: ['', [Validators.required]],
      stateAcquisition: ['', [Validators.required]],
      stateActual: ['', [Validators.required]],
      urlPhoto: ['', [Validators.required]]
    });
    this.route.params.subscribe(({ id }) => {
      this.getEquipment(id);
    });
  }


  getEquipment(id: string) {
    this.equipmentService.getById(id).subscribe((resp: any) => {
      this.equipment = resp.data;
      this.form.setValue({
        name: this.equipment.name,
        description: this.equipment.description,
        utilization: this.equipment.utilization,
        acquisitionDate: this.equipment.acquisitionDate,
        stateAcquisition: this.equipment.stateAcquisition,
        stateActual: this.equipment.stateActual,
        urlPhoto: this.equipment.urlPhoto
      });
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.equipmentService.update(this.equipment.id, {
      acquisitionDate: this.form.value.acquisitionDate,
      description: this.form.value.description,
      name: this.form.value.name,
      stateAcquisition: this.form.value.stateAcquisition,
      stateActual: this.form.value.stateActual,
      utilization: this.form.value.utilization,
      urlPhoto: this.form.value.urlPhoto
    }).subscribe((resp: any) => {
      this.router.navigate(['sci/equipments/list']);
    });
  }
}
