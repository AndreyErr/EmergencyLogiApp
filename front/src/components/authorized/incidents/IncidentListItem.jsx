import React from "react";
import { Link } from "react-router-dom";

function IncidentListItem(props){
    return(
        <div className="col-sm-6">
            <div className="card mb-2">
            <div className="card-body">
                <h5 className="card-title">№ {props.data['id']}</h5>
                <div className="card-text">Создано: {props.data.date_created.substring(0, 10)}  {props.data.time_created}</div>
                <div className="card-text">Создал: {props.data.user_created}</div>
                <Link to={`/incidents/id/${props.data['id']}`}><button type="button" className="btn btn-primary">Перейти</button></Link>
            </div>
            </div>
        </div>
    );
}

export default IncidentListItem;