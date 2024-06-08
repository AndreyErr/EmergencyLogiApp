import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fatchUsers, searchUsersAct, selectUsersTypes } from "../../../http/userAPI";
import Loader from "../../ui/Loader";
import MessageToastContainer from "../../ui/MessageToastContainer";
import AuUsersCard from "./AuUsersCard";
import { Context } from "../../..";
import UserForm from "./UserForm";
import MessageText from "../../ui/MessageText";
import { getSetting } from "../../../http/settingsAPI";

function AuUsers(){
    const {user} = useContext(Context)
    const params = useParams();
    const navigate = useNavigate();
    let pageId = 1
    if(params.pageId){
      pageId = params.pageId
    }else{
        pageId = 1
    }
    const [users, setUser] = useState([]);
    const [usersAdm, setUserAdm] = useState([]);
    const [usersStatuses, setUsersStatuses] = useState([]);

    const [limitForPosts, setLimitForPosts] = useState(20);
    const [filter, setFilter] = useState('all');
    const [pageForPosts, setPageForPosts] = useState(pageId);
    const [totalPageForUsers, setTotalPageForUsers] = useState(0);
    const [isUsersLoading, setIsUsersLoading] = useState(true)
    const [stat, setStat] = useState([])
    const [mainLogin, setMainLogin] = useState('')
    const [searchStr, setSearchStr] = useState('');
    const [usersFetchStatus, setUsersFetchStatus] = useState('');
    const [searchUsers, setSearchUsers] = useState([])
    const [searchTimeout, setSearchTimeout] = useState(false)
    const [searchLoader, setSearchLoader] = useState(false)

    useEffect(() => {
        document.title = 'Пользователи';
        setTimeout(() => {
            fatchUsers(limitForPosts, pageForPosts, filter).then((result) => {
                if(user.user['status'] === 5){
                    getSetting("main_administrator").then((result) => {
                        setMainLogin(result.data[0].value)
                    })
                }
                setUser(result.data[0][0])
                setUserAdm(result.data[0][1])
                setTotalPageForUsers(getPageCount(result.data[1], limitForPosts))
                setStat([])
                selectUsersTypes().then((result) => {
                    setUsersStatuses(result)
                })
            }).catch((error)=>{
                setUsersFetchStatus(error.response.data.message)
            })
            setIsUsersLoading(false)
        }, 0)
    }, [pageForPosts, filter])

    let pagesArray = []
    for(let i = 0; i < totalPageForUsers; i++){
        pagesArray.push(i+1)
    }

    const updateUsers = (updateUser) => {
        const index = users.findIndex(user => user.user_id == updateUser.user_id);
        if (index !== -1) {
            // Если элемент найден, обновляем его данные
            let updateUserss = [...users];
            updateUserss[index] = updateUser;
            setUser(updateUserss);
        }
        const indexSearch = searchUsers.findIndex(user => user.user_id == updateUser.user_id);
        if (index !== -1) {
            // Если элемент найден, обновляем его данные
            let updateUserss = [...searchUsers];
            updateUserss[indexSearch] = updateUser;
            setSearchUsers(updateUserss);
        }
    };

    const addUser = (updateUser) => {
        setUser([updateUser, ...users]);
    };

    const getPageCount = (totalCount, limit) => {
        return Math.ceil(totalCount / limit)
    }

    const changePage = (pageNum) => {
        setIsUsersLoading(true)
        setPageForPosts(pageNum)
        navigate(`/users/${pageNum}`);
        if(pageNum === pageForPosts){
            setIsUsersLoading(false)
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
                    searchUsersAct(str, 10).then((result) => {
                        setSearchUsers(result.data)
                        setSearchLoader(false)
                    })
                }catch(e){
                    let massageErr = e.response.data.message
                    setStat([massageErr, ...stat])
                    setSearchLoader(false)
                }
            }, 500))
        }else{
            setSearchUsers([])
        }
    }

    function usersSearchResults(){
        if(searchStr != ''){
            if(searchLoader){
                return <div><h4 className="fst-italic text-black">Поиск... <Loader /></h4></div>
            }else{
                return <div>
                {searchUsers != 'null' 
                ? <div className="bg-light p-3 border rounded">
                  <h4 className="fst-italic text-black">Результаты поиска</h4>
                    <table className="table table-hover">
                        <thead>
                            <tr>
                              <th scope="col">Логин</th>
                              <th scope="col">Статус</th>
                              <th scope="col">Ответственный</th>
                              <th scope="col">Действие / коэффициент выпадения чатов</th>
                            </tr>
                          </thead>
                        <tbody>
                            {searchUsers.map( user =>
                                <AuUsersCard data={user} key={user.user_id} usersStatuses={usersStatuses} mainLogin={mainLogin} setStat={setStat} stat={stat} updateUsers={updateUsers} usersAdm={usersAdm}/>
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
    const handleFilterChange = (event) => {
        setFilter(event.target.value);
      };

    return(
        <div className="p-4 mb-3 bg-light rounded">
            {isUsersLoading ? <Loader /> : usersFetchStatus.length > 0 ? <MessageText text={usersFetchStatus} typeOf={'danger'} /> : <>
            <UserForm type={"create"} id={-1} mainLogin={mainLogin} usersStatuses={usersStatuses} addUser={addUser} usersAdm={usersAdm}/>
            <div className="input-group mb-3 mt-2">
                <input value={searchStr} onChange={e => search(e.target.value)} id="search" type="text" className="form-control" placeholder="Поиск по login или email" aria-label="Поиск по login или email" aria-describedby="button-addon2"></input>
                {searchStr != '' ? <button onClick={() => {setSearchStr('')}} className="btn btn-outline-primary" type="button" id="button-addon2">Отчистить</button> : null}
            </div>
            {stat.length > 0 
            ? <MessageToastContainer messages={stat} />
            : null}
            {usersSearchResults()}
            {[4, 5].includes(user.user['status']) ? (<select 
              className="form-select" 
              aria-label="Фильтр"
              name="user"
              value={filter}
              onChange={handleFilterChange}
            >
                <option key="all" value="all">Без фильтра</option>
                <option key="me" value="me">Мои пользователи</option>
                {usersAdm.map(user_act => 
                    (user_act.login != user.user['login'] ? <option key={user_act.user_id} value={user_act.user_id}>{user_act.login}</option> : null)
                )}

            </select>) : null}
            <h4 className="fst-italic text-black">Все пользователи {isUsersLoading ? <Loader /> : null}</h4>
            <table className="table table-hover">
                <thead>
                    <tr>
                      <th scope="col">Логин</th>
                      <th scope="col">Статус</th>
                      <th scope="col">Ответственный</th>
                      <th scope="col">Действие</th>
                    </tr>
                  </thead>
                <tbody>
                    {users.map(user => 
                        <AuUsersCard data={user} key={user.user_id} usersStatuses={usersStatuses} mainLogin={mainLogin} setStat={setStat} stat={stat} updateUsers={updateUsers} usersAdm={usersAdm}/>
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
            </>}
        </div>
    );
}

export default AuUsers;