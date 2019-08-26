import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const idToken = localStorage.getItem("id_token");


    console.log("intercepted request)");

    if (idToken) {
      const cloned = req.clone({
        headers: req.headers.set("Authorization", idToken)
      });

      console.log("added header");
      return next.handle(cloned);
    } else {
      console.log("no token added");
      return next.handle(req);
    }
  }
}
