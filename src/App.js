import './App.css';
import WeatherBox from './components/WeatherBox';
import LoadingScreen from './components/LoadingScreen';
import { useEffect } from 'react';
import { useState } from 'react';

function App() {

  const [ lat, setLat ] = useState( null )
  const [ lon, setLon ] = useState( null )
  const [ timestamp, setTimestamp ] = useState( null )

  useEffect( (  ) => {
      const success = pos =>  {
          setLat( pos.coords.latitude )
          setLon( pos.coords.longitude )
          setTimestamp( pos.timestamp )
      }
  
      navigator.geolocation.getCurrentPosition( success );
  }, [  ] )

  return (
    <div className="App">
      < WeatherBox
        lat={ lat }
        lon={ lon }
        timestamp={ timestamp }
      />
      { !lat && < LoadingScreen /> }     
    </div>
  );
}

export default App;
