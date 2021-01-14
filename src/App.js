import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import PatientHealthDashboard from './pages/PatientHealthDashboard';

function App() {
  return (
    <BrowserRouter>
      <main className="App">
        
        <Switch>
          <Route path="/health-dashboard/:patientId" component={PatientHealthDashboard} />
        </Switch>
      </main>
    </BrowserRouter>
  );
}

export default App;
