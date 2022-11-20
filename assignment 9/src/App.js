import logo from './logo.svg';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import './App.css';
import Input from './App/Input/Input';
import Navbar from './App/Navabar/Navbar';
import Todos from './App/Todos/Todos';
import Update from './App/Update/Update';
import Login from './App/Login/login';
import About from './App/About/About';

function App() {
  return (
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
 

    <Router>
      {/* <Navbar /> */}
      <Login />
      <Routes>
      
          <Route path="/input" element={<Input />}></Route>
          <Route path="/todos" element={<Todos />}></Route>
          <Route path="/update" element={<Update />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/about" element={<About />}></Route>

      
      </Routes>
    </Router>
  );
}

export default App;
