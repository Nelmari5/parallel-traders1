import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-yearly',
  templateUrl: './yearly.component.html'
})
export class YearlyComponent implements OnInit {
  public items = [
    { name: 'Portfolio Return', price: '10% - 19%',tradeProfit:'55%',parrlelTradeProfit:'45%' },
    { name: 'Portfolio Return', price: '20% - 49%',tradeProfit:'60%',parrlelTradeProfit:'40%' },
    { name: 'Portfolio Return', price: '50% <',tradeProfit:'70%',parrlelTradeProfit:'30%'  },
    // { name: 'enterprise', price: 1799, desc: 'Our most advanced & complete package', count: 'Unlimited', storage: 'Unlimited', support: true, ssl: true }
  ]
  constructor() { }

  ngOnInit() {
  }

}
