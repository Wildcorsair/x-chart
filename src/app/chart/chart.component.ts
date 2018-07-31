import { Component, OnInit, ViewChildren, QueryList, ElementRef, Renderer2, Input } from '@angular/core';

import { AxisYValueDirective } from './axis-y-value.directive';
import { AxisXValueDirective } from './axis-x-value.directive';
import { AxisY2ValueDirective } from './axis-y2-value.directive';
import { AxisYIntermediateValueDirective } from './axis-y-intermediate-value.directive';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {

  months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sept',
    'Oct',
    'Nov',
    'Dec'
  ];

  data: any[] = [];
  columns: any[] = [];

  offset: number;
  axisYLeft: number[] = [];
  axisYRight: number[] = [];
  axisX: string[] = [];
  displayValue: boolean = false;
  displayCrosshair: boolean = false;
  x: number = 50;
  y: number = 50;
  line: string = 'M';
  stepX: number;
  columnWidth: number;
  columnOffset: number;

  startMonthName: string;
  endMonthName: string;

  displayStartMonth: boolean = true;
  displayEndMonth: boolean = true;

  chartLineStartCoord: number;
  infelicity: number;
  points: number[] = [];
  axisYIntermediateValues: any[];
  axisY2IntermediateValues: any[];

  @Input() size: any;
  @Input() dataset: any;

  @ViewChildren(AxisYValueDirective, { read: ElementRef }) axisYValues: QueryList<ElementRef>;
  @ViewChildren(AxisXValueDirective, { read: ElementRef }) axisXValues: QueryList<ElementRef>;
  @ViewChildren(AxisY2ValueDirective, { read: ElementRef }) axisY2Values: QueryList<ElementRef>;
  @ViewChildren(AxisYIntermediateValueDirective, { read: ElementRef }) axisYIntermediateValue: QueryList<ElementRef>;

  constructor(private renderer: Renderer2) { }

  ngOnInit() {

    for (let i = 0; i < this.dataset.length; i++) {
      let gripDate = this.dataset[i].grip_date.split(' ')[0];
      this.data.push({date: gripDate, value: this.dataset[i].price});
      this.columns.push({date: gripDate, value: this.dataset[i].volume});
    }

    this.calculateColumnWidth();
    this.calculatePoints();
    this.renderLine();
    this.renderColumns();
    this.calcAxisYValues();
    this.axisYIntermediateValues = this.calcAxisYIntermediateValues();
    this.axisY2IntermediateValues = this.calcAxisY2IntermediateValues();
    this.calcAxisXValues();
    this.calcAxisY2Values();
  }

  ngAfterViewInit() {
    // console.log(this.axisYValues);
    // this.axisYValues.forEach(value => console.log(value.nativeElement));
  }

  calculatePoints() {
    let elCount = this.data.length;

    for (let i = 0; i < elCount; i++) {
      // 70 - is start coordinate, 10 - is width of space between columns
      this.points.push(70 + (this.columnWidth / 2) + (this.columnWidth + 10) * i);
    }

  }

  calculateColumnWidth() {
    let elCount = this.data.length;
    let chartViewportWidth = this.size.width - 160;
    let d: number;

    this.columnWidth = (Math.round(chartViewportWidth / (elCount) - 10));

    let commonWidth = (this.columnWidth * elCount) + 10 * (elCount - 1);

    if (commonWidth < chartViewportWidth) {
      d = (chartViewportWidth - commonWidth) / elCount;
      this.columnWidth = this.columnWidth + d;
    } else {
      d = (commonWidth - chartViewportWidth) / elCount;
      this.columnWidth = this.columnWidth - d;
    }
    // console.log('Column Width: ', this.columnWidth);
  }

  /**
   * Render chart line.
   */
  renderLine() {
    let elCount = this.data.length;
    let min = this.min(this.data);
    let max = this.max(this.data);
    let coords = [];
    let d: number;

    let diff = max - min;
    min = min - diff;

    if (min < 0) {
      min = 0;
    }

    for (let i = 0; i < elCount; i++) {
      this.data[i].coord = 400 - (50 + (this.data[i].value - min) / (max - min) * (350 - 50));

      if (i !== elCount - 1) {
        this.line += this.points[i] + ',' +  this.data[i].coord + ' L';
      } else {
        this.line += this.points[i] + ',' +  this.data[i].coord;
      }
    }
  }

  /**
   * Render chart columns.
   */
  renderColumns() {
    let elCount = this.columns.length;
    let min = this.min(this.columns);
    let max = this.max(this.columns);
    let diff = max - min;

    min = min - diff;

    if (min < 0) {
      min = 0;
    }

    this.columnOffset = Math.round((this.size.width - 160) / (elCount - 1));

    this.columnOffset =  this.columnWidth + 10;

    for (let i = 0; i < elCount; i++) {
      this.columns[i].coord = this.size.height - (50 + (this.columns[i].value - min) / (max - min) * (350 - 50));
    }

  }

  /**
   * Method returns the object with maximum value from array of objects.
   *
   * @param {array} elements Array of objects
   */
  max(elements) {
    let max = elements[0].value;

    for (let i = 1; i < elements.length; i++) {
      if (max < elements[i].value) {
        max = elements[i].value;
      }
    }

    return max;
  }

  /**
   * Method returns the object with minimum value from array of objects.
   *
   * @param {array} elements Array of objects
   */
  min(elements) {
    let min = elements[0].value;

    for (let i = 1; i < elements.length; i++) {
      if (min > elements[i].value) {
        min = elements[i].value;
      }
    }

    return min;
  }

  calcAxisYIntermediateValues() {
    let elCount = this.data.length;
    let max = this.max(this.data);
    let min = this.min(this.data);
    let diff = max - min;
    let axisYIntermediateValues: any[] = [];

    min = min - diff;

    if (min < 0) {
      min = 0;
      axisYIntermediateValues.push({coord: this.size.height - 50, value: min});
    } else {
      axisYIntermediateValues.push({coord: this.size.height - 50, value: min.toFixed(4)});
    }

    let offset = (max - min) / 4;
    // 100 is sum of top padding - 50px + bottom padding - 50px;
    let coordOffset = (this.size.height - 100) / 4;
    let coordStart = this.size.height - 50;
    let valueCoord = coordStart;
    let step = min;
    while (step < max) {
      step = step + offset;
      valueCoord = valueCoord - coordOffset;
      axisYIntermediateValues.push({coord: valueCoord, value: step.toFixed(4)});
    }

    return axisYIntermediateValues;
  }

  /**
   * Calculates the Y axis values.
   */
  calcAxisYValues() {
    let elCount = this.data.length;
    let max = this.max(this.data);
    let min = this.min(this.data);
    let diff = max - min;

    min = min - diff;

    if (min < 0) {
      min = 0;
      this.axisYLeft.push(min);
    } else {
      this.axisYLeft.push(min.toFixed(4));
    }

    diff = max - min;
    let step = diff / 300;

    while (min < max) {
      min = min + step;
      this.axisYLeft.push(min.toFixed(4));
    }
  }

  /**
   * Calculate values for Y2 axis.
   */
  calcAxisY2Values() {
    let elCount = this.columns.length;
    let max = this.max(this.columns);
    let min = this.min(this.columns);
    let diff = max - min;

    min = min - diff;

    if (min < 0) {
      min = 0;
    }

    diff = max - min;
    let step = diff / 300;

    this.minY2Value = min;
    this.maxY2Value = max;

    this.axisYRight.push(min);

    while (min < max) {
      min = min + step;
      this.axisYRight.push(Math.trunc(min));
    }
  }

  calcAxisY2IntermediateValues() {
    let elCount = this.columns.length;
    let max = this.max(this.columns);
    let min = this.min(this.columns);
    let diff = max - min;
    let axisY2IntermediateValues: any[] = [];

    min = min - diff;

    if (min < 0) {
      min = 0;
      axisY2IntermediateValues.push({coord: this.size.height - 50, value: min});
    } else {
      axisY2IntermediateValues.push({coord: this.size.height - 50, value: min});
    }

    let offset = (max - min) / 4;
    // 100 is sum of top padding - 50px + bottom padding - 50px;
    let coordOffset = (this.size.height - 100) / 4;
    let coordStart = this.size.height - 50;
    let valueCoord = coordStart;
    let step = min;
    while (step < max) {
      step = step + offset;
      valueCoord = valueCoord - coordOffset;
      axisY2IntermediateValues.push({coord: valueCoord, value: step});
    }

    return axisY2IntermediateValues;
  }

  /**
   * Method returns the day number from the date string.
   *
   * @param {string} dateString Date string parameter
   */
  extractDayNumber(dateString: string) {
    if (typeof dateString === 'string') {
      return Number(dateString.split('-')[2]);
    }
    return null;
  }

  /**
   * Method returns the month number from the date string.
   *
   * @param {string} dateString Date string parameter
   */
  extractMonthNumber(dateString: string) {
    if (typeof dateString === 'string') {
      return Number(dateString.split('-')[1]);
    }
    return null;
  }

  /**
   * Method returns the month name according the number.
   *
   * @param {number} month Number of the month
   */
  getMonthName(month: number) {
    if (month >= 0 && month < 12) {
      return this.months[month];
    }
    return null;
  }

  /**
   * Calculate X axis values.
   */
  calcAxisXValues() {
    let elCount = this.data.length;
    let minDateTimestamp = Date.parse(this.data[0].date);
    let maxDateTimestamp = Date.parse(this.data[elCount - 1].date);

    let minDate = new Date(minDateTimestamp);
    let maxDate = new Date(maxDateTimestamp);

    this.startMonthName = this.getMonthName(minDate.getMonth());
    this.endMonthName = this.getMonthName(maxDate.getMonth());

    if (this.extractMonthNumber(this.data[0].date) === this.extractMonthNumber(this.data[elCount - 1].date)) {
      for (let i = 0; i < elCount; i++) {
        this.axisX.push(this.getMonthName(this.extractMonthNumber(this.data[i].date) - 1) + ', ' + this.extractDayNumber(this.data[i].date));
      }
    } else {
      for (let i = 0; i < elCount; i++) {
        this.axisX.push(this.getMonthName(this.extractMonthNumber(this.data[i].date) - 1) + ', ' + this.extractDayNumber(this.data[i].date));
      }
    }
  }

  /**
   * Mouse move event handler.
   *
   * @param {object} event Event object
   */
  move(event) {
    this.displayValue = true;

    this.x = event.offsetX;
    this.y = event.offsetY;

    // console.log('X: ', this.x);
    // console.log('Y: ', this.y);

    if ((this.x < 50 || this.x > this.size.width - 70) || (this.y < 50 || this.y > 350)) {

      // Display start month name on the X axis, when cursor goes out the chart
      this.displayStartMonth = true;
      // Display end month name on the X axis, when cursor goes out the chart
      this.displayEndMonth = true;

      this.displayCrosshair = false;

      this.axisYValues.forEach((value) => {
        this.renderer.removeClass(value.nativeElement, 'show');
      });

      this.axisYIntermediateValue.forEach((value) => {
        this.renderer.addClass(value.nativeElement, 'show');
      });

      this.axisXValues.forEach((value) => {
        this.renderer.removeClass(value.nativeElement, 'show');
      });

      this.axisY2Values.forEach((value) => {
        this.renderer.removeClass(value.nativeElement, 'show');
      });

    } else {
      this.displayCrosshair = true;
      this.axisYValues.forEach((value, i) => {
        let y = value.nativeElement.attributes.y.value;
        if ( y == this.y - 1) {
          this.renderer.addClass(value.nativeElement, 'show');
        } else {
          this.renderer.removeClass(value.nativeElement, 'show');
        }
      });

      this.axisYIntermediateValue.forEach((value, i) => {
        let y = value.nativeElement.attributes.y.value;
        if (y - 10 <= this.y - 1 && y >= this.y) {
          this.renderer.removeClass(value.nativeElement, 'show');
        } else if (y + 10 >= this.y - 1 && y <= this.y - 1 && (this.y - 1) - y <= 10) {
          this.renderer.removeClass(value.nativeElement, 'show');
        } else {
          this.renderer.addClass(value.nativeElement, 'show');
        }
      });

      this.axisXValues.forEach((value, i) => {
        let x = value.nativeElement.attributes.x.value;

        if ( Math.round(x) == this.x - 17 || Math.round(x) == this.x - 18
            || Math.round(x) == this.x - 19 || Math.round(x) == this.x - 20
            || Math.round(x) == this.x - 21
          ) {
          this.renderer.addClass(value.nativeElement, 'show');
          this.hideStartMonth(x);
          this.hideEndMonth(x);
        } else {
          this.renderer.removeClass(value.nativeElement, 'show');
        }
      });

      this.axisY2Values.forEach((value, i) => {
        let y = value.nativeElement.attributes.y.value;

        if ( y == this.y) {
          this.renderer.addClass(value.nativeElement, 'show');
        } else {
          this.renderer.removeClass(value.nativeElement, 'show');
        }
      });
    }

  }

  hideStartMonth(x) {
    if (x - 40 < 25) {
      this.displayStartMonth = false;
    } else {
      this.displayStartMonth = true;
    }
  }

  hideEndMonth(x) {
    if (this.size.width - 80 - x < 30) {
      this.displayEndMonth = false;
    } else {
      this.displayEndMonth = true;
    }
  }
}
