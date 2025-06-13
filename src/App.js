
import gitHubIcon from './icons/github-brands.svg';
import linkedInIcon from './icons/linkedin-in-brands.svg';
import './App.css'
import Home from './pages/Home';
import Converter from './pages/Converter';
import { Routes, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
      <div className="App">
        <nav className='nav'>
          <div className='navContents'>
            <a className='navContent' href="/"><h2 className="navTitle">Currency Converter</h2></a>
            <Link to="/converter" className="navContent">Converter</Link>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/converter" element={<Converter />} />
        </Routes>

        <footer className="bg-light text-dark">
              <a href='https://github.com/InnyoungSong'><img src={gitHubIcon} alt="gitHubIcon" width="24" height="24" /></a>
              <a><img src={linkedInIcon} alt="gitHubIcon" width="24" height="24" /></a>
        </footer>
      </div>
  );
}

export default App;
