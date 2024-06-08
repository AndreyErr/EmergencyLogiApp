import React from "react";
import { Link } from "react-router-dom";

function PatternListItem(props){
    console.log(props.data)
    return(
        <div className="col-sm-6">
            <div className="card mb-2">
            <div className="card-body">
                <h5 className="card-title">Название: {props.data.name}</h5>
                <div className="card-text">Кодовое имя: {props.data.code_name}</div>
                <div className="card-text">Тип: {props.data.type == "common" ? "Общий" : "Реакция"}</div>
                <div className="card-text">Создано: {props.data.date_add.substring(0, 10)}  {props.data.time_add}</div>
                <Link to={`/patterns/id/${props.data['id']}`}><button type="button" className="btn btn-primary">Перейти</button></Link>
            </div>
            </div>
        </div>
    );
}

export default PatternListItem;