import { Component, OnInit,ViewChild,ElementRef } from '@angular/core';
import {Renderer2} from '@angular/core';
@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.scss']
})
export class ExploreComponent implements OnInit {
  constructor() { }

    renderExternalScript(src: string): HTMLScriptElement {
    const body = <HTMLDivElement> document.body;
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = src;
    script.async = true;
    script.defer = true;
    document.getElementById("div1").appendChild(script);
    return script;
  }
  renderExternalHeapScript(src: string): HTMLScriptElement {
    const body = <HTMLDivElement> document.body;
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = src;
    script.async = true;
    script.defer = true;
    document.getElementById("div2").appendChild(script);
    return script;
  }

  ngOnInit(): void {
    this.renderExternalScript('https://s3.tradingview.com/external-embedding/embed-widget-screener.js').onload = () => {
    console.log('API Script loaded');
    }
    this.renderExternalHeapScript('https://s3.tradingview.com/external-embedding/embed-widget-forex-heat-map.js').onload=()=>{
      console.log('Heap Script loaded');
    }
  }

}
