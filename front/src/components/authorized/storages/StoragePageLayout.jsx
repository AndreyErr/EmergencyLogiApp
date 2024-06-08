import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { Context } from "../../..";
import CreateStoragePage from "./CreateStoragePage";
import StoragesList from "./StoragesList";
import StoragePage from "./StoragePage";

function StoragePageLayout(props){
    const {user} = useContext(Context)
    const params = useParams();
    return(
        <div className="p-4 mb-3 bg-light rounded text-black">
            {params.action == 'create' 
            ? user.user['status'] >= 3 ? <CreateStoragePage type={"create"} /> : null
            : user.user['status'] >= 3 ? <Link to="/storages/create"><button type="button" className="btn btn-success mb-2">Создать склад</button></Link> : null}
            {params.action !== 'create'
            ?  params.storageId
                ? params.action == 'id' 
                    ? <StoragePage id={params.storageId} /> 
                    : params.action == 'edit' 
                        ? <CreateStoragePage type={"edit"} id={params.storageId} />
                        : null
                :<StoragesList />
            : ''
            }
        </div>
    );
}

export default StoragePageLayout;