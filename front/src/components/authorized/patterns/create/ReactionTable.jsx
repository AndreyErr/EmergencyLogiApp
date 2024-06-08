import React, { useState, useEffect, useRef } from 'react';
import { Form } from 'react-bootstrap';
import Loader from '../../../ui/Loader';
import { getCommonPatternByCodeName } from '../../../../http/patternAPI';
import { fatchItems } from '../../../../http/itemAPI';

function ReactionTable({ formData, onChange, allowAddRemoveRows, existPattern, typeOfAction }) {
  const [possibleNames, setPossibleNames] = useState([]);

  const [addedRows, setAddedRows] = useState([]);
  const [patternStatus, setPatternStatus] = useState({});
  const [switchStates, setSwitchStates] = useState(Array(formData.pattern_input.length).fill(false));
  const [loadingStates, setLoadingStates] = useState(Array(formData.pattern_input.length).fill(false));
  useEffect(() => {
    fatchItems(10000, 1).then((result) => {
      const names = result.data[0].map(item => item.name);
      setPossibleNames(names);
    });
  }, []);

  useEffect(() => {
    if (existPattern && existPattern.pattern_reaction) {
      fetchPatternRows(existPattern.pattern_reaction, existPattern.code_name, existPattern.type);
    }
  }, []);

  const fetchPatternRows = async (patternData, code_name, type) => {
    let nonCommonPatterns = null
    if(type == 'common'){
      nonCommonPatterns = [[code_name, patternData]];
    }else{
      nonCommonPatterns = Object.entries(patternData);
    }
    let updatedRows = [...addedRows];

    for (let [index, [key, pattern]] of nonCommonPatterns.entries()) {
        let pat_common = false;
        if (pattern == "PATTERN_COMMON") {
            pat_common = true;
            const result = await getCommonPatternByCodeName(key, "pattern_reaction");
            setSwitchStates(prevStates => updateStateAtIndex(prevStates, index, true));
            setPatternStatus(prevStatus => ({ ...prevStatus, [index]: Array.isArray(result) ? 'found' : 'notFound' }));
            pattern = JSON.parse(result[0].result);
        }

        if (Array.isArray(pattern)) {
            const processedRows = pattern.map(item => ({
                id: generateId(),
                name: key,
                item_name: item.item_name,
                valueType: item.reaction_item.value_type,
                flag: true,
                defFlag: pat_common,
                defValue: item.default_reaction_item,
                subRows: Array.isArray(item.reaction_item.value) ? item.reaction_item.value.map(subItem => ({
                    id: generateId(),
                    operator: subItem[0],
                    value: subItem[1],
                    type: subItem[2],
                    subValue: subItem[3],
                })) : [{
                    id: generateId(),
                    operator: '=',
                    value: item.reaction_item.value,
                    type: item.reaction_item.value_type,
                    subValue: '',
                }]
            }));

            updatedRows = [...updatedRows, ...processedRows];
        }
    }

    setAddedRows(updatedRows);
    onChange(updatedRows);
};

  const ValueInput = React.forwardRef(({ value, onChange }, ref) => (
    <input
      type="number"
      value={value}
      onChange={onChange}
      className="form-control"
      ref={ref}
    />
  ));

  const handleAddRow = (incident) => {
    const newRow = { name: incident, item_name: "", id: generateId(), valueType: 'per_1', defValue: '', flag: true, defFlag: false, subRows: [{ id: generateId(), operator: '=', value: '', type: 'per_1', subValue: '' }] };
    const updatedRows = [...addedRows, newRow];
    setAddedRows(updatedRows);
    onChange(updatedRows);
  };
  
  const handleDeleteRow = (id) => {
    const updatedRows = addedRows.filter(row => row.id !== id);
    setAddedRows(updatedRows);
    onChange(updatedRows);
  };
  
  const handleTypeChange = (id, value) => {
    const updatedRows = addedRows.map(row => (row.id === id ? { ...row, valueType: value } : row));
    setAddedRows(updatedRows);
    onChange(updatedRows);
  };

  const handleItemChange = (id, value) => {
    const updatedRows = addedRows.map(row => (row.id === id ? { ...row, item_name: value } : row));
    setAddedRows(updatedRows);
    onChange(updatedRows);
  };

  const handleFlagChange = (id, value) => {
    const updatedRows = addedRows.map(row => (row.id === id ? { ...row, flag: value } : row));
    setAddedRows(updatedRows);
    onChange(updatedRows);
  };

  const handleDefValueChange = (id, value) => {
    const updatedRows = addedRows.map(row => (row.id === id ? { ...row, defValue: value } : row));
    setAddedRows(updatedRows);
    onChange(updatedRows);
  };
  
  const handleSubRowFieldChange = (rowId, subRowId, fieldName, value) => {
    const updatedRows = addedRows.map(row => {
      if (row.id === rowId) {
        const updatedSubRows = row.subRows.map(subRow => (
          subRow.id === subRowId ? { ...subRow, [fieldName]: value } : subRow
        ));
        return { ...row, subRows: updatedSubRows };
      }
      return row;
    });
    setAddedRows(updatedRows);
    onChange(updatedRows);
  };
  
  const handleSubRowChange = (rowId, subRows) => {
    const updatedRows = addedRows.map(row => (row.id === rowId ? { ...row, subRows } : row));
    setAddedRows(updatedRows);
    onChange(updatedRows);
  };
  

  const getPattern = async (codeName, type, switchState, index) => {
    if (switchState) {
      try {
        setLoadingStates(prevStates => updateStateAtIndex(prevStates, index, true));
        const result = await getCommonPatternByCodeName(codeName, type);
        setPatternStatus(prevStatus => ({ ...prevStatus, [index]: Array.isArray(result) ? 'found' : 'notFound' }));
        if (!Array.isArray(result)) setSwitchStates(prevStates => updateStateAtIndex(prevStates, index, false));
        let pattern = JSON.parse(result[0].result);
        if (Array.isArray(pattern)) {
          const updatedRows = addedRows.filter(row => row.name !== codeName);
          setAddedRows(updatedRows);
          onChange(updatedRows);
  
          const processedRows = pattern.map(item => {
            return {
              id: generateId(),
              name: codeName,
              item_name: item.item_name,
              valueType: item.reaction_item.value_type,
              flag: true,
              defFlag: true,
              defValue: item.default_reaction_item,
              subRows: Array.isArray(item.reaction_item.value) ? item.reaction_item.value.map(subItem => ({
                id: generateId(),
                operator: subItem[0],
                value: subItem[1],
                type: subItem[2],
                subValue: subItem[3],
              })) : [{
                id: generateId(),
                operator: '=',
                value: item.reaction_item.value,
                type: item.reaction_item.value_type,
                subValue: '',
              }]
            };
          });
          const updatedAddedRows = [...updatedRows, ...processedRows];
          setAddedRows(updatedAddedRows);
          onChange(updatedAddedRows);
        }
        
      } catch (error) {
        console.log("ОШИБКА:", error);
      } finally {
        setLoadingStates(prevStates => updateStateAtIndex(prevStates, index, false));
      }
    } else {
      const updatedRows = addedRows.map(row => (row.name === codeName ? { ...row, defFlag: false } : row));
      setAddedRows(updatedRows);
      onChange(updatedRows);
    }
  };
  
  

  const updateStateAtIndex = (arr, index, value) => {
    const newArr = [...arr];
    newArr[index] = value;
    return newArr;
  };

  const generateId = () => Math.random().toString(36).substr(2, 9);

  const renderNameOptions = () => possibleNames.map((name, index) => (
    <option key={index} value={name}>{name}</option>
  ));

  const ValueCell = React.memo(({ id, valueType, subRows = [], item, disabled }) => {
  
    const [inputValue, setInputValue] = useState(subRows[0]?.value || '');
    const prevInputValueRef = useRef(inputValue);
  
    useEffect(() => {
      prevInputValueRef.current = inputValue;
    }, [inputValue, subRows]);
  
    const handleAddSubRow = () => {
      const newSubRow = { id: generateId(), operator: '=', value: '', type: 'per_1', subValue: '' };
      handleSubRowChange(id, [...subRows, newSubRow]);
    };
  
    const handleDeleteSubRow = (subId) => {
      handleSubRowChange(id, subRows.filter(row => row.id !== subId));
    };

    const handleValueChange = (value) => {
      setInputValue(value);
    };

    const handleBlur = () => {
        handleSubRowChange(id, [{ ...subRows[0], value: inputValue }]);
    };
  
    return (
      <>
        {valueType === 'custom' ? (
          <CustomTable
            subRows={subRows}
            item={item}
            handleDeleteSubRow={handleDeleteSubRow}
            handleSubRowFieldChange={(subRowId, fieldName, value) => handleSubRowFieldChange(id, subRowId, fieldName, value)}
            disabled={disabled}
          />
        ) : (
          typeOfAction == "look" ? inputValue : <input
              type="number"
              value={inputValue}
              className="form-control"
              onChange={(e) => handleValueChange(e.target.value)}
              onBlur={handleBlur}
              disabled={disabled}
          />
        )}
        {!disabled && typeOfAction != "look" && valueType === 'custom' && <button className="btn btn-outline-secondary btn-sm" onClick={handleAddSubRow}>Добавить строку</button>}
      </>
    );
  });
   
  

  const CustomTable = ({ subRows, item, handleDeleteSubRow, handleSubRowFieldChange, disabled }) => {
    const [inputValues, setInputValues] = useState(subRows.map(row => row.value || ''));
    const [inputNumberValues, setInputNumberValues] = useState(subRows.map(row => row.subValue || ''));
  
    const handleValueChange = (index, value) => {
      const newInputValues = [...inputValues];
      newInputValues[index] = value;
      setInputValues(newInputValues);
    };
  
    const handleBlur = (index) => {
      const updatedSubRows = subRows.map((row, i) => (i === index ? { ...row, value: inputValues[i] } : row));
      handleSubRowChange(updatedSubRows);
      handleSubRowFieldChange(subRows[index].id, 'value', inputValues[index]);
    };

    const handleNumberValueChange = (index, value) => {
      const newInputNumberValues = [...inputNumberValues];
      newInputNumberValues[index] = value;
      setInputNumberValues(newInputNumberValues);
    };
  
    const handleNumberBlur = (index) => {
      const updatedSubRows = subRows.map((row, i) => (i === index ? { ...row, subValue: inputNumberValues[i] } : row));
      handleSubRowChange(updatedSubRows);
      handleSubRowFieldChange(subRows[index].id, 'subValue', inputNumberValues[index]);
    };
  
    return (
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Оператор</th>
            <th>Значение</th>
            <th>Тип</th>
            <th>Значение</th>
            { typeOfAction != "look" ? <th>Действие</th> : null}
          </tr>
        </thead>
        <tbody>
          {subRows.map((subRow, index) => (
            <tr key={index}>
              <td>
              {typeOfAction == "look" ? subRow.operator :<select className="form-select"
                  value={subRow.operator}
                  disabled={disabled}
                  onChange={(e) => handleSubRowFieldChange(subRow.id, 'operator', e.target.value)}
                >
                  {item?.type === 'булевый' || item?.type === 'строковой' ? (
                    <option value="=">=</option>
                  ) : (
                    <>
                      <option value="=">{'='}</option>
                      <option value=">">{'>'}</option>
                      <option value=">=">{'>='}</option>
                      <option value="<">{'<'}</option>
                      <option value="<=">{'<='}</option>
                    </>
                  )}
                </select>}
              </td>
              <td>
              {typeOfAction == "look" ? inputValues[index] : <input
                disabled={disabled}
                className={item?.type === 'булевый' ? 'form-check-input' : 'form-control'}
                  type={item?.type === 'булевый' ? 'checkbox' : 'text'}
                  value={inputValues[index]}
                  onChange={(e) => handleValueChange(index, e.target.value)}
                  onBlur={() => handleBlur(index)}
                />}
              </td>
              <td>
              {typeOfAction == "look" ? (subRow.type == "per_1" ? "Для 1 единицы" : "В общем") : <select className="form-select"
                  disabled={disabled}
                  value={subRow.type}
                  onChange={(e) => handleSubRowFieldChange(subRow.id, 'type', e.target.value)}
                >
                  <option value="per_1">Для 1 единицы</option>
                  <option value="generally">В общем</option>
                </select> }
              </td>
              <td>
              {typeOfAction == "look" ? inputNumberValues[index] : <input
                  disabled={disabled}
                  className="form-control"
                  type={item?.type === 'числовой' ? 'number' : 'text'}
                  value={inputNumberValues[index]}
                  onChange={(e) => handleNumberValueChange(index, e.target.value)}
                  onBlur={() => handleNumberBlur(index)}
                />}
              </td>
              { typeOfAction != "look" ? <td>
                {!disabled && index !== 0 && <button className="btn btn-outline-danger btn-sm" onClick={() => handleDeleteSubRow(subRow.id)}>Удалить</button>}
              </td> : null}
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  
  
  
  let disablet = false
  return (
    <div>
      <h2>Таблица реакции</h2>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Название</th>
            <th>Предмет</th>
            <th>Тип реакции</th>
            <th>Статус</th>
            <th>Значение</th>
            <th>Значение по умолчанию</th>
            { typeOfAction != "look" ? <th>Действие</th> : null}
          </tr>
        </thead>
        <tbody>
          {formData.pattern_input.map((item, index) => (
            (item.name && item.type) && (
              <React.Fragment key={index}>
                <tr>
                  <td colSpan="7">{item.name}
                    {allowAddRemoveRows && <Form.Check
                      type="switch"
                      id={`defaultpat-switch-${index}`}
                      label=""
                      onChange={(e) => {
                        getPattern(item.name, "pattern_reaction", e.target.checked, index);
                        setSwitchStates(prevStates => updateStateAtIndex(prevStates, index, e.target.checked));
                      }}
                      checked={switchStates[index]} // Use state to control the switch
                      disabled={typeOfAction == "look"}
                    />}
                    {loadingStates[index] && <Loader />} {/* Render Loader if loading is active for this switch */}
                    {patternStatus[index] === 'found' && <span style={{ color: 'green' }}>Найдено</span>}
                    {patternStatus[index] === 'notFound' && <span style={{ color: 'red' }}>Не найдено</span>}
                  </td>
                </tr>
                {addedRows.filter(row => row.name === item.name).map(row => (
                  <tr key={row.id}>
                    {disablet = row.defFlag}
                    <td></td>
                    <td>
                    {typeOfAction == "look" ? row.item_name : <select className="form-select" disabled={row.defFlag} value={row.item_name} onChange={(e) => handleItemChange(row.id, e.target.value)}>
                        <option>Выберите предмет</option>
                        {renderNameOptions(item)}
                      </select>}
                    </td>
                    <td>
                    {typeOfAction == "look" ? (row.valueType == "per_1" ? "Для 1 единицы" : row.valueType == "generally" ? "В общем" : row.valueType == "custom" ? "Свой" : null)  : <select className="form-select" disabled={row.defFlag} value={row.valueType} onChange={(e) => handleTypeChange(row.id, e.target.value)}>
                        <option value="per_1">Для 1 единицы</option>
                        <option value="generally">В общем</option>
                        <option value="custom">Свой</option>
                      </select>}
                    </td>
                    <td>
                      <input disabled={row.defFlag || typeOfAction == "look"} className="form-check-input" type="checkbox" checked={row.flag} onChange={(e) => handleFlagChange(row.id, e.target.checked)} />
                    </td>
                    <td>
                      <ValueCell id={row.id} valueType={row.valueType} subRows={row.subRows} item={item} disabled={row.defFlag} />
                    </td>
                    <td>
                    {typeOfAction == "look" ? row.defValue  : <input disabled={row.defFlag} className="form-control" value={row.defValue}
                      onChange={(e) => handleDefValueChange(row.id, e.target.value)} type="number"  />}
                    </td>
                    {typeOfAction != "look" ? <td>
                      {row.defFlag || typeOfAction == "look" ? null : <button className="btn btn-outline-danger btn-sm" onClick={() => handleDeleteRow(row.id)}>Удалить</button>}
                    </td>: null}
                  </tr>
                ))}
                { typeOfAction != "look" ? <tr>
                  <td colSpan="7">
                    {disablet ? null : <button className="btn btn-outline-secondary btn-sm" onClick={() => handleAddRow(item.name)}>Добавить строку в {item.name}</button>}
                    {disablet = false}
                  </td>
                </tr> : null}
              </React.Fragment>
            )
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ReactionTable;