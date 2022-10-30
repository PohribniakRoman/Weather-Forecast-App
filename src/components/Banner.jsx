import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';
import FetchCity from "./FetchCity";
import UnsplashSearch from "./UnsplashSearch"

export default function Banner() {
    const [photo,updatePhoto] = useState('');
    const navigate = useNavigate();

    useEffect(()=>{
        async function getPhoto() {
            updatePhoto(await UnsplashSearch("weather",20,true));
        }
        getPhoto();
    },[])
    

    if (!photo) {
        return "loading..."
    }
   
    return(
        <section className="banner">
            <div className="banner__container">
                <Form className="banner__container--main" onSubmit={async (event)=>{
                    event.preventDefault();
                    const cityName = event.target.city.value.trim().toLowerCase();
                    const data = await FetchCity(cityName);
                    if(parseInt(data.cod) === 200){
                        localStorage.setItem("data",JSON.stringify(data))
                        navigate(`/city/${cityName}`);
                    }else{
                        alert(`We can't find city with name ${cityName}`)
                    }}}>
                    <Stack gap={3} className="col-md-10 mx-auto">
                        <h1>Welcome!</h1>
                        <Form.Control type="text" placeholder="Enter your city name" name="city" />
                        <Button variant="primary" type="submit">Search</Button>
                    </Stack>
                </Form>
                <div className="banner__container--photo" style={{backgroundImage:`url(${photo})`}}></div>
            </div>
        </section>
    );
}       