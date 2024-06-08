import React, { useContext, useEffect, useState } from "react";
import { changePasswordServ, createUser, editUser } from "../../../http/userAPI";
import { Context } from "../../..";
import MessageText from "../../ui/MessageText";

function UserForm(props){
    const {user} = useContext(Context)

    const [usersData, setUsersData] = useState({
      "user_id": "",
      "login": "",
      "pass": "",
      "status": 2,
      "access": 1,
      "type": 1,
      "name": "",
      "email": "",
      "phone": "",
      "user_add": "",
      "personal_data": ""
    });
    const [usersCreteLoader, setUsersCreteLoader] = useState(false)
    const [usersCreteResult, setUsersCreteResult] = useState(["", ""])
    const [changePassStatus, setChangePassStatus] = useState("")
    useEffect(() => {
        if(props.type == "edit" || props.type == "editMe"){
            setUsersData({
                "user_id": props.data.user_id,
                "login": props.data.login,
                "pass": "",
                "status": props.data.status,
                "access": props.data.access,
                "type": props.data.type,
                "name": props.data.name,
                "email": props.data.email,
                "phone": props.data.phone,
                "user_add": props.data.user_add,
                "personal_data": props.data.personal_data
            })
        }
        generatePassword()
    }, [])

    function validateLogin(str) {
        const regex = /^(?=.*[a-zA-Z].*[a-zA-Z])[a-zA-Z0-9_]{4,120}$/;
        return regex.test(str);
    }

    function validatePassword(str) {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[\/!?+=\-]).{5,120}$/;
        return regex.test(str);
    }

    function validateName(str) {
        const regex = /^[a-zA-Zа-яА-Я0-9\s\/!?+=\-]{2,120}$/;
        return regex.test(str);
    }

    function validateEmail(str) {
        const regex = /^[^\s@]{1,40}@[^\s@]{1,20}\.[^\s@]{1,10}$/;
        return regex.test(str);
    }

    function validatePhone(str) {
        const regex = /^(?:[0-9] ?){6,14}[0-9]$/;
        return regex.test(str);
    }

    function validatePersonalData(str, type) {
      let regex = /^\d{12}$/;
      if(type == "inn"){
          regex = /^\d{12}$/;
      } else if(type == "passport"){
          regex = /^\d{4},\d{6}$/;
      } else {
          return false;
      }
      return regex.test(str);
    }

    function changePassword(type){
        setUsersCreteLoader(true)
        let errorMessage = ''
        let pass = ""
        if(type == "pass"){
          if(!validatePassword(usersData.pass)) {
            errorMessage += 'Пароль должен содержать от 5 до 120 символов, включая заглавные и строчные буквы, цифры и специальные символы.\n';
          }
          pass = usersData.pass
        }
        if(errorMessage === '') {
            try{
                changePasswordServ(usersData.login, usersData.email, usersData.name, pass, "admin_set").then((result) => {
                  if(result == "OK"){
                    setChangePassStatus("Пароль изменён");
                  }else{
                    setChangePassStatus("Ошибка изменения пароля: " + result);
                  }
                }).catch((error) => {
                  setChangePassStatus("Ошибка изменения пароля: " + error.response.data.message);
              });;
            }catch(e){
                let massageErr = e.response.data.message;
                setChangePassStatus("Ошибка изменения пароля: " + massageErr);
            }
        } else {
          setChangePassStatus("Ошибка изменения пароля: " + errorMessage);
        }
        setUsersCreteLoader(false);
    }

    function userChange(type){
      setUsersCreteLoader(true)
      let errorMessage = '';
      if(!validateLogin(usersData.login)) {
          errorMessage += 'Логин должен содержать от 4 до 120 символов, включая буквы и цифры.\n';
      }
      if(!validatePassword(usersData.pass)) {
          errorMessage += 'Пароль должен содержать от 5 до 120 символов, включая заглавные и строчные буквы, цифры и специальные символы.\n';
      }
      if(!validateName(usersData.name)) {
          errorMessage += 'Имя должно содержать от 2 до 120 символов, включая буквы, цифры и специальные символы.\n';
      }
      if(!validateEmail(usersData.email)) {
          errorMessage += 'Введите корректный адрес электронной почты.\n';
      }
      if(!validatePhone(usersData.phone)) {
          errorMessage += 'Введите корректный номер телефона.\n';
      }
      if(!validatePersonalData(usersData.personal_data, usersData.type == 1 ? "inn" : "passport")) {
          errorMessage += 'Введите корректные персональные данные.\n';
      }
      if(errorMessage === '') {
          try{
            if(type == "create"){
                createUser(usersData).then((result) => {
                    if(result[0] == "OK"){
                      setUsersCreteResult(["Пользователь создан", "success"]);
                      props.addUser(usersData)
                    }else{
                      setUsersCreteResult(["Ошибка создания пользователя: " + result, "danger"]);
                    }
                  }).catch((error) => {
                    setUsersCreteResult(["Ошибка создания пользователя: " + error.response.data.message, "danger"]);
                });;
            }else{
                editUser(usersData, props.type).then((result) => {
                    if(result[0] == "OK"){
                      setUsersCreteResult(["Пользователь изменён", "success"]);
                      if(props.type !== "editMe"){
                        props.updateUsers(usersData)
                      }
                    }else{
                      setUsersCreteResult(["Ошибка изменения пользователя: " + result, "danger"]);
                    }
                  }).catch((error) => {
                    setUsersCreteResult(["Ошибка изменения пользователя: " + error.response.data.message, "danger"]);
                });;
            }
          }catch(e){
              let massageErr = e.response.data.message;
              setUsersCreteResult(["Ошибка изменения пользователя: " + massageErr, "danger"]);
          }
      } else {
        setUsersCreteResult(["Ошибка изменения пользователя: " + errorMessage, "danger"]);
      }
      setUsersCreteLoader(false);
    }

    function generatePassword() {
      const uppercaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      const lowercaseLetters = 'abcdefghijklmnopqrstuvwxyz';
      const digits = '0123456789';
      const symbols = '/!?+-=';
  
      const allCharacters = uppercaseLetters + lowercaseLetters + digits + symbols;
  
      // Генерация случайного целого числа в заданном диапазоне
      function getRandomInt(min, max) {
          return Math.floor(Math.random() * (max - min + 1)) + min;
      }
  
      // Выбор случайного символа из строки
      function getRandomCharacter(characters) {
          return characters.charAt(getRandomInt(0, characters.length - 1));
      }
  
      // Генерация пароля
      function generateRandomPassword() {
          const length = getRandomInt(5, 15);
          let password = '';
  
          // Добавление обязательных символов
          password += getRandomCharacter(uppercaseLetters); // Заглавная буква
          password += getRandomCharacter(lowercaseLetters); // Строчная буква
          password += getRandomCharacter(digits); // Цифра
          password += getRandomCharacter(symbols); // Символ
  
          // Добавление остальных символов
          for (let i = 4; i < length; i++) {
              password += getRandomCharacter(allCharacters);
          }
  
          // Перемешивание пароля
          password = password.split('').sort(() => Math.random() - 0.5).join('');
  
          return password;
      }
      setUsersData(prevState => ({
        ...prevState,
        pass: generateRandomPassword()
      }));
    }

    // Обработчик изменения значения любого поля ввода
    const handleInputChange = (event) => {
      const fieldName = event.target.name;
      const fieldValue = event.target.value;
      setUsersData(prevState => ({
        ...prevState,
        [fieldName]: fieldValue
      }));
    };

      return(
        <span>
                <button type="button" className="btn btn-outline-danger btn-sm" data-bs-toggle="modal" data-bs-target={`#createUser${props.id}`}>
              {props.type == "create" ? "Создать пользователя" : props.type === "editMe" ? "Редактировать данные" : "Изменить " + usersData.login}
            </button>
            <div className="modal fade text-dark" id={`createUser${props.id}`} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div className="modal-dialog modal-dialog-centered  modal-xl">
                <div className="modal-content">
                  <div className="modal-header">
                    <h1 className="modal-title fs-5" id="exampleModalLabel">{props.type == "create" ? "Создать пользователя" : props.type === "editMe" ? "Редактировать данные" : "Изменить " + usersData.login}</h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div className="modal-body">
                    <form>
                    {props.type == "create" ? (<h2 className="fs-5">Логин и пароль нужно передать сотруднику!</h2>) : null}
                    {props.type != "editMe" && usersCreteResult[0].length > 0 ? <MessageText text={usersCreteResult[0]} typeOf={usersCreteResult[1]} /> : null}
                    <div className="mb-3">
                    {props.type === "editMe" ? null : (
                    <div>
                      <label htmlFor="login" className="form-label">Логин</label>
                      <input 
                        type="text" 
                        name="login" 
                        value={usersData.login} 
                        onChange={handleInputChange} 
                        className="form-control" 
                        id="login" 
                        placeholder="andrey"
                        disabled={props.type === "edit" || props.type == "editMe"}
                        required
                      />
                    </div>
                  )}
                  </div>
                    {props.type === "create" ? (
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Пароль</label>
                        <div className="input-group">
                            <input 
                              type="text" 
                              name="pass" 
                              value={usersData.pass} 
                              onChange={handleInputChange} 
                              className="form-control" 
                              placeholder="Qwerty123-" 
                              id="password" 
                              aria-describedby="password" 
                              disabled
                              required 
                            />
                            <button className="btn btn-outline-secondary" onClick={() => generatePassword()} type="button" id="password">Сгенерировать</button>
                        </div>
                        <div id="password" className="form-text">Передайте этот пароль сотруднику! После регистрации вы не сможете его увидеть! После первой авторизации сотрудник принудительно его сменит.</div>
                    </div>
                    ): props.type === "editMe" 
                    ? null 
                    : ( 
                        <div>
                        <button type="button" className="btn btn-outline-danger btn-sm" data-bs-toggle="modal" data-bs-target={`#changePass${props.id}`}>
                          Сбросить пароль
                        </button>
                        <br/></div>
                    )}
                    {props.type === "editMe" ? null : (
                      <div>
                    <label htmlFor="type" className="form-label">Тип пользователя</label>
                    <select 
                      className="form-select" 
                      aria-label="Тип пользователя"
                      name="type"
                      value={usersData.type}
                      onChange={handleInputChange}
                      disabled={props.type === "edit" || props.type == "editMe"}
                    >
                      <option value="1">Юридическое лицо</option>
                      <option value="2">Физическое лицо</option>
                    </select>
                    </div>
                  )}
                  {props.type === "editMe" || user.user['status'] < 4 || (usersData.login == user.user['login'] && user.user['login'] != props.mainLogin) ? null : (
                      <div>
                    <label htmlFor="user_add" className="form-label">Подчинение пользователю</label>
                    <select 
                      className="form-select" 
                      aria-label="Тип пользователя"
                      name="user_add"
                      value={usersData.user_add}
                      onChange={handleInputChange}
                      disabled={props.type == "editMe"}
                    >
                      <option key="me" value="me">Я</option>
                      {props.usersAdm.map(user_act => 
                          (user_act.login != user.user['login'] ? <option key={user_act.user_id} value={user_act.user_id}>{user_act.login}</option> : null)
                      )}
                    </select>
                    </div>
                  )}
                  {props.type !== "create" ? null : (
                    <div>
                      <label htmlFor="status" className="form-label">Статус пользователя</label>
                      <select 
                        className="form-select" 
                        aria-label="Статус пользователя"
                        name="status"
                        value={usersData.status}
                        onChange={handleInputChange}
                      >
                        {props.usersStatuses.map(status_data => 
                          (user.user['status'] <= status_data.status_id && user.user['login'] != props.mainLogin) ? '' : 
                          <option key={status_data.status_id} value={status_data.status_id}>{status_data.title}</option>
                        )}
                      </select>


                    </div>
                  )}
                    {props.type === "editMe" || (usersData.login == user.user['login'] && user.user['login'] != props.mainLogin) ? null : (
                      <div>
                    <label htmlFor="access" className="form-label">Доступ пользователя</label>
                    <select 
                      className="form-select" 
                      aria-label="Доступ пользователя"
                      name="access"
                      value={usersData.access}
                      onChange={handleInputChange}
                    >
                      <option value="1">Добавление и просмотр</option>
                      <option value="2">Только добавление</option>
                      <option value="3">Только просмотр</option>
                    </select>
                    </div>
                  )}
                    <div className="mb-3">
                      <label htmlFor="name" className="form-label">Имя / Название</label>
                      <input 
                        type="text" 
                        name="name" 
                        value={usersData.name}
                        onChange={handleInputChange} 
                        className="form-control" 
                        id="name" 
                        placeholder="Иванов Иван Иванович" 
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="email" className="form-label">Почта</label>
                      <input 
                        type="email" 
                        name="email" 
                        value={usersData.email}
                        onChange={handleInputChange} 
                        className="form-control" 
                        id="email" 
                        placeholder="name@example.com" 
                        required
                      />
                    </div>
                    {props.type === "editMe" ? null : (
                    <div className="mb-3">
                      <label htmlFor="phone" className="form-label">Телефон</label>
                      <input 
                        type="phone" 
                        name="phone" 
                        value={usersData.phone}
                        onChange={handleInputChange} 
                        className="form-control" 
                        id="phone" 
                        placeholder="79161111111" 
                        required
                      />
                    </div>
                  )}
                  {props.type === "editMe" ? null : (
                    <div className="mb-3">
                      <label htmlFor="personal_data" className="form-label">Персональные данные ({usersData.type == 1 ? "ИНН" : "Серия и номер паспорта серез запятую без пробелов (xxxx,xxxxxx)"})</label>
                      <input 
                        type="text" 
                        name="personal_data" 
                        value={usersData.personal_data}
                        onChange={handleInputChange} 
                        className="form-control" 
                        id="personal_data" 
                        required
                      />
                    </div>
                    )}
                    {usersCreteResult[0].length > 0 ? <MessageText text={usersCreteResult[0]} typeOf={usersCreteResult[1]} /> : null}
                    <button type="button" onClick={() => {userChange(props.type)}} className="btn btn-outline-danger btn-sm">{props.type == "create" ? "Создать нового пользователя" : props.type === "editMe" ? "Сохранить изменения" : "Изменить пользователя " + usersData.login}</button>
                  </form>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Закрыть</button>
                  </div>
                </div>
              </div>
            </div>
            {props.type === "edit" && (
            <div className="modal fade text-dark" id={`changePass${props.id}`} tabIndex="-1" aria-labelledby="exampleModalLabel1" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered  modal-xl">
             <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title fs-5" id="exampleModalLabel">Сбросить пароль для пользователя {usersData.login}</h1>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                <div className="mb-3">
                {user.user['status'] == 5 ? <>
                        <div className="input-group">
                            <input 
                              type="text" 
                              name="pass" 
                              value={usersData.pass} 
                              onChange={handleInputChange} 
                              className="form-control" 
                              placeholder="Qwerty123-" 
                              id="password" 
                              aria-describedby="password" 
                              disabled
                              required 
                            />
                            <button className="btn btn-outline-secondary" onClick={() => generatePassword()} type="button" id="password">Сгенерировать</button>
                        </div>
                        <div id="password" className="form-text">Передайте этот пароль сотруднику! После изменения вы не сможете его увидеть! После авторизации сотрудник принудительно его сменит.</div>
                        <button className="btn btn-primary" onClick={() => changePassword("pass")}>Сбросить и сохранить указанный пароль</button>
                        </> : null}
                        <button className="btn btn-primary" onClick={() => changePassword("noPass")}>Сбросить и сгенерировать новый пароль</button>
                    </div>
                    {changePassStatus.length > 0 ? <MessageText text={changePassStatus} typeOf={'danger'} /> : null}
                </div>
                <div className="modal-footer">
                  <button className="btn btn-primary" data-bs-target={`#createUser${props.id}`} data-bs-toggle="modal">Назад</button>
                </div>
            </div>
            </div></div>
            )}
        </span>
      );
}

export default UserForm;