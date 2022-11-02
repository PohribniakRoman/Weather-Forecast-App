import { useEffect, useState } from "react";
import {useParams} from "react-router-dom";
import UnsplashSearch from "./UnsplashSearch";
import Button from 'react-bootstrap/Button';
import moment from "moment";
moment.locale(); 
let ind = 0;
export default function WeatherMap() {
    const {city} = useParams();
    const [cityBg,updateBg] = useState("");

    useEffect(()=>{
        async function setBg() {
            updateBg(await UnsplashSearch(`${city}`,20,true))
        }
       setBg()
    })

    if(!localStorage.getItem("data") && cityBg){
        return "loading..."
    }

    const cityData = JSON.parse(localStorage.getItem("data"));
    if(parseInt(cityData.cod) !== 200){
        return "loading..."
    }

    return <section className="weather">
        <section className="weather__main">
            <h1>{cityData.city.name},{cityData.city.country}</h1>
            <h6 className="weather__main--subtitle">Weather forecast for next 5 days</h6>
            <div className="weather__list">
                <div className="weather__list--item">
                    <div className="weather__list--item-header">
                        <h6>Date</h6>
                    </div>
                    <div className="weather__list--item-header">
                        <h6>Temp</h6>
                    </div>
                    <div className="weather__list--item-header">
                        <h6>Weather</h6>
                    </div>
                    <div className="weather__list--item-header">
                        <h6>Wind</h6>
                    </div>
                </div>
                {cityData.list.map((element,ind)=>{
                    return <div id={ind} key={element.dt} className={`weather__list--item created ${ind>5?"inVisible":""}`}>
                            <div className="weather__list--item-header">
                                <p>{moment(element.dt_txt).format('lll')}</p>
                            </div>
                            <div className="weather__list--item-header">
                                <p>{Math.floor(element.main.temp-273.5)}°C | {Math.floor((Math.floor(element.main.temp-273.5)*1.8) +32)}°F</p>
                            </div>
                            <div className="weather__list--item-header">
                            <div style={{width:"50px",height:"50px",backgroundSize:"contain",backgroundImage:`url(https://openweathermap.org/img/w/${element.weather[0].icon}.png)`}}></div>
                                <p>{element.weather[0].main}</p>
                            </div>
                            <div className="weather__list--item-header">
                                <p>{element.wind.speed}m/s</p>
                            </div>
                        </div>
                })}
            </div>
            <Button variant="info" className="time">{moment().format('lll')}</Button>
            <Button variant="info" className="swapBtn" onClick={()=>{
                if(ind+6 === 39){
                    ind = 0;
                } else if(ind+6<39){
                    ind+=6;
                }else {
                    ind = 33;
                }
                document.querySelectorAll(".created").forEach(e=>{
                    e.classList.add("inVisible")
                    if(e.id > ind && e.id < ind+7){
                        e.classList.remove("inVisible")
                    }
            })
            }}>Next →</Button>
        </section>
        <section className="weather__photo" style={{backgroundImage:`url(${cityBg})`}}></section>
    </section>
}