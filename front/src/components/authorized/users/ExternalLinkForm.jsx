import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../..";
import { createExternalLink, editExternalLink } from "../../../http/externalLinkAPI";
import MessageText from "../../ui/MessageText";

function ExternalLinkForm(props){
    const {user} = useContext(Context)

    const [linksData, setLinksData] = useState({
      "link_id": "",
      "link_name": "",
      "link_descr": "",
      "link_href": "",
      "link_body": "",
      "link_apikey": "",
      "link_status": 1
    });
    const [linksCreteLoader, setLinksCreteLoader] = useState(false)
    const [linksCreteResult, setLinksCreteResult] = useState(['', ''])
    useEffect(() => {
        if(props.type == "edit"){
            setLinksData({
                "link_id": props.data.link_id,
                "link_name": props.data.link_name,
                "link_descr": props.data.link_descr,
                "link_href": props.data.link_href,
                "link_body": props.data.link_body,
                "link_apikey": props.data.link_apikey,
                "link_status": props.data.link_status
            })
        }
    }, [])

    function externalLinkChange(type){
      setLinksCreteLoader(true)
      let errorMessage = '';

      if(errorMessage === '') {
          try{
            if(type == "create"){
                createExternalLink(linksData).then((result) => {
                    if(result == "OK"){
                      setLinksCreteResult(["Ссылка создана", "success"]);
                      props.externalLinkAdd(linksData)
                    }else{
                      setLinksCreteResult(["Ошибка создания ссылки: " + result, "danger"]);
                    }
                  }).catch((error) => {
                    setLinksCreteResult(["Ошибка создания ссылки: " + error.response.data.message, "danger"]);
                });
            }else{
              editExternalLink(linksData).then((result) => {
                  if(result == "OK"){
                      setLinksCreteResult(["Ссылка изменена", "success"]);
                      props.updateLinks(linksData)
                  }else{
                    setLinksCreteResult(["Ошибка изменения ссылки: " + result, "danger"]);
                  }
                }).catch((error) => {
                  setLinksCreteResult(["Ошибка изменения ссылки: " + error.response.data.message, "danger"]);
              });
            }
          }catch(e){
              let massageErr = e.response.data.message;
              setLinksCreteResult("Ошибка создания ссылки: " + massageErr);
          }
      } else {
        setLinksCreteResult("Ошибка создания ссылки: " + errorMessage);
      }
      setLinksCreteLoader(false);
    }

    const handleInputChange = (event) => {
      const fieldName = event.target.name;
      const fieldValue = event.target.value;
      setLinksData(prevState => ({
        ...prevState,
        [fieldName]: fieldValue
      }));
    };

      return(
        <span>
            {props.externalLinksCountMax > props.externalLinksCount && props.type == "create" || props.type != "create" ?
            <button type="button" className={`btn btn-outline-secondary btn-sm ${props.type == "create" ? "" : "m-1"}`} data-bs-toggle="modal" data-bs-target={`#createLink${props.id}`}>
              {props.typePage == "creator" ? props.type == "create" ? "Создать ссылку" : "Редактировать данные" : "Данные"}
            </button> : null}
            <div className="modal fade text-dark" id={`createLink${props.id}`} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div className="modal-dialog modal-dialog-centered  modal-xl">
                <div className="modal-content">
                  <div className="modal-header">
                    <h1 className="modal-title fs-5" id="exampleModalLabel">{props.typePage == "creator" ? props.type == "create" ? "Создать ссылку" : "Редактировать данные" : "Данные"}</h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div className="modal-body">
                    <form>
                    {linksCreteResult}
                    <div className="mb-3">
                    <div>
                      <label htmlFor="link_name" className="form-label">Название</label>
                      {props.typePage == "creator" ? <input 
                        type="text" 
                        name="link_name" 
                        value={linksData.link_name} 
                        onChange={handleInputChange} 
                        className="form-control" 
                        id="link_name" 
                        placeholder=""
                        required
                      /> : <b> {linksData.link_name}</b>}
                    </div>
                  </div>
                  <div className="mb-3">
                  <label htmlFor="link_descr" className="form-label">Описание</label>
                  {props.typePage == "creator" ? <textarea  
                      type="text" 
                      name="link_descr" 
                      rows="2"
                      value={linksData.link_descr} 
                      onChange={handleInputChange} 
                      className="form-control" 
                      placeholder="" 
                      id="link_descr"
                      required 
                    /> : <b> {linksData.link_descr}</b>}
                    </div>
                    <div className="mb-3">
                      <label htmlFor="link_href" className="form-label">Ссылка</label>
                      {props.typePage == "creator" ? <input 
                        type="text" 
                        name="link_href" 
                        value={linksData.link_href}
                        onChange={handleInputChange} 
                        className="form-control" 
                        id="link_href" 
                        placeholder="" 
                        required
                      /> : <b> {linksData.link_href}</b>}
                    </div>
                    <div className="mb-3">
                      <label htmlFor="link_apikey" className="form-label">API ключ (в Authorization заголовок)</label>
                      {props.typePage == "creator" ? <input 
                        type="text" 
                        name="link_apikey" 
                        value={linksData.link_apikey}
                        onChange={handleInputChange} 
                        className="form-control" 
                        id="link_apikey" 
                        placeholder="" 
                        required
                      /> : <b> {linksData.link_apikey}</b>}
                    </div>
                    {props.typePage == "creator" ? <div className="mb-3">
                      <label htmlFor="link_body" className="form-label">Тело запроса внутри {"{}"} (Не занимайте "data", в нём передаются данные) </label>
                      <textarea 
                        type="text" 
                        name="link_body" 
                        rows="3"
                        value={linksData.link_body}
                        onChange={handleInputChange} 
                        className="form-control" 
                        id="link_body" 
                        placeholder="" 
                        required
                      />
                    </div> : <b> {linksData.link_body}</b>}
                    <div>
                    <label htmlFor="link_status" className="form-label">Статус</label>
                    <select 
                      className="form-select" 
                      aria-label="Доступ пользователя"
                      name="link_status"
                      value={linksData.link_status}
                      onChange={handleInputChange}
                    >
                      <option value="1">Действует</option>
                      <option value="2">Не действует</option>
                      {props.typePage == "all" ? <option value="3">Заблокировано</option> : null}
                    </select>
                    </div>
                    {linksCreteResult[0].length > 0 ? <MessageText text={linksCreteResult[0]} typeOf={linksCreteResult[1]} /> : null}
                    <button type="button" onClick={() => {externalLinkChange(props.type)}} className="btn btn-outline-success btn-sm mt-2">{props.type == "create" ? "Создать новую ссылку" : "Сохранить изменения"}</button>
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

export default ExternalLinkForm;