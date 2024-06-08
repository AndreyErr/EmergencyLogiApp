import { observer } from "mobx-react-lite";
import React, { useContext, useState } from "react";
import { loginServ } from "../../http/userAPI";
import '../../styles/mainPage.css';
import Loader from "../ui/Loader";
import MessageText from "../ui/MessageText";
import { Context } from "../..";

const LoginModal = observer(props => {

  const {user} = useContext(Context)
  const [login, setLogin] = useState('')
  const [loginErr, setLoginErr] = useState('')
  const [pass, setPass] = useState('')
  const [passErr, setPassErr] = useState('')
  const [error, setError] = useState('')
  const [isLoginLoading, setIsLoginLoading] = useState(false)

  async function loginAction(event){
    event.preventDefault();
    try{
      setError('')
      setLoginErr('')
      setPassErr('')
      let notToEnter = false
      if(login.length === 0 || pass.length === 0){
        setError('Заполните все поля для входа')
        notToEnter = true
      }else{
        const reLogin = /^[a-z0-9]+$/i;
        if(!String(login).toLocaleLowerCase().match(reLogin) || login.length > 100 || login.length < 3){
          setLoginErr('Некорректно введён Login. Только цифры, английские буквы. Не менее 3 и не более 100 символов')
          notToEnter = true
        }
        if(!notToEnter){
          setIsLoginLoading(true)
          event.preventDefault();
          const data = await loginServ(login, pass)
          user.setUser(data.data)
          user.setIsAuth(true)
          window.location.href = '/';
        }
      }
      setIsLoginLoading(false)
    }catch(e){
      let massageErr = e.response.data.message
      if(0 in e.response.data.errors){
        massageErr += ' ( ' + e.response.data.errors[0]['param'] + ' ) '
      }
      setError(massageErr)

      setIsLoginLoading(false)
    }
  }

    return(
        <div className="container">
              <main className="form-signin">
              <form>
                <div className="mb-3">
                  <input value={login} onChange={e => setLogin(e.target.value)} type="text" placeholder="Логин" className="form-control" id="loginLogin" aria-describedby="loginLogin" required></input>
                  {loginErr.length > 0 ? <div className="text-danger">{loginErr}!</div> : null}
                </div>
                <div className="mb-3">
                  <input value={pass} onChange={e => setPass(e.target.value)} type="password" placeholder="Пароль" className="form-control" id="passLogin"></input>
                  {passErr.length > 0 ? <div className="text-danger">{passErr}!</div> : null}
                </div>
                {isLoginLoading
                ? <Loader />
                : <button onClick={loginAction} type="submit" className="btn btn-primary btn-lg">Войти</button>
                }
                {error.length > 0 ? <MessageText text={error} typeOf={'danger'} /> : null}
              </form>
              </main>

          </div>
    );
})

export default LoginModal;