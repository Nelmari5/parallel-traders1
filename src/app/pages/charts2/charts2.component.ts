import { Component, OnInit, AfterViewInit  } from '@angular/core';
import { createChart } from 'lightweight-charts';
declare const TradingView: any;
@Component({
  selector: 'app-charts2',
  templateUrl: './charts2.component.html',
  styleUrls: ['./charts2.component.scss']
})
export class Charts2Component implements AfterViewInit {

  ngAfterViewInit() {
    new TradingView.widget({
       'container_id': 'technical-analysis',
      //  'autosize': false,
      "width": 1000,
      "height": 510,
      //  'symbol': this.symbolPair,
       'interval': '120',
       'timezone': 'exchange',
       'theme': 'Light',
       'style': '1',
       'toolbar_bg': '#f1f3f6',
       'withdateranges': true,
       'hide_side_toolbar': false,
       'allow_symbol_change': true,
       'save_image': false,
       'hideideas': true,
       'studies': [ 
       'MASimple@tv-basicstudies' ],
       'show_popup_button': true,
       'popup_width': '1000',
       'popup_height': '1000'
     });
   }

  constructor() { }

//   ngOnInit(): void {
//     const chart = createChart(document.body, { width: 400, height: 300 });
//   const lineSeries = chart.addLineSeries();
//   lineSeries.setData([
//     { time: '2019-04-11', value: 80.01 },
//     { time: '2019-04-12', value: 96.63 },
//     { time: '2019-04-13', value: 76.64 },
//     { time: '2019-04-14', value: 81.89 },
//     { time: '2019-04-15', value: 74.43 },
//     { time: '2019-04-16', value: 80.01 },
//     { time: '2019-04-17', value: 96.63 },
//     { time: '2019-04-18', value: 76.64 },
//     { time: '2019-04-19', value: 81.89 },
//     { time: '2019-04-20', value: 74.43 },
// ]);
//   }

}
