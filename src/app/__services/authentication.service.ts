import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SignIn } from '../__models/signin';
import { map } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class AuthenticationService {
    constructor(private http: HttpClient, private router: Router) { }

    signin(signIn: SignIn){
        return this.http.post<any>('http://localhost:9090/api/signin', signIn)
            .pipe(
                map(res => {
                    if (res && res.token) {
                        // store user details and jwt token in local storage to keep user logged in between page refreshes
                        localStorage.setItem('currentUser', JSON.stringify(res));
                    }
                    return res
                })
            )
                            
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.router.navigate(['/login']);
    }
}