import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { getAddress } from '../../../http/geoAPI';

function MapContainerForIncidentCreate(props) {
    const mapRef = useRef(null);
    const mapInstanceRef = useRef(null); // Добавляем новую ссылку для хранения объекта карты
    const [coords, setСоrds] = useState([55.75156485204238, 37.61813163757325])
    const [size, setSize] = useState(10)
    let markerRef = useRef(null);
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
            setСоrds(props.coords)
            setSize(12)
            setRefreshCoord(true)
        }
        // Создаем карту
        const map = L.map(mapRef.current).setView(coords, size);
        mapInstanceRef.current = map; // Сохраняем объект карты

        if(refreshCoord){
            getAddress(coords[0]+'/'+coords[1], true).then((result) => {
                props.setAddress(result.data);
            });
            markerRef.current = L.marker(coords).addTo(map);
        }

        // Добавляем слой OpenStreetMap
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);
        // Устанавливаем обработчик события щелчка по карте
        function onMapClick(e) {
            if(props.mapEdit){
                getAddress(e.latlng.lat+'/'+e.latlng.lng, true).then((result) => {
                    props.setAddress(result.data);
                });
                // Удаляем предыдущий маркер, если он существует
                if (markerRef.current) {
                    map.removeLayer(markerRef.current);
                }
                // Добавляем новый маркер
                markerRef.current = L.marker([e.latlng.lat, e.latlng.lng]).addTo(map);
            }
        }
        if(!props.mapEdit){
            markerRef.current = L.marker(props.coords).addTo(map);
            var storage = L.icon({
                iconUrl: 'http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|2ecc71&chf=a,s,ee00FFFF',
                iconSize: [25, 41],
                iconAnchor: [12, 41],
                popupAnchor: [1, -34]
            });
            for(const staorageItemId in props.coordsStoragesItems){
                var marker = L.marker(props.coordsStoragesItems[staorageItemId][1], {icon: storage}).addTo(map);
                marker.bindTooltip(props.coordsStoragesItems[staorageItemId][0].toString(), {direction: 'top', permanent: true})
                // marker.bindPopup(staorageItemId + 10, {direction: 'bottom'})
            }
            for(const pathId in props.pathStoragesItems){
                var pathLayer = L.geoJson().addTo(map);
                pathLayer.addData({
                    type: 'Feature',
                    geometry: props.pathStoragesItems[pathId]
                });
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

export default MapContainerForIncidentCreate;
