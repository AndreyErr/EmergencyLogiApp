import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllPattern } from "../../../http/patternAPI";
import PatternListItem from "./PatternListItem";
import Loader from "../../ui/Loader";

function PatternList(props){
    const history = useNavigate()
    const [storages, setStorages] = useState([])
    const [ifNoPatterns, setIfNoPatterns] = useState(false);
    const [patternsLoading, setPatternsLoading] = useState(true);
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        document.title = 'Паттерны';
        try{
        setTimeout(() => {
            getAllPattern(filter).then((result) => {
                if(result == 'err'){
                    setIfNoPatterns(true)
                    setPatternsLoading(false)
                }else{
                    setStorages(result)
                    setPatternsLoading(false)
                }
            })
        }, 0)
        }catch(e){
            history('/')
        }
    }, [filter])

    const handleFilterChange = (event) => {
        setPatternsLoading(true)
        setFilter(event.target.value);
    };

    return(
        <div>
            {!ifNoPatterns
            ? <>
            <select 
              className="form-select mb-2 mt-2" 
              aria-label="Фильтр"
              name="type_flag"
              value={filter}
              onChange={handleFilterChange}
            >
                <option key="all" value="all">Без фильтра</option>
                <option key="reaction" value="reaction">Реакция</option>
                <option key="common" value="common">Общий</option>
            </select>
            {patternsLoading ? <Loader /> : null}
            <div className="row mt-2">
            {storages.map(title => <PatternListItem data={title}/>)}
            </div>
            </>
            : "Нет созданных паттернов"
            }
            
        </div>
    );
}

export default PatternList;