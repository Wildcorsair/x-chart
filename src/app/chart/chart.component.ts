import { Component, OnInit, ViewChildren, QueryList, ElementRef, Renderer2 } from '@angular/core';

import { AxisValueDirective } from './axis-value.directive';
import { AxisXValueDirective } from './axis-x-value.directive';

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
    {
      date: '2018-07-06',
      value: 5920
    },
    {
      date: '2018-07-07',
      value: 5850
    },
    {
      date: '2018-07-08',
      value: 5790
    },
    {
      date: '2018-07-09',
      value: 5550
    },
    {
      date: '2018-07-10',
      value: 5823
    },
    {
      date: '2018-07-11',
      value: 5985
    },
    {
      date: '2018-07-12',
      value: 7350
    },
    {
      date: '2018-07-13',
      value: 6450
    },
    {
      date: '2018-07-14',
      value: 5540
    },
    {
      date: '2018-07-15',
      value: 5680
    },
    {
      date: '2018-07-16',
      value: 4870
    },
    {
      date: '2018-07-17',
      value: 4600
    },
    {
      date: '2018-07-18',
      value: 4300
    }
    {
      date: '2018-07-19',
      value: 4400
    }
  ];

  columns: any[] = [
    {
      date: '2018-07-06',
      value: 126450
    },
    {
      date: '2018-07-07',
      value: 125540
    },
    {
      date: '2018-07-08',
      value: 125680
    },
    {
      date: '2018-07-09',
      value: 124870
    },
    {
      date: '2018-07-10',
      value: 129600
    },
    {
      date: '2018-07-11',
      value: 124300
    },
    {
      date: '2018-07-12',
      value: 127350
    },
    {
      date: '2018-07-13',
      value: 126450
    },
    {
      date: '2018-07-14',
      value: 125540
    },
    {
      date: '2018-07-15',
      value: 125680
    },
    {
      date: '2018-07-16',
      value: 124870
    },
    {
      date: '2018-07-17',
      value: 129600
    },
    {
      date: '2018-07-18',
      value: 124300
    },
    {
      date: '2018-07-19',
      value: 127350
    }
  ];

  offset: number;
  axisYLeft: number[] = [];
  axisX: string[] = [];
  displayValue: boolean = false;
  displayAxis: boolean = false;
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

  displayMinValue: boolean = true;
  displayMaxValue: boolean = true;

  displayStartMonth: boolean = true;
  displayEndMonth: boolean = true;

  chartLineStartCoord: number;

  @ViewChildren(AxisValueDirective, { read: ElementRef }) axisValues: QueryList<ElementRef>;
  @ViewChildren(AxisXValueDirective, { read: ElementRef }) axisXValues: QueryList<ElementRef>;

  constructor(private renderer: Renderer2) { }

  ngOnInit() {
    this.interpolate();
    this.renderColumns();
    this.axisYValues();
    this.axisXValues();
  }

  ngAfterViewInit() {
    // this.axisValues.forEach(value => console.log(value.nativeElement));
  }

  // 50 350
  interpolate() {
    let elCount = this.data.length;
    let min = this.min(this.data);
    let max = this.max(this.data);

    this.offset = Math.round(460 / (elCount - 1));
    // this.offset = Math.round((460 - this.columnWidth) / (elCount - 1));
    // this.chartLineStartCoord = 70 + (this.columnWidth / 2);

    for (let i = 0; i < elCount; i++) {
      this.data[i].coord = 400 - (50 + (this.data[i].value - min) / (max - min) * (350 - 50));
      if (i !== elCount - 1) {
        this.line += (70 + this.offset * i) + ',' +  this.data[i].coord + ' L';
      } else {
        this.line += (70 + this.offset * i) + ',' +  this.data[i].coord;
      }
    }
  }

  renderColumns() {
    let elCount = this.columns.length;
    let min = this.min(this.columns);
    let max = this.max(this.columns);

    // this.columnWidth = Math.round((400 - (5 * elCount - 1)) / (elCount - 1));
    // console.log(this.columnWidth);
    this.columnWidth = 1;

    this.columnOffset =  this.columnWidth + 5;

    for (let i = 0; i < elCount; i++) {
      this.columns[i].coord = 400 - (50 + (this.columns[i].value - min) / (max - min) * (350 - 50));
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

  /**
   * Calculates the Y axis values.
   */
  axisYValues() {
    let elCount = this.data.length;
    let max = this.max(this.data);
    let min = this.min(this.data);
    // console.log('Min: ', min, 'Max: ', max);
    let diff = max - min;
    let step = diff / 300;
    // console.log('Diff: ', diff, 'Step:', step);

    

    this.minValue = min;
    this.maxValue = max;

    this.axisYLeft.push(min);

    while (min < max) {
      min = min + step;
      this.axisYLeft.push(Math.trunc(min));
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
   * Calculate X  axis values.
   */
  axisXValues() {
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
   *
   */
  move(event) {
    this.displayValue = true;
    this.x = event.x;
    this.y = event.y;

    // console.log('X: ', this.x);
    // console.log('Y: ', this.y);

    if ((this.x < 57 || this.x > 560) || (this.y < 57 || this.y > 360)) {
      // Display min value on the Y axis, when cursor goes out the chart
      this.displayMinValue = true;
      // Display max value on the Y axis, when cursor goes out the chart
      this.displayMaxValue = true;

      // Display start month name on the X axis, when cursor goes out the chart
      this.displayStartMonth = true;
      // Display end month name on the X axis, when cursor goes out the chart
      this.displayEndMonth = true;

      this.displayAxis = false;
    } else {
      this.displayAxis = true;
      this.axisValues.forEach((value, i) => {
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
    if (540 - x < 25) {
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
}
