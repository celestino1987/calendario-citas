
import './App.css';
import { CalendaryApp } from './components/CalendaryApp';
import { NavarDrawer } from './components/NavarDrawer';
import { DataProvider } from "./components/context/DaysContext";


function App() {
  return (
    <DataProvider>
      <div className="App">

        <CalendaryApp />
        <NavarDrawer />

      </div>
    </DataProvider>
  );
}

export default App;
