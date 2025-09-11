import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.html',
  standalone: false,
  styleUrls: ['./dashboard.scss']
})
export class Dashboard implements OnInit {

  currentTemp: string = '--°F';
  currentDesc: string = '--';
  currentRain: string = '--%';
  currentWind: string = '-- mph';
  weatherLocation: string = '';
  forecastData: any[] = [];

  ngOnInit(): void {
    this.requestWeatherUpdate();
  }

  private getDayName(dateStr: string): string {
    const d = new Date(dateStr);
    return d.toLocaleDateString(undefined, { weekday: 'short' });
  }

  private pickWeatherIcon(code: number | null): string {
    if (code === 0) return 'fa-sun';
    if ([1, 2, 3].includes(code!)) return 'fa-cloud-sun';
    if ([45, 48].includes(code!)) return 'fa-smog';
    if ([51, 53, 55, 61, 63, 65, 80, 81, 82].includes(code!)) return 'fa-cloud-rain';
    if ([71, 73, 75, 77, 85, 86].includes(code!)) return 'fa-snowflake';
    if ([95, 96, 99].includes(code!)) return 'fa-bolt';
    return 'fa-cloud';
  }

  private weatherCodeToText(code: number | null): string {
    switch (code) {
      case 0: return 'Clear';
      case 1: return 'Mainly clear';
      case 2: return 'Partly cloudy';
      case 3: return 'Overcast';
      case 45: case 48: return 'Fog';
      case 51: case 53: case 55: return 'Drizzle';
      case 61: case 63: case 65: return 'Rain';
      case 71: case 73: case 75: return 'Snow';
      case 80: case 81: case 82: return 'Rain showers';
      case 95: case 96: case 99: return 'Thunderstorm';
      default: return 'Weather';
    }
  }

  private async fetchWeather(lat: number, lon: number) {
    try {
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max,weathercode,windspeed_10m_max&timezone=auto&temperature_unit=fahrenheit&windspeed_unit=mph`;
      const resp = await fetch(url);
      if (!resp.ok) throw new Error('Weather fetch failed: ' + resp.status);
      const data = await resp.json();

      const cw = data.current_weather || {};
      this.currentTemp = (cw.temperature !== undefined ? Math.round(cw.temperature) : '--') + '°F';
      this.currentDesc = this.weatherCodeToText(cw.weathercode ?? (data.daily?.weathercode?.[0] ?? null));
      this.currentRain = (data.daily?.precipitation_probability_max?.[0] ?? 0) + '%';
      this.currentWind = Math.round(cw.windspeed ?? 0) + ' mph';

      const daily = data.daily || {};
      const times: string[] = daily.time || [];
      const tmax: number[] = daily.temperature_2m_max || [];
      const rainProb: number[] = daily.precipitation_probability_max || [];
      const codes: number[] = daily.weathercode || [];

      this.forecastData = times.map((t, i) => ({
        day: this.getDayName(t),
        temp: Math.round(tmax[i] ?? 0),
        rain: rainProb[i] ?? 0,
        icon: this.pickWeatherIcon(codes[i] ?? null)
      }));

    } catch (err) {
      console.error(err);
      this.weatherLocation = 'Unable to load weather';
      this.currentDesc = 'Error loading weather data';
      this.forecastData = [];
    }
  }

  private requestWeatherUpdate() {
    if (!navigator.geolocation) {
      const fallback = { lat: 41.8780, lon: -93.0977 };
      this.weatherLocation = 'Geolocation not available — showing fallback';
      this.fetchWeather(fallback.lat, fallback.lon);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => this.fetchWeather(pos.coords.latitude, pos.coords.longitude),
      () => {
        const fallback = { lat: 41.8780, lon: -93.0977 };
        this.weatherLocation = 'Location denied — using fallback (Iowa)';
        this.fetchWeather(fallback.lat, fallback.lon);
      },
      { enableHighAccuracy: false, timeout: 8000 }
    );
  }
}
