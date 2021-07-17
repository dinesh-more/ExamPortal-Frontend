import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        //Add JWT Token
        let authReq = req;
        const Token = localStorage.getItem("token");
        if (Token != null) {
            authReq = authReq.clone({
                // setHeaders: { Authorization: `Bearer ${Token}` },
                setHeaders: { Authorization: 'Bearer ' + Token },
            })
        }
        return next.handle(authReq);
    }

}

export const authInterceptorProviders = [
    {
        provide: HTTP_INTERCEPTORS,
        useClass: AuthInterceptor,
        multi: true
    },
];