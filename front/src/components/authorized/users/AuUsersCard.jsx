import React, { useContext, useState } from "react";
import { Context } from "../../..";
import { updateUserStatusAct } from "../../../http/userAPI";
import UserForm from "./UserForm";

function AuUsersCard(props){
    const {user} = useContext(Context)
    const [status, setStatus] = useState(props.data.status);
    const [textStatus, setTextStatus] = useState(props.data.status_text);
    async function updateUserStatus (newStatus) {
        try{
            await updateUserStatusAct(props.data.user_id, newStatus).then((result) => {
                if(result.data[0] == "OK"){
                    setStatus(newStatus)
                    let textStatus = ''
                    props.usersStatuses.forEach(function(status) {
                        if(status['status_id'] == newStatus){
                            textStatus = status['title']
                        }
                    });
                    setTextStatus(textStatus)
                }
            })
        }catch(e){
            let massageErr = e.response.data.message
            props.setStat([massageErr, ...props.stat])
        }
    }

    function actions(){
            return <div>
                {user.user['status'] >= 3 && (props.data.status < user.user['status'] || user.user['login'] == props.mainLogin || user.user['login'] == props.data.login)
                ?   <span>
                <UserForm type={"edit"} id={props.data.user_id} mainLogin={props.mainLogin} usersStatuses={props.usersStatuses} data={props.data} updateUsers={props.updateUsers} usersAdm={props.usersAdm}/>
                {(user.user['login'] != props.data.login) ?
                    <select value={status} onChange={e => updateUserStatus(e.target.value)} id="status" className="form-select form-select-sm mt-2" aria-label=".form-select-lg example">
                        {props.usersStatuses.map(status_data => 
                          (user.user['status'] <= status_data.status_id && user.user['login'] != props.mainLogin) ? '' :<option key={status_data.status_id} value={status_data.status_id}>{status_data.title}</option>
                        )}
                    </select>
                    : null }
                    </span>
                : null
                }
            </div>
    }

    return(
        <tr>
            <th scope="row" className="text-break">{props.data.login}</th>
            <td>{textStatus} ({status}) {props.data.email}</td>
            <td>{props.data.login_created}</td>
            <td>
                {actions()}
            </td>
        </tr>
    );
}

export default AuUsersCard;