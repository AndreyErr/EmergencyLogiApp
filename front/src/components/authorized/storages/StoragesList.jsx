import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getAllStorages, getStoragesCoords } from "../../../http/storageAPI";
import StoragesListItem from "./StoragesListItem";
import MapContainerForStorageCreate from "./MapContainerForStorageCreate";
import Loader from "../../ui/Loader";

function StoragesList(props){
    const history = useNavigate()
    const navigate = useNavigate();
    const params = useParams();
    let pageId = 1
    if(params.action){
      pageId = Number(params.action)
    }
    useEffect(() => {
      document.title = 'Склады';
    }, []);
    const [storages, setStorages] = useState([])
    const [storagesCoords, setStoragesCoords] = useState([])
    const [storagesCoordsLoading, setStoragesCoordsLoading] = useState(true)
    const [isItemsLoading, setIsItemsLoading] = useState(true)
    const [ifNoStorages, setIfNoStorages] = useState(false);
    const [limitForPosts, setLimitForPosts] = useState(20);
    const [pageForPosts, setPageForPosts] = useState(pageId);
    const [totalPage, setTotalPage] = useState(0);

    useEffect(() => {
        try{
        setTimeout(() => {
            getAllStorages(limitForPosts, pageForPosts).then((result) => {
                if(result == 'err'){
                    setIfNoStorages(true)
                    setIsItemsLoading(false)
                }else{
                    setStorages(result[0])
                    setTotalPage(getPageCount(result[1], limitForPosts))
                    setIsItemsLoading(false)
                }
            })
            getStoragesCoords().then((result) => {
                setStoragesCoords(result)
                setStoragesCoordsLoading(false)
            })
        }, 0)
        }catch(e){
            history('/')
        }
    }, [pageForPosts])
    let pagesArray = []
    for(let i = 0; i < totalPage; i++){
        pagesArray.push(i+1)
    }

    const getPageCount = (totalCount, limit) => {
        return Math.ceil(totalCount / limit)
    }

    const changePage = (pageNum) => {
        setIsItemsLoading(true)
        setPageForPosts(pageNum)
        navigate(`/storages/${pageNum}`);
        if(pageNum === pageForPosts){
            setIsItemsLoading(false)
        }
    }
    return(
        <div className="row">
            {ifNoStorages ? " Не создано складов" : <>
            {isItemsLoading ? <Loader /> : <>
            {storagesCoordsLoading ? <Loader /> : <MapContainerForStorageCreate coords={storagesCoords} mapEdit={false} type={"points"}/>}
            {storages.map(title => <StoragesListItem data={title}/>)}
            </>}
            <div className="d-grid gap-2">
            <nav aria-label="Page navigation example">
                <ul className="pagination justify-content-center">
                {pagesArray.map(p => 
                    <li key={p} onClick={() => changePage(p)} className={`page-item ${pageForPosts === p ? 'active' : null}`}><a className="page-link" style={{ cursor: 'pointer' }}>{p}</a></li>
                )}
                </ul>
            </nav>
            </div>
            </>}
        </div>
    );
}

export default StoragesList;