// Fussion Charts Documentation: https://www.fusioncharts.com/dev/getting-started/react/your-first-chart-using-react
import React from 'react';
import FusionCharts from 'fusioncharts';
import Charts from 'fusioncharts/fusioncharts.charts';
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';
import ReactFC from 'react-fusioncharts';

ReactFC.fcRoot(FusionCharts, Charts, FusionTheme);

class LineChart extends React.Component {

  constructor(props) {
    super(props);

    this.dataSource = {
      chart: {
        caption: this.props.title,
        subCaption: this.props.subTitle,
        xAxisName: this.props.xaxis,
        yAxisName: this.props.yaxis,
        theme: 'fusion',
        palettecolors: this.props.colorPalette ? this.props.colorPalette : "5d62b5",
        plotToolText: this.props.tooltipText ? this.props.tooltipText : "$label<br>$value"
      },
      data: this.props.data
    };
    
    this.chartConfigs = {
      type: 'line',
      width: "100%",
      height: 400,
      dataFormat: 'JSON',
      dataSource: this.dataSource
    };
  }

  render() {
    return (
      <ReactFC {...this.chartConfigs} />
    )
  }
}

export default LineChart;