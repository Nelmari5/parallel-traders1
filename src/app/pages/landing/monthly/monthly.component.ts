import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-monthly',
  templateUrl: './monthly.component.html'
})
export class MonthlyComponent implements OnInit {
  public items = [
    { name: 'BASIC', price: 'R2 750',startingPrice:'R50 000', expectedReturn:'R5 000', maxDrawDown:'R2 250',max:'0.5 lots', threeMonths:'R250' },
    { name: 'INTERMEDIATE', price: 'R5 250', startingPrice:'R100 000', expectedReturn:'R10 000', maxDrawDown:'R4 500',max:'1.0 lots', threeMonths:'R250' },
    { name: 'PRO', price: 'R7 750', startingPrice:'R150 000', expectedReturn:'R15 000', maxDrawDown:'R6 750',max:'1.5 lots', threeMonths:'R250' },
    // { name: 'enterprise', price: 159, desc: 'Our most advanced & complete package', count: 'Unlimited', storage: 'Unlimited', support: true, ssl: true }
  ]
  constructor() { }

  ngOnInit() {
  }

}
