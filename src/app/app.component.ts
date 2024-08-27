import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { StockDetailsComponent } from './shared/stock-details/stock-details.component';

const components = [
  StockDetailsComponent
];

/**
 * App component
 */
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ...components],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  public stockTickets = [
    { name: 'AAPL', isEnabled: true },
    { name: 'MSFT', isEnabled: true },
    { name: 'GOOG', isEnabled: true },
    { name: 'TSLA', isEnabled: true }
  ]

  constructor() {}

}
