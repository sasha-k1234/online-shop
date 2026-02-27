import { Component, OnInit, ViewChild } from '@angular/core';
import Chart, {
  ChartConfiguration,
  ChartData,
  ChartEvent,
  ChartType,
} from 'chart.js/auto';
import { getRelativePosition } from 'chart.js/helpers';
import { AnalyticsService } from '../../../services/analytics.service';
import { CountByCategoryModel } from '../../../models/countByCategory.model';
import { BaseChartDirective } from 'ng2-charts';


@Component({
  selector: 'app-analytics',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './analytics.component.html',
  styleUrl: './analytics.component.css',
})
export class AnalyticsComponent implements OnInit {

  constructor(private analyticsService: AnalyticsService) {}
  ngOnInit(): void {
    this.countByCategory();
    this.getMostViewed();
  }

  @ViewChild(BaseChartDirective) categoryChart: BaseChartDirective | undefined;
  @ViewChild(BaseChartDirective) viewsChart: BaseChartDirective<'bar'> | undefined;

  countByCategory() {
    this.analyticsService.countByCategory().subscribe((res) => {
     
      this.pieChartData = {
        labels: res.map((el) => [el.name , el.count.toString()]),
        datasets: [
          {
            data: res.map((el) => el.count),
          },
        ],
      };
    });
  }

  getMostViewed(){
    this.analyticsService.getMostViewed(5).subscribe((res)=>{
      this.barChartData = {
        labels: res.map((el) => [el.name]),
        datasets: [
          {
            data: res.map((el) => el.views_count),
          },
        ],
      }
    })
  }

  public pieChartOptions: ChartConfiguration['options'] = {
    plugins: {
      legend: {
        display: true,
        position: 'left',
      },
    },
  };
  public pieChartData: ChartData<'pie', number[], string | string[]> = {
    labels:[],
    datasets: [
      {
        data: [],
      },
    ],
  };
  public pieChartType: ChartType = 'pie';

  public chartClicked({
    event,
    active,
  }: {
    event: ChartEvent;
    active: object[];
  }): void {

  }

  
  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    scales: {
      x: {},
      y: {
        min: 0,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  public barChartType = 'bar' as const;

  public barChartData: ChartData<'bar'> = {
    labels:[],
    datasets: [
      
    ],
  };
}
