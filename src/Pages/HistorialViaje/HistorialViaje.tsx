import React, { useEffect, useState } from 'react';
import { useHistorial } from '../Context/HistorialContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const HistorialViaje: React.FC = () => {
  const { viajes } = useHistorial();
  const navigate = useNavigate();
  const [weatherHistory, setWeatherHistory] = useState<{ weatherCancun: string }[]>([]);

  const locations: { [key: string]: [number, number] } = {
    "Cancun": [21.14453547074726, -86.82466337671946], 
  };

  const fetchWeather = async (lat: number, lon: number) => {
    try {
      const apiKey = "24643653defaf726aa5dce14bdd9d3e1"; 
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=es`
      );
  
      if (response.data.weather && response.data.weather.length > 0) {
        return response.data.weather[0].description;
      } else {
        return "No se encontró información del clima";
      }
    } catch (error) {
      console.error("Error al obtener el clima:", error);
      return "Información no disponible";
    }
  };

  useEffect(() => {
    const fetchWeatherData = async () => {
      const weatherData = [];
      const cancunLocation = locations["Cancun"];
      
      if (cancunLocation) {
        const cancunWeather = await fetchWeather(cancunLocation[0], cancunLocation[1]);
        weatherData.push({
          weatherCancun: cancunWeather,
        });
      } else {
        weatherData.push({
          weatherCancun: "Información no disponible",
        });
      }

      setWeatherHistory(weatherData);
    };

    fetchWeatherData();
  }, [viajes]);

  const handleGoBack = () => {
    navigate("/dash");
  };

  return (
    <div className="historial-viaje">
      <h1>Historial de Viajes</h1>
      <div className="viajes-lista">
        {viajes.length === 0 ? (
          <p>No has realizado viajes aún.</p>
        ) : (
          viajes.map((viaje, index) => (
            <div key={index} className="viaje-card">
              <h2>Viaje {index + 1}</h2>
              <p><strong>Fecha:</strong> {viaje.date}</p>
              <p><strong>Hora:</strong> {viaje.time}</p>
              <p><strong>Usuario:</strong> {viaje.user}</p>
              <p><strong>Origen:</strong> {viaje.origin}</p>
              <p><strong>Destino:</strong> {viaje.destination}</p>
              <p><strong>Precio:</strong> ${viaje.price}</p>
              <div className="weather-info">
                <strong>Clima en Cancún:</strong>
                <p>{weatherHistory[0]?.weatherCancun || "Cargando..."}</p>
              </div>
            </div>
          ))
        )}
      </div>
      <button onClick={handleGoBack} className="btn-back">
        Regresar al Dashboard
      </button>
      </div>
  );
};

export default HistorialViaje;
