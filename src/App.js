import './App.css';
import WeatherBox from './components/WeatherBox';
import LoadingScreen from './components/LoadingScreen';

function App() {
  return (
    <div className="App">
      < WeatherBox />
      < LoadingScreen />
    </div>
  );
}

export default App;
