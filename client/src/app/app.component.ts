import {Component, OnInit} from '@angular/core';
import {Reservation, ReservationRequest, ReservationService} from './reservation.service';
import {FormControl, FormGroup} from "@angular/forms";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'reservation-app';

  rooms: Room[];
  roomSearchForm: FormGroup;
  currentCheckInVal: string;
  currentCheckOutVal: string;
  currentPrice: number;
  currentRoomNumber: number;
  currentReservations: Reservation[];

  constructor(private reservationService: ReservationService) {
  }

  ngOnInit() {
    this.roomSearchForm = new FormGroup(
      {
        checkin: new FormControl(''),
        checkout: new FormControl(''),
        roomNumber: new FormControl()
      });

    this.getCurrentReservations();

    this.roomSearchForm.valueChanges.subscribe(form => {
      this.currentCheckInVal = form.checkin;
      this.currentCheckOutVal = form.checkout;
      const roomValues: string[] = form.roomNumber.split('|');
      this.currentRoomNumber = Number(roomValues[0]);
      this.currentPrice = Number(roomValues[1]);
    });
    this.rooms = [
      new Room('127', '127', '150'),
      new Room('137', '137', '180'),
      new Room('246', '246', '200')
    ];
  }

  getCurrentReservations() {
    this.reservationService.getReservations().subscribe(results => {
      this.currentReservations = results;
    });
  }

  createReservation() {
    this.reservationService.createReservation(
      new ReservationRequest(this.currentRoomNumber, this.currentCheckInVal, this.currentCheckOutVal, this.currentPrice)
    ).subscribe(postResult => {
      // this.getCurrentReservations();
    });
  }
}

export class Room {

  constructor(public id: string, public roomNumber: string, public price: string) {
  }
}
