import React, { useState } from "react";
import { editCategory } from "../../../http/itemAPI";

function ItemCatItem(props){
    const [editFlag, setEditFlag] = useState(props.item.type_flag == -1 ? true : false);
    const [addFlag, setaddFlag] = useState(props.item.type_flag == -1 ? true : false);
    const [data, setData] = useState({
        "type_id": props.item.type_id,
        "type_name": props.item.type_name,
        "type_descr": props.item.type_descr,
        "type_flag": props.item.type_flag == -1 ? 1 : props.item.type_flag,
    });
    const [dataEdit, setEdit] = useState({
        "type_id": props.item.type_id,
        "type_name": props.item.type_name,
        "type_descr": props.item.type_descr,
        "type_flag": props.item.type_flag == -1 ? 1 : props.item.type_flag,
    });
    const [itemsCreteResult, setItemsCreteResult] = useState("")
    const [itemsCreteLoader, setItemsCreteLoader] = useState(false)

    function save(){
        setItemsCreteLoader(true)
        let errorMessage = '';
        if(errorMessage === '') {
            try{
                editCategory(dataEdit, data.type_name, addFlag).then((result) => {
                    if (result[0] == "OK") {
                        const updatedDataEdit = { ...dataEdit, type_id: result[1] };
                        setEdit(updatedDataEdit);
                        setData(updatedDataEdit);
                        props.onUpdateItem(updatedDataEdit);
                        setEditFlag(false);
                    } else {
                        setItemsCreteResult("Ошибка изменения категории: " + result);
                    }
                }).catch((error) => {
                    setItemsCreteResult("Ошибка изменения категории: " + error.response.data.message);
                });
            }catch(e){
                let massageErr = e.response.data.message;
                setItemsCreteResult("Ошибка изменения категории: " + massageErr);
            }
        } else {
          setItemsCreteResult("Ошибка изменения категории: " + errorMessage);
        }
        setItemsCreteLoader(false);
    }

    const handleInputChange = (event) => {
        const fieldName = event.target.name;
        const fieldValue = event.target.value;
        setEdit(prevState => ({
          ...prevState,
          [fieldName]: fieldValue
        }));
      };

    function out(){
        if(editFlag){
            return(
                <>
                    <th scope="row" className="text-break"><input 
                        type="text" 
                        name="type_name" 
                        value={dataEdit.type_name}
                        onChange={handleInputChange} 
                        className="form-control" 
                        id="type_name" 
                        placeholder=""
                      /></th>
                    <td><input 
                        type="text" 
                        name="type_descr" 
                        value={dataEdit.type_descr}
                        onChange={handleInputChange} 
                        className="form-control" 
                        id="type_descr" 
                        placeholder=""
                      /></td>
                    <td>
                    <select 
                      className="form-select" 
                      aria-label="Статус"
                      name="type_flag"
                      value={dataEdit.type_flag}
                      onChange={handleInputChange}
                    >
                      <option value="1">Активно</option>
                      <option value="2">Не активно</option>
                    </select></td>
                    <td className="hstack gap-3">
                        <button type="button" className="btn btn-secondary" onClick={() => setEditFlag(false)}>Отменить редактирование</button>
                        <button type="button" className="btn btn-secondary" onClick={() => save()}>Сохранить</button>
                    </td>
                </>
            )
        }else{
            return(
                <>
                    <th scope="row" className="text-break">{data.type_name}</th>
                    <td>{data.type_descr}</td>
                    <td>{data.type_flag == 1 ? "Активно" : "Не активно"}</td>
                    <td className="hstack gap-3">
                        <button type="button" className="btn btn-secondary" onClick={() => setEditFlag(true)}>Редактировать</button>
                    </td>
                </>
            )
        }
    }

      return(
        <>
            {itemsCreteResult}
            <tr>
                {out()}
            </tr>
        </>
      );
}

export default ItemCatItem;