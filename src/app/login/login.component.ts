import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SignIn } from '../__models/signin';

import { AuthenticationService } from '../__services/authentication.service';

@Component({
    // moduleId: module.id,
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
    signIn: SignIn = new SignIn();
    loading = false;
    returnUrl?: string;

    constructor(
        private route: ActivatedRoute,
        private authenticationService: AuthenticationService,
        private router: Router) { }

    ngOnInit() {
        // reset login status
        this.authenticationService.logout();

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    signin() {
        this.loading = true;
        this.authenticationService.signin(this.signIn)
        .subscribe({
            next: (res) => {
                this.router.navigate([this.returnUrl]);
            },
            error: (err) => {
                //this.alertService.error(error);
                this.loading = false;
            },
        });
           
    }
}