import React, { useEffect, useState, useContext } from 'react';
import { OptionalEventProperties } from 'react-dom/test-utils';
import { CitiesContext, City, CityContextType } from '../utils/context/CitiesContext';

interface Toggle {
    id?: string, 
    setStatus?: (status:boolean) => void ,
    status?: boolean
}

const Toggle : React.FC<Partial<Toggle>> = ({id, setStatus, status}) => {
    const contextValue = useContext<CityContextType>(CitiesContext);
    const {cityList, updateList} = contextValue;
    const [toggleValue, setToggleValue] = useState<boolean>(status || false);
    const handleChange = () => {
        setToggleValue(!toggleValue);
    };     
    useEffect(()=>{
        if (setStatus) {
            setStatus(toggleValue);
           };
        if(id){
            let existingCity = cityList.map((city: City): string | null => city.cityName).indexOf(id);
            if (existingCity >= 0){
                let new_arr: City[] = [...cityList];
                new_arr[existingCity].status = toggleValue;
                updateList(new_arr);
            }
        };
    },[toggleValue]); 
  return (
    <div
        style={{
            height: "10px",
            width: "50px",
            borderRadius: "20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: toggleValue ? "#4BFFC6" : "grey",
            margin: "15px"
        }}
    >
        <button
            data-testid="desactivate-btn"
            id="desactivate"
            style={{
                height: "25px",
                width: "25px",
                borderRadius: "20px",
                border: "0px",
                opacity: toggleValue ? 0 : 1,
                backgroundColor: toggleValue ? undefined : "lightGrey"
            }}
            onClick={handleChange}
        />
        <button
            data-testid="activate-btn"
            id="activate"
            style={{
                height: "25px",
                width: "25px",
                border: "0px",
                borderRadius: "20px",
                opacity: toggleValue ? 1 : 0,
                backgroundColor: toggleValue ? "#2FCB99" : undefined,
            }}
            onClick={handleChange}
        />
    </div>
  )
};

export default Toggle;