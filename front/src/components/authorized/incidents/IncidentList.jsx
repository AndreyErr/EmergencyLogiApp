import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getAllIncidents } from "../../../http/incidentsAPI";
import IncidentListItem from "./IncidentListItem";
import Loader from "../../ui/Loader";

function IncidentList(props){
    const history = useNavigate()
    const params = useParams();
    let pageId = 1
    if(params.pageId){
      pageId = Number(params.pageId)
    }
    const navigate = useNavigate();
    const [incedents, setIncedents] = useState([]);
    const [ifNoIncidents, setIfNoIncidents] = useState(false);
    const [isItemsLoading, setIsItemsLoading] = useState(true);
    const [limitForPosts, setLimitForPosts] = useState(20);
    const [pageForPosts, setPageForPosts] = useState(pageId);
    const [totalPage, setTotalPage] = useState(0);

    useEffect(() => {
        try{
        setTimeout(() => {
            getAllIncidents(limitForPosts, pageForPosts).then((result) => {
                if(result == 'err'){
                    setIfNoIncidents(true)
                    setIsItemsLoading(false)
                }else{
                    setIncedents(result[0])
                    setTotalPage(getPageCount(result[1], limitForPosts))
                    setIsItemsLoading(false)
                }
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
        navigate(`/incidents/${pageNum}`);
        if(pageNum === pageForPosts){
            setIsItemsLoading(false)
        }
    }
    return(
        <div>
            {ifNoIncidents ? "Нет инцидентов" : <>
            <div className="row mt-2">
                {isItemsLoading ? <Loader /> : <>
                
            {incedents.map(title => <IncidentListItem data={title}/>)}
            </>}
            </div>
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

export default IncidentList;