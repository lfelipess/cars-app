import { Component } from '@angular/core';
import { Car } from '../__models/car';
import { ActivatedRoute, Router } from '@angular/router';
import { CarService } from '../__services/car.service';
import { AuthenticationService } from '../__services/authentication.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent {
  car: Car = new Car();
  userId: any;
  label: string = "Adicionar carro";
  isAdd: boolean = true;

  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private carService: CarService,
    private authenticationService: AuthenticationService) { }

    ngOnInit(){
      this.userId = this.activeRoute.snapshot.paramMap.get('uuid');
      if(this.userId) this.getCar();
    }
    
    getCar(){
      this.carService.getByUuid(this.userId).subscribe({
        next: (res) =>{
          this.car = res;
          this.label = "Editar carro";
          this.isAdd = false;
        },
        error: (err) => {
          if(err.status == 403) this.authenticationService.logout()
          //this.alertService.error(error);
        },
      }      
      );
    }

    addCar() {
      let action;
      if(this.isAdd) action = this.carService.addCar(this.car);
      else action = this.carService.updateCar(this.car);

    
      action.subscribe({
        next: (res) => {
            //this.alertService.success('Registration successful', true);
            this.router.navigate(['/cars']);
        },
        error: (err) => {
          if(err.status == 403) this.authenticationService.logout()
            //this.alertService.error(error);
        },
    });
}

}
