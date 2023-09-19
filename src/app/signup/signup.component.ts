import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../__services/user.service';
import { User } from '../__models/user';

@Component({
    // moduleId: module.id,
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.css']
})

export class SignupComponent {
    user: User = new User();
    loading = false;

    constructor(
        private router: Router,
        private userService: UserService) { }

    signup() {
        this.loading = true;
        this.userService.signup(this.user)
        .subscribe({
            next: (res) => {
                //this.alertService.success('Registration successful', true);
                this.router.navigate(['/login']);
            },
            error: (err) => {
                //this.alertService.error(error);
                this.loading = false;
            },
        });
    }
}