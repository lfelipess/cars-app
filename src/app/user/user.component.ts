import { Component } from '@angular/core';
import { User } from '../__models/user';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { UserService } from '../__services/user.service';
import { AuthenticationService } from '../__services/authentication.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {
  user: User = new User;
  userId: any;

  constructor(private activeRoute: ActivatedRoute, private userService: UserService,
     private router:Router, private authenticationService: AuthenticationService) {
  }


  ngOnInit(){
    this.userId = this.activeRoute.snapshot.paramMap.get('uuid');
    this.getUser();
  }

  getUser(){
    this.userService.getByUuid(this.userId).subscribe({
      next: (res) =>{
        this.user = res;
      },
      error: (err) => {
        if(err.status == 403) this.authenticationService.logout()
        //this.alertService.error(error);
      },
    }      
    );
  }

  editUser(){
    this.userService.update(this.user)
        .subscribe({
            next: (res) => {
                //this.alertService.success('Registration successful', true);
                this.user = res;
            },
            error: (err) => {
              if(err.status == 403) this.authenticationService.logout()
                //this.alertService.error(error);
            },
        });
  }
}
