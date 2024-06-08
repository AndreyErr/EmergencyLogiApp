import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { Context } from "../../..";
import IncidentList from "./IncidentList";
import IncidentPage from "./IncidentPage";
import CreateIncidentPage from "./create/CreateIncidentPage";

function IncidentPageLayout(props){
    useEffect(() => {
      document.title = 'Инциденты';
    }, []);
    const {user} = useContext(Context)
    const params = useParams();
    return(
        <div className="p-4 mb-3 bg-light rounded text-black">
            {params.pageId === 'create' 
            ? user.user['access'] != 3 ? <CreateIncidentPage type={props.type} /> : null
            : user.user['access'] != 3 ? <Link to="/incidents/create"><button type="button" className="btn btn-success">Создать инцидент</button></Link> : null}
            {params.pageId !== 'create'
            ?  params.incidentId
                ?<IncidentPage id={params.incidentId} />
                :<IncidentList />
            : ''
            }
        </div>
    );
}

export default IncidentPageLayout;