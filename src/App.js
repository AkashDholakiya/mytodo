import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import Navbar from './Components/Navbar'
import Home from './Components/Home'
import About from './Components/About';
import NoteContext from './Context/notes/noteContext';

function App() {
  return (
    <>
    <NoteContext>
      <Router>
        <Navbar/>
          <Routes>
            <Route exact path="/" element={<Home/>}/>
            <Route exact path="/about" element={<About/>}/>
          </Routes>
      </Router>
      </NoteContext>
    </>
  );
}

export default App;
