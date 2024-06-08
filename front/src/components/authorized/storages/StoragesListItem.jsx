import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../..";

function StoragesListItem(props){
    const {user} = useContext(Context)
    const notFoundLine = (<i>Не обнаружено</i>)
    return(
        <div className="col-sm-6 p-3">
            <div className="card">
              <div className="card-header">
                Склад №{props.data['id']}
              </div>
              <div className="card-body">
                <h5 className="card-title">{props.data['name']}</h5>
                {props.data['descr'] ? <p className="card-text">{props.data['descr']}</p> : null}
              </div>
              <ul className="list-group list-group-flush">
                <li className={`list-group-item bg-opacity-10 ${props.data.status == 1 ? "bg-success" : "bg-danger"}`}><b>Статус</b>: {props.data.status == 1 ? "Открыт" : "Закрыт"}</li>
                  <li className="list-group-item"><b>Округ</b>: {props.data.addres.state ? props.data.addres.state : notFoundLine}</li>
                  <li className="list-group-item"><b>Город</b>: {props.data.addres.city ? props.data.addres.city : notFoundLine}</li>
                  <li className="list-group-item"><b>Улица</b>: {props.data.addres.street ? props.data.addres.street : notFoundLine} | <b>Дом</b>: {props.data.addres.housenumber ? props.data.addres.housenumber : notFoundLine}</li>
                </ul>
                <div className="card-body">
                    <Link to={`/storages/id/${props.data['id']}`}><button className="btn btn-primary me-2">Посмотреть</button></Link>
                    {user.user['status'] >= 3 ? <Link to={`/storages/edit/${props.data['id']}`}><button className="btn btn-primary">Изменить</button></Link> : null}
                </div>
            </div>
        </div>
    );
}

export default StoragesListItem;