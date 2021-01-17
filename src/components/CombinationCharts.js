import React from "react";
import FusionCharts from "fusioncharts";
import charts from "fusioncharts/fusioncharts.charts";
import ReactFusioncharts from "react-fusioncharts";

// Resolves charts dependancy
charts(FusionCharts);

class CombinationChart extends React.Component {

  constructor(props) {
    super(props);

    this.dataSource = {
      chart: {
        caption: this.props.title,
        subcaption: this.props.subTitle,
        yaxisname: this.props.yaxis,
        syaxisname: this.props.coyaxis,
        // labeldisplay: "rotate",
        // snumbersuffix: "%",
        // scrollheight: "10",
        // numvisibleplot: "10",
        drawcrossline: "1",
        theme: "fusion"
      },
      categories: this.props.categories,
      dataset: this.props.data
    }
  }

  render() {
    return (
      <ReactFusioncharts
        type="scrollcombidy2d"
        width="600"
        height="400"
        dataFormat="JSON"
        dataSource={this.dataSource}
      />
    );
  }
}

export default CombinationChart;
