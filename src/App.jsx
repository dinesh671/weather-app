import './App.scss';
import Search from './Search';
import icon from './assets/cloud.svg';

function App() {

  const handleWeatherData = (weatherData) => {
    console.log('Weather data received in App.js:', weatherData);
  };

  return (
    <>
      <h1 className="heading">Weather App</h1>
      <main className="main">
        <div>
          <Search onSearchChange={handleWeatherData} />
          
        </div>
      </main>
    </>
  );
}

export default App;
