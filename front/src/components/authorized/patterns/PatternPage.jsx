import { Link } from "react-router-dom";
import { Context } from "../../..";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../../ui/Loader";
import { getPatternById } from "../../../http/patternAPI";
import CreatePatternPage from "./create/CreatePatternPage";


function PatternPage(props){
    const {user} = useContext(Context)
    const history = useNavigate()

    const [address, setAddress] = useState('')
    const [isDataLoading, setIsDataLoading] = useState(true)

    useEffect(() => {
        document.title = 'Паттерн';
      }, []);
      
    useEffect(() => {
        try{
            setIsDataLoading(true)
            setTimeout(() => {
                getPatternById(props.id).then((result) => {
                    setAddress(result[0]);
                    setIsDataLoading(false)
                })
            }, 0)
        }catch(e){
            history('/')
        }
    }, [])
    return(
        <div>
            {isDataLoading
            ? <Loader />
            : <>
            {user.user['status'] >= 4 ? <Link to={`/patterns/edit/${address.id}`}><button type="button" className="btn btn-success mt-2">Изменить паттерн</button></Link> : null}

            <CreatePatternPage id={address.id} typeOfAction={"look"} />
            </>}
        </div>
    );
}

export default PatternPage;