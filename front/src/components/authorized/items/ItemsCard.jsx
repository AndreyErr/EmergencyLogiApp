import React, { useContext } from "react";
import { Context } from "../../..";
import ItemForm from "./ItemForm";

function ItemsCard(props){
    const {user} = useContext(Context)

    function actions(){
        return <div>
            {user.user['status'] >= 4
            ?   <span>
                <ItemForm type={"edit"} id={props.data.id} data={props.data} itemsTypes={props.itemsTypes} updateItem={props.updateItem}/>
                </span>
            : null
            }
        </div>
    }

    return(
        <tr>
            <th scope="row" className="text-break">{props.data.name}</th>
            <td>{props.data.descr}</td>
            <td>{props.data.flag == 1 ? "Активно" : "Не активно"}</td>
            {user.user['status'] >= 4 ? 
            <td className="hstack gap-3">
                {actions()}
            </td> : null}
        </tr>
    );
}

export default ItemsCard;