import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";

/**
 * This intercepts all outgoing Http requests and sets the JWT which is stored in the
 * localStorage into their header, so that the back end will know that a user is
 * logged in and authorised to make requests.
 *
 * Thanks to https://blog.angular-university.io/angular-jwt-authentication/
 */
@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  /**
   * Implements HttpInterceptor's required intercept method. Fetches the JWT from localStorage
   * and sets it into the header of a clone of the request.
   *
   * @param req: the HttpRequest which was intercepted
   * @param next: the built in HttpHandler which will continue to handle the request after
   * the interceptor is finished with it
   */
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    //Get the JWT from localStorage and save it in this variable
    const idToken = localStorage.getItem("id_token");

    /**If the idToken has been set, clone the request and add the JWT to the header
     * as an 'authorization', then return the request to the HttpHandler
     */
    if (idToken) {
      const cloned = req.clone({
        headers: req.headers.set("Authorization", idToken)
      });
      return next.handle(cloned);

    } else {
      /**
       * If no idToken was set (for example, no user is logged in), do nothing and pass
       * the request on to the HttpHandler
       */

      return next.handle(req);
    }
  }
}
