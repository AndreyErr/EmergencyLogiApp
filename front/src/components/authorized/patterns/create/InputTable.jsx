import React, { useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import Loader from '../../../ui/Loader';
import { getCommonPatternByCodeName } from '../../../../http/patternAPI';

function InputTable({ data, onChange, allowAddRemoveRows, existPattern, code_name, typeOfAction }) {
  const [rows, setRows] = useState(data || [
    { type: "числовой", status: true, reqired: false, defaultpat: false, name: '', criteria: '', values: [''] }
  ]);
  const [switchLock, setSwitchLock] = useState(false);
  const [activeSwitchIndex, setActiveSwitchIndex] = useState(null);
  const [patternResults, setPatternResults] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (existPattern && existPattern.pattern_input) {
      setIsLoading(true);
      fetchPatternRows(existPattern);
    }
  }, [existPattern]);

  useEffect(() => {
    if (!allowAddRemoveRows) {
      setRows((prevRows) => prevRows.map((row, index) => ({ ...row, name: code_name })));
      onChange(rows.map((row) => ({ ...row, name: code_name })));
    }
  }, [code_name, allowAddRemoveRows]);

  const fetchPatternRows = async (patternData) => {
    const newRows = [];
    if(patternData.type == "common"){
        const pattern = patternData.pattern_input;
        let criteria = null;
        let values = null;

        if (pattern[3]) {
          if (pattern[3][0] === "in") {
            criteria = pattern[3][0];
            values = pattern[3].slice(1).join(", ");
          } else {
            criteria = pattern[3][0];
            values = pattern[3].slice(1);
          }
        }
          newRows.push({
            name: patternData.code_name,
            type: pattern[0],
            status: pattern[2] === "active",
            reqired: pattern[1] === "required",
            criteria: criteria ? criteria : null,
            values: values ? values : null,
            defaultpat: false
          });
    }else{
      for (const key in patternData.pattern_input) {
        const pattern = patternData.pattern_input[key];
        if (pattern === "PATTERN_COMMON") {
          try {
            const result = await getCommonPatternByCodeName(key, "input");
            if (Array.isArray(result)) {
              const parsedPattern = JSON.parse(result[0].result);
              let criteria = null;
              let values = null;

              if (parsedPattern[3]) {
                if (parsedPattern[3][0] === "in") {
                  criteria = parsedPattern[3][0];
                  values = parsedPattern[3].slice(1).join(", ");
                } else {
                  criteria = parsedPattern[3][0];
                  values = parsedPattern[3].slice(1);
                }
              }
              newRows.push({
                name: key,
                type: parsedPattern[0],
                status: parsedPattern[2] === "active",
                reqired: parsedPattern[1] === "required",
                criteria: criteria ? criteria : null,
                values: values ? values : null,
                defaultpat: true
              });
            }
          } catch (error) {
            console.log("ОШИБКА:", error);
          }
        } else {
          let criteria = null;
          let values = null;
          if (pattern[3]) {
            if (pattern[3][0] === "in") {
              criteria = pattern[3][0];
              values = pattern[3].slice(1).join(", ");
            } else {
              criteria = pattern[3][0];
              values = pattern[3].slice(1);
            }
          }
          newRows.push({
            name: key,
            type: pattern[0],
            status: pattern[2] === "active",
            reqired: pattern[1] === "required",
            criteria: criteria ? criteria : null,
            values: values ? values : null,
            defaultpat: false
          });
        }
      }
    }
    setIsLoading(false);
    setRows(newRows.filter(row => row.name));
    onChange(newRows.filter(row => row.name));
  };
  
  useEffect(() => {
    if (data && data.length > 0) {
      setRows(data);
    }
    if (existPattern && existPattern.pattern_input) {
      fetchPatternRows(existPattern);
    }
  }, [data, existPattern]);

  const handleChange = (index, change) => {
    const updatedRows = [...rows];
    if (change.hasOwnProperty('criteria')) {
      updatedRows[index] = { ...updatedRows[index], ...change, values: [''] };
    } else {
      updatedRows[index] = { ...updatedRows[index], ...change };
    }
    setRows(updatedRows);
    onChange(updatedRows);
  };

  const handleRemove = (index) => {
    const updatedRows = rows.filter((_, i) => i !== index);
    setRows(updatedRows);
    onChange(updatedRows);
  };

  const getPattern = async (codeName, type, switchState, index) => {
    if (switchState) {
      try {
        setSwitchLock(true);
        setActiveSwitchIndex(index);
        const result = await getCommonPatternByCodeName(codeName, type);
        
        if (Array.isArray(result)) {
          const pattern = JSON.parse(result[0].result);
          const updatedRows = [...rows];
          updatedRows[index].type = pattern[0];
          updatedRows[index].status = pattern[2] === "active" ? true : false;
          updatedRows[index].reqired = pattern[1] === "required" ? true : false;
          updatedRows[index].criteria = pattern[3][0];
          updatedRows[index].values = pattern[3] === "between" ? [pattern[3][1], pattern[3][2]] : pattern[3] === "in" ? pattern[3].slice(1).join(",") : pattern[3].slice(1);
          updatedRows[index].defaultpat = true;
          setRows(updatedRows);
          setPatternResults(prevResults => ({ ...prevResults, [index]: true }));
          setActiveSwitchIndex(null);
          onChange(updatedRows);
        } else if (!result) {
          handleChange(index, { defaultpat: false });
          onChange(rows);
          setPatternResults(prevResults => ({ ...prevResults, [index]: false }));
        }
      } catch (error) {
        console.log("ОШИБКА:", error);
      } finally {
        setSwitchLock(false);
      }
    } else {
      handleChange(index, { type: '', status: true, criteria: '', values: [''] });
      setRows(rows.map((row, i) => i === index ? { ...row, defaultpat: false, default_pat: false } : row));
      onChange(rows.map((row, i) => i === index ? { ...row, defaultpat: false, default_pat: false } : row));
      setPatternResults(prevResults => ({ ...prevResults, [index]: undefined }));
    }
  };
  
  
  

  return (
    <div>
      {isLoading ? (
      <Loader />
      ) : (
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Название</th>
            {allowAddRemoveRows && <th>Общий</th>}
            <th>Тип</th>
            <th>Статус</th>
            <th>Обязательность</th>
            <th>Критерий</th>
            <th>Значение</th>
            {allowAddRemoveRows && typeOfAction != "look" && <th>Действие</th>}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              <td>
                {typeOfAction == "look"
                  ? <div>{!allowAddRemoveRows ? code_name : row.name}</div>
                  : <input type="text" name="name" className="form-control" value={!allowAddRemoveRows ? code_name : row.name} onChange={(e) => handleChange(index, { name: e.target.value })} required disabled={row.defaultpat || !allowAddRemoveRows} />
                }
              </td>
              {allowAddRemoveRows && <td>
                <Form.Check
                  type="switch"
                  id={`defaultpat-switch-${index}`}
                  label=""
                  checked={row.defaultpat}
                  onChange={(e) => {
                    handleChange(index, { defaultpat: e.target.checked });
                    getPattern(row.name, "input", e.target.checked, index);
                  }}
                  disabled={switchLock || typeOfAction == "look"}
                />
                {patternResults[index] !== undefined && (
                  patternResults[index] ? <span style={{ color: 'green' }}>Найдено</span> : <span style={{ color: 'red' }}>Не найдено</span>
                )}
              </td>}
              {(activeSwitchIndex === index && switchLock) ? (
                <td colSpan="5" style={{ textAlign: 'center' }}>
                  <Loader />
                </td>
              ) : (
                <>
                  <td>
                    {typeOfAction == "look" 
                    ? <div>{row.type}</div>
                    : <select name="type" className="form-select" value={row.type} onChange={(e) => handleChange(index, { type: e.target.value })} required disabled={row.defaultpat || !row.name} >
                        <option value="числовой">Числовой</option>
                        <option value="булевый">Булевый</option>
                        <option value="строковой">Строковой</option>
                      </select>
                    }
                  </td>
                  <td>
                    <input type="checkbox" name="status" className="form-check-input" checked={row.status} onChange={(e) => handleChange(index, { status: e.target.checked })} disabled={row.defaultpat || typeOfAction == "look"} />
                  </td>
                  <td>
                    <input type="checkbox" name="reqired" className="form-check-input" checked={row.reqired} onChange={(e) => handleChange(index, { reqired: e.target.checked })} disabled={row.defaultpat || typeOfAction == "look"} />
                  </td>
                  <td>
                  {typeOfAction == "look" 
                  ? row.criteria == "between" ? "Между" : row.criteria == "in" ? "Среди" : "Нет"
                  : row.type && row.name && (
                    <select name="criteria" className="form-select" value={row.criteria} onChange={(e) => handleChange(index, { criteria: e.target.value })} disabled={row.defaultpat}>
                      <option value="">Нет</option>
                      {row.type === 'числовой' && <option value="between">Между</option>}
                      {row.type != 'булевый' && <option value="in">Среди</option>}
                    </select>
                    )
                  }
                  </td>
                  <td>
                    {row.criteria === 'between' && row.type === 'числовой' ? (
                      typeOfAction == "look" 
                      ? <div>От {row.values[0]} до {row.values[1]} включительно</div>
                      : <>
                          <input type="number" className="form-control" value={row.values[0]} onChange={(e) => handleChange(index, { values: [e.target.value, row.values[1]] })} placeholder="Min" required={!!row.type && !!row.criteria} disabled={row.defaultpat} />
                          <input type="number" className="form-control" value={row.values[1]} onChange={(e) => handleChange(index, { values: [row.values[0], e.target.value] })} placeholder="Max" required={!!row.type && !!row.criteria} disabled={row.defaultpat} />
                        </>
                    ) : (
                      row.criteria && (
                        typeOfAction == "look" 
                        ? <div>Среди {Array.isArray(row.values) ? row.values.join(',') : row.values}</div>
                        : <>
                          <input type={row.type === 'булевый' ? 'checkbox' : 'text'} className={row.type === 'булевый' ? 'form-check-input' : 'form-control'} value={Array.isArray(row.values) ? row.values.join(',') : row.values} onChange={(e) => handleChange(index, { values: e.target.type === 'checkbox' ? e.target.checked : e.target.value })} required={!!row.type && !!row.criteria} disabled={row.defaultpat} />
                          <small>Введите значения через запятую (пример: ааа, bbb)</small>
                        </>
                      )
                    )}
                  </td>
                  {allowAddRemoveRows && typeOfAction != "look" && (
                    <td>
                      <button className="btn btn-outline-danger btn-sm" onClick={() => handleRemove(index)}>Удалить</button>
                    </td>
                  )}
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      )}
      {allowAddRemoveRows && typeOfAction != "look" && !isLoading && (
        <button className="btn btn-outline-secondary btn-sm mb-2" onClick={() => setRows([...rows, { type: "числовой", status: true, reqired: false, defaultpat: false, name: '', criteria: '', values: ['', ''] }])}>
          Добавить строку
        </button>
      )}
    </div>
  );
}

export default InputTable;
