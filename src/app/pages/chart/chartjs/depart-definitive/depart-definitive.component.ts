import { Component, OnInit } from '@angular/core';
import { ChartService } from '../../chart.service';
import { Color, Label } from 'ng2-charts';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts/ng2-charts';

@Component({
  selector: 'app-depart-definitive',
  templateUrl: './depart-definitive.component.html',
  styleUrls: ['./depart-definitive.component.scss']
})
export class DepartDefinitiveComponent implements OnInit {


  public barChartLabels: Label[] = [];
  public chartLabels: Label[] = [];

  public barChartType: ChartType = 'horizontalBar';
  lstNbr:number[];
  lstNbrr:number[];

  public barChartData: ChartDataSets[] = [
    { data: [], label: 'Series A' },

  ];
  list:any[]=[]
  // bread crumb items
  breadCrumbItems: Array<{}>;



  constructor(private serv :ChartService) { }

  ngOnInit() {
    this.breadCrumbItems = [{ label: 'Charts' }, { label: 'Chartjs chart', active: true }];

   /**
    * Fetches the data
    */
 

  }

  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{ticks: {  beginAtZero: true }}], yAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
        font: {
          size: 20,
        }
      }
    }
  };
  public barChartLegend = true;

  lineChartColors: Color[] = [
    {
      borderColor: '#34c38f',
      backgroundColor: '#556ee6', 
    },
  ];
  /**
   * Fetch chart's data
   */
  // private _fetchData() {
  //   // Line Chart data
  //   this.lineAreaChart = lineAreaChart;
  //   // Bar Chart data
  //   this.lineBarChart = lineBarChart;
  //   // Pie Chart data
  //   this.pieChart = pieChart;
  //   // Donut Chart
  //   this.donutChart = donutChart;

  //   // Radar Chart data
  //   this.radarChart = radarChart;
  //   // Financial Report
  //   this.polarChart = polarChart;
  // }
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public randomize(): void {
    // Only Change 3 values
    const data = [
      Math.round(Math.random() * 100),
      59,
      80,
      (Math.random() * 100),
      56,
      (Math.random() * 100),
      40];
    const clone = JSON.parse(JSON.stringify(this.barChartData));
    clone[0].data = data;
    this.barChartData = clone;
    /**
     * (My guess), for Angular to recognize the change in the dataset
     * it has to change the dataset variable directly,
     * so one way around it, is to clone the data, change it and then
     * assign it;
     */
  }

  

 getChart(event:any){
this.barChartLabels=[]
    this.lstNbr=[]
    this.serv.GetDepartDefinitive(event.target.value).subscribe((data:Object[])=>{
      
     this.list=data
     console.log(this.list)
      data.forEach(element => {

        this.lstNbr.push(element["total"]);
        this.barChartLabels.push(element["lib_TYP_DEPART"]);



      });


       this.barChartData=[
         { data: this.lstNbr,
            label: 'Nombre de jour de congé' },
       ]
    })
  


  }

}

