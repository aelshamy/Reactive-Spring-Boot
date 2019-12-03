import {Component} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'reservation-app';
  private baseUrl: String = "http://localhost:8080";
  private reservationUrl = `${this.baseUrl}/rooms/v1/reservation/`;
  rooms: Room[];

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    this.rooms = [
      new Room("127", "127", "150"),
      new Room("137", "137", "180"),
      new Room("246", "246", "200")
    ]
  }
}

export class Room {

  constructor(public id: String, public roomNumber: String, public price: String) {
  }
}
