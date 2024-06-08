import React, { useState, useEffect } from 'react';
import { getTypes } from "../../../../http/incidentsAPI";

const IncidentDropdown = ({ fetchData }) => {
    const [options, setOptions] = useState([]);
    const [selectedOption, setSelectedOption] = useState('');

    useEffect(() => {
        try{
            setTimeout(() => {
                getTypes().then(data => setOptions(data))
                .catch(error => console.error('Error fetching data:', error));
            }, 0)
        }catch(e){
            console.log("Ошибка")
        }
    }, []);

    const handleSelectChange = (event) => {
      setSelectedOption(event.target.value);
    };

    return (
      <div>
        <select value={selectedOption} onChange={handleSelectChange}>
          <option value="">Выберите опцию</option>
          {options.map(option => (
            <option key={option.id} value={option.id}>{option.name}</option>
          ))}
        </select>
      </div>
    );
};

export default IncidentDropdown;