import './PatientHealthDashboard.css';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Switch from '@material-ui/core/Switch';
import Paper from '@material-ui/core/Paper';
import Grow from '@material-ui/core/Grow';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import BarChart from '../components/BarChart';
import LineChart from '../components/LineChart';
import HealthDataTable from '../components/HealthDataTable';

import {formatCaloriesBurnedData, formatHeartMinutesData, formatSleepData, formatDailyStepCountData, formatOverviewData, formatWeeklyStepCountData} from "../utils/DashboardUtils";

const PatientHealthDashboard = () => {
  const { patientId } = useParams();
  const SERVER_URL = "https://evoluzy.et.r.appspot.com";

  const [firstMount, setFirstMounted] = useState(true);

  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState("");

  const [patientName, setPatientName] = useState("");
  
  const healthDataTitle = "Health Data Details";
  const [healthDataDetails, setHealthDataDetails] = useState([]);

  // [
  //   {date: "18/01", hours: "7.5", sleepPeriod: "23:00:00 - 06:30:00", points: "0", calories: "126.4", count: "116"},
  //   {date: "17/01", hours: "9", sleepPeriod: "23:30:00 - 08:30:00", points: "0", calories: "126", count: "290"},
  //   {date: "16/01", hours: "0", sleepPeriod: "", points: "26", calories: "283.2", count: "260"},
  //   {date: "15/01", hours: "8.5", sleepPeriod: "23:00:00 - 07:30:00", points: "26.5", calories: "0", count: "240"},
  //   {date: "14/01", hours: "8", sleepPeriod: "00:00:00 - 08:00:00", points: "26", calories: "126", count: "346"},
  //   {date: "13/01", hours: "6", sleepPeriod: "00:10:00 - 06:10:00", points: "26", calories: "0", count: "96"},
  //   {date: "12/01", hours: "0", sleepPeriod: "", points: "26", calories: "0", count: "156"},
  //   {date: "11/01", hours: "7.5", sleepPeriod: "00:30:00 - 08:00:00", points: "26.4", calories: "126.4", count: "482"},
  //   {date: "10/01", hours: "7.5", sleepPeriod: "23:00:00 - 06:30:00", points: "0", calories: "126.4", count: "116"},
  //   {date: "09/01", hours: "9", sleepPeriod: "23:30:00 - 08:30:00", points: "0", calories: "126", count: "290"},
  //   {date: "08/01", hours: "0", sleepPeriod: "", points: "26", calories: "283.2", count: "260"},
  //   {date: "07/01", hours: "8.5", sleepPeriod: "23:00:00 - 07:30:00", points: "26.5", calories: "0", count: "240"},
  //   {date: "06/01", hours: "8", sleepPeriod: "00:00:00 - 08:00:00", points: "26", calories: "126", count: "616"},
  //   {date: "05/01", hours: "6", sleepPeriod: "00:10:00 - 06:10:00", points: "26", calories: "0", count: "527"},
  //   {date: "04/01", hours: "0", sleepPeriod: "", points: "26", calories: "152", count: "378"},
  //   {date: "03/01", hours: "7.5", sleepPeriod: "00:30:00 - 08:00:00", points: "34", calories: "134", count: "376"}
  // ]

useEffect(() => {
    if (healthDataDetails.length === 0) {
      setIsFetching(true);
      const options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      }
      fetch(`${SERVER_URL}/viewAnalytics?patientId=${patientId}`, options)
        .then(res => res.json())
        .then(data => {
          // console.log("DATA", data)
          if (data) {
            setPatientName(data.patientName);
            setSleepTimeData(formatSleepData(data.sleep));
            console.log(formatSleepData(data.sleep));
            setCaloriesBurnedData(formatCaloriesBurnedData(data.caloriesBurned));
            console.log(formatCaloriesBurnedData(data.caloriesBurned));
            setHeartMinutesData(formatHeartMinutesData(data.heartMinutes));
            console.log(formatHeartMinutesData(data.heartMinutes));
            // setStepCount(formatDailyStepCountData(data.step.daily));
            setStepCount(formatDailyStepCountData(data.step.daily));
            console.log(formatDailyStepCountData(data.step.daily));
            setHealthDataDetails(formatOverviewData(
              data.sleep, data.heartMinutes, data.caloriesBurned, data.step.daily
            ));
          } else {
            setError("No Health Data Found");
          }
        })
        .finally(() => {
          setIsFetching(false);
          setFirstMounted(false);
        })
    }
  }, [patientId, healthDataDetails])

  const [stepCountData, setStepCount] = useState([]);
  const stepCountTitle = "Daily Steps Count";
  const stepCountSubTitle = "Last 14 Days";
  const stepCountXaxis = "Date";
  const stepCountYaxis = "Steps Count";
  const stepCountColorPalette = "5d62b5";
  const stepCountTooltipText = "Date: $label<br>$value steps";

  const [heartMinutesData, setHeartMinutesData] = useState([]);
  const heartMinutesTitle = "Daily Heart Minutes";
  const heartMinutesSubTitle = "Last 14 days";
  const heartMinutesXaxis = "Date";
  const heartMinutesYaxis = "Heart Points";
  const heartMinutesColorPalette = "00B0D4";
  const heartMinutesTooltipText = "Date: $label<br>Heart Points: $value";

  const [caloriesBurnedData, setCaloriesBurnedData] = useState([]);
  const caloriesBurnedTitle = "Daily Calories Burned";
  const caloriesBurnedSubTitle = "Last 14 days";
  const caloriesBurnedXaxis = "Date";
  const caloriesBurnedYaxis = "Calories Burned (cal)";
  const caloriesBurnedColorPalette = "0097DC";
  const caloriesBurnedTooltipText = "Date: $label<br>$value calories burned";

  const [sleepTimeData, setSleepTimeData] = useState([]);
  const sleepTimeTitle = "Daily Sleep Duration";
  const sleepTimeSubTitle = "Last 14 days";
  const sleepTimeXaxis = "Date";
  const sleepTimeYaxis = "Total Sleep Duration (Hours)";
  const sleepTimeColorPalette = "29C3BE";
  const sleepTimeTooltipText = "Date: $label<br>Slept $value hours";

  const handleChange = () => {
    setChecked((prev) => !prev);
  };
  const [checked, setChecked] = useState(false);

  return (
    <div className="app-page">
      {patientId ? 
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
              <LineChart data={stepCountData.reverse()} 
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
                  colorPalette={sleepTimeColorPalette} tooltipText={sleepTimeTooltipText} />
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