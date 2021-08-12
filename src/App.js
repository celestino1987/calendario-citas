
import './App.css';
import { CalendaryApp } from './components/CalendaryApp';
import { NavarDrawer } from './components/NavarDrawer';
import { DataProvider } from "./components/context/DaysContext";
import { AppointmentMenu } from './components/AppointmentMenu';

function App() {
  return (
    <DataProvider>
      <div className="App">
        <AppointmentMenu />
        <CalendaryApp />
        <NavarDrawer />
      </div>
    </DataProvider>
  );
}

export default App;
