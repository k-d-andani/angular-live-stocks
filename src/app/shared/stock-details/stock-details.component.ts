import { CurrencyPipe } from '@angular/common';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil, takeWhile } from 'rxjs';
import { WebSocketService } from '../../services/web-socket.service';

const pipes = [
  CurrencyPipe
]

/**
 * Stock details component
 */
@Component({
  selector: 'app-stock-details',
  standalone: true,
  imports: [...pipes],
  templateUrl: './stock-details.component.html',
  styleUrl: './stock-details.component.scss'
})
export class StockDetailsComponent implements OnInit, OnDestroy {

  @Input() ticker: any;

  public stockData: any;

  private _destroy$ = new Subject<void>();

  constructor(
    private _webSocketService: WebSocketService
  ) {}

  public ngOnInit(): void {
    this._getStockData();
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  /**
   * Enable or disable stock live updates
   */
  public stockEnableDisable(): void {
    this.ticker.isEnabled = !this.ticker.isEnabled;

    if (this.ticker.isEnabled) {
      this._getStockData();
    }
  }

  /**
   * Get stock live data
   */
  private _getStockData(): void {
    this._webSocketService.connect();

    this._webSocketService.webSocket$
      .pipe(
        takeWhile(_ => this.ticker.isEnabled),
        takeUntil(this._destroy$)
      )
      .subscribe({
        next: (responseData) => {
          this.stockData = responseData;
        }
      })

    this._webSocketService.webSocket$.next({
      subscribe: [this.ticker.name]
    });
  }
}
