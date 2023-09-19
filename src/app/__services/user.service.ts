import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../__models/user';
import { catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class UserService {
    constructor(private http: HttpClient) { }

    getUserDetail() {
        return this.http.get<User>('http://localhost:9090/api/me')
    }

    getByUuid(uuid: number) {
        return this.http.get<User>('http://localhost:9090/api/users/' + uuid);
    }

    signup(user: User) {
        return this.http.post('http://localhost:9090/api/users', user);
    }

    update(user: User) {
        return this.http.put<User>('http://localhost:9090/api/users/' + user.uuid, user);
    }

    delete(id?: string) {
        return this.http.delete('http://localhost:9090/api/users/' + id);
    }
}