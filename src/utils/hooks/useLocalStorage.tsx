import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { City } from "../context/CitiesContext";

export default function useLocalStorage (key: string, defaultValue: null[]) : [City[], Dispatch<SetStateAction<City[]>>] {
    const data:string | null = localStorage.getItem(key);
    let jsonData;
    if (typeof data === "string") {
        jsonData = JSON.parse(data);
    }; 
    const [value, setValue] = useState<City[]>(jsonData || defaultValue); 
    useEffect(() => {    
        localStorage.setItem(key, JSON.stringify(value));
    },[key, value]);
    return [value, setValue]
}