import { Context } from "../../..";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../../ui/Loader";
import MapContainerForIncidentCreate from "./MapContainerForIncidentCreate";
import { getIncidentById } from "../../../http/incidentsAPI";

function IncidentPage(props) {
  const { user } = useContext(Context);
  const navigate = useNavigate();

  const [json, setJson] = useState(null);
  const [data, setData] = useState('');
  const [address, setAddress] = useState('');
  const [coords, setCoords] = useState([]);
  const [coordsStoragesItems, setCoordsStoragesItems] = useState([]);
  const [pathStoragesItems, setPathStoragesItems] = useState([]);
  const [isDataLoading, setIsDataLoading] = useState(true);
  const [processed, setProcessed] = useState("NO");

  useEffect(() => {
    document.title = 'Инцидент';
  }, []);
  useEffect(() => {
    const fetchIncident = async () => {
      try {
        setIsDataLoading(true);
        const result = await getIncidentById(props.id);
        const incidentData = result[0][0];
        let jsonParsed;
        if (typeof incidentData.json === 'string') {
          jsonParsed = JSON.parse(incidentData.json);
        } else {
          jsonParsed = incidentData.json;
        }
        if(jsonParsed.processed)
          setProcessed(jsonParsed.processed)

        if(user.user['access'] == 2){
          jsonParsed = {'input_incident_information': jsonParsed}
        }

        setJson(jsonParsed);
        setData(incidentData);

        let coordsWithItems = [];
        let paths = [];
        
        if(user.user['access'] != 2 && jsonParsed.reaction && jsonParsed.reaction.storagesData){ Object.values(jsonParsed.reaction.storagesData).forEach(storage => {
            coordsWithItems.push([storage.id, storage.coordsBD]);
          if (storage.rodeInfo && storage.rodeInfo.paths.length > 0) {
            paths.push(storage.rodeInfo.paths[0].points);
          }
        })};

        setCoordsStoragesItems(coordsWithItems);
        setPathStoragesItems(paths);
        setCoords(incidentData.coord.split("/"));
        setIsDataLoading(false);
      } catch (e) {
        console.log(e)
        setIsDataLoading(false);
      }
    };

    fetchIncident();
  }, [props.id, navigate]);

  function getClassForStatusCode(statusCode) {
    if (statusCode >= 200 && statusCode < 300) {
      return 'table-success';
    } else if ((statusCode >= 500 && statusCode < 600) || statusCode === 0) {
      return 'table-danger';
    } else {
      return 'table-warning';
    }
  }

  function getAddr(pointData){
    let formattedAddress = `Страна ${pointData.country || ""}, г. ${pointData.city || ""}`;
    if (pointData.street) {
        formattedAddress += `, улица ${pointData.street}`;
    }
    if (pointData.housenumber) {
        formattedAddress += `, д. ${pointData.housenumber}`;
    }
    return formattedAddress;
  }

  return (
    <div>
      {isDataLoading ? (
        <Loader />
      ) : (
        <>
          <h2>Инцидент №{data.id} </h2>
          {processed != "fin" && user.user['access'] != 2 ? <h5>В обработке, перезагрузите страницу через некоторое время <Loader /></h5> : null}
          <MapContainerForIncidentCreate
            setAddress={setAddress}
            coords={coords}
            mapEdit={false}
            coordsStoragesItems={coordsStoragesItems}
            pathStoragesItems={pathStoragesItems}
          />
          <hr />
          <h4>Входные данные</h4>
          <ul className="list-group mt-2">
            <li className="list-group-item"><b>Координаты</b>: {coords.join(', ')}</li>
            <li className="list-group-item"><b>Создал</b>: {data.user_created}</li>
            <li className="list-group-item"><b>Создано</b>: {data.date_created.substring(0, 10)} {data.time_created}</li>
            <li className="list-group-item"><b>Входные данные</b>: 
              <table className="table mt-2 table-striped">
                {json && Object.keys(json.input_incident_information).length === 0 ? (
                  <tr><td>Нет входных данных</td></tr>
                ) : (
                  json && Object.entries(json.input_incident_information).map(([incidentName, incidentDetails], index) => (
                    <React.Fragment key={index}>
                      <thead>
                        <tr><th colSpan="2" className="table-info">Код происшествия: {incidentName}</th></tr>
                        <tr>
                          <th>Название параметра</th>
                          <th>Значение</th>
                        </tr>
                      </thead>
                      <tbody>
                        {Object.entries(incidentDetails).map(([paramName, paramValue], paramIndex) => (
                          <tr key={paramIndex}>
                            <td>{paramName}</td>
                            <td>{String(paramValue)}</td>
                          </tr>
                        ))}
                        <tr><td colSpan="2"></td></tr>
                      </tbody>
                    </React.Fragment>
                  ))
                )}
              </table>
            </li>
          </ul>
          {user.user['access'] != 2 ? <>
          <div className="accordion mt-2" id="accordionExample">
          {processed != "fin" ? <><hr /><h5>В обработке, перезагрузите страницу через некоторое время <Loader /></h5></> : <>
          <div className="accordion-item">
            <h2 className="accordion-header" id="panelsStayOpen-heading1">
              <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapse1" aria-expanded="false" aria-controls="panelsStayOpen-collapse1">
              Настройки системы
              </button>
            </h2>
            <div id="panelsStayOpen-collapse1" className="accordion-collapse collapse" aria-labelledby="panelsStayOpen-heading1">
              <div className="accordion-body">
              <ul className="list-group mt-2">
          <li className="list-group-item"> 
              <table className="table mt-2 table-striped">
                <thead>
                  <tr>
                    <th>Настройка</th>
                    <th>Значение</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Процент допущения</td>
                    <td>{json.reaction.coefData.percent_mistake}%</td>
                  </tr>
                  <tr>
                    <td>Средняя скорость транспорта</td>
                    <td>{json.reaction.coefData.viacle_avarge_speed}км/ч</td>
                  </tr>
                  <tr>
                    <td>Процент взятия со склада за 1 проход</td>
                    <td>{json.reaction.coefData.percent_taken_from_warehouse}%</td>
                  </tr>
                  <tr>
                    <td>Коэффициент дистанции по дорогам (от дистанции по прямой)</td>
                    <td>x{json.reaction.coefData.road_distanse_multiplexer}</td>
                  </tr>
                </tbody>
              </table>
            </li>
          </ul>
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header" id="panelsStayOpen-heading2">
              <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapse2" aria-expanded="false" aria-controls="panelsStayOpen-collapse2">
              Запрошенные предметы
              </button>
            </h2>
            <div id="panelsStayOpen-collapse2" className="accordion-collapse collapse" aria-labelledby="panelsStayOpen-heading2">
              <div className="accordion-body">
              {json && Object.keys(json.reaction.incidentsData).length === 0 ? (
            <div className="col">
              <b>Не найдено 123</b>
            </div>
          ) : (
            <ul className="list-group mt-2">
              <li className="list-group-item"> 
              <table className="table mt-2 table-striped">
                {Object.keys(json.reaction.incidentsData.allItemsRequest).length === 0 ? (
                  <tbody>
                    <tr><td>Не найдено предметов</td></tr>
                  </tbody>
                ) : (
                  <>
                    <thead>
                      <tr>
                        <th>Название предмета</th>
                        <th>Количество</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.entries(json.reaction.incidentsData.allItemsRequest).map(([itemName, itemValue]) => (
                        <tr key={itemName}>
                          <td>{itemName}</td>
                          <td>{itemValue}</td>
                        </tr>
                      ))}
                    </tbody>
                  </>
                )}
              </table>
              </li>
            </ul>
          )
          }
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header" id="panelsStayOpen-heading3">
              <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapse3" aria-expanded="false" aria-controls="panelsStayOpen-collapse3">
              Реакция по инцидентам
              </button>
            </h2>
            <div id="panelsStayOpen-collapse3" className="accordion-collapse collapse" aria-labelledby="panelsStayOpen-heading3">
              <div className="accordion-body">
              <div className="row">
            {json && Object.keys(json.reaction.incidentsData).length < 2 ? (
              <div className="col">
                <b>Не найдено</b>
              </div>
            ) : (
              Object.entries(json.reaction.incidentsData).map(([incidentName, incidentDetails]) => (
                incidentName !== "allItemsRequest" ? (
                  <div key={incidentName} className={`col-md-${Object.keys(json.reaction.incidentsData).length == 2 ? "12" : "6"}`}>
                    <ul className="list-group mt-2">
                      <li className="list-group-item"><b>Код инцидента</b>: {incidentName}</li>
                      <li className="list-group-item"><b>Примерное время реакции</b>: {incidentDetails.react_time} - {incidentDetails.react_time_max} мин</li>
                      <li className="list-group-item"><b>Радиус поиска</b>: {incidentDetails.radius}м</li>
                      <li className="list-group-item"><b>Радиус поиска максимальный</b>: {incidentDetails.max_radius}м</li>
                      <li className="list-group-item"><b>Радиус поиска минимальный</b>: {incidentDetails.min_radius}м</li>
                      <li className="list-group-item"><b>Взятые предметы</b>: 
                        <table className="table mt-2 table-striped">
                          {Object.keys(incidentDetails.itemsData.found).length === 0 ? (
                            <tbody>
                              <tr><td>Не найдено предметов</td></tr>
                            </tbody>
                          ) : (
                            <>
                              <thead>
                                <tr>
                                  <th>Название предмета</th>
                                  <th>Количество</th>
                                </tr>
                              </thead>
                              <tbody>
                                {Object.entries(incidentDetails.itemsData.found).map(([itemName, itemValue]) => (
                                  <tr key={itemName}>
                                    <td>{itemName}</td>
                                    <td>{itemValue}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </>
                          )}
                        </table>
                      </li>
                      <li className="list-group-item"><b>Запрошенные предметы</b>: 
                        <table className="table mt-2 table-striped">
                          {Object.keys(incidentDetails.itemsData.items).length === 0 ? (
                            <tbody>
                              <tr><td>Не найдено предметов</td></tr>
                            </tbody>
                          ) : (
                            <>
                              <thead>
                                <tr>
                                  <th>Название предмета</th>
                                  <th>Количество</th>
                                  <th>Минимальное количество</th>
                                </tr>
                              </thead>
                              <tbody>
                                {Object.entries(incidentDetails.itemsData.items).map(([itemName, itemValue]) => (
                                  <tr key={itemName}>
                                    <td>{itemName}</td>
                                    <td>{itemValue}</td>
                                    <td>{incidentDetails.itemsData.items_allowed_min[itemName]}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </>
                          )}
                        </table>
                      </li>
                      <li className="list-group-item"><b>Полученные предметы по складам</b>: 
                        <table className="table mt-2 table-striped">
                          {json && Object.keys(incidentDetails.itemsData.itemsInStorages).length === 0 ? (
                            <tr><td>Нет предметов</td></tr>
                          ) : (
                            json && Object.entries(incidentDetails.itemsData.itemsInStorages).map(([storageId, storageDetails], index) => (
                              <React.Fragment key={index}>
                                <thead>
                                  <tr className="table-info"><th colSpan="2">Склад №{storageId}</th><th></th></tr>
                                  <tr>
                                    <th>Название предмета</th>
                                    <th>Количество</th>
                                    <th>Процент от общего числа данного предмета</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {Object.entries(storageDetails).map(([paramName, paramValue], paramIndex) => (
                                    <tr key={paramIndex}>
                                      <td>{paramName}</td>
                                      <td>{paramValue[0]}</td>
                                      <td>{paramValue[1]}%</td>
                                    </tr>
                                  ))}
                                </tbody>
                              </React.Fragment>
                            ))
                          )}
                        </table>
                      </li>

                    </ul>
                  </div>
                ) : null
              ))
            )}
          </div>
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header" id="panelsStayOpen-heading4">
              <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapse4" aria-expanded="false" aria-controls="panelsStayOpen-collapse4">
              Реакция по складам
              </button>
            </h2>
            <div id="panelsStayOpen-collapse4" className="accordion-collapse collapse" aria-labelledby="panelsStayOpen-heading4">
              <div className="accordion-body">
              <div className="row">
            {json && Object.keys(json.reaction.storagesData).length === 0 ? (
              <div className="col">
                <b>Не найдено складов</b>
              </div>
            ) : (
              Object.entries(json.reaction.storagesData).map(([storageId, storageDetails]) => (
                <div key={storageId} className={`col-md-${Object.keys(json.reaction.storagesData).length == 1 ? "12" : "6"}`}>
                  <ul className="list-group mt-2">
                    <li className="list-group-item"><b>№ склада</b>: №{storageId}</li>
                    <li className="list-group-item"><b>Адрес</b>: {getAddr(storageDetails.addr)}</li>
                    <li className="list-group-item"><b>Координаты</b>: {storageDetails.coordsBD.join(', ')}</li>
                    <li className="list-group-item"><b>Дистанция по дороге от склада до происшествия</b>: {storageDetails.distanseByRoad}м</li>
                    <li className="list-group-item"><b>Данные</b>: 
                      <table className="table mt-2 table-striped">
                        {Object.keys(storageDetails.foundItems).length === 0 ? (
                          <tbody>
                            <tr><td>Не найдено предметов</td></tr>
                          </tbody>
                        ) : (
                          <>
                            <thead>
                              <tr>
                                <th>Название параметра</th>
                                <th>Значение</th>
                              </tr>
                            </thead>
                            <tbody>
                              {Object.entries(storageDetails.foundItems).map(([itemName, itemValue]) => (
                                <tr key={itemName}>
                                  <td>{itemName}</td>
                                  <td>{itemValue}</td>
                                </tr>
                              ))}
                            </tbody>
                          </>
                        )}
                      </table>
                    </li>
                  </ul>
                </div>
              ))
            )}
          </div>
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header" id="panelsStayOpen-heading5">
              <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapse5" aria-expanded="false" aria-controls="panelsStayOpen-collapse5">
              Отправка данных
              </button>
            </h2>
            <div id="panelsStayOpen-collapse5" className="accordion-collapse collapse" aria-labelledby="panelsStayOpen-heading5">
              <div className="accordion-body">
              {json && Object.keys(json.sent).length === 0 ? (
              <div className="col">
                <b>Нет отправок</b>
              </div>
            ) : (
              <div className="table-responsive">
                <table className="table mt-2">
                  <thead>
                    <tr>
                      <th>URL</th>
                      <th>Код ответа</th>
                      <th>Сообщение</th>
                    </tr>
                  </thead>
                  <tbody>
                    {json && json.sent && Object.entries(json.sent).map(([url, response]) => (
                      <tr key={url} className={getClassForStatusCode(response.statusCode)}>
                        <td>{url}</td>
                        <td>{response.statusCode}</td>
                        <td>{typeof response.message === 'object' ? JSON.stringify(response.message) : response.message}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
              </div>
            </div>
          </div>
          </>}
          <div className="accordion-item">
            <h2 className="accordion-header" id="panelsStayOpen-heading6">
              <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapse6" aria-expanded="false" aria-controls="panelsStayOpen-collapse6">
              Полный json
              </button>
            </h2>
            <div id="panelsStayOpen-collapse6" className="accordion-collapse collapse" aria-labelledby="panelsStayOpen-heading6">
              <div className="accordion-body">
              <pre id="jsonContentPre">{JSON.stringify(json, null, 2)}</pre>
              </div>
            </div>
          </div>
          </div>
          </> : null }
        </>
      )}
    </div>
  );
}

export default IncidentPage;
