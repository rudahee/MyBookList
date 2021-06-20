import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IsAuthorGuard implements CanActivate {

  constructor(private router: Router, private snackbar: MatSnackBar) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      if (localStorage.getItem('roles') === 'AUTHOR') {
        return true;
      } else {
        this.snackbar.open('You can\'t access this page', 'Close', { duration: 5000, panelClass: 'snackbar' });

        this.router.navigate(['']);
      }
  }

}
