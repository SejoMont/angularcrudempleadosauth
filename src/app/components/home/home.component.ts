import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Auth } from 'src/app/models/Auth';
import { Empleados } from 'src/app/models/Empleados';
import { ServiceEmpleados } from 'src/app/services/service.empleados';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  @ViewChild('cajauser') cajaUserRef!: ElementRef;
  @ViewChild('cajapwd') cajaPwdRef!: ElementRef;

  public login!: Auth;
  public key!: string;
  public empleados!: Array<Empleados>

  constructor(private _serviceEmpleados: ServiceEmpleados) {}

  Login(): void {
    var user = this.cajaUserRef.nativeElement.value;
    var pwd = this.cajaPwdRef.nativeElement.value;

    var newAuth = new Auth(user, pwd);

    console.log(newAuth)

    this._serviceEmpleados.login(newAuth).subscribe((response) => {
      this.key = response.response;
      console.log(this.key);
      this.getEmpleados();
    });
  }

  getEmpleados(): void {
    this._serviceEmpleados.getEmpleados(this.key).subscribe((response) => {
      this.empleados = response; // Ajusta esto según la estructura de tu respuesta
      console.log(this.empleados);
    });
  }
}
