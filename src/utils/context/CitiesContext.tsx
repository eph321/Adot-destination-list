import React from "react";

export interface City {
    cityName: string;
    addresse: string;
    url_img: string;
    nb_habitants: string;
    nb_hotels: string;
    revenu_moy: string;
    superficie: string;
    status: boolean;
};

export type CityContextType = {
    cityList: City[];
    updateList: (citylist : City[]) => void
};

export const CitiesContext = React.createContext<CityContextType>({
    cityList: [],
    updateList: () => {}
});