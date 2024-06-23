import { NgClass, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { ButtonComponent } from 'src/app/shared/components/button/button.component';
import { UserService } from '../../services/user.service';
import { tap } from 'rxjs';
import { User } from '../../interfaces/user.interface';

@Component({
    selector: 'app-show-user',
    templateUrl: './show-user.component.html',
    standalone: true,
    imports: [FormsModule, ReactiveFormsModule, RouterLink, AngularSvgIconModule, NgClass, NgIf, ButtonComponent],
  })
  export class ShowUserComponent implements OnInit {
    form!: FormGroup;
    submitted = false;    
    public disabled: boolean = true;
    user_id: string = "";
    public user: User = <User>{};    

    constructor(
        private readonly _formBuilder: FormBuilder, 
        private readonly router: Router,    
        private userService: UserService,
        private activatedRoute: ActivatedRoute,    
    ) { }

    ngOnInit() {
        this.activatedRoute.params
        .pipe(tap(({ id }) => { this.user_id = id })).subscribe();
        
        this.userService.getById(this.user_id).subscribe(
            (resp: any) => {
                console.log(resp);
                this.user = resp.data;
            }
        )

        this.form = this._formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            name: ['', [Validators.required]],
            last_name: ['', [Validators.required]],
            cellphone: ['', [Validators.required]],
            birthdate: ['', [Validators.required]],
            grade: ['', [Validators.required]],
          });
    }

    onSubmit(): void {
        if (this.form.invalid) {
          this.form.markAllAsTouched();
          return;
        }
        this.disabled = true;
        const { email, password, name, lastName, cellphone, birthdate, grade } = this.form.value;     
      }
    
    delete(id : string): void {
        this.userService.delete(id).subscribe(
            (resp: any) =>{
                if(resp){
                    console.log("usuario eliminado");
                    this.router.navigate(['/sci/users']);
                }
            }
        );
    }
}