import './PatientHealthDashboard.css';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import FixedHeaderTable from '../components/MaterialUITable';
import BarChart from '../components/BarChart';
import HourlyChart from '../components/HourlyChart';
import CombinationChart from '../components/CombinationCharts';

const PatientHealthDashboard = () => {
  const { patientId } = useParams();

  const [isFetching, setIsFetching] = useState(false);

  const tableTitle = "Patient Sympton";
  const [tableRecords , setTableRecords] = useState([
    {id: 1, datetime: "2020-01-01 12:23:20", sympton: "Flu and tired"},
    {id: 2, datetime: "2020-01-02 10:23:20", sympton: "Thorat pain"},
    {id: 3, datetime: "2020-01-03 16:23:20", sympton: "High Fever with temperature 28.5 degree celsius"}
  ]);

  // useEffect(() => {
  //   fetch("api/data")
  //     .then(res => setHealthRecords(res.data), [])
  // })

  const barChartData = [
    { label: '25/10-31/10', value: '137' },
    { label: '1/11-7/11', value: '126' },
    { label: '8/11-14/11', value: '154' },
    { label: '15/11-21/11', value: '460' },
    { label: '22/11-28/11', value: '516' },
    { label: '29/11-5/12', value: '316' },
    { label: '6/12-12/12', value: '516' },
    { label: '13/12-19/12', value: '616' },
    { label: '20/12-26/12', value: '1240' },
    { label: '27/12-2/01', value: '260' },
    { label: '3/01-9/01', value: '290' },
    { label: '10/01-17/01', value: '116' }
  ];
  const barChartTitle = "Weekly Steps Count";
  const barChartSubTitle = "Last 12 weeks";
  const barChartXaxis = "Period";
  const barChartYaxis = "Total Steps Count";

  const combineChartCategories = [
    {
      category: [
        {
          label: "07/01"
        },
        {
          label: "08/01"
        },
        {
          label: "09/01"
        },
        {
          label: "10/01"
        },
        {
          label: "11/01"
        },
        {
          label: "12/01"
        },
        {
          label: "13/01"
        },
        {
          label: "14/01"
        },
        {
          label: "15/01"
        },
        {
          label: "16/01"
        }
      ]
    }
  ];
  const combineChartData = [
    {
      seriesname: "Excersie Duration",
      plottooltext: "Duration: $dataValue",
      data: [
        {
          value: "71"
        },
        {
          value: "59"
        },
        {
          value: "67"
        },
        {
          value: "11"
        },
        {
          value: "13"
        },
        {
          value: "13"
        },
        {
          value: "28"
        },
        {
          value: "17"
        },
        {
          value: "17"
        },
        {
          value: "10"
        }
      ]
    },
    {
      seriesname: "Calories Burned",
      parentyaxis: "S",
      renderas: "line",
      plottooltext: "$dataValue caroies burned",
      showvalues: "0",
      data: [
        {
          value: "28.0"
        },
        {
          value: "35.2"
        },
        {
          value: "23.9"
        },
        {
          value: "11.8"
        },
        {
          value: "18.0"
        },
        {
          value: "26.9"
        },
        {
          value: "11.1"
        },
        {
          value: "11.2"
        },
        {
          value: "24.0"
        },
        {
          value: "18.9"
        }
      ]
    }
  ];
  const combineChartTitle = "Daily Excercise";
  const combineChartSubTitle = "Last 14 days";
  const combineChartXaxis = "Days";
  const combineChartYaxis = "Excerise Duration (Minutes)";
  const combineChartCoyaxis = "Calories Burned";

  return (
    <div className="app-page">
      {patientId && !isNaN(Number.parseInt(patientId)) ? 
      <div>
        <div className="patient-info">
          <p><b>Yaw Jian Hao</b></p>
        </div>
        {/* Dashboard */}
        <div className="health-dashboard">
          {tableRecords.length > 0 ? 
            <div>
              <FixedHeaderTable title={tableTitle} records={tableRecords} />
            </div>
          :
            <div></div>
          }
          <BarChart data={barChartData} 
            title={barChartTitle} subTitle={barChartSubTitle}
            xaxis={barChartXaxis} yaxis={barChartYaxis} />

          {/* <HourlyChart /> */}

          <CombinationChart data={combineChartData} categories={combineChartCategories}
            title={combineChartTitle} subTitle={combineChartSubTitle}
            xaxis={combineChartXaxis} yaxis={combineChartYaxis} coyaxis={combineChartCoyaxis}/>
        </div>
        {/* Dashboard End */}
      </div>
      : <div></div>} 
    </div>
  )
}

export default PatientHealthDashboard;