import React, { useState } from 'react';

const DataTable = ({ pattern }) => {
  const [formData, setFormData] = useState({});

  const handleInputChange = (event, key, dataType) => {
    let value = event.target.value;
    if (dataType === 'number') {
      value = parseFloat(value);
    } else if (dataType === 'bool') {
      value = value.toLowerCase() === 'true';
    }
    setFormData(prevData => ({
      ...prevData,
      [key]: value
    }));
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Название</th>
            <th>Тип данных</th>
            <th>Тип необходимости</th>
            <th>Ограничения</th>
            <th>Значение</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(pattern).map(([key, value]) => (
            <tr key={key}>
              <td>{key}</td>
              <td>{value[0]}</td>
              <td>{value[1]}</td>
              <td>{value[3] ? `${value[3][0]}: ${value[3].slice(1).join(', ')}` : '-'}</td>
              <td>
                <input
                  type={value[0] === 'числовой' ? 'number' : 'text'}
                  value={formData[key] || ''}
                  onChange={(event) => handleInputChange(event, key, value)}
                  required={value[1] === 'required'}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
