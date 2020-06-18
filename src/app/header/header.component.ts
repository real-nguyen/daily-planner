import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  date: string;

  constructor() { }

  ngOnInit(): void {
    this.date = this.getDateString();
  }

  getDateString() {
    // Shorthand for DD/MM/YY, 24h time
    const options = { weekday: 'short', year: 'numeric', month: 'numeric', day: 'numeric' };
    const [weekday, date] = new Date().toLocaleString('en-GB', options).split(', ');
    const dateString = `${date} (${weekday})`;
    return dateString;
  }
}
