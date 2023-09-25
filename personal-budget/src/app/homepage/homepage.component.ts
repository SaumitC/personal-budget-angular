import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { DataServiceService } from '../data-service.service';
import * as d3 from 'd3';
@Component({
  selector: 'pb-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent implements AfterViewInit {

  private svg: any;
  private margin = 50;
  private width = 750;
  private height = 600;
  // The radius of the pie chart is half the smallest side
  private radius = Math.min(this.width, this.height) / 2 - this.margin;
  private colors :any =[];
  constructor(private dataServiceService: DataServiceService) {}
  ngAfterViewInit(): void {
    this.getBudget();
  }
  private createSvg(): void {
    this.svg = d3.select("#pie-chart")
    .append("svg")
    .attr("width", this.width)
    .attr("height", this.height)
    .append("g")
    .attr(
      "transform",
      "translate(" + this.width / 2 + "," + this.height / 2 + ")"
    );
}
private createColors(data:any): void {
  this.colors = []//
  for (let i = 0; i < data.length; i++) {
    // Generate random RGB values
    const red = Math.floor(Math.random() * 256);
    const green = Math.floor(Math.random() * 256);
    const blue = Math.floor(Math.random() * 256);

    // Create a color string in the format "rgb(red, green, blue)"
    const color = `rgb(${red}, ${green}, ${blue})`;

    // Add the color to the array
    this.colors.push(color);
  }

}
private drawChart(data:any): void {
  // Compute the position of each group on the pie:
  const pie = d3.pie<any>().value((d: any) => Number(d.budget));
console.log(data)
  // Build the pie chart
  this.svg
  .selectAll('pieces')
  .data(pie(data))
  .enter()
  .append('path')
  .attr('d', d3.arc()
    .innerRadius(0)
    .outerRadius(this.radius)
  )
  .attr('fill', (d: any, i: any) => (this.colors[i]))
  .attr("stroke", "#121926")
  .style("stroke-width", "1px");

  // Add labels
  const labelLocation = d3.arc()
  .innerRadius(100)
  .outerRadius(this.radius);

  this.svg
  .selectAll('pieces')
  .data(pie(data))
  .enter()
  .append('text')
  .text((d: any)=> {
    console.log(d);
 return   d.data.title})
  .attr("transform", (d: any) => "translate(" + labelLocation.centroid(d) + ")")
  .style("text-anchor", "middle")
  .style("font-size", 15);
}

  createChart(data: any) {
    var ctx = document.getElementById('myChart') as HTMLCanvasElement;
    var myPieChart = new Chart(ctx, {
      type: 'pie',
      data: data,
    });
  }

  getBudget() {
    this.dataServiceService.getBudgetData().then((data) => {
      this.createChart(data.chartjsData);
      this.createSvg();
      this.createColors(data.pieChartData);
      this.drawChart(data.pieChartData);
    });
  }
}
