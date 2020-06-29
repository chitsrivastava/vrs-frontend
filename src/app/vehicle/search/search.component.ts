import { Component, OnInit } from '@angular/core';
import { VehicleService } from 'src/app/service/vehicle.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(private vehicleService:VehicleService) { }

  ngOnInit() {
  }
  onSearchText(event: any) {
    this.vehicleService.filter.next({ name: event.target.value });
  }
}
