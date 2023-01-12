import React from "react";
import {YMaps, Map, Polygon, Placemark } from '@pbe/react-yandex-maps';

function Maps (){
    const position = []
    const xhr = new XMLHttpRequest();
    xhr.onload = function() {
        let data = JSON.parse(xhr.response)
        let length = data.length
        for (let i = 0; i < length - 1; i++){
            position.push({
                id: data[i].Id,
                name: data[i].Name,
                location: JSON.parse(data[i].Location),
            })
        }
    };
    xhr.onerror = function() {
    console.log('Ошибка запроса');
    };
    xhr.open("get", "http://agro.energomera.ru:3060/api/field?lastChangeDate=2022-01-01T10:00:00.000&skip=0&take=100", false);
    xhr.send();
    const polygon = position.map(e => {return(<Polygon geometry = {[e.location.Polygon]} options={{
        fill:false,
        strokeColor: "#ffffff",
        strokeWidth: 3,
        balloonContentBody: 'df',
        strokeStyle: "solid",}} key = {e.id}/>)})

    const placemark = position.map(e => {return(<Placemark geometry={ e.location.Center}
        options={
          {
            preset: 'islands#darkGreenStretchyIcon',
          } }
        properties={
          {
          iconContent: `${e.name}`,
        }	}
        key = {e.id}/>)})

        const defaultState = {
            center: position[0].location.Center,
            zoom: 9,
            type: 'yandex#satellite',
            
          };

    return(
        <YMaps > 
            <Map defaultState={defaultState} 
                parameters ={{mapTypes: 'yandex#satellite'}} 
                width='100%' height='700px'>
                {polygon}
                {placemark}
            </Map>
        </YMaps>
    )
}
export default Maps