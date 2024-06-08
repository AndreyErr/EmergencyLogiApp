import { Link } from "react-router-dom";
import { Context } from "../../..";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../../ui/Loader";
import MessageText from "../../ui/MessageText";
import MapContainerForStorageCreate from "./MapContainerForStorageCreate";
import { addItemCountToStorage, getItemsInStorage, getStorageById, searchItemsAct } from "../../../http/storageAPI";
import { selectItemsTypes } from "../../../http/itemAPI";
import ItemCart from "./ItemCart";


function StoragePage(props){
    const {user} = useContext(Context)
    const history = useNavigate()

    const [pointData, setPointData] = useState('')
    const [error, setError] = useState('')
    const [isDataLoading, setIsDataLoading] = useState(true)
    const [items, setItems] = useState([]);
    const [itemsTypes, setItemsTypes] = useState([]);
    const [filter, setFilter] = useState('all');

    const [searchStr, setSearchStr] = useState('');
    const [searchItems, setSearchItems] = useState([])
    const [searchTimeout, setSearchTimeout] = useState(false)
    const [searchLoader, setSearchLoader] = useState(false)

    useEffect(() => {
      document.title = 'Склад № ' + props.id;
    }, []);
      
    useEffect(() => {
        try{
            setIsDataLoading(true)
            setTimeout(() => {
                getStorageById(props.id).then((result) => {
                    setPointData(result[0][0])
                    setIsDataLoading(false)
                })
                selectItemsTypes().then((result) => {
                  setItemsTypes(result)
                })
            }, 0)
        }catch(e){
            history('/')
        }
    }, [])

    useEffect(() => {
      try{
        setTimeout(() => {
            getItemsInStorage(props.id, filter).then((result) => {
              setItems(result)
            })
        }, 0)
      }catch(e){
          history('/')
      }
    }, [filter]);

    const handleFilterChange = (event) => {
      setFilter(event.target.value);
      selectItemsTypes().then((result) => {
        setItemsTypes(result)
      })
    };

    function getAddr(){
        let formattedAddress = `Страна ${pointData.addres.country || ""}, г. ${pointData.addres.city || ""}`;
        if (pointData.addres.street) {
            formattedAddress += `, улица ${pointData.addres.street}`;
        }
        if (pointData.addres.housenumber) {
            formattedAddress += `, д. ${pointData.addres.housenumber}`;
        }
        return formattedAddress;
    }

    function addCountItemInStorage(id, count, typeChange, type = "+"){
      if(type == "-"){
          count = 0 - count 
      }
      addItemCountToStorage(id, count, typeChange)
          .then((result) => {
              const updatedItems = items.map(item => {
                  if (item.id === id) {
                      return { ...item, count: result.data.count };
                  }
                  return item;
              });

              const updatedItemsSearch = searchItems.map(item => {
                if (item.id === id) {
                    return { ...item, count: result.data.count };
                }
                return item;
              });
  
              // Обновляем состояние
              setItems(updatedItems);
              setSearchItems(updatedItemsSearch)
              setError("")
          })
          .catch((error) => {
              setError(error.response.data.message);
          });
  }

  function addNew(){
    const newItem = {
      count: 0,
      descr: "",
      flag: 0,
      id: "a" + Math.floor(Math.random() * (10000 - 1000 + 1)) + 1000,
      item_id: 0,
      name: "",
      type: 0,
      type_name: ""
    };
    setItems([...items, newItem]);
}

function search(str){
  setSearchStr(str)
  if(searchTimeout != false){
      clearTimeout(searchTimeout)
  }
  if(str != ''){
      setSearchLoader(true)
      setSearchTimeout(setTimeout(() => {
          try{
            searchItemsAct(str, 10, props.id, "byId").then((result) => {
                  setSearchItems(result.data)
                  setSearchLoader(false)
              })
          }catch(e){
              let massageErr = e.response.data.message
              setSearchLoader(false)
          }
      }, 500))
  }else{
    setSearchItems([])
  }
}

function itemsSearchResults(){
  if(searchStr != ''){
      if(searchLoader){
          return <div><h4 className="fst-italic text-black">Поиск... <Loader /></h4></div>
      }else{
          return <div>
          {searchItems != null 
          ? <div className="bg-light p-3 border rounded">
            <h4 className="fst-italic text-black">Результаты поиска</h4>
              <table className="table table-hover">
              <thead>
                <tr>
                  <th scope="col">Название</th>
                  <th scope="col">Кол-во</th>
                  <th scope="col">Добавить/Убавить</th>
                  <th scope="col">Действие</th>
                </tr>
              </thead>
              <tbody>
                {searchItems.map((item, index) => 
                  <ItemCart item={item} addCountItemInStorage={addCountItemInStorage} />
                )}
              </tbody>
              </table>  

            </div>
          : <p className="fst-italic text-black">Ничего не найдено</p>}
          </div>
      }
  }else{
      return null
  }
}

function addItem(id, newItem) {
  const itemIndex = items.findIndex(item => item.id === id);
  if (itemIndex !== -1) {
      const updatedItems = [...items];
      updatedItems[itemIndex] = newItem;
      setItems(updatedItems);
  }
}

function removeItem(id) {
  const updatedItems = items.filter(item => item.id !== id);
  setItems(updatedItems);
}

    return(
        <div>
            <h2>Склад №{pointData.id}</h2>
            <h3>{pointData.name}</h3>
            {isDataLoading
            ? <Loader />
            :(<>
            <MapContainerForStorageCreate setPointData={setPointData} coords={pointData.coord.split("/")} mapEdit={false}/>
            {pointData.status == 2 ? (<div className="alert alert-danger mt-2" role="alert">
              <h4 className="alert-heading">Склад закрыт!</h4>
              <p>Данный склад закрыт и не учавствует в работе системы.</p>
              <hr/>
              <p className="mb-0">Для открытия перейдите в настройки и поменяйте на соответствующий статус.</p>
            </div>) : null}
            <ul className="list-group mt-2">
              <li className="list-group-item"><b>Описание</b>: {pointData.descr ? pointData.descr : "Описание отсутствует"}</li>
            </ul>
            <ul className="list-group mt-2">
              <li className="list-group-item"><b>Адрес</b>: {getAddr()}</li>
              <li className="list-group-item"><b>Координаты</b>: {pointData.coord}</li>
              <li className="list-group-item"><b>Последнее изменение</b>: {pointData.login}</li>
              <li className="list-group-item"><b>Создано</b>: {pointData.date_created.substring(0, 10)} {pointData.time_created}</li>
            </ul>
            { user.user['status'] >= 3 ? <Link to={`/storages/edit/${pointData.id}`}><button className="btn btn-primary mt-2 mb-2">Изменить данные</button></Link> : null}
            </>)}
            <div className="input-group mb-3">
                <input value={searchStr} onChange={e => search(e.target.value)} id="search" type="text" className="form-control" placeholder="Поиск по названию предмета" aria-label="Поиск по login или email" aria-describedby="button-addon2"></input>
                {searchStr != '' ? <button onClick={() => {setSearchStr('')}} className="btn btn-outline-primary" type="button" id="button-addon2">Отчистить</button> : null}
            </div>
            {itemsSearchResults()}
            <select 
              className="form-select" 
              aria-label="Фильтр"
              name="type_flag"
              value={filter}
              onChange={handleFilterChange}
            >
                <option key="all" value="all">Без фильтра</option>
                {itemsTypes.map(itemsType => 
                    itemsType.type_flag == 1 ? <option key={itemsType.type_id} value={itemsType.type_id}>{itemsType.type_name}{(itemsType.type_flag === 1 ? null : " (Не активно)")}</option> : null
                )}
            </select>
            {error.length == 0 ? null : <MessageText text={error} typeOf={'danger'} />}
            <table className="table mt-2">
              <thead>
                <tr>
                  <th scope="col">Название</th>
                  <th scope="col">Кол-во</th>
                  { user.user['status'] >= 3 ? <th scope="col">Добавить/Убавить</th> : null}
                  { user.user['status'] >= 3 ? <th scope="col">Действие</th> : null}
                </tr>
              </thead>
              <tbody>
                {items.length == 0 ? "Нет предметов" : items.map((item, index) => 
                  <ItemCart item={item} addCountItemInStorage={addCountItemInStorage} storageId={props.id} addItem={addItem} removeItem={removeItem}/>
                )}
              </tbody>
              {user.user['status'] >= 3 ? <button type="button" className="btn btn-secondary mt-1" onClick={() => addNew()}>Добавить</button> : null}
            </table>
        </div>
    );
}

export default StoragePage;