import './PatientHealthDashboard.css';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Switch from '@material-ui/core/Switch';
import Paper from '@material-ui/core/Paper';
import Grow from '@material-ui/core/Grow';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import BarChart from '../components/BarChart';
import HealthDataTable from '../components/HealthDataTable';

const PatientHealthDashboard = () => {
  const { patientId } = useParams();

  const [isFetching, setIsFetching] = useState(false);
  
  const healthDataTitle = "Health Data Details";
  const [healthDataDetails, setHealthDataDetails] = useState([
    {date: "18/01", hours: "7.3", sleepPeriod: "23:00:00 - 06:30:00", points: "20", calories: "283.2", count: "234"},
    {date: "17/01", hours: "7.3", sleepPeriod: "23:00:00 - 06:30:00", points: "20", calories: "283.2", count: "234"},
    {date: "16/01", hours: "7.3", sleepPeriod: "23:00:00 - 06:30:00", points: "20", calories: "283.2", count: "234"}
  ])

  // useEffect(() => {
  //   fetch("api/data")
  //     .then(res => setHealthRecords(res.data), [])
  // })

  const [stepCountData, setStepCount] = useState([
    { label: '10/01-17/01', value: '116' },
    { label: '3/01-9/01', value: '290' },
    { label: '27/12-2/01', value: '260' },
    { label: '20/12-26/12', value: '1240' },
    { label: '13/12-19/12', value: '616' }
  ]);
  const stepCountTitle = "Weekly Average Steps Count";
  const stepCountSubTitle = "Last 5 weeks";
  const stepCountXaxis = "Period";
  const stepCountYaxis = "Average Steps Count";
  const stepCountColorPalette = "29C3BE";
  const stepCountTooltipText = "Period: $label<br>$value steps";

  const [heartMinutesData, setHeartMinutesData] = useState([
    {label: "18/01", value: 0},
    {label: "17/01", value: 0},
    {label: "16/01", value: 26},
    {label: "15/01", value: 26.5},
    {label: "14/01", value: 26},
    {label: "13/01", value: 26},
    {label: "12/01", value: 26},
    {label: "11/01", value: 26.4}
  ]);
  const heartMinutesTitle = "Daily Heart Minutes";
  const heartMinutesSubTitle = "Last 14 days";
  const heartMinutesXaxis = "Date";
  const heartMinutesYaxis = "Heart Points";
  const heartMinutesColorPalette = "00B0D4";
  const heartMinutesTooltipText = "Date: $label<br>Heart Points: $value";

  const [caloriesBurnedData, setCaloriesBurnedData] = useState([
    {label: "18/01", value: 26.4},
    {label: "17/01", value: 26},
    {label: "16/01", value: 0},
    {label: "15/01", value: 0},
    {label: "14/01", value: 26},
    {label: "13/01", value: 0},
    {label: "12/01", value: 0},
    {label: "11/01", value: 26.4}
  ]);
  const caloriesBurnedTitle = "Daily Calories Burned";
  const caloriesBurnedSubTitle = "Last 14 days";
  const caloriesBurnedXaxis = "Date";
  const caloriesBurnedYaxis = "Calories Burned (cal)";
  const caloriesBurnedColorPalette = "0097DC";
  const caloriesBurnedTooltipText = "Date: $label<br>$value calories burned";

  const [sleepTimeData, setSleepTimeData] = useState([
    {label: "18/01", value: 7.5, start: "23:00:00", end: "06:30:00"},
    {label: "17/01", value: 9, start: "23:30:00", end: "08:30:00"},
    {label: "16/01", value: 0, start: "", end: ""},
    {label: "15/01", value: 8.5, start: "23:00:00", end: "07:30:00"},
    {label: "14/01", value: 8, start: "00:00:00", end: "08:00:00"},
    {label: "13/01", value: 6, start: "00:10:00", end: "06:10:00"},
    {label: "12/01", value: 0, start: "", end: ""},
    {label: "11/01", value: 7.5, start: "00:30:00", end: "08:00:00"}
  ]);
  const sleepTimeTitle = "Daily Sleep Duration";
  const sleepTimeSubTitle = "Last 14 days";
  const sleepTimeXaxis = "Date";
  const sleepTimeYaxis = "Total Sleep Duration (Hours)";
  const sleepTimeTooltipText = "Date: $label<br>Slept $value hours";

  const handleChange = () => {
    setChecked((prev) => !prev);
  };
  const [checked, setChecked] = useState(false);

  return (
    <div className="app-page">
      {patientId && !isNaN(Number.parseInt(patientId)) ? 
      <div>
        <div className="patient-info">
          <h2>Yaw Jian Hao</h2>
        </div>
        {/* Dashboard */}
        <div className="health-dashboard">
          {/* Charts */}
          <div className="row charts">
            <div className="col-12 col-md-6">
              <BarChart data={stepCountData.reverse()} 
                title={stepCountTitle} subTitle={stepCountSubTitle}
                xaxis={stepCountXaxis} yaxis={stepCountYaxis} 
                colorPalette={stepCountColorPalette} tooltipText={stepCountTooltipText} />
            </div>

            <div className="col-12 col-md-6">
              <BarChart data={sleepTimeData.reverse()} 
                  title={sleepTimeTitle} subTitle={sleepTimeSubTitle}
                  xaxis={sleepTimeXaxis} yaxis={sleepTimeYaxis} 
                  tooltipText={sleepTimeTooltipText} />
            </div>

            <div className="col-12 col-md-6">
              <BarChart data={heartMinutesData.reverse()} 
                title={heartMinutesTitle} subTitle={heartMinutesSubTitle}
                xaxis={heartMinutesXaxis} yaxis={heartMinutesYaxis} 
                colorPalette={heartMinutesColorPalette} tooltipText={heartMinutesTooltipText} />
            </div>

            <div className="col-12 col-md-6">
              <BarChart data={caloriesBurnedData.reverse()} 
                title={caloriesBurnedTitle} subTitle={caloriesBurnedSubTitle}
                xaxis={caloriesBurnedXaxis} yaxis={caloriesBurnedYaxis} 
                colorPalette={caloriesBurnedColorPalette} tooltipText={caloriesBurnedTooltipText} />
            </div>

          </div>
          {/* Charts End */}
        </div>
        {healthDataDetails.length > 0 ? 
        <div>
          <FormControlLabel
            control={<Switch checked={checked} onChange={handleChange} />}
            label="Show Health Data in Details"
          />
          {checked ? 
          <div>
            <Grow in={checked}>
              <Paper elevation={4}>
                <div>
                  <HealthDataTable title={healthDataTitle} records={healthDataDetails} />
                </div>
              </Paper>
            </Grow>
          </div> : <div></div>}
        </div>
        :
        <div></div>
        }
        {/* Dashboard End */}
      </div>
      : 
      <div>
        <h3>Error</h3>
        <button className="btn btn-danger" onClick={() => window.history.go(-1)}>Back</button>
      </div>
      } 
    </div>
  )
}

export default PatientHealthDashboard;