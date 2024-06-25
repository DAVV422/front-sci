import { Component, OnInit } from '@angular/core';
import { FooterComponent } from './../../components/footer/footer.component';
import { RouterOutlet, Event } from '@angular/router';
import { NavbarComponent } from './../../components/navbar/navbar.component';
import { SidebarComponent } from './../../components/sidebar/sidebar.component';

@Component({
  selector: 'app-terms',
  templateUrl: './terms.component.html',
  standalone: true,
  imports: [SidebarComponent, NavbarComponent, FooterComponent],
})
export class TermsComponent implements OnInit {

  constructor() {   
  }

  ngOnInit(): void {
  }
}
