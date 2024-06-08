import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../..";

function AuMenu(props){
    const {user} = useContext(Context)
    return(
        <div className="d-flex flex-column flex-shrink-0 p-3 text-bg-dark sticky-top" style={{top: '91px'}}>
            <Link to="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
              <span className="fs-4 text-break">Привет, {user.user['login']}</span>
            </Link>
            <hr></hr>
            <ul className="nav nav-pills flex-column mb-auto">
                <li className="hoverLink">
                    <Link to="/me" className={`nav-link text-white ${props.active === 'me' ? 'active' : null}`} aria-current="page">
                        <i className="fa-solid fa-user pe-none me-2"></i>Я
                    </Link>
                </li>
                {user.user['access'] != 2 || user.user['status'] > 3  ?
                <li className="hoverLink">
                    <Link to="/storages" className={`nav-link text-white ${props.active === 'storages' ? 'active' : null}`} aria-current="page">
                        <i className="fa-solid fa-warehouse pe-none me-2"></i>Склады
                    </Link>
                </li>
                : null}
                <li className="hoverLink">
                    <Link to="/incidents" className={`nav-link text-white ${props.active === 'incidents' ? 'active' : null}`} aria-current="page">
                        <i className="fa-solid fa-triangle-exclamation pe-none me-2"></i>Инциденты
                    </Link>
                </li>
                {user.user['access'] != 2 || user.user['status'] > 3 ?
                <li className="hoverLink">
                    <Link to="/items" className={`nav-link text-white ${props.active === 'items' ? 'active' : null}`} aria-current="page">
                        <i className="fa-solid fa-box pe-none me-2"></i>Предметы
                    </Link>
                </li>
                : null}
                {user.user['access'] != 2 || user.user['status'] > 3 ?
                <li className="hoverLink">
                    <Link to="/patterns" className={`nav-link text-white ${props.active === 'patterns' ? 'active' : null}`} aria-current="page">
                        <i className="fa-solid fa-clipboard-list pe-none me-2"></i>Паттерны
                    </Link>
                </li>
                : null}
                {user.user['status'] >= 3 ? 
                <li className="hoverLink">
                    <Link to="/users" className={`nav-link text-white ${props.active === 'users' ? 'active' : null}`} aria-current="page">
                        <i className="fa-solid fa-users pe-none me-2"></i>Пользователи
                    </Link>
                </li>
                : null}
                {user.user['status'] >= 4 ? 
                    <li className="hoverLink">
                        <Link to="/links" className={`nav-link text-white ${props.active === 'links' ? 'active' : null}`} aria-current="page">
                            <i className="fa-solid fa-arrow-up-right-from-square pe-none me-2"></i>Внешние ссылки
                        </Link>
                    </li>
                : null}
                {user.user['status'] === 5 
                ?   <li className="hoverLink">
                        <Link to="/settings" className={`nav-link text-white ${props.active === 'settings' ? 'active' : null}`} aria-current="page">
                            <i className="fa-solid fa-gears pe-none me-2"></i>Настройки
                        </Link>
                    </li>
                : null}
            </ul>
        </div>
    );
}

export default AuMenu;