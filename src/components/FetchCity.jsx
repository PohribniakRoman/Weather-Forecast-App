import keys from "../keys";

async function FetchCity(city) {
            const coordResp = await (await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${keys.weather_key}`)).json();
            if(coordResp.cod === 200){
                const {coord} = coordResp; 
                const [lat,lon] = [coord.lat,coord.lon];
                const dataResp = await (await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${keys.weather_key}`)).json();
                return dataResp;
            }
            return coordResp;
}

export default FetchCity;