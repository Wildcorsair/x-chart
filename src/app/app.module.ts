import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ChartComponent } from './chart/chart.component';
import { AxisYValueDirective } from './chart/axis-y-value.directive';
import { AxisXValueDirective } from './chart/axis-x-value.directive';
import { AxisY2ValueDirective } from './chart/axis-y2-value.directive';

@NgModule({
  declarations: [
    AppComponent,
    ChartComponent,
    AxisYValueDirective,
    AxisXValueDirective,
    AxisY2ValueDirective
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
