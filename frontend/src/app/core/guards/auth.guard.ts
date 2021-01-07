import {Injectable} from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment
} from '@angular/router';

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {
  constructor(
    private router: Router,
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser = 'bla-bla';

    //console.log(`Auth guard ${JSON.stringify(currentUser)}`);
    if (currentUser) {
/*      console.log('User is already logged');
      const helper = new JwtHelperService();
      const decodedToken: AccessToken = helper.decodeToken(currentUser.access_token);

      if (route.data.role && !decodedToken.resource_access.account.roles.includes(route.data.role)) {
        // role not authorised so redirect to home page
        this.router.navigate(['/']);
        return false;
      }*/
      return true;

    }
    console.log(`current url ${state.url}`);

    // not logged in so redirect to login page with the return url
    if ('/login' !== state.url) {
      console.log(`Changing URL`);
      this.router.navigate(['/login'], {queryParams: {returnUrl: state.url}});
    }
    return false;
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.canActivate(childRoute, state);
  }

  canLoad(route: Route, segments: UrlSegment[]): boolean {
    return true; //this.oauthService.hasValidAccessToken();
  }
}
