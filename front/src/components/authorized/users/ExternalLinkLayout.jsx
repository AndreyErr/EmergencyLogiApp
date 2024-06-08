import React, { useEffect, useState } from "react";
import MessageToastContainer from "../../ui/MessageToastContainer";
import ExternalLinkForm from "./ExternalLinkForm";
import MessageText from "../../ui/MessageText";
import { deleteExternalLink, getExternalLink, testExternalLink } from "../../../http/externalLinkAPI";
import Loader from "../../ui/Loader";

function ExternalLinkLayout(props){
    
    const [error, setError] = useState([])
    const [bigError, setBigError] = useState('')
    const [externalLinks, setExternalLinks] = useState([]);
    const [externalLinksLoading, setExternalLinksLoading] = useState(true);
    const [externalLinksTest, setExternalLinksTest] = useState(false);
    const [externalLinksCount, setExternalLinksCount] = useState(0);
    const [externalLinksCountMax, setExternalLinksCountMax] = useState(0);
    
    useEffect(() => {
      if(props.type != "creator"){
        document.title = 'Внешние ссылки';
      }
      try{
        setTimeout(() => {
          setError([])
            getExternalLink(0, props.type).then((result) => {
              setExternalLinks(result[0])
              setExternalLinksCountMax(result[1])
              setExternalLinksCount(result[2])
              setExternalLinksLoading(false)
          }).catch((e) => {
            let massageErr = e.response.data.message;
            setBigError(massageErr)
            setExternalLinksLoading(false)
          })
        }, 0)
      }catch(e){
        let massageErr = e.response.data.message;
        setBigError(massageErr)
        setExternalLinksLoading(false)
      }
    }, [])

    const updateLinks = (updateData) => {
          const index = externalLinks.findIndex(link => link.link_id == updateData.link_id);
          if (index !== -1) {
              let updateDatas = [...externalLinks];
              updateDatas[index] = updateData;
              setExternalLinks(updateDatas);
          }
      };
  
      const externalLinkAdd = (updateData) => {
          setExternalLinks([updateData, ...externalLinks]);
          setExternalLinksCount(prevCount => prevCount + 1)
      };
      
      function deleteLink(id){
        deleteExternalLink(id)
        .then((result) => {
            setError([])
            removeItem(id)
            setExternalLinksCount(prevCount => prevCount - 1)
            setError([["Удалено", 'success'], ...error])
        })
        .catch((err) => {
            setError([[err.response.data.message, 'danger'], ...error])
        });
      }

      function testLink(id){
        setExternalLinksTest(true)
        testExternalLink(id)
        .then((result) => {
          setError([])
          const text = `Код ответа: ${result.statusCode} | Текст ответа: ${typeof result.message === 'object' ? JSON.stringify(result.message) : result.message}`
          const type = result.statusCode == 200 ? "success" : "warning"
          setError([[text, type]])
          setExternalLinksTest(false)
        })
        .catch((err) => {
            setError([[err.response.data.message, 'danger'], ...error])
            setExternalLinksTest(false)
        });
      }
        
      function removeItem(id) {
        const updatedLinks = externalLinks.filter(link => link.link_id !== id);
        setExternalLinks(updatedLinks);
      }

    return(
        <div className="p-4 mb-3 bg-light rounded text-black">
          {externalLinksLoading ? <Loader /> : <>
          {externalLinksCountMax >= externalLinksCount && props.type == "creator" ? <><ExternalLinkForm type={"create"} id={-1} externalLinkAdd={externalLinkAdd} externalLinksCount={externalLinksCount} externalLinksCountMax={externalLinksCountMax} typePage={props.type} /> <br /></> : null}
          <h3 className="fst-italic text-black">{props.type == "creator" ? <>Создано {externalLinksCount} ссылок из {externalLinksCountMax} доступных</> : "Все ссылки"}</h3>
          {bigError.length > 0 ? <MessageText text={bigError} typeOf={'danger'} /> : externalLinks.length > 0 ? <>
          {error.length > 0 ? <MessageToastContainer messages={error} /> : null}
          <table className="table table-hover">
                <thead>
                    <tr>
                      <th scope="col">Название</th>
                      <th scope="col">Статус</th>
                      <th scope="col">Ссылка</th>
                      {props.type != "creator" ? <th scope="col">Создал</th> : null}
                      <th scope="col">Действие</th>
                    </tr>
                  </thead>
                <tbody>
                    {externalLinks.map((externalLink, index) => 
                      <tr key={index}>
                        <th scope="row" className="text-break">{externalLink.link_name}</th>
                        <td>{externalLink.link_status == 1 ? "Активна" : externalLink.link_status == 3 ? "Заблокировано" : "Не активно"}</td>
                        <td>{externalLink.link_href}</td>
                        {props.type != "creator" ? <td>{externalLink.login_creator}</td> : null}
                        <td>
                            {externalLink.link_status == 3 && props.type == "creator" ? null : <ExternalLinkForm type={"edit"} id={externalLink.link_id} data={externalLink} updateLinks={updateLinks} typePage={props.type} />}
                            {props.type == "creator" && externalLink.link_status != 3 
                            ? <><button className="btn btn-danger m-1" onClick={() => deleteLink(externalLink.link_id)} type="button" id="button-addon2">Удалить</button><button className="btn btn-primary m-1" onClick={() => testLink(externalLink.link_id)} type="button" id="button-addon2" disabled={externalLinksTest}>Протестировать</button> {externalLinksTest ? <Loader /> : null} </> : null }
                        </td>
                    </tr>
                    )} 
                </tbody>
            </table>
            {error.length == 0 ? null : <MessageText text={error} typeOf={'danger'} />}
            </>: "Нет ссылок"}
            </>}
        </div>
    );
}

export default ExternalLinkLayout;