import React from 'react';
import { useState, useEffect } from 'react';
import useFetch from '../hooks/useFetch';

const WeatherBox = () =>  {

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

    const response = useFetch( `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=5069f4e6dc6c95f751f3e04f873df87a` )

    const dateObject = new Date( timestamp )
    const date = `${ dateObject.toLocaleString("en-US", {weekday: "long"}) }, ${ dateObject.toLocaleString("en-US", {month: "long"}) } ${ dateObject.toLocaleString("en-US", {day: "numeric"}) }`
    const time = `${ dateObject.toLocaleString("en-US", {hour: "numeric"}) } with ${ dateObject.toLocaleString("en-US", {minute: "numeric"}) } minutes`

    const [ tempUnit, setTempUnit ] = useState( 1 )
    const changeTempUnit = (  ) => { 
        if ( tempUnit < 3 ) {
            setTempUnit( tempUnit + 1 )
        }
        else{ setTempUnit( 1 ) }
    }

    if ( response.weather?.[ 0 ].main === 'Thunderstorm' )
    { document.body.style.backgroundImage = "url('https://images.squarespace-cdn.com/content/v1/5c6dc609e666695214ebd4d8/1551308907418-3I24TYNS73S8XGKLP6K5/Thunderstorm.gif')"; }
    else if ( response.weather?.[ 0 ].main === 'Drizzle' )
    { document.body.style.backgroundImage = "url('https://d.wattpad.com/story_parts/788322719/images/15c817445df76b7a963773280333.gif')"; }
    else if ( response.weather?.[ 0 ].main === 'Rain' )
    { document.body.style.backgroundImage = "url('https://c.tenor.com/__gznbyGLKYAAAAC/travel-rain.gif')"; }
    else if ( response.weather?.[ 0 ].main === 'Snow' )
    { document.body.style.backgroundImage = "url('https://c.tenor.com/h7udV_fxDUoAAAAC/snowing-snow.gif')"; }
    else if ( response.weather?.[ 0 ].main === 'Clear' )
    { document.body.style.backgroundImage = "url('https://thumbs.gfycat.com/AmusingBlackKestrel-size_restricted.gif')"; }
    else if ( response.weather?.[ 0 ].main === 'Clouds' )
    { document.body.style.backgroundImage = "url('https://i.giphy.com/media/13bGgH9VnEDsuA/giphy.gif')"; }
    else{ document.body.style.backgroundImage = "url('https://www.advancednanotechnologies.com/wp-content/uploads/2019/05/iStock-1055906130-1080x675.jpg')"; }

    return (
        <div className='weather-box' >
            <main>
                <div className='location'>
                    <h1><i className="fa-solid fa-map-location-dot"></i> { response.name }, { response.sys?.country }</h1>
                    <h2><i className="fa-solid fa-calendar-days"></i> { date }</h2>
                    <h2><i className="fa-solid fa-clock"></i> { time }</h2>
                </div>
                <div className='illustration'>
                    <img src={`http://openweathermap.org/img/wn/${ response.weather?.[ 0 ].icon }@2x.png`} alt="weather illustration" />
                </div>
                <div className='temp'>
                    <h2>
                        <i className="fa-solid fa-temperature-three-quarters"></i>
                        { ( tempUnit === 1 ) ? ` ${ response.main?.temp } K` : 
                        ( tempUnit === 2 ) ? ` ${ ( ( ( response.main?.temp - 273 ) * 1.8 ) + 32 ).toFixed( 2 ) } °F` :
                        ` ${ ( response.main?.temp - 273.1 ).toFixed( 2 ) } °C` }
                    </h2>
                    <button className='change-temp-unit' onClick={ changeTempUnit }>
                        { ( tempUnit === 1 ) ? <h3><i className="fa-solid fa-arrow-right-arrow-left"></i>  Change to Fahrenheit</h3> :
                        ( tempUnit === 2 ) ? <h3><i className="fa-solid fa-arrow-right-arrow-left"></i>  Change to Celsius</h3> :
                        <h3><i className="fa-solid fa-arrow-right-arrow-left"></i>  Change to Kelvin</h3> }
                    </button>
                </div>
            </main>
            <section className='weather-description'>
                <div className='description'>
                    <h2>{(response.weather?.[ 0 ].description)?.toUpperCase()}</h2>
                </div>
                <div className='more-info'>
                    <div className='temp-info'>
                        <h3 className='max-temp'>
                            <i className="fa-solid fa-temperature-high"></i>
                            { ( tempUnit === 1 ) ? ` Max temperature: ${ response.main?.temp_max } K` : 
                            ( tempUnit === 2 ) ? ` Max temperature: ${ ( ( ( response.main?.temp_max - 273 ) * 1.8 ) + 32 ).toFixed( 2 ) } °F` :
                            ` Max temperature: ${ ( response.main?.temp_max - 273.1 ).toFixed( 2 ) } °C` }
                        </h3>
                        <h3 className='min-temp'>
                            <i className="fa-solid fa-temperature-low"></i>
                            { ( tempUnit === 1 ) ? ` Min temperature: ${ response.main?.temp_min } K` : 
                            ( tempUnit === 2 ) ? ` Min temperature: ${ ( ( ( response.main?.temp_min - 273 ) * 1.8 ) + 32 ).toFixed( 2 ) } °F` :
                            ` Min temperature: ${ ( response.main?.temp_min - 273.1 ).toFixed( 2 ) } °C` }
                        </h3>
                        <h3 className='feels-like'>
                            <i className="fa-solid fa-house-chimney"></i>
                            { ( tempUnit === 1 ) ? ` Feels like ${ response.main?.feels_like } K` : 
                            ( tempUnit === 2 ) ? ` Feels like ${ ( ( ( response.main?.feels_like - 273 ) * 1.8 ) + 32 ).toFixed( 2 ) } °F` :
                            ` Feels like ${ ( response.main?.feels_like - 273.1 ).toFixed( 2 ) } °C` }
                        </h3>
                    </div>
                    <div className='other-info'>
                        <div className='wind-speed'>
                            <h3>
                                <i className="fa-solid fa-wind"></i> Wind speed: { response.wind?.speed } m/s
                            </h3>
                        </div>
                        <div className='humidity'>
                            <h3>
                                <i className="fa-solid fa-droplet"></i> Humidity: { response.main?.humidity }%
                            </h3>
                        </div>
                        <div className='pressure'>
                            <h3>
                                <i className="fa-solid fa-minimize"></i> Pressure: { response.main?.pressure } hPa
                            </h3>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default WeatherBox;