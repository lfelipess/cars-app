import { Component } from '@angular/core';
import { Car } from '../__models/car';
import { CarService } from '../__services/car.service';
import { AuthenticationService } from '../__services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-car',
  templateUrl: './user-car.component.html',
  styleUrls: ['./user-car.component.css']
})
export class UserCarComponent {
  cars: Car[] = [];

  constructor(private carService: CarService, private authenticationService: AuthenticationService, private router:Router){}

  ngOnInit(){
    this.loadAllUserCars();
  }

  loadAllUserCars(){
    this.carService.getAllCars().subscribe({
      next: (res) => {
        this.cars = res;
      },

      error: (err) =>{
        if(err.status == 403) this.authenticationService.logout()
        //alert
      }
    });
  }

  carDetails(uuid?: string){
    this.router.navigate(['/car', {uuid: uuid}]);
  }

  deleteCar(uuid?: string){
    this.carService.deleteCar(uuid).subscribe({
      next: (res) => {
        this.loadAllUserCars();
      },

      error: (err) =>{
        if(err.status == 403) this.authenticationService.logout()
        //alert
      }
    });

  }

}
