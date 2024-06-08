import React, { useEffect, useState } from "react";
import SettingCart from "./SettingCart";
import { getSettings, updateDataInDb, updateValueInDb } from "../../../http/settingsAPI";
import Loader from "../../ui/Loader";
import MessageToastContainer from "../../ui/MessageToastContainer";
import MessageText from "../../ui/MessageText";

function Settings(){
    const [settings, setSettings] = useState([]);
    const [issetSettingsLoading, setIssetSettingsLoading] = useState(true);
    const [error, setError] = useState([])
    const [errorLoading, setErrorLoading] = useState('')

    useEffect(() => {
        document.title = 'Настройки';
        setTimeout(() => {
            try{
                setError([])
                getSettings().then((result) => {
                    setSettings(result.data)
                    setIssetSettingsLoading(false)
                }).catch((e)=>{
                    setErrorLoading('Ошибка загрузки')
                    setIssetSettingsLoading(false)
                })
            }catch(e){
                setErrorLoading('Ошибка загрузки')
                setIssetSettingsLoading(false)
            }
        }, 0)
    }, [])

    const updateValue = (id, value) => {
        updateValueInDb(id, value)
        .then((result) => {
            const updatedSetings = settings.map(setting => {
                if (setting.id === id) {
                    return { ...setting, value: result.value };
                }
                return setting;
            });
            setSettings(updatedSetings);
            setError([["Обновлено значение", 'success'], ...error])
        })
        .catch((err) => {
            setError([[err.response.data.message, 'danger'], ...error]);
        });
    };

    const updateData = (id, data) => {
        updateDataInDb(id, data)
        .then((result) => {
            const updatedSetings = settings.map(setting => {
                if (setting.id === id) {
                    return { ...setting, name_text: result.name_text,  descr: result.descr};
                }
                return setting;
            });
            setSettings(updatedSetings);
            setError([["Обновлены дынные", 'success'], ...error])
        })
        .catch((err) => {
            setError([[err.response.data.message, 'danger'], ...error]);
        });
    };

    return(
        <div className="p-4 mb-3 bg-light rounded text-black">
            <h4 className="fst-italic text-black">Все Настройки {issetSettingsLoading ? <Loader /> : null}</h4>
            {errorLoading ? <MessageText text={errorLoading} typeOf={"danger"} /> : 
                <>
                {error.length > 0 ? <MessageToastContainer messages={error} /> : null}
            <table className="table table-hover">
                <thead>
                    <tr>
                      <th scope="col">Название</th>
                      <th scope="col">Значение</th>
                      <th scope="col">Описание</th>
                      <th scope="col">Последняя редакция</th>
                      <th scope="col">Действия</th>
                    </tr>
                  </thead>
                <tbody>
                    { settings.map(setting => 
                        <SettingCart data={setting} value={setting.id} updateValue={updateValue} updateData={updateData}/>
                    )} 
                </tbody>
            </table>  
            {errorLoading ? <MessageText text={errorLoading} typeOf={"danger"} /> : null}
            <div className="d-grid gap-2">
            </div></>
            }
        </div>
    );
}

export default Settings;