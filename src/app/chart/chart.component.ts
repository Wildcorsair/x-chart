import { Component, OnInit, ViewChildren, QueryList, ElementRef, Renderer2, Input } from '@angular/core';

import { AxisYValueDirective } from './axis-y-value.directive';
import { AxisXValueDirective } from './axis-x-value.directive';
import { AxisY2ValueDirective } from './axis-y2-value.directive';

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

  data: any[] = [
    // {
    //   date: '2018-06-19',
    //   value: 5750
    // },
    // {
    //   date: '2018-06-20',
    //   value: 5570
    // },
    // {
    //   date: '2018-06-21',
    //   value: 5460
    // },
    // {
    //   date: '2018-06-22',
    //   value: 5500
    // },
    // {
    //   date: '2018-06-23',
    //   value: 5670
    // },
    // {
    //   date: '2018-06-24',
    //   value: 5830
    // },
    // {
    //   date: '2018-06-25',
    //   value: 6010
    // },
    // {
    //   date: '2018-06-26',
    //   value: 6240
    // },
    // {
    //   date: '2018-06-27',
    //   value: 6380
    // },
    // {
    //   date: '2018-06-28',
    //   value: 6270
    // },
    // {
    //   date: '2018-06-29',
    //   value: 6110
    // },
    // {
    //   date: '2018-06-30',
    //   value: 6035
    // },
    // {
    //   date: '2018-07-01',
    //   value: 5810
    // },
    // {
    //   date: '2018-07-02',
    //   value: 5950
    // },
    // {
    //   date: '2018-07-03',
    //   value: 6150
    // },
    // {
    //   date: '2018-07-04',
    //   value: 6275
    // },
    // {
    //   date: '2018-07-05',
    //   value: 6120
    // },
    // {
    //   date: '2018-07-06',
    //   value: 5920
    // },
    // {
    //   date: '2018-07-07',
    //   value: 5850
    // },
    // {
    //   date: '2018-07-08',
    //   value: 5790
    // },
    // {
    //   date: '2018-07-09',
    //   value: 5550
    // },
    // {
    //   date: '2018-07-10',
    //   value: 5823
    // },
    // {
    //   date: '2018-07-11',
    //   value: 5985
    // },
    // {
    //   date: '2018-07-12',
    //   value: 7350
    // },
    // {
    //   date: '2018-07-13',
    //   value: 6450
    // },
    // {
    //   date: '2018-07-14',
    //   value: 5540
    // },
    // {
    //   date: '2018-07-15',
    //   value: 5680
    // },
    // {
    //   date: '2018-07-16',
    //   value: 4870
    // },
    // {
    //   date: '2018-07-17',
    //   value: 4600
    // },
    // {
    //   date: '2018-07-18',
    //   value: 4300
    // }
    // {
    //   date: '2018-07-19',
    //   value: 4400
    // }
    {
      date: '2018-06-22',
      value: 0.0240
    },
    {
      date: '2018-06-23',
      value: 0.0220
    },
    {
      date: '2018-06-24',
      value: 0.0200
    },
    {
      date: '2018-06-25',
      value: 0.0220
    },
    {
      date: '2018-06-26',
      value: 0.0250
    },
    {
      date: '2018-06-27',
      value: 0.0270
    },
    {
      date: '2018-06-28',
      value: 0.0280
    },
    {
      date: '2018-06-29',
      value: 0.0290
    },
    {
      date: '2018-06-30',
      value: 0.0320
    },
    {
      date: '2018-07-01',
      value: 0.0300
    },
    {
      date: '2018-07-02',
      value: 0.0290
    },
    {
      date: '2018-07-03',
      value: 0.0260
    },
    {
      date: '2018-07-04',
      value: 0.0230
    },
    {
      date: '2018-07-05',
      value: 0.0250
    },
    {
      date: '2018-07-06',
      value: 0.0290
    },
    {
      date: '2018-07-07',
      value: 0.0320
    },
    {
      date: '2018-07-08',
      value: 0.0330
    },
    {
      date: '2018-07-09',
      value: 0.0360
    },
    {
      date: '2018-07-10',
      value: 0.0380
    },
    {
      date: '2018-07-11',
      value: 0.041
    },
    {
      date: '2018-07-12',
      value: 0.043
    },
    {
      date: '2018-07-13',
      value: 0.0290
    },
    {
      date: '2018-07-14',
      value: 0.0320
    },
    {
      date: '2018-07-15',
      value: 0.0330
    },
    {
      date: '2018-07-16',
      value: 0.0360
    },
    {
      date: '2018-07-17',
      value: 0.0380
    },
    {
      date: '2018-07-18',
      value: 0.041
    },
    {
      date: '2018-07-19',
      value: 0.043
    },
    {
      date: '2018-07-20',
      value: 0.045
    },
    {
      date: '2018-07-21',
      value: 0.050
    },
    {
      date: '2018-07-22',
      value: 0.044
    }
  ];

  columns: any[] = [
    {
      date: '2018-06-22',
      value: 11970000
    },
    {
      date: '2018-06-23',
      value: 12160000
    },
    {
      date: '2018-06-24',
      value: 12450000
    },
    {
      date: '2018-06-25',
      value: 12850000
    },
    {
      date: '2018-06-26',
      value: 12970000
    },
    {
      date: '2018-06-27',
      value: 13080000
    },
    {
      date: '2018-06-28',
      value: 13145000
    },
    {
      date: '2018-06-29',
      value: 13233000
    },
    {
      date: '2018-06-30',
      value: 13140000
    },
    {
      date: '2018-07-01',
      value: 13045000
    },
    {
      date: '2018-07-02',
      value: 13045000
    },
    {
      date: '2018-07-03',
      value: 12960000
    },
    {
      date: '2018-07-04',
      value: 12845300
    },
    {
      date: '2018-07-05',
      value: 12759000
    },
    {
      date: '2018-07-06',
      value: 12645000
    },
    {
      date: '2018-07-07',
      value: 12554000
    },
    {
      date: '2018-07-08',
      value: 12568000
    },
    {
      date: '2018-07-09',
      value: 12487000
    },
    {
      date: '2018-07-10',
      value: 12960000
    },
    {
      date: '2018-07-11',
      value: 12430000
    },
    {
      date: '2018-07-12',
      value: 12735000
    },
    {
      date: '2018-07-13',
      value: 12645000
    },
    {
      date: '2018-07-14',
      value: 12554000
    },
    {
      date: '2018-07-15',
      value: 12568000
    },
    {
      date: '2018-07-16',
      value: 12487000
    },
    {
      date: '2018-07-17',
      value: 12960000
    },
    {
      date: '2018-07-18',
      value: 12430000
    },
    {
      date: '2018-07-19',
      value: 12735000
    },
    {
      date: '2018-07-20',
      value: 12450000
    },
    {
      date: '2018-07-21',
      value: 12265000
    },
    {
      date: '2018-07-22',
      value: 12168000
    }
  ];

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

  minValue: number;
  maxValue: number;

  minY2Value: number;
  maxY2Value: number;

  displayMinValue: boolean = true;
  displayMaxValue: boolean = true;

  displayMinY2Value: boolean = true;
  displayMaxY2Value: boolean = true;

  displayStartMonth: boolean = true;
  displayEndMonth: boolean = true;

  chartLineStartCoord: number;

  @Input() size: any;

  @ViewChildren(AxisYValueDirective, { read: ElementRef }) axisYValues: QueryList<ElementRef>;
  @ViewChildren(AxisXValueDirective, { read: ElementRef }) axisXValues: QueryList<ElementRef>;
  @ViewChildren(AxisY2ValueDirective, { read: ElementRef }) axisY2Values: QueryList<ElementRef>;

  constructor(private renderer: Renderer2) { }

  ngOnInit() {
    this.renderLine();
    this.renderColumns();
    this.calcAxisYValues();
    this.calcAxisXValues();
    this.calcAxisY2Values();
  }

  ngAfterViewInit() {
    // console.log(this.axisYValues);
    // this.axisYValues.forEach(value => console.log(value.nativeElement));
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

    // this.offset = Math.round(460 / (elCount - 1));
    this.offset = Math.round((this.size.width - 160) / (elCount - 1));

    let lastPoint = this.size.width - 90;
    let lastPointOffset = (70 + this.offset * (elCount - 1));

    if (lastPointOffset < lastPoint) {
      d = (lastPoint - lastPointOffset) / (elCount - 1);
      this.offset = this.offset + d;
    } else {
      d = (lastPointOffset - lastPoint) / (elCount - 1);
      this.offset = this.offset - d;
    }

    for (let i = 0; i < elCount; i++) {
      this.data[i].coord = 400 - (50 + (this.data[i].value - min) / (max - min) * (350 - 50));
      if (i !== elCount - 1) {
        this.line += (70 + this.offset * i) + ',' +  this.data[i].coord + ' L';
      } else {
        this.line += (70 + this.offset * i) + ',' +  this.data[i].coord;
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

    this.columnWidth = 1;

    this.columnOffset =  this.columnWidth + 5;

    for (let i = 0; i < elCount; i++) {
      // this.columns[i].coord = 400 - (50 + (this.columns[i].value - min) / (max - min) * (350 - 50));
      this.columns[i].coord = this.size.height - (50 + (this.columns[i].value - min) / (max - min) * (350 - 50));
    }
    console.log(this.columns);
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
      this.minValue = min;
      this.axisYLeft.push(min);
    } else {
      this.minValue = min.toFixed(4);
      this.axisYLeft.push(min.toFixed(4));
    }

    diff = max - min;
    let step = diff / 300;

    while (min < max) {
      min = min + step;
      this.axisYLeft.push(min.toFixed(4));
    }
    this.maxValue = min.toFixed(4);
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

    this.stepX = Math.floor(460 / (elCount - 1));

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
    this.x = event.x;
    this.y = event.y;

    // console.log('X: ', this.x);
    // console.log('Y: ', this.y);

    if ((this.x < 57 || this.x > this.size.width - 60) || (this.y < 57 || this.y > 360)) {
      // Display min value on the Y axis, when cursor goes out the chart
      this.displayMinValue = true;
      // Display max value on the Y axis, when cursor goes out the chart
      this.displayMaxValue = true;

      // Display start month name on the X axis, when cursor goes out the chart
      this.displayStartMonth = true;
      // Display end month name on the X axis, when cursor goes out the chart
      this.displayEndMonth = true;

      // Display min value on the Y axis, when cursor goes out the chart
      this.displayMinY2Value = true;
      // Display max value on the Y2 axis, when cursor goes out the chart
      this.displayMaxY2Value = true;

      this.displayCrosshair = false;

      this.axisYValues.forEach((value) => {
        this.renderer.removeClass(value.nativeElement, 'show');
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
        if ( y == this.y - 8) {
          this.renderer.addClass(value.nativeElement, 'show');
          this.hideMinValue(y);
          this.hideMaxValue(y);
        } else {
          this.renderer.removeClass(value.nativeElement, 'show');
        }
      });

      this.axisXValues.forEach((value, i) => {
        let x = value.nativeElement.attributes.x.value;

        if ( x == this.x - 17 || x == this.x - 18 || x == this.x - 19 || x == this.x - 20 || x == this.x - 21) {
          this.renderer.addClass(value.nativeElement, 'show');
          this.hideStartMonth(x);
          this.hideEndMonth(x);
        } else {
          this.renderer.removeClass(value.nativeElement, 'show');
        }
      });

      this.axisY2Values.forEach((value, i) => {
        let y = value.nativeElement.attributes.y.value;

        if ( y == this.y - 9) {
          this.renderer.addClass(value.nativeElement, 'show');
          this.hideMinY2Value(y);
          this.hideMaxY2Value(y);
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

  hideMinValue(y) {
    if (350 - y < 15) {
      this.displayMinValue = false;
    } else {
      this.displayMinValue = true;
    }
  }

  hideMaxValue(y) {
    if (y - 50 < 15) {
      this.displayMaxValue = false;
    } else {
      this.displayMaxValue = true;
    }
  }

  hideMinY2Value(y) {
    if (350 - y < 15) {
      this.displayMinY2Value = false;
    } else {
      this.displayMinY2Value = true;
    }
  }

  hideMaxY2Value(y) {
    if (y - 50 < 15) {
      this.displayMaxY2Value = false;
    } else {
      this.displayMaxY2Value = true;
    }
  }
}
