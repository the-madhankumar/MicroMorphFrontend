import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

import Header from "./components/Header";
import Home from './components/Home';
import UserInput from "./components/UserInput";
import ShowImages from './components/ShowImages';
import About from './components/About';
import GCAnalyzer from './components/Genes'
import Unknown from './components/Unknown';
import Overlap from './components/Overlap';

function App() {
  return (
    <Router>
      <div className='header'><Header /></div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route exact path="/about" element={<About />} />
        <Route exact path="/detect" element={<Home />} />
        <Route exact path="/userinput" element={<UserInput/>}/>
        <Route exact path="/showimages" element={<ShowImages/>}/>
        <Route exact path="/genes" element={<GCAnalyzer/>}/>
        <Route exact path="/dataset" element={<Unknown/>}/>
        <Route exact path="/overlap" element={<Overlap/>}/>
      </Routes>
    </Router>
  );
}

export default App;
