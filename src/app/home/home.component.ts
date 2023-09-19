import { Component, OnInit } from '@angular/core';

import { User } from '../__models/user';
import { UserService } from '../__services/user.service';
import { AuthenticationService } from '../__services/authentication.service';
import { Router } from '@angular/router';

@Component({
    // moduleId: module.id,
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
    currentUser: any;
    user: User = new User;

    constructor(private userService: UserService,
        private authenticationService: AuthenticationService,
        private router: Router) {
        let currentUser = localStorage.getItem('currentUser');
        if(currentUser) this.currentUser = JSON.parse(currentUser);
    }

    ngOnInit() {
        this.loadUserDetails();
    }

    private loadUserDetails() {
        this.userService.getUserDetail()
        .subscribe({
            next: (res) => {
                this.user = res;
            },

            error: (err) => {
                if(err.status == 403) this.authenticationService.logout()
                console.log(err.status)
            }
        })
    }

    deleteUser(uuid?: string) {
        this.userService.delete(uuid).subscribe(() => { this.authenticationService.logout() });
    }

    editUser(uuid?: string) {
        this.router.navigate(['/edit-user', {uuid: uuid}]);
    }

    listCars() {
        this.router.navigate(['/cars']);
    }
}