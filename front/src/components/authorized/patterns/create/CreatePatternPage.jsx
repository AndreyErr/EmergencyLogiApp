import React, { useEffect, useState } from 'react';
import InputTable from './InputTable';
import ReactionTable from './ReactionTable';
import MessageText from '../../../ui/MessageText';
import Loader from '../../../ui/Loader';
import { createPattern, getPatternById } from '../../../../http/patternAPI';
import { Link } from 'react-router-dom';

function CreatePatternPage(props) {
  const [errorCreate, setErrorCreate] = useState(["", "info"])
  const [isCreateLoading, setIsCreateLoading] = useState(false)
  const [isDataLoading, setIsDataLoading] = useState(true)
  const [existPatternJson, setExistPatternJson] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    descr: '',
    code_name: '',
    time: 20,
    pattern_input: [],
    pattern_reaction: []
  });

  useEffect(() => {
    if(props.id){
      try{
        setIsDataLoading(true)
        setTimeout(() => {
          getPatternById(props.id).then((result) => {
            const patternData = result[0];
            const patternDataJson = result[0].json;
            setExistPatternJson(patternDataJson)
            setFormData({
              name: patternData.name,
              type: patternData.type,
              descr: patternData.descr,
              code_name: patternData.code_name,
              time: patternDataJson.time ? patternDataJson.time : null,
              pattern_input: [],
              pattern_reaction: []
            });
            setIsDataLoading(false);
          });
        }, 0);
      } catch(e){
      }
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData(prevData => {
      if (name === 'type') {
        setErrorCreate(["", "info"])
        return {
          ...prevData,
          type: value,
          pattern_input: [],
          pattern_reaction: []
        };
      }
      return {
        ...prevData,
        [name]: value
      };
    });
  };

  const handleInputChange = (data) => {
    setFormData(prevData => ({
      ...prevData,
      pattern_input: data
    }));
  };

  const handleReactionChange = (data) => {
    setFormData(prevData => ({
      ...prevData,
      pattern_reaction: data
    }));
  };

  async function create(data){
    setErrorCreate(["", "info"])
    try{
      setIsCreateLoading(true)
      await createPattern(data, props.id ? "update" : "create")
      .then((result) => {
        setErrorCreate(["Создано", "success"])
      })
      .catch(error => {setErrorCreate([error.response.data.message, "danger"])});
      setIsCreateLoading(false)
    }catch(e){
      let massageErr = e.response.data.message
      setErrorCreate([massageErr, "danger"])
      setIsCreateLoading(false)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    // Функция для преобразования строковых чисел в числа
    const parseNumericValue = value => {
      if (typeof value === "string" && /^-?\d*\.?\d+$/.test(value)) {
        return value.includes('.') ? parseFloat(value) : parseInt(value, 10);
      }
      return value;
    };

    let exitFormData = { ...formData };
    
    let patternInputObject = {};
    let patternInputArray = [];
    let patternReactionObject = {};
    let patternReactionArray = [];
    
    const patternInputNames = formData.pattern_input.map(item => item.name);
    formData.pattern_input.forEach(item => {
      let newItem = null
      if(item.defaultpat){
        newItem = "PATTERN_COMMON"
      }else{
        newItem = [
          item.type,
          item.reqired ? "required" : "not_required",
          item.status ? "active" : "not_active"
        ];



        if (item.values) {
          if(item.values.length > 0){
            if(item.criteria == 'in'){
              if (item.type === 'числовой') {
                  newItem.push([
                      item.criteria,
                      ...item.values.split(',').map(value => isNaN(value) ? value : Number(value))
                  ]);
              } else if (item.type === 'булевый') {
                  newItem.push([
                      item.criteria,
                      item.values[1] === 'true'
                  ]);
              } else {
                  newItem.push([
                      item.criteria,
                      ...item.values.split(',').map(value => value.trim())
                  ]);
              }
            }else if(item.criteria == 'between'){
              newItem.push([
                item.criteria,
                Number(item.values[0]),
                Number(item.values[1])
              ]);
            }
          }
        } 
      }

      if(formData.type == "common"){
        patternInputArray = newItem
      }else{
        patternInputObject[item.name] = newItem;
      }
    });

    formData.pattern_reaction.forEach(item => {
      if (patternInputNames.includes(item.name)) {
        let newItem = null
        if(item.defFlag){
          newItem = "PATTERN_COMMON"
          patternReactionObject[item.name] = newItem
        }else{
          newItem = {
              status: item.flag ? "active" : "not_active",
              item_name: item.item_name, 
              reaction_item: {},
              default_reaction_item: parseNumericValue(item.defValue) || null
          };
        
          if (item.subRows && item.subRows.length > 0) {
              const subRowValues = item.subRows.map(subItem => {
                let subRowValue = [];
                if(item.valueType == 'custom'){
                  subRowValue.push(subItem.operator);
                  subRowValue.push(parseNumericValue(subItem.value));
                  subRowValue.push(subItem.type);
                  if (subItem.subValue !== "") {
                      subRowValue.push(parseNumericValue(subItem.subValue));
                  }
                }else{
                  subRowValue = parseNumericValue(subItem.value);
                }
                return subRowValue;
              });
              newItem.reaction_item.value = subRowValues.length === 1 ? subRowValues[0] : subRowValues;
          } else {
              newItem.reaction_item.value = item.defValue !== null ? item.defValue : ""; // Используем значение по умолчанию, если оно определено, иначе пустую строку
          }
        
          newItem.reaction_item.value_type = item.valueType;

          if(formData.type == "common"){
            patternReactionArray.push(newItem)
          }else{
            patternReactionObject[item.name] = patternReactionObject[item.name] || []; // Инициализируем массив, если он еще не создан
            patternReactionObject[item.name].push(newItem);
          }
        
        }
      }
    });
    
    exitFormData.pattern_input = formData.type == "common"? patternInputArray : patternInputObject; // Заменяем массив объектом в exitFormData
    exitFormData.pattern_reaction = formData.type == "common"? patternReactionArray : patternReactionObject; // Заменяем массив объектом в exitFormData
    
    create(exitFormData);
};



  return (
    <div>
        {props.typeOfAction == "look" ? <h3>Паттерн № {props.id}</h3> : props.id ? <h3>Изменение паттерна № {props.id}</h3> : <h3>Создание нового паттерна</h3>}
        {props.typeOfAction == "look" ? null : props.id ? <Link to={`/patterns/id/${props.id}`}><button type="button" className="btn btn-primary ">В паттерн</button></Link> : null}
        <ul className="list-group mt-2">
        <li className="list-group-item">
        {props.typeOfAction == "look"
          ? <div><b>Название</b>: {formData.name}</div>
          : <div>
              <label>Название:</label>
              <input type="text" name="name" className="form-control" value={formData.name} onChange={handleChange} />
            </div>
        }
        </li><li className="list-group-item">
        <div>
          {existPatternJson || props.typeOfAction == "look"
          ? <><b>Тип паттерна</b>: {formData.type == "common" ? "Общий" : "Реакция"}</>
          : <><label>Тип:</label>
          <select name="type" className="form-select" value={formData.type} onChange={handleChange} >
            <option value="">Выберете тип</option>
            <option value="common">Общий</option>
            <option value="reaction">Реакция</option>
          </select></>
          }
        </div>
        </li><li className="list-group-item">
        {props.typeOfAction == "look"
          ? <div><b>Описание</b>: {formData.descr}</div>
          : <div>
              <label>Описание:</label>
              <input type="text" name="descr" className="form-control" value={formData.descr} onChange={handleChange} />
            </div>
        }
        </li><li className="list-group-item">
        {props.typeOfAction == "look"
          ? <div><b>Кодовое название</b>: {formData.code_name}</div>
          : <div>
              <label>Кодовое название:</label>
              <input type="text" name="code_name" className="form-control" value={formData.code_name} onChange={handleChange} />
            </div>
        }
        </li><li className="list-group-item">
        {formData.type === 'reaction' && (
          props.typeOfAction === "look"
          ? <div><b>Время реакции в минутах</b>: {formData.time}</div>
          : <div>
              <label>Время реакции в минутах:</label>
              <input type="number" name="time" className="form-control" value={formData.time} onChange={handleChange} />
            </div>
        )}
        </li>
        </ul>
        <h2>Таблица Ввода</h2>
        {formData.type === 'common' && (
          <InputTable onChange={handleInputChange} existPattern={existPatternJson} code_name={formData.code_name} typeOfAction={props.typeOfAction} />
        )}
        {formData.type === 'reaction' && (
          <InputTable onChange={handleInputChange} allowAddRemoveRows existPattern={existPatternJson} typeOfAction={props.typeOfAction} />
        )}
        {isCreateLoading
        ? <Loader />
        : props.typeOfAction === "look" ? null : formData.type ? <button onClick={handleSubmit} className="btn btn-outline-success">Сохранить</button> : null
        }
        {errorCreate[0].length > 0 ? <MessageText text={errorCreate[0]} typeOf={errorCreate[1]} /> : null}

      {(formData.type === 'reaction') && (
        <ReactionTable formData={formData} onChange={handleReactionChange} allowAddRemoveRows existPattern={existPatternJson} typeOfAction={props.typeOfAction} />
      )}
      {(formData.type === 'common') && (
        <ReactionTable formData={formData} onChange={handleReactionChange} existPattern={existPatternJson} typeOfAction={props.typeOfAction} />
      )}
    </div>
  );
}

export default CreatePatternPage;
