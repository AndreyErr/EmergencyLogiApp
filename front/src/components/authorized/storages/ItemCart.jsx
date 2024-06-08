import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../..";
import { addItemToStorage, deleteItemFromStorage, searchItemsAct } from "../../../http/storageAPI";
import Loader from "../../ui/Loader";
import MessageText from "../../ui/MessageText";

function ItemCart(props){
  const {user} = useContext(Context)
    const [plusNumber, setPlusNumber] = useState(0)
    const [generalCount, setGeneralCount] = useState(props.item.count)
    const [changeGeneralCount, setChangeGeneralCount] = useState(false)

    const [searchStrAdd, setSearchStrAdd] = useState('');
    const [searchItemsAdd, setSearchItemsAdd] = useState([])
    const [searchTimeoutAdd, setSearchTimeoutAdd] = useState(false)
    const [searchLoaderAdd, setSearchLoaderAdd] = useState(false)
    const [selectedItem, setSelectedItem] = useState({})

    const [error, setError] = useState('')


    useEffect(() => {
        setChangeGeneralCount(false);
      }, [props.item.count]);
    const handlePlusChange = (event) => {
        setPlusNumber(event.target.value);
    };
    const handleGeneralCount = (event) => {
        setGeneralCount(event.target.value);
    };

    function searchAdd(str){
        setSearchStrAdd(str)
        if(searchTimeoutAdd != false){
            clearTimeout(searchTimeoutAdd)
        }
        if(str != ''){
            setSearchLoaderAdd(true)
            setSearchTimeoutAdd(setTimeout(() => {
                try{
                  searchItemsAct(str, 3).then((result) => {
                        setSearchItemsAdd(result.data)
                        setSearchLoaderAdd(false)
                    })
                }catch(e){
                    let massageErr = e.response.data.message
                    setSearchLoaderAdd(false)
                }
            }, 500))
        }else{
          setSearchItemsAdd([])
        }
      }

      function setNewItem(item){
        setSelectedItem(item)
      }
      
      function itemsSearchResultsAdd(){
        if(searchStrAdd != ''){
            if(searchLoaderAdd){
                return <div><h4 className="fst-italic text-black">Поиск... <Loader /></h4></div>
            }else{
                return <div>
                {searchItemsAdd != null 
                ? <div className="bg-light p-3 border rounded">
                    <table className="table table-hover">
                    <tbody>
                      {searchItemsAdd.map((item, index) => 
                        <tr onClick={()=>{setNewItem(item); setSearchStrAdd('')}}><th scope="row">{item.name}</th></tr>
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

    function createItem(){
        addItemToStorage(props.storageId, selectedItem.id, generalCount)
          .then((result) => {
              props.addItem(props.item.id, result.data)
              setError("")
          })
          .catch((error) => {
              setError(error.response.data.message);
          });
    }

    function deleteItem(){
      function checkFirstLetter(str, letter) {
        // Преобразуем строку в нижний регистр и берём первый символ
        const firstChar = str.toLowerCase().charAt(0);
        // Сравниваем первый символ с заданным символом
        return firstChar === letter.toLowerCase();
      }
      if(checkFirstLetter(props.item.id.toString(), "a")){
        props.removeItem(props.item.id)
      }else{
        deleteItemFromStorage(props.item.id)
          .then((result) => {
              props.removeItem(props.item.id)
              setError("")
          })
          .catch((error) => {
              setError(error.response.data.message);
          });
      }
    }

    return(
      <tr>
          <th scope="row">{props.item.name.length > 0 
          ? props.item.name 
          : <>{selectedItem.name ? selectedItem.name : null}<div className="input-group mb-3">
          <input value={searchStrAdd} onChange={e => searchAdd(e.target.value)} id="search" type="text" className="form-control" placeholder="Поиск по названию предмета" aria-label="Поиск по login или email" aria-describedby="button-addon2"></input>
          {searchStrAdd != '' ? <button onClick={() => {setSearchStrAdd('')}} className="btn btn-outline-primary" type="button" id="button-addon2">Отчистить</button> : null}
            </div>
            {itemsSearchResultsAdd()}</>}{error.length == 0 ? null : <MessageText text={error} typeOf={'danger'} />}</th>
          <td>{changeGeneralCount 
          ? <div className="input-group mb-3">
          <input type="number" onChange={handleGeneralCount} value={generalCount} className="form-control" placeholder="Число для добавления" aria-label="Число для добавления" aria-describedby="button-addon2" />
          <button className="btn btn-outline-secondary" onClick={() => props.addCountItemInStorage(props.item.id, generalCount, "general")} type="button" id="button-addon2">Изменить</button>
        </div>
          : props.item.name.length > 0 
          ? props.item.count 
          : <input type="number" onChange={handleGeneralCount} value={generalCount} className="form-control" placeholder="Число для добавления" aria-label="Число для добавления" aria-describedby="button-addon2" /> }</td>
          { user.user['status'] >= 3 ? <td>{props.item.name.length > 0 ? <div className="container text-center">
            <div className="row">
              <div className="col">
              <div className="input-group mb-3">
            <input type="number" onChange={handlePlusChange} value={plusNumber} className="form-control" placeholder="Число для добавления" aria-label="Число для добавления" aria-describedby="button-addon2" />
            <button className="btn btn-outline-secondary" onClick={() => props.addCountItemInStorage(props.item.id, plusNumber, "plusmin", "+")} type="button" id="button-addon2">Добавить</button>
            <button className="btn btn-outline-secondary" onClick={() => props.addCountItemInStorage(props.item.id, plusNumber, "plusmin", "-")} type="button" id="button-addon2">Убавить</button>
          </div>
              </div>
            </div>
          </div> : "Создание"}</td> : null}
          { user.user['status'] >= 3 ? <td>{props.item.name.length > 0 
          ? changeGeneralCount ? <button className="btn btn-primary m-1" onClick={() => setChangeGeneralCount(false)} type="button" id="button-addon2">Отменить</button> : <button className="btn btn-primary m-1" onClick={() => setChangeGeneralCount(true)} type="button" id="button-addon2">Изменить общее кол-во</button> 
          : <button className="btn btn-primary m-1" onClick={createItem} type="button" id="button-addon2">Создать</button>}
          { (props.item.name.length > 0 && props.item.count != 0)
          ? <><button type="button" className="btn btn-outline-danger btn-sm m-1" data-bs-toggle="modal" data-bs-target={`#deleteUs${props.item.id}`}>
          Удалить
        </button>
        <div className="modal fade" id={`deleteUs${props.item.id}`} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">Удалить "{props.item.name}"" со склада №{props.storageId}</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <p className="fs-5">Внимание, при удалении будут утеряны данны, в том числе информация о {props.item.count} единицах данного товара ({props.item.name}) на складе. <br/><b>Советуем учесть товары до удаления для избежания утечек данных!</b></p>
                <button className="btn btn-danger" onClick={deleteItem} type="button" id="button-addon2" data-bs-dismiss="modal">Окончательно удалить</button>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Отмена</button>
              </div>
            </div>
          </div>
        </div></> 
          : <button className="btn btn-danger m-1" onClick={deleteItem} type="button" id="button-addon2">Удалить</button>}
          </td> : null}
      </tr>
    );
}

export default ItemCart;