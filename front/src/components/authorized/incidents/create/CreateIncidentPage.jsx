import React, { useEffect, useState } from "react";
import { createIncident, getInputPattern, getTypes } from "../../../../http/incidentsAPI";
import Select from 'react-select';
import MapContainerForIncidentCreate from "../MapContainerForIncidentCreate";
import MessageText from "../../../ui/MessageText";
import Loader from "../../../ui/Loader";
import { getAddress } from "../../../../http/geoAPI";


function CreateIncidentPage(props){
  const [incidents, setIncidents] = useState([]);
  const [selectedIncidents, setSelectedIncidents] = useState([]);
  const [availableIncidents, setAvailableIncidents] = useState([]);
  const [incidentData, setIncidentData] = useState({});
  const [selectedOption, setSelectedOption] = useState(null);
  const [coords, setСоrds] = useState([])
  const [address, setAddress] = useState('')
  const [login, setLogin] = useState('')
  const [loginErr, setLoginErr] = useState('')
  const [isLoginLoading, setIsLoginLoading] = useState(false)
  const [isDataForPageLoading, setIsDataForPageLoading] = useState(true)
  const [error, setError] = useState('')
  const [bigError, setBigError] = useState('')
  const [errorCreate, setErrorCreate] = useState(["", "info"])

  useEffect(() => {
    getTypes()
      .then(response => {
        setIncidents(response);
        setAvailableIncidents(response);
        if(response.length == 0){
          setBigError("Нет паттернов, администрация сначала должна создать их")
        }
        setIsDataForPageLoading(false)
      });
  }, []);

  const handleIncidentSelect = (selectedOption) => {
    let code_name = selectedOption.value;
    let name = incidents.filter(incident => incident.code_name == code_name)[0].name
    const stringCodeName = code_name.toString();
    getInputPattern(code_name)
      .then(response => {
        setSelectedIncidents(prevIncidents => [...prevIncidents, {response, code_name, name}]);
        setAvailableIncidents(prevIncidents => prevIncidents.filter(incident => incident.code_name != stringCodeName));
      });
    
  };

  function getAddr() {
    if (address !== '') {
        const addrData = JSON.parse(address);
        let addrRes = '';
        if (addrData.hits.length > 0){
          const coordsFinale = addrData.hits[0].point.lat + "/" + addrData.hits[0].point.lng
            addrRes = (
              <div className="card mt-2">
                <div className="card-body">
                  <div>
                      <div>Страна: {addrData.hits[0].country}</div>
                      <div>Округ: {addrData.hits[0].state}</div>
                      <div>Город: {addrData.hits[0].city}</div>
                      <div>Улица: {addrData.hits[0].street}</div>
                      <div>Дом: {addrData.hits[0].housenumber}</div>
                      <div>координаты: {coordsFinale}</div>
                  </div>
                </div>
              </div>
                
            );
        }else{
            addrRes = (
            <div className="card mt-2">
            <div className="card-body">
              Адрес не найден!
            </div>
          </div>);
        }
        return addrRes;
    }
    return '';
  }


  async function findAddress(event){
    event.preventDefault();
    try{
      setError('')
      setLoginErr('')
      let notToEnter = false
      if(login.length === 0){
        setError('Заполните поле поиска')
        notToEnter = true
      }else{
        if(!notToEnter){
            setIsLoginLoading(true)
            event.preventDefault();
            await getAddress(login).then((result) => {
                setAddress(result.data)
                const addrData = JSON.parse(result.data);
                if(addrData.hits.length > 0){
                  setСоrds([addrData.hits[0].point.lat, addrData.hits[0].point.lng])
                }
            })
        }
      }
      setIsLoginLoading(false)
    }catch(e){
      let massageErr = e
      setError(massageErr)

      setIsLoginLoading(false)
    }
  }

  const handleIncidentDelete = (code_name) => {
    const stringCodeName = code_name.toString();
    setSelectedIncidents(prevIncidents => prevIncidents.filter(incident => incident.code_name != stringCodeName));
    setIncidentData(prevData => {
      delete prevData[stringCodeName];
      return {...prevData};
    });
    setAvailableIncidents(prevIncidents => {
      const foundIncident = incidents.find(incident => incident.code_name === code_name);
      if (foundIncident) {
        return [...prevIncidents, foundIncident];
      } else {
        return prevIncidents;
      }
    });
  };

  const handleInputChange = (code_name, field, value) => {
    if (value === 'on') {
      value = true;
    } else {
      if (value === 'true' || value === 'false') {
        value = value === 'true';
      } else if (!isNaN(value)) {
        value = parseFloat(value);
      }
    }
    setIncidentData(prevData => ({
      ...prevData,
      [code_name]: {
        ...prevData[code_name],
        [field]: value,
      },
    }));
  };

  async function create () {
    setErrorCreate(["", "info"])
    try{
      setError('')
      if(address.length < 1){
        setError('Не выбран адрес!')
      } else if (selectedIncidents.length === 0) {
        setError('Не выбран инцидент!')
      } else {
        setIsLoginLoading(true)
        const addrData = JSON.parse(address);
        const coordsFinale = addrData.hits[0].point.lat + "/" + addrData.hits[0].point.lng
        if (Object.keys(incidentData).length === 0) {
          const defaultIncident = { [selectedIncidents[0].code_name]: {} };
          await createIncident(coordsFinale, defaultIncident)
            .then((result) => {
              setErrorCreate([`Создано, <a href="http://localhost:3000/incidents/id/${result.data}">перейти</a>`, "success"])
            })
            .catch(error => {setErrorCreate([error.response.data.message, "danger"])});
        } else {
          await createIncident(coordsFinale, incidentData)
            .then((result) => {
              setErrorCreate([`Создано, <a href="http://localhost:3000/incidents/id/${result.data}">перейти</a>`, "success"])
            })
            .catch(error => {setErrorCreate([error.response.data.message, "danger"])});
        }
      }
      setIsLoginLoading(false)
    } catch(e){
      let massageErr = e.response.data.type
      setErrorCreate([massageErr, "danger"])
      setIsLoginLoading(false)
    }
  };

  function checkConstraints(value, constraints) {
    if (!constraints || constraints.length === 0) {
      return true;
    }
  
    const constraintType = constraints[0];
    if (constraintType === 'between') {
      const min = constraints[1];
      const max = constraints[2];
      return value >= min && value <= max;
    } else if (constraintType === 'in') {
      const validValues = constraints.slice(1).map(String);
      console.log(validValues, String(value));
      return validValues.includes(String(value));
    }
  
    return true;
  }

  return (
    <div>
      {isDataForPageLoading? <Loader /> : bigError ? <MessageText text={bigError} typeOf={'danger'} /> : <>
        <form>
        <div className="input-group mb-3">
          <input value={login} onChange={e => setLogin(e.target.value)} type="text" className="form-control" placeholder="Адрес" aria-label="Recipient's username" aria-describedby="button-addon2" id="loginLogin" required></input>
          {isLoginLoading
          ? <Loader />
          : <button className="btn btn-outline-secondary" type="button" onClick={findAddress} id="button-addon2">Найти</button>
          }
        </div>
        {loginErr.length > 0 ? <div className="text-danger">{loginErr}!</div> : null}
          {error.length > 0 ? <MessageText text={error} typeOf={'danger'} /> : null}
        </form>
        <MapContainerForIncidentCreate setAddress={setAddress} coords={coords} mapEdit={true}  type={"create"}/>
        {getAddr()}
        {selectedIncidents && selectedIncidents.map((incident, index) => (
          <div className="card mt-2">
          <div key={index} className="card-body">
            <h4>{incident.name} ({incident.code_name})</h4>
            <button onClick={() => handleIncidentDelete(incident.code_name)} type="button" className="btn btn-link">Удалить</button>
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Параметр</th>
                  <th>Тип данных</th>
                  <th>Ограничения</th>
                  <th>Значение</th>
                </tr>
              </thead>
              <tbody>
                {incident && Object.entries(incident.response).map(([key, value]) => (
                  value[2] == "active" ? <>
                  <tr>
                    <td>{key}{value[1] === 'required' ? "*" : null}</td>
                    <td>{value[0]}</td>
                    <td>
                      {value[3] ? (
                        <>
                          {value[3][0] === 'between' ? 'Между' : value[3][0] === 'in' ? 'Среди' : value[3][0]}
                          {value[3].slice(1).length > 0 && ` (${value[3].slice(1).join(', ')})`}
                        </>
                      ) : 'Нет'}
                    </td>

                    <td>
                      <input
                        type={value[0] === 'числовой' ? 'number' : value[0] === 'булевый' ? 'checkbox' : 'text'}
                        required={value[1] === 'required'}
                        onChange={e => {
                          if (checkConstraints(e.target.value, value[3])) {
                            handleInputChange(incident.code_name, key, e.target.value);
                            setErrorCreate([``, "danger"])
                          } else {
                            handleInputChange(incident.code_name, key, e.target.value);
                            setErrorCreate([`Неправильное значение: ${e.target.value}`, "danger"])
                          }
                        }}
                      />
                    </td>
                  </tr>
                  </> : null
                ))}
              </tbody>
            </table>
          </div>
          </div>
        ))}
        <Select
          value={selectedOption}
          onChange={handleIncidentSelect}
          options={availableIncidents.map(incident => ({ value: incident.code_name, label: incident.name }))}
          placeholder="Выберите инцидент"
          isClearable={true}
          menuPlacement="top"
          className="mt-2"
        />
        <button onClick={create} className="btn btn-success mt-2">Сохранить</button>
        {errorCreate[0].length > 0 ? <MessageText text={errorCreate[0]} typeOf={errorCreate[1]} /> : null}
        </>}
    </div>
  );
}

export default CreateIncidentPage;