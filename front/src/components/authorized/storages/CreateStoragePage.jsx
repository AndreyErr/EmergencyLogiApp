import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { getAddress } from "../../../http/geoAPI";
import Loader from "../../ui/Loader";
import MessageText from "../../ui/MessageText";
import MapContainerForStorageCreate from "./MapContainerForStorageCreate";
import { createStorage, getStorageById, updateStorage } from "../../../http/storageAPI";


function CreateStoragePage(props){
  const [pointData, setPointData] = useState({})
  const [errorAddres, setErrorAddres] = useState('')
  const [storageId, setStorageId] = useState(-1)
  const [storageData, setStorageData] = useState({
    "coord": "",
    "name": "",
    "descr": "",
    "status": 1,
    "addres": {
      "country": "",
      "state": "",
      "city": "",
      "street": "",
      "housenumber": ""
    }
  });
  const [searchAddrStr, setSearchAddrStr] = useState('')
  const [coords, setСоrds] = useState([])
  const [issearchAddrLoading, setIssearchAddrLoading] = useState(false)
  const [error, setError] = useState(["", "info"])

  useEffect(() => {
    document.title = 'Создать склад';
    if(props.type == "edit"){
      try{
        setTimeout(() => {
          setStorageId(props.id)
          getStorageById(props.id).then((result) => {
              setPointData(result[0][0])
              setStorageData({
                "coord": result[0][0].coord,
                "name": result[0][0].name,
                "descr": result[0][0].descr,
                "status": result[0][0].status,
                "addres": {
                  "country": result[0][0].addres.country ? result[0][0].addres.country : null,
                  "state": result[0][0].addres.state ? result[0][0].addres.state : null,
                  "city": result[0][0].addres.city ? result[0][0].addres.city : null,
                  "street": result[0][0].addres.street ? result[0][0].addres.street : null,
                  "housenumber": result[0][0].addres.housenumber ? result[0][0].addres.housenumber : null
                }
              })
              setСоrds(result[0][0].coord.split("/"))
          })
        }, 0)
      }catch(e){
      }
    }
  }, []);

  useEffect(() => {
    if(pointData.hits){
      if(pointData.hits.length > 0){
        setErrorAddres('')
        setStorageData(prevState => ({
          ...prevState,
          addres: {
            "country": pointData.hits[0].country,
            "state": pointData.hits[0].state,
            "city": pointData.hits[0].city,
            "street": pointData.hits[0].street,
            "housenumber": pointData.hits[0].housenumber
          },
          coord: pointData.hits[0].point.lat + "/" + pointData.hits[0].point.lng
        }));
      }else{
        setErrorAddres("Не найден такой адрес")
      }
    }
  }, [pointData]);
    
      async function findAddress(event){
        event.preventDefault();
        try{
          setError(["", "info"])
          let notToEnter = false
          if(searchAddrStr.length === 0){
            setError(['Заполните все поля для входа', "danger"])
            notToEnter = true
          }else{
            if(!notToEnter){
                setIssearchAddrLoading(true)
                await getAddress(searchAddrStr).then((result) => {
                    setPointData(JSON.parse(result.data))
                    const addrData = JSON.parse(result.data);
                    if(addrData.hits != NaN)
                        setСоrds([addrData.hits[0].point.lat, addrData.hits[0].point.lng])
                })
            }
          }
          setIssearchAddrLoading(false)
        }catch(e){
          let massageErr = e.response.data.message
          setError([massageErr, "danger"])
    
          setIssearchAddrLoading(false)
        }
      }


      function getAddr() {
        if (storageData.addres.country !== "") {
            let addrRes = '';
            let notFound = (<i>Не обнаружено</i>)
            if (errorAddres.length == 0)
                addrRes = (
                  <ul className="list-group pt-2 pb-2">
                    <li className="list-group-item"><b>Страна</b>: {storageData.addres.country ? storageData.addres.country : notFound}</li>
                    <li className="list-group-item"><b>Округ</b>: {storageData.addres.state ? storageData.addres.state : notFound}</li>
                    <li className="list-group-item"><b>Город</b>: {storageData.addres.city ? storageData.addres.city : notFound}</li>
                    <li className="list-group-item"><b>Улица</b>: {storageData.addres.street ? storageData.addres.street : notFound}</li>
                    <li className="list-group-item"><b>Дом</b>: {storageData.addres.housenumber ? storageData.addres.housenumber : notFound}</li>
                    <li className="list-group-item"><b>Координаты</b>: {storageData.coord ? storageData.coord : notFound}</li>
                  </ul>
                );
            else
                addrRes = errorAddres;
            return addrRes;
        }
        return '';
      }
    

      async function create(event){
        event.preventDefault();
        try{
          setError(["", "info"])
          if(storageData.addres.country == ""){
            setError(['Не выбран адрес', "danger"])
          }else{
            let storageDataSent = storageData
            setIssearchAddrLoading(true)
            if(storageDataSent.name == ""){
              if(storageDataSent.addres.state){
                const namePart1 = `Склад в ${storageDataSent.addres.state}`
                const namePart2 = storageDataSent.addres.street ? ` на ${storageDataSent.addres.street}` : ""
                storageDataSent.name = namePart1 + namePart2
              }else{
                throw "Нет названия"
              }
            }
            if(props.type == "edit"){
              await updateStorage(storageDataSent, props.id).then((result) => {
                setError(["Обновлено", "success"])
              })
            }else{
              await createStorage(storageDataSent).then((result) => {
                setStorageId(result.data)
                setError(["Создано", "success"])
              })
            }
          }
          setIssearchAddrLoading(false)
        }catch(e){
          let massageErr = e.response.data.message
          setError([massageErr, "danger"])
    
          setIssearchAddrLoading(false)
        }
      }

    // Обработчик изменения значения любого поля ввода
    const handleInputChange = (event) => {
      const fieldName = event.target.name;
      const fieldValue = event.target.value;
      setStorageData(prevState => ({
        ...prevState,
        [fieldName]: fieldValue
      }));
    };

    return(
        <div>
            <h2>{props.type == "edit" ? `Изменение склада №${props.id}` : "Создание нового склада"}</h2>
            <form>
            <div className="input-group mb-3">
              <input value={searchAddrStr} onChange={e => setSearchAddrStr(e.target.value)} type="text" placeholder="Адрес" className="form-control" id="loginLogin" aria-describedby="loginLogin" required></input>
              <button onClick={findAddress} type="submit" className="btn btn-outline-secondary btn-lg">Найти</button>
            </div>
              {issearchAddrLoading
              ? <Loader />
              : ""
              }
              {error[0].length > 0 ? <MessageText text={error[0]} typeOf={error[1]} /> : null}
            </form>
            <MapContainerForStorageCreate setPointData={setPointData} coords={coords} mapEdit={true} type={"create"}/>
            {getAddr()}
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Название</label>
              <input 
                type="text" 
                name="name" 
                value={storageData.name} 
                onChange={handleInputChange} 
                className="form-control" 
                placeholder="Название"
                id="name" 
                aria-describedby="name"
              />
              {storageData.addres.state ? <div id="name" className="form-text">Если не указать, то будет "Склад в {storageData.addres.state}{storageData.addres.street ? <span> на {storageData.addres.street}</span> : null}".</div> : null}
            </div>
            <div className="mb-3">
              <label htmlFor="descr" className="form-label">Описание</label>
              <input 
                type="text" 
                name="descr" 
                value={storageData.descr} 
                onChange={handleInputChange} 
                className="form-control" 
                placeholder="Описание" 
                id="descr" 
                aria-describedby="descr"
              />
            </div>
            <div>
              <label htmlFor="status" className="form-label">Статус склада</label>
              <select 
                className="form-select" 
                aria-label="Тип пользователя"
                name="status"
                value={storageData.status}
                onChange={handleInputChange}
              >
                <option value="1">Открыт</option>
                <option value="2">Закрыт</option>
              </select>
            </div>
            {error[0].length > 0 ? <MessageText text={error[0]} typeOf={error[1]} /> : null}
            <button onClick={create} type="submit" className="btn btn-primary btn-lg mt-2">{props.type == "edit" ? `Изменить склад №${props.id}` : "Создать" }</button>
            {error[0].length > 0 && error[1] == "success" ? <Link to={`/storages/id/${storageId}`}><button className="btn btn-primary">Посмотреть</button></Link> : null}
        </div>
    );
}

export default CreateStoragePage;