import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  standalone: true,
})

export class SnackbarComponent implements OnInit {
    constructor() { }

    ngOnInit() { }

    showSnackbar() {
        const snackbar = document.getElementById("snackbar");
        snackbar!.style.display = "block";
        setTimeout(() => {
            snackbar!.style.display = "none";
        }, 2000); // Close the Snackbar after 3 seconds (adjust as needed)
    }

    closeSnackbar() {
        const snackbar = document.getElementById("snackbar");
        snackbar!.style.display = "none";
    }
}