import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { getAddress } from '../../../http/geoAPI';
import ReactDOMServer from 'react-dom/server';

function MapContainerForStorageCreate(props) {
    const mapRef = useRef(null);
    const mapInstanceRef = useRef(null); // Добавляем новую ссылку для хранения объекта карты
    let markerRef = useRef(null);
    const [coords, setСоrds] = useState([55.75156485204238, 37.61813163757325])
    const [size, setSize] = useState(10)
    const [refreshCoord, setRefreshCoord] = useState(false)

    // Инициализация карты при монтировании компонента
    useEffect(() => {
        if(props.mapEdit){
            setSize(10)
            if (navigator.geolocation && props.type == "create") {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        setSize(15)
                        setСоrds([position.coords.latitude, position.coords.longitude])
                        setRefreshCoord(true)
                    }
                  );
            }
        }else{
            if(props.type && props.type == "points"){
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(
                        (position) => {
                            setSize(12)
                            setСоrds([position.coords.latitude, position.coords.longitude])
                            setRefreshCoord(true)
                        }
                      );
                }else{
                    setСоrds([55.75156485204238, 37.61813163757325])
                    setSize(10)
                    setRefreshCoord(true)
                }
            }else{
                setСоrds(props.coords)
                setSize(17)
                setRefreshCoord(true)
            }
        }
        // Создаем карту
        const map = L.map(mapRef.current).setView(coords, size);
        mapInstanceRef.current = map; // Сохраняем объект карты

        // Добавляем слой OpenStreetMap
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);
        // Устанавливаем обработчик события щелчка по карте
        function onMapClick(e) {
            if(props.mapEdit){
                getAddress(e.latlng.lat+'/'+e.latlng.lng, true).then((result) => {
                    props.setPointData(JSON.parse(result.data));
                });
                // Удаляем предыдущий маркер, если он существует
                if (markerRef.current) {
                    map.removeLayer(markerRef.current);
                }
                // Добавляем новый маркер
                markerRef.current = L.marker([e.latlng.lat, e.latlng.lng]).addTo(map);
            }
        }




        const storage = L.icon({
            iconUrl: 'http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|2ecc71&chf=a,s,ee00FFFF',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34]
        });






        if(!props.mapEdit){
            

            if (props.type && props.type === "points") {
                for (let coord in props.coords) {
                    // Создание HTML строки из JSX с помощью ReactDOMServer.renderToString()
                    const popupContent = ReactDOMServer.renderToString(
                        <a href={`/storages/id/${props.coords[coord].id}`} className="btn btn-lg btn-secondary fw-bold border-white bg-white text-dark">
                            Посмотреть
                        </a>
                    );

                    // Добавление маркера на карту и привязка всплывающего окна
                    var marker = L.marker(props.coords[coord].coord.split("/")).addTo(map);
                    marker.bindPopup(popupContent, { direction: 'bottom' });
                }
            } else {
                markerRef.current = L.marker(props.coords).addTo(map);
            }

        }
        // Добавляем обработчик события щелчка по карте
        map.on('click', onMapClick);

        // Удаляем обработчик события при размонтировании компонента
        return () => {
            map.off('click', onMapClick);
            map.remove();
        };
    }, [refreshCoord]);

    // Обновляем маркер при изменении координат
    useEffect(() => {
        if(props.mapEdit){
            if(props.coords.length > 0){
                const map = mapInstanceRef.current; // Используем сохраненный объект карты
                if (map) {
                    if (markerRef.current) {
                        map.removeLayer(markerRef.current);
                    }
                    markerRef.current = L.marker(props.coords).addTo(map);
                    map.setView(props.coords, 16);
                }
            }
        }
    }, [props.coords]);

    return (
        <div>
            <div ref={mapRef} style={{ width: '100%', height: '400px' }}></div>
        </div>
    );
}

export default MapContainerForStorageCreate;
