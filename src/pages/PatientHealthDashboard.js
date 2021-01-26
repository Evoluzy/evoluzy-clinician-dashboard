import './PatientHealthDashboard.css';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Switch from '@material-ui/core/Switch';
import Paper from '@material-ui/core/Paper';
import Grow from '@material-ui/core/Grow';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import BarChart from '../components/BarChart';
import HealthDataTable from '../components/HealthDataTable';

import {formatCaloriesBurnedData, formatHeartMinutesData, formatSleepData, formatDailyStepCountData, formatOverviewData, formatWeeklyStepCountData} from "../utils/DashboardUtils";

const PatientHealthDashboard = () => {
  const { patientId } = useParams();
  const SERVER_URL = "";

  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState("");

  const [patientName, setPatientName] = useState("Howard Yaw");
  
  const healthDataTitle = "Health Data Details";
  const [healthDataDetails, setHealthDataDetails] = useState([
    {date: "18/01", hours: "7.3", sleepPeriod: "23:00:00 - 06:30:00", points: "20", calories: "283.2", count: "234"},
    {date: "17/01", hours: "7.3", sleepPeriod: "23:00:00 - 06:30:00", points: "20", calories: "283.2", count: "234"},
    {date: "16/01", hours: "7.3", sleepPeriod: "23:00:00 - 06:30:00", points: "20", calories: "283.2", count: "234"}
  ])

  useEffect(() => {
    if (healthDataDetails.length === 0) {
      setIsFetching(true);
      const options = {
        method: "GET",
        mode: 'cors',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          patientId: patientId
        })
      }
      // fetch("viewAnalytics", options)
      fetch("../static.dummy.json")
        .then(res => {
          console.log("RES", res)
          // if (res.status === 200) {
            return res.json()
          // } else {
          //   return false
          // }
        })
        .then(data => {
          console.log("DATA", data)
          if (data) {
            setPatientName(data.patientName);
            setSleepTimeData(formatSleepData(data.sleep));
            setCaloriesBurnedData(formatCaloriesBurnedData(data.caloriesBurned));
            setHeartMinutesData(formatHeartMinutesData(data.heartMinutes));
            // setStepCount(formatDailyStepCountData(data.step.daily));
            setStepCount(formatWeeklyStepCountData(data.step.weeklyAverage));
            setHealthDataDetails(formatOverviewData(
              data.sleep, data.heartMinutes, data.caloriesBurned, data.step.daily
            ));
          } else {
            setError("No Health Data Found");
          }
        })
        .finally(() => {
          setIsFetching(false);
        })
    }
  })

  const [stepCountData, setStepCount] = useState([
    { label: '10/01-17/01', value: '116' },
    { label: '3/01-9/01', value: '290' },
    { label: '27/12-2/01', value: '260' },
    { label: '20/12-26/12', value: '1240' },
    { label: '13/12-19/12', value: '616' }
  ]);
  const stepCountTitle = "Daily Steps Count";
  const stepCountSubTitle = "Last 14 Days";
  const stepCountXaxis = "Period";
  const stepCountYaxis = "Steps Count";
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

  const dummyRes = {
    patientName: "Howard",
    sleep: [
      {date: "18/01", "hours": 7.5, start: "23:00:00", end: "06:30:00"},
      {date: "17/01", "hours": 9, start: "23:30:00", end: "08:30:00"},
      {date: "16/01", "hours": 0, start: "", end: ""},
      {date: "15/01", "hours": 8.5, start: "23:00:00", end: "07:30:00"},
      {date: "14/01", "hours": 8, start: "00:00:00", end: "08:00:00"},
      {date: "13/01", "hours": 6, start: "00:10:00", end: "06:10:00"},
      {date: "12/01", "hours": 0, start: "", end: ""},
      {date: "11/01", "hours": 7.5, start: "00:30:00", end: "08:00:00"}
    ],
    heartMinutes: [
      {date: "18/01", "points": 0},
      {date: "17/01", "points": 0},
      {date: "16/01", "points": 26},
      {date: "15/01", "points": 26.5},
      {date: "14/01", "points": 26},
      {date: "13/01", "points": 26},
      {date: "12/01", "points": 26},
      {date: "11/01", "points": 26.4}
    ],
    caloriesBurned: [
      {date: "18/01", "calories": 26.4},
      {date: "17/01", "calories": 26},
      {date: "16/01", "calories": 0},
      {date: "15/01", "calories": 0},
      {date: "14/01", "calories": 26},
      {date: "13/01", "calories": 0},
      {date: "12/01", "calories": 0},
      {date: "11/01", "calories": 26.4}
    ],
    step: {
      weeklyAverage: [
        {label: "10/01-16/01", average: "80"},
        {label: "03/01-09/01", average: "96"},
        {label: "27/12-02/01", average: "124"},
        {label: "20/12-26/12", average: "100"},
        {label: "13/12-19/12", average: "95"}
      ],
      daily: [
        {date: "18/01", count: "123"},
        {date: "17/01", count: "123"},
        {date: "16/01", count: "0"},
        {date: "15/01", count: "123"},
        {date: "14/01", count: "72"},
        {date: "13/01", count: "215"},
        {date: "12/01", count: "123"},
        {date: "11/01", count: "217"}
      ]
    },
  }

  return (
    <div className="app-page">
      {patientId && !isNaN(Number.parseInt(patientId)) ? 
      <div>
        {Boolean(patientName) &&(
        <div className="patient-info">
          <h2>{patientName}</h2>
        </div>
        )}
        
        {/* Dashboard */}
        <div className="health-dashboard">
          {/* Charts */}
          <div className="row charts">
            {stepCountData.length > 0 && (
            <div className="col-12 col-md-6">
              <BarChart data={stepCountData.reverse()} 
                title={stepCountTitle} subTitle={stepCountSubTitle}
                xaxis={stepCountXaxis} yaxis={stepCountYaxis} 
                colorPalette={stepCountColorPalette} tooltipText={stepCountTooltipText} />
            </div>
            )}
            {sleepTimeData.length > 0 && (
            <div className="col-12 col-md-6">
              <BarChart data={sleepTimeData.reverse()} 
                  title={sleepTimeTitle} subTitle={sleepTimeSubTitle}
                  xaxis={sleepTimeXaxis} yaxis={sleepTimeYaxis} 
                  tooltipText={sleepTimeTooltipText} />
            </div>
            )}
            {heartMinutesData.length > 0 && (
            <div className="col-12 col-md-6">
              <BarChart data={heartMinutesData.reverse()} 
                title={heartMinutesTitle} subTitle={heartMinutesSubTitle}
                xaxis={heartMinutesXaxis} yaxis={heartMinutesYaxis} 
                colorPalette={heartMinutesColorPalette} tooltipText={heartMinutesTooltipText} />
            </div>
            )}
            {caloriesBurnedData.length > 0 && (
            <div className="col-12 col-md-6">
              <BarChart data={caloriesBurnedData.reverse()} 
                title={caloriesBurnedTitle} subTitle={caloriesBurnedSubTitle}
                xaxis={caloriesBurnedXaxis} yaxis={caloriesBurnedYaxis} 
                colorPalette={caloriesBurnedColorPalette} tooltipText={caloriesBurnedTooltipText} />
            </div>
            )}

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
        <h3>Error! Not Health Data</h3>
        {Boolean(error) && (
          <p>{error}</p>
        )}
        <button className="btn btn-danger" onClick={() => window.history.go(-1)}>Back</button>
      </div>
      } 
    </div>
  )
}

export default PatientHealthDashboard;