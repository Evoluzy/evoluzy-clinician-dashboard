import './PatientHealthDashboard.css';
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import BarChart from '../components/BarChart';

const PatientHealthDashboard = () => {
  const { patientId } = useParams();
  const [ healthRecords ] = useState([
    {id: 1, date: "2020-09-01", summary: "Flu"},
    {id: 2, date: "2020-11-01", summary: "Headache"}
  ]);

  const barChartData = [
    { label: 'Venezuela', value: '290' },
    { label: 'Saudi', value: '260' },
    { label: 'Canada', value: '180' },
    { label: 'Iran', value: '140' },
    { label: 'Russia', value: '115' },
    { label: 'UAE', value: '100' },
    { label: 'US', value: '30' },
    { label: 'China', value: '30' }
  ];
  const barChartTitle = "Weekly Steps Count";
  const barChartSubTitle = "Last 3 months record";
  const barChartXaxis = "Country";
  const barChartYaxis = "Reserves (MMbbl)";

  return (
    <div className="app-page">
      {/* {patientId && isNaN(Number.parseInt(patientId)) ?  */}
      <div>
        <div className="patient-info">
          <p><b>Yaw Jian Hao</b></p>
        </div>
        {/* Dashboard */}
        <div className="health-dashboard">
          {healthRecords.length > 0 ? 
            <div>
              <span className="chart-title">Health Record</span>
              <table>
                <tr>
                  <th>No</th>
                  <th>Date</th>
                  <th>Record Summary</th>
                </tr>
                {healthRecords.map((record, index) => (
                  <tr>
                    <td>{index + 1}</td>
                    <td>{record.date}</td>
                    <td>{record.summary}</td>
                  </tr>
                ))}
              </table>
            </div>
          :
            <div></div>
          }
          <BarChart data={barChartData} 
            title={barChartTitle} subTitle={barChartSubTitle}
            xaxis={barChartXaxis} yaxis={barChartYaxis} />
        </div>
        {/* Dashboard End */}
      </div>
      {/* : <div></div>} */}
    </div>
  )
}

export default PatientHealthDashboard;