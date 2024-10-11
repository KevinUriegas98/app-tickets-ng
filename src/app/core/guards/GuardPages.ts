import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {

    constructor(private router: Router) {}

    canActivate(
        route: ActivatedRouteSnapshot
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

        const token = localStorage.getItem('token');
        const userRole = localStorage.getItem('perfil');

        if (token && userRole) {
            const allowedRoles = route.data['roles'] as Array<string>;
            if (allowedRoles.includes(userRole)) {
                return true;
            } else {
                this.router.navigate(['/forbidden']);
                return false;
            }
        } else {
            this.router.navigate(['/login']);
            return false;
        }
    }
}