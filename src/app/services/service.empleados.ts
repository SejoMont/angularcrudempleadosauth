import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Auth } from '../models/Auth';
import { Empleados } from '../models/Empleados';

@Injectable()
export class ServiceEmpleados {
  constructor(private _http: HttpClient) {}

  login(user: Auth): Observable<any> {
    // debemos convertir el onjeto class departamento a json
    var json = JSON.stringify(user);
    // vamos a enviar un objeto json, por lo que debemos indicar
    // en la peticion el formato de dicho objeto(con headers)
    var header = new HttpHeaders().set('content-type', 'application/json');

    var request = 'auth/login';
    var url = environment.urlApiEmpleados + request;

    return this._http.post(url, json, { headers: header });
  }

  getEmpleados(key: string): Observable<any> {
    var request = 'api/empleados';
    var url = environment.urlApiEmpleados + request;
  
    // Agrega la clave de autenticación a la cabecera
    var headers = new HttpHeaders().set('Authorization', 'Bearer ' + key);
  
    return this._http.get(url, { headers: headers });
  }
}
