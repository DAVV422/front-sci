import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss'],
    standalone: true,
})
export class FooterComponent implements OnInit {

  public year: number = new Date().getFullYear();

  constructor(
    private readonly router: Router
  ) { }

  ngOnInit(): void { }

  terms(){
    this.router.navigate(['sci/terms']);
  }
}
