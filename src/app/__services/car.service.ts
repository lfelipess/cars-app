import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../__models/user';
import { Car } from '../__models/car';

@Injectable()
export class CarService {
    constructor(private http: HttpClient) { }

    getAllCars() {
        return this.http.get<Car[]>('http://localhost:9090/api/cars')
    }

    getByUuid(uuid: number) {
        return this.http.get<Car>('http://localhost:9090/api/cars/' + uuid);
    }

    addCar(car: Car) {
        return this.http.post('http://localhost:9090/api/cars', car);
    }

    updateCar(car: Car) {
        return this.http.put<Car>('http://localhost:9090/api/cars/' + car.uuid, car);
    }

    deleteCar(uuid?: string) {
        return this.http.delete('http://localhost:9090/api/cars/' + uuid);
    }
}