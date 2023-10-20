// file.js
import React, { useState, useEffect } from "react";
import AxiosCustomInstance from "../api/AxiosCustomInstance";

export const CompanyComponent = ({handleInputChange}) => {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await AxiosCustomInstance({}).get("http://localhost:10000/member/comCodeList");
        const comData = response.data; // 콤보 데이터

        if (comData && comData.length > 0) {
          const newOptions = comData.map(item => ({
            value: item.comCode,
            label: item.comCode
          }));

          setOptions(newOptions);
        }
      } catch (error) {
        console.error("Error fetching companyData:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      Company:
      <select name="comCode" onChange={handleInputChange}>
        <option value="">선택</option>
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export const UseYnComponent = ({handleInputChange}) => {
  return (
    <div>
      사용여부:<p>
      <input type="radio" name="useYn" value="" defaultChecked={true} onChange={handleInputChange} />ALL &nbsp;
      <input type="radio" name="useYn" value="Y" onChange={handleInputChange} />Y &nbsp;
      <input type="radio" name="useYn" value="N" onChange={handleInputChange} />N
      </p>
    </div>
  );
};


export const ConfirmComponent = ({handleInputChange}) => {
  return (
    <div>
    확정여부:<p>
      <input type="radio" name="confirmYn" value="" defaultChecked={true} onChange={handleInputChange} />ALL &nbsp;
      <input type="radio" name="confirmYn" value="P" onChange={handleInputChange} />P &nbsp;
      <input type="radio" name="confirmYn" value="Y" onChange={handleInputChange} />Y &nbsp;
      <input type="radio" name="confirmYn" value="N" onChange={handleInputChange} />N
      </p>
    </div>
  );
};

