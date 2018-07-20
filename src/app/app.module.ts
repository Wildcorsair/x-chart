import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ChartComponent } from './chart/chart.component';
import { AxisValueDirective } from './chart/axis-value.directive';
import { AxisXValueDirective } from './chart/axis-x-value.directive';

@NgModule({
  declarations: [
    AppComponent,
    ChartComponent,
    AxisValueDirective,
    AxisXValueDirective
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
