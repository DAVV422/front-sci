import { Component, OnInit } from '@angular/core';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { UserService } from '../../services/user.service';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { catchError, of, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-edit-user2',
  standalone: true,
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.scss',
  imports: [FormsModule, ReactiveFormsModule, RouterLink, NgClass, NgIf, AngularSvgIconModule, ButtonComponent, NgFor],
})
export class EditUserComponent implements OnInit {
  form!: FormGroup;
  submitted = false;
  passwordTextType!: boolean;
  disabled: boolean = false;
  selectedFile: File | null = null;
  url_image: string = "";
  grades = ['Postulante', 'Bombero I', 'Bombero II', 'Sargento Bombero','Sub Teniente Bombero', 
              'Teniente Bombero', 'Capitán Bombero', 'Capitán en Jefe'];

  constructor(
    private readonly _formBuilder: FormBuilder, 
    private readonly router: Router,    
    private userService: UserService,
    private http: HttpClient
  ) {}

  onClick() {
    console.log('Button clicked');
  }

  ngOnInit(): void {
    this.form = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      cellphone: ['', [Validators.required]],
      birthdate: ['', [Validators.required]],
      grade: ['', [Validators.required]],
      password: ['', Validators.required],
    });
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

  get f() {
    return this.form.controls;
  }

  togglePasswordTextType() {
    this.passwordTextType = !this.passwordTextType;
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.disabled = true;
    const { email, password, name, lastName, cellphone, birthdate, grade } = this.form.value;        
    
    this.userService.create({ email, last_name:lastName, name, birthdate ,grade, cellphone, password, role: 'basic', url_image: this.url_image })
      .pipe(
        tap(resp => console.log(resp)),
        catchError(err => of(
          console.log(err)
        )),
        tap(() => this.disabled = false),
      ).subscribe( (resp:any) => {
        if (resp) {
          this.saveImage(resp.data.id);          
        }
      });
  }

  saveImage(id: string){
    const formData = new FormData();
    formData.append('image', this.selectedFile!);
    this.userService.saveImage(formData).subscribe( (response) => {
    // this.http.post('https://emergy-ws-production.up.railway.app/image/upload', formData).subscribe((response: any) => {
      console.log('Respuesta del servidor', response);
      this.updateImage(id, response.url);
      this.router.navigate(['/sci/users']);
    });
  }

  updateImage(id: string, url_image: string){
    this.userService.update({ id, url_image }).subscribe(
      (resp) => {
        console.log(resp)
      }
    );
  }
}
