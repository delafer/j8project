import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import {CanActivateChild, CanLoad, Route, Router, UrlSegment} from "$root/node_modules/@angular/router";

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate, CanActivateChild, CanLoad {

  constructor(private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    return this.checkRoles(route);
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    return this.canActivate(childRoute, state);
  }

  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> | boolean {
    return this.checkRoles(route);
  }

  private checkRoles(route: ActivatedRouteSnapshot | Route) {
    // const roles: string[] = route.data.roles as Array<string>;
    //
    // if (roles && roles.length > 0)
    // for (const role of roles) {
    //   if (!this.keycloakService.hasRole(role)) return false;
    // }
    //
    // const authorities: string[] = route.data.authorities as Array<string>;
    //
    // if (authorities && authorities.length > 0)
    //   for (const authority of authorities) {
    //     if (!this.keycloakService.hasAuthority(authority)) return false;
    //   }

    return true;
  }
}


