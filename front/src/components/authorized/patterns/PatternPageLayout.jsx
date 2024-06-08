import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { Context } from "../../..";
import CreatePatternPage from "./create/CreatePatternPage";
import PatternPage from "./PatternPage";
import PatternList from "./PatternList";

function PatternPageLayout(props){
    const {user} = useContext(Context)
    const params = useParams();
    return(
        <div className="p-4 mb-3 bg-light rounded text-black">
            {params.action === 'create' 
                ? <CreatePatternPage /> 
                : user.user['status'] >= 4 ? <Link to="/patterns/create"><button type="button" className="btn btn-success">Создать паттерн</button></Link> : null}
            {params.action == 'id'
                ?  params.patternId
                    ?<PatternPage id={params.patternId} />
                    :""
                : params.action == 'edit' && params.patternId
                    ? <CreatePatternPage id={params.patternId} /> 
                    : params.action != 'create'
                        ? <PatternList /> 
                        : null
            }
        </div>
    );
}

export default PatternPageLayout;