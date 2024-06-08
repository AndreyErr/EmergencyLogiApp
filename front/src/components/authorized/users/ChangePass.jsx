import React, { useContext, useState } from "react";
import { Context } from "../../..";
import { changePasswordServ } from "../../../http/userAPI";
import Loader from "../../ui/Loader";
import MessageText from "../../ui/MessageText";

function ChangePass(props){
    const {user} = useContext(Context)
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
                changePasswordServ(user.user['login'], user.user['email'], user.user['name'], pass, "user").then((result) => {
                  if(result == "OK"){
                    props.setChangePasswordFlag(false)
                  }else{
                    setChangePassResult(["Ошибка изменения пароля: " + result, "danger"]);
                  }
                }).catch((error) => {
                    setChangePassResult(["Ошибка изменения пароля: " + error.response.data.message, "danger"]);
              });;
            }catch(e){
                let massageErr = e.response.data.message;
                setChangePassResult(["Ошибка изменения пароля: " + massageErr, "danger"]);
            }
        } else {
            setChangePassResult(["Ошибка изменения пароля: " + errorMessage, "danger"]);
        }
        setChangePassLoader(false);
    }

    return(
        <main className="pt-4">
            <div className="container">
              <main className="form-signin">
                <h3>Установите новый пароль</h3>
              <form>
                <div className="mb-3">
                    <label htmlFor="pass" className="form-label">Новый пароль</label>
                    <input value={pass} onChange={e => setPass(e.target.value)} type="text" placeholder="Пароль" className="form-control" id="pass" aria-describedby="pass" required />
                </div>
                <div className="mb-3">
                    <label htmlFor="passDuble" className="form-label">Повторите пароль</label>
                    <input value={passDuble} onChange={e => setPassDuble(e.target.value)} type="password" placeholder="Повторите пароль" className="form-control" id="passDuble" required />
                </div>
                {changePassLoader
                ? <Loader />
                : <button onClick={changePassword} type="submit" className="btn btn-primary btn-lg">Изменить</button>
                }
                {changePassResult[0].length > 0 ? <MessageText text={changePassResult[0]} typeOf={changePassResult[1]} /> : null}
              </form>
              </main>

          </div>
        </main>
    );
}

export default ChangePass;