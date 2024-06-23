import { NgClass, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { ButtonComponent } from 'src/app/shared/components/button/button.component';
import { EquipmentService } from '../../services/equipment.service';

@Component({
  selector: 'app-create-equipment',
  standalone: true,
  imports: [ButtonComponent, ReactiveFormsModule, FormsModule, AngularSvgIconModule, RouterLink, NgFor, NgClass],
  templateUrl: './create-equipment.component.html',
  styleUrl: './create-equipment.component.scss'
})
export class CreateEquipmentComponent implements OnInit {
  form!: FormGroup;
  statuses = ['Nuevo', 'Buen estado', 'Desgastado', 'Mal estado'];
  selectedFile: File | null = null;
  url_image: string = "";

  constructor(
    private readonly _formBuilder: FormBuilder,
    private equipmentService: EquipmentService,
    private readonly router: Router
  ) {
    this.form = this._formBuilder.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      utilization: ['', [Validators.required]],
      acquisitionDate: ['', [Validators.required]],
      stateAcquisition: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      const renamedFile = new File([file], 'perfil' + file.name.substring(file.name.lastIndexOf('.')), { type: file.type });
      this.selectedFile = renamedFile;
      this.form.patchValue({
        profileImage: renamedFile
      });
      console.log(renamedFile);
    }
  }


  onSubmit() {
    this.equipmentService.create({
      acquisitionDate: this.form.value.acquisitionDate,
      description: this.form.value.description,
      name: this.form.value.name,
      stateAcquisition: this.form.value.stateAcquisition,
      stateActual: this.form.value.stateAcquisition,
      utilization: this.form.value.utilization,
      urlPhoto: ''
    }).subscribe((resp: any) => {
      console.log(resp);
      this.saveImage(resp.data.id); 
      // this.router.navigate(['sci/equipments/list']);
    });
  }

  saveImage(id: string){
    const formData = new FormData();
    formData.append('image', this.selectedFile!);
    this.equipmentService.saveImage(formData).subscribe( (response) => {
      console.log('Respuesta del servidor', response);
      this.updateImage(id, response.url);
      this.router.navigate(['/sci/equipments/list']);
    });
  }

  updateImage(id: string, urlPhoto: string){
    this.equipmentService.update(id ,{ urlPhoto }).subscribe(
      (resp) => {
        console.log(resp)
      }
    );
  }
}
