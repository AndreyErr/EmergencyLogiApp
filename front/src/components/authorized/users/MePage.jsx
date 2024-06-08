import React, { useContext, useEffect, useState } from "react";
import { changePasswordServ, getUser } from "../../../http/userAPI";
import Loader from "../../ui/Loader";
import { Context } from "../../..";
import UserForm from "./UserForm";
import MessageText from "../../ui/MessageText";
import ExternalLinkLayout from "./ExternalLinkLayout";

function MePage(){
    const {user} = useContext(Context)
    const [userMe, setUserMe] = useState([]);
    const [usersStatuses, setUsersStatuses] = useState([]);

    const [isUserLoading, setIsUserLoading] = useState(true)
    const [mainLogin, setMainLogin] = useState('')

    useEffect(() => {
        document.title = 'Профиль';
        try{
        setTimeout(() => {
            getUser().then((result) => {
                setUserMe(result.data)
                setIsUserLoading(false)
            })
        }, 0)
        }catch(e){
          let massageErr = e;
        }
    }, [])

    const [lastPass, setLastPass] = useState("");
    const [pass, setPass] = useState("");
    const [passDuble, setPassDuble] = useState("");
    const [changePassResult, setChangePassResult] = useState(["", ""])
    const [changePassLoader, setChangePassLoader] = useState(false)

    function validatePassword(str) {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[\/!?+=\-]).{5,120}$/;
        return regex.test(str);
    }

    function changePassword(event){
        event.preventDefault();
        setChangePassLoader(true)
        let errorMessage = ''
        if(!validatePassword(pass)) {
          errorMessage += 'Пароль должен содержать от 5 до 120 символов, включая заглавные и строчные буквы, цифры и специальные символы\n';
        }
        if(pass != passDuble) {
            errorMessage += 'Пароли не совпадают\n';
          }
        if(errorMessage === '') {
            try{
                changePasswordServ(user.user['login'], user.user['email'], user.user['name'], pass, "user_me", lastPass).then((result) => {
                  if(result == "OK"){
                    setChangePassResult(["Пароль изменён", "success"]);
                  }else{
                    setChangePassResult(["Ошибка изменения пароля: " + result, "danger"]);
                  }
                }).catch((error) => {
                    setChangePassResult(["Ошибка изменения пароля: " + error.response.data.message, "danger"]);
              });;
            }catch(e){
                let massageErr = e;
                setChangePassResult(["Ошибка изменения пароля: " + massageErr, "danger"]);
            }
        } else {
            setChangePassResult(["Ошибка изменения пароля: " + errorMessage, "danger"]);
        }
        setChangePassLoader(false);
    }

    return(
      <>
        <div className="p-4 mb-3 bg-light rounded text-black">
        {isUserLoading ? <Loader /> : <>
        <div className="list-group pb-2">
            <div className="list-group-item list-group-item-action" aria-current="true">
                <div className="d-flex w-100 justify-content-between">
                <h5 className="mb-1">Логин</h5>
                </div>
                <p className="mb-1">{userMe.login} ({userMe.status_text})</p>
                <small>{userMe.name}</small>
            </div>
            <div className="list-group-item list-group-item-action">
                <div className="d-flex w-100 justify-content-between">
                <h5 className="mb-1">Почта</h5>
                </div>
                <p className="mb-1">{userMe.email}</p>
            </div>
            <div className="list-group-item list-group-item-action">
                <div className="d-flex w-100 justify-content-between">
                <h5 className="mb-1">Телефон</h5>
                </div>
                <p className="mb-1">+{userMe.phone}</p>
            </div>
            <div className="list-group-item list-group-item-action">
                <div className="d-flex w-100 justify-content-between">
                <h5 className="mb-1">Руководитель</h5>
                </div>
                <p className="mb-1">{userMe.login_created}</p>
            </div>
            <div className="list-group-item list-group-item-action">
                <div className="d-flex w-100 justify-content-between">
                <h5 className="mb-1">Данные ({userMe.type == 1 ? "ИНН" : "Серия и номер паспорта"})</h5>
                </div>
                <p className="mb-1">{userMe.personal_data}</p>
            </div>
        </div>
            <UserForm type={"editMe"} data={userMe} key={userMe.user_id} id={userMe.user_id} mainLogin={mainLogin} usersStatuses={usersStatuses}/>
            <button type="button" className="btn btn-outline-danger btn-sm ms-2" data-bs-toggle="modal" data-bs-target={`#updatePass`}>
            Изменить пароль
                </button>
                <div className="modal fade" id={`updatePass`} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                  <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">Изменить пароль</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      <div className="modal-body">
              <form>
                <div className="mb-3">
                    <label htmlFor="lastPass" className="form-label">Старый пароль</label>
                    <input value={lastPass} onChange={e => setLastPass(e.target.value)} type="text" placeholder="Старый пароль" className="form-control" id="lastPass" aria-describedby="lastPass" required />
                </div>
                <div className="mb-3">
                    <label htmlFor="pass" className="form-label">Новый пароль</label>
                    <input value={pass} onChange={e => setPass(e.target.value)} type="text" placeholder="Пароль" className="form-control" id="pass" aria-describedby="pass" required />
                </div>
                <div className="mb-3">
                    <label htmlFor="passDuble" className="form-label">Повторите новый пароль</label>
                    <input value={passDuble} onChange={e => setPassDuble(e.target.value)} type="password" placeholder="Повторите пароль" className="form-control" id="passDuble" required />
                </div>
                {changePassLoader
                ? <Loader />
                : <button onClick={changePassword} type="submit" className="btn btn-primary btn-lg">Изменить</button>
                }
                {changePassResult[0].length > 0 ? <MessageText text={changePassResult[0]} typeOf={changePassResult[1]} /> : null}
              </form>
                      </div>
                      <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Отмена</button>
                      </div>
                    </div>
                  </div>
                </div>
                </>}
        </div>
        {user.user['status'] >= 3 && user.user['access'] != 2 ? <ExternalLinkLayout type={"creator"} /> : null}
      </>
    );
}

export default MePage;