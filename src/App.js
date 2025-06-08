
import gitHubIcon from './icons/github-brands.svg';
import linkedInIcon from './icons/linkedin-in-brands.svg';
import EasyAccessCurrency from './components/EasyAccessCurrency'; 

import './App.css';
import CurrencyHandler from './components/CurrencyHandler';

function App() {
  return (
    <div className="App">
      <nav class='navbar navbar-light bg-light'>
          <h2 class="navbar-brand mb-0 h1">Currency Converter</h2>
      </nav>

      <div className="content container mt-5">
        <CurrencyHandler />

        <div id='easyAccess'>
          <h2>Exchange rates at a quick glance</h2>
          <span>Base currency - 1 USD</span>
          <div id='easyAccessCurrencies'>
            <EasyAccessCurrency currency='CAD'/>
            <EasyAccessCurrency currency='KRW'/>
            <EasyAccessCurrency currency='EUR'/>
            <EasyAccessCurrency currency='JPY'/>
          </div>
        </div>
      </div>

      <footer class="bg-dark text-light">
            <a href='https://github.com/InnyoungSong'><img src={gitHubIcon} alt="gitHubIcon" width="24" height="24" /></a>
            <a><img src={linkedInIcon} alt="gitHubIcon" width="24" height="24" /></a>
      </footer>
    </div>
  );
}

export default App;
