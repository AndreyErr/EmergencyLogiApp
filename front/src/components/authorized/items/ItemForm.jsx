import React, { useEffect, useState } from "react";
import { createItem, editItem } from "../../../http/itemAPI";

function ItemForm(props){

    const [itemsData, setItemsData] = useState({
      "id": "",
      "name": "",
      "descr": "",
      "flag": 1,
      "type": 1
    });
    const [lastName, setLastName] = useState("")
    const [itemsCreteLoader, setItemsCreteLoader] = useState(false)
    const [itemsCreteResult, setItemsCreteResult] = useState("")
    useEffect(() => {
        if(props.type == "edit"){
            setItemsData({
              "id": props.data.id,
              "name": props.data.name,
              "descr": props.data.descr,
              "flag": props.data.flag,
              "type": props.data.type
            })
            setLastName(props.data.name)
        }
    }, [])
    function validateName(str) {
        const regex = /^[a-zA-Zа-яА-Я0-9\s\/!?+=\-]{2,120}$/;
        return regex.test(str);
    }
    function validateDescr(str) {
        const regex = /^[a-zA-Zа-яА-Я0-9\s\/!?+=\-]{2,120}$/;
        return regex.test(str);
    }

    function itemChange(type){
      setItemsCreteLoader(true)
      let errorMessage = '';
      if(!validateName(itemsData.name)) {
          errorMessage += 'Имя должно содержать от 2 до 120 символов, включая буквы, цифры и специальные символы.\n';
      }
      if(!validateDescr(itemsData.descr)) {
          errorMessage += 'Описание должно содержать от 2 до 120 символов, включая буквы, цифры и специальные символы.\n';
      }
      if(errorMessage === '') {
          try{
            if(type == "create"){
                createItem(itemsData).then((result) => {
                    if(result[0] == "OK"){
                      setItemsCreteResult("Предмет создан");
                      props.addItem(itemsData)
                    }else{
                      setItemsCreteResult("Ошибка создания предмета: " + result);
                    }
                  }).catch((error) => {
                    setItemsCreteResult("Ошибка создания предмета: " + error.response.data.message);
                });;
            }else{
                editItem(itemsData, lastName).then((result) => {
                    if(result[0] == "OK"){
                      setItemsCreteResult("Предмет изменён");
                      setLastName(itemsData.name)
                      props.updateItem(itemsData)
                    }else{
                      setItemsCreteResult("Ошибка изменения предмета: " + result);
                    }
                  }).catch((error) => {
                    setItemsCreteResult("Ошибка изменения предмета: " + error.response.data.message);
                });;
            }
          }catch(e){
              let massageErr = e.response.data.message;
              setItemsCreteResult("Ошибка создания предмета: " + massageErr);
          }
      } else {
        setItemsCreteResult("Ошибка создания предмета: " + errorMessage);
      }
      setItemsCreteLoader(false);
    }

    // Обработчик изменения значения любого поля ввода
    const handleInputChange = (event) => {
      const fieldName = event.target.name;
      const fieldValue = event.target.value;
      setItemsData(prevState => ({
        ...prevState,
        [fieldName]: fieldValue
      }));
    };

      return(
        <span>
                <button type="button" className="btn btn-outline-danger btn-sm me-2" data-bs-toggle="modal" data-bs-target={`#createUser${props.id}`}>
              {props.type == "create" ? "Создать предмет" : "Изменить " + itemsData.name}
            </button>
            <div className="modal fade text-dark" id={`createUser${props.id}`} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div className="modal-dialog modal-dialog-centered  modal-xl">
                <div className="modal-content">
                  <div className="modal-header">
                    <h1 className="modal-title fs-5" id="exampleModalLabel">Изменение предмета</h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div className="modal-body">
                    <form>
                    {itemsCreteResult}
                    <label htmlFor="type" className="form-label">Категория предмета</label>
                    <select 
                      className="form-select" 
                      aria-label="Тип пользователя"
                      name="type"
                      value={itemsData.type}
                      onChange={handleInputChange}
                    >
                      {props.itemsTypes.map(itemsType => 
                        <option key={itemsType.type_id} value={itemsType.type_id}>{itemsType.type_name}</option>
                      )}
                    </select>
                    <label htmlFor="flag" className="form-label">Статус</label>
                    <select 
                      className="form-select" 
                      aria-label="Тип пользователя"
                      name="flag"
                      value={itemsData.flag}
                      onChange={handleInputChange}
                    >
                      <option value="1">Активно</option>
                      <option value="2">Не активно</option>
                    </select>
                    <div className="mb-3">
                      <label htmlFor="name" className="form-label">Название</label>
                      <input 
                        type="text" 
                        name="name" 
                        value={itemsData.name}
                        onChange={handleInputChange} 
                        className="form-control" 
                        id="name" 
                        placeholder="Иванов Иван Иванович" 
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="descr" className="form-label">Описание</label>
                      <textarea 
                        type="text" 
                        name="descr" 
                        value={itemsData.descr}
                        onChange={handleInputChange} 
                        className="form-control" 
                        id="descr" 
                        placeholder="" 
                        required
                      />
                    </div>
                    {itemsCreteResult}
                    <button type="button" onClick={() => {itemChange(props.type)}} className="btn btn-outline-danger btn-sm">{props.type === "edit" ? "Изменить" : "Создать"}</button>
                  </form>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Закрыть</button>
                  </div>
                </div>
              </div>
            </div>
        </span>
      );
}

export default ItemForm;