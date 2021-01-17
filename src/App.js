import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import PatientHealthDashboard from './pages/PatientHealthDashboard';

function App() {
  return (
    <BrowserRouter>
      <main className="App">

        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/health-dashboard/:patientId" component={PatientHealthDashboard} />
        </Switch>
      </main>
    </BrowserRouter>
  );
}

export default App;
