import React, { useEffect, useState } from "react";

function SettingCart(props){
    const [setValueFlag, setSetValueFlag] = useState(false)
    const [setEditFlag, setSetEditFlag] = useState(false)
    const [value, setValue] = useState(props.data.value)
    const [dataSetting, setData] = useState({
      "name_text": props.data.name_text,
      "descr": props.data.descr
  });


    useEffect(() => {
      setSetValueFlag(false);
      setSetEditFlag(false);
    }, [props.data.value, props.data.name_text, props.data.descr]);

    const handleValueValue = (event) => {
      setValue(event.target.value);
    };

    const handleInputChange = (event) => {
      const fieldName = event.target.name;
      const fieldValue = event.target.value;
      setData(prevState => ({
        ...prevState,
        [fieldName]: fieldValue
      }));
    };

    return(
      <tr>
        <th scope="row">{setEditFlag 
        ? 
        <textarea 
          type="text" 
          name="name_text" 
          value={dataSetting.name_text}
          onChange={handleInputChange} 
          className="form-control" 
          id="name_text" 
          placeholder=""
        />
        : props.data.name_text}</th>
        <td>{setValueFlag 
        ? <div>
        <textarea type="text" onChange={handleValueValue} value={value} className="form-control" placeholder="Число для добавления" aria-label="Число для добавления" aria-describedby="button-addon2" />
        <button className="btn btn-outline-success" onClick={() => props.updateValue(props.data.id, value)} type="button" id="button-addon2">Изменить</button>
      </div> 
        : props.data.value}</td>
        <td>{setEditFlag 
        ?
        <textarea 
          type="text" 
          name="descr" 
          value={dataSetting.descr}
          onChange={handleInputChange} 
          className="form-control" 
          id="descr" 
          placeholder=""
        /> 
        : props.data.descr}</td>
        <td><i>{props.data.user_editor}</i><br /> {props.data.date_edit.slice(0, -14)} {props.data.time_edit}</td>
        <td>
          {!setValueFlag && !setEditFlag 
          ? <>
          <button className="btn btn-primary m-1" onClick={() => setSetValueFlag(true)} type="button" id="button-addon2">Изменить значение</button>
          <button className="btn btn-dark m-1" onClick={() => setSetEditFlag(true)} type="button" id="button-addon2">Изменить данные</button>
          </>
          : <>
            <button className="btn btn-danger m-1" onClick={() => {setSetValueFlag(false); setSetEditFlag(false)}} type="button" id="button-addon2">Отменить</button>
            {setEditFlag ? <button className="btn btn-success m-1" onClick={() => {props.updateData(props.data.id, dataSetting)}} type="button" id="button-addon2">Сохранить</button> : null}
            </>
          }
        </td>
      </tr>
    );
}

export default SettingCart;