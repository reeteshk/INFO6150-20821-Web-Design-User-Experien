
import './App.css';
import { Navbar } from './Navbar/Navbar';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { Home } from './Home/Home';
import { HourlyWeather } from './Weather/HourlyWeather';
import { getNextFiveDays, getNextFiveDates } from './utils/utils';

function App() {
  const nextFiveDays = getNextFiveDays();
  const nextFiveDates = getNextFiveDates();


  return (
    <div className="container-fluid">
      <Router>
        <div>
          <Navbar />
          <hr />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            {
                        nextFiveDays.map((day, index) => {
                            return (
                              <Route key={'route' + index} path={"/" + day} element={<HourlyWeather date={nextFiveDates[index]} />} />

                            )
                        })
            }
            
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
