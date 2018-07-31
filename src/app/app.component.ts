import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  size = {
      width: 500,
      height: 400
  };

  data: any[] = [
    {
      id: 2500,
      grip_date: '2018-07-17',
      price: 0.0380,
      volume: 11970000
    },
    {
      id: 2501,
      grip_date: '2018-07-18',
      price: 0.041,
      volume: 12160000
    },
    {
      id: 2502,
      grip_date: '2018-07-19',
      price: 0.043,
      volume: 12450000
    },
    {
      id: 2503,
      grip_date: '2018-07-20',
      price: 0.045,
      volume: 12850000
    },
    {
      id: 2504,
      grip_date: '2018-07-21',
      price: 0.050,
      volume: 12970000
    },
    {
      id: 2505,
      grip_date: '2018-07-22',
      price: 0.044,
      volume: 13080000
    },
    {
      id: 2506,
      grip_date: "2018-07-23",
      price: 0.048,
      volume: 13145000
    },
    {
      id: 2507,
      grip_date: '2018-07-24',
      price: 0.0320,
      volume: 13233000
    },
    {
      id: 2508,
      grip_date: '2018-07-25',
      price: 0.0330,
      volume: 13140000
    },
    {
      id: 2509,
      grip_date: '2018-07-26',
      price: 0.0360,
      volume: 13045000
    },
    {
      id: 2510,
      grip_date: '2018-07-27',
      price: 0.0340,
      volume: 12960000
    },
    {
      id: 2511,
      grip_date: '2018-07-28',
      price: 0.0310,
      volume: 12560000
    },
    {
      id: 2512,
      grip_date: '2018-07-29',
      price: 0.0280,
      volume: 12190000
    },
    {
      id: 2513,
      grip_date: '2018-07-30',
      price: 0.0250,
      volume: 11770000
    }
  ];
}
