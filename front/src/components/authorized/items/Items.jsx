import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../ui/Loader";
import MessageToastContainer from "../../ui/MessageToastContainer";
import ItemsCard from "./ItemsCard";
import { Context } from "../../..";
import ItemForm from "./ItemForm";
import { fatchItems, searchItemsAct, selectItemsTypes } from "../../../http/itemAPI";
import ItemCat from "./ItemCat";

function Items(){
    const {user} = useContext(Context)
    const params = useParams();
    const navigate = useNavigate();
    let pageId = 1
    if(params.pageId){
      pageId = params.pageId
    }
    const [items, setItem] = useState([]);
    const [itemsTypes, setItemsTypes] = useState([]);

    const [limitForPosts, setLimitForPosts] = useState(20);
    const [pageForPosts, setPageForPosts] = useState(pageId);
    const [filter, setFilter] = useState('all');
    const [totalPageForItems, setTotalPageForItems] = useState(0);
    const [isItemsLoading, setIsItemsLoading] = useState(true);
    const [stat, setStat] = useState([]);
    const [searchStr, setSearchStr] = useState('');
    const [searchItems, setSearchItems] = useState([]);
    const [searchTimeout, setSearchTimeout] = useState(false);
    const [searchLoader, setSearchLoader] = useState(false);

    useEffect(() => {
        document.title = 'Предметы';
        setTimeout(() => {
            fatchItems(limitForPosts, pageForPosts, filter).then((result) => {
                setItem(result.data[0])
                setTotalPageForItems(getPageCount(result.data[1], limitForPosts))
                setIsItemsLoading(false)
                setStat([])
            })
            selectItemsTypes().then((result) => {
                setItemsTypes(result)
            })
        }, 0)
    }, [pageForPosts, filter])

    const updateCategories = (updatedCategories) => {
        setItemsTypes(updatedCategories);
    };

    const updateItem = (updateItem) => {
        const index = items.findIndex(item => item.id == updateItem.id);
        if (index !== -1) {
            let updatedItems = [...items];
            updatedItems[index] = updateItem;
            setItem(updatedItems);
        }

        const indexSearch = searchItems.findIndex(item => item.id == updateItem.id);
        if (index !== -1) {
            let updatedItems = [...searchItems];
            updatedItems[indexSearch] = updateItem;
            setSearchItems(updatedItems);
        }
    };

    const addItem = (updateItem) => {
        setItem([updateItem, ...items]);
    };

    let pagesArray = []
    for(let i = 0; i < totalPageForItems; i++){
        pagesArray.push(i+1)
    }

    const getPageCount = (totalCount, limit) => {
        return Math.ceil(totalCount / limit)
    }

    const changePage = (pageNum) => {
        setIsItemsLoading(true)
        setPageForPosts(pageNum)
        navigate(`/items/${pageNum}`);
        if(pageNum === pageForPosts){
            setIsItemsLoading(false)
        }
    }

    function search(str){
        setSearchStr(str)
        if(searchTimeout != false){
            clearTimeout(searchTimeout)
        }
        if(str != ''){
            setSearchLoader(true)
            setSearchTimeout(setTimeout(() => {
                try{
                    searchItemsAct(str, 10).then((result) => {
                        setSearchItems(result.data)
                        setSearchLoader(false)
                    })
                }catch(e){
                    let massageErr = e.response.data.message
                    setStat([massageErr, ...stat])
                    setSearchLoader(false)
                }
            }, 500))
        }else{
            setSearchItems([])
        }
    }

    const handleFilterChange = (event) => {
        setIsItemsLoading(true)
        setFilter(event.target.value);
      };

    function itemsSearchResults(){
        if(searchStr != ''){
            if(searchLoader){
                return <div><h4 className="fst-italic text-black">Поиск... {isItemsLoading ? <Loader /> : null}</h4></div>
            }else{
                return <div>
                {searchItems != 'null' 
                ? <div className="bg-light p-3 border rounded">
                  <h4 className="fst-italic text-black">Результаты поиска</h4>
                    <table className="table table-hover">
                        <thead>
                        <tr>
                          <th scope="col">Название</th>
                          <th scope="col">Описание</th>
                          <th scope="col">Флаг</th>
                          {user.user['status'] >= 4 ? 
                          <th scope="col">Действия</th>
                          : null}
                        </tr>
                          </thead>
                        <tbody>
                            {searchItems.map( item =>
                                <ItemsCard data={item} key={item.id} itemsTypes={itemsTypes} updateItem={updateItem}/>
                            )} 
                        </tbody>
                    </table>  

                  </div>
                : <p className="fst-italic text-black">Никто не найден</p>}
                </div>
            }
        }else{
            return null
        }
    }

    return(
        <div className="p-4 mb-3 bg-light rounded">
            <div className="input-group mb-3">
                <input value={searchStr} onChange={e => search(e.target.value)} id="search" type="text" className="form-control" placeholder="Поиск по названию" aria-label="Поиск по названию" aria-describedby="button-addon2"></input>
                {searchStr != '' ? <button onClick={() => {setSearchStr('')}} className="btn btn-outline-primary" type="button" id="button-addon2">Отчистить</button> : null}
            </div>
            {stat.length > 0 
            ? <MessageToastContainer messages={stat} />
            : null}
            {itemsSearchResults()}
            {user.user['status'] >= 4 ? <ItemForm type={"create"} id={-1} itemsTypes={itemsTypes} addItem={addItem}/> : null}
            {user.user['status'] >= 4 ? <ItemCat itemsTypes={itemsTypes} onUpdateCategories={updateCategories}/> : null}
            <select 
              className="form-select" 
              aria-label="Фильтр"
              name="type_flag"
              value={filter}
              onChange={handleFilterChange}
            >
                <option key="all" value="all">Без фильтра</option>
                {itemsTypes.map(itemsType => 
                    (user.user['status'] >= 4 || itemsType.type_flag == 1) ? <option key={itemsType.type_id} value={itemsType.type_id}>{itemsType.type_name}{(itemsType.type_flag === 1 ? null : " (Не активно)")}</option> : null
                )}
            </select>
            <h4 className="fst-italic text-black">Предметы {isItemsLoading ? <Loader /> : null}</h4>
            <table className="table table-hover">
                <thead>
                    <tr>
                      <th scope="col">Название</th>
                      <th scope="col">Описание</th>
                      <th scope="col">Флаг</th>
                      {user.user['status'] >= 4 ? <th scope="col">Действия</th>: null}
                    </tr>
                  </thead>
                <tbody>
                    {items.map(item => 
                        (item.flag == 1 || user.user['status'] >= 4 ) ? <ItemsCard data={item} key={item.id} itemsTypes={itemsTypes} updateItem={updateItem}/> : null
                    )} 
                </tbody>
            </table>  
            <div className="d-grid gap-2">
            <nav aria-label="Page navigation example">
                <ul className="pagination justify-content-center">
                {pagesArray.map(p => 
                    <li key={p} onClick={() => changePage(p)} className={`page-item ${pageForPosts === p ? 'active' : null}`}><a className="page-link" style={{ cursor: 'pointer' }}>{p}</a></li>
                )}
                </ul>
            </nav>
            </div>
        </div>
    );
}

export default Items;