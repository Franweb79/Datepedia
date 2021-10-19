import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-componente-home',
  templateUrl: './componente-home.component.html',
  styleUrls: ['./componente-home.component.css']
})
export class HomeComponent implements OnInit {

  title = 'ejercicio-trasteo';

  constructor() { }

  ngOnInit(): void {
  }

}
