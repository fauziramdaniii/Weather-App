import background from './assets/background.jpg';


function App() {
  return (
    <div className="app" style={{ backgroundImage: `url(${background})` }}>
        <div className="overlay">
          <div className="container">
            <div className="section section__inputs">
              <input type="text" name='city' placeholder='Entere a City Name' />
              <button type='submit'> ℃ </button>
            </div>

            <div className="section section__temperature">
              <div className="icon">
                <h3> Jakarta, ID</h3>
                <img src="https://openweathermap.org/img/wn/02d@2x.png" alt="weatherIcon" />
                <h3> Cloudy </h3>
              </div>
              <div className='temperature'>
             <h1> 34 ℃ </h1>
              </div>
            </div>

          </div>
        </div>
    </div>
  )
}

export default App
