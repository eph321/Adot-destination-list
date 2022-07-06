import React, { useContext } from 'react';
import { CitiesContext } from '../utils/context/CitiesContext';
import {
    Card,
    Container,
    Col,
} from "react-bootstrap";
import Toggle from '../components/Toggle';

export default function DataList() {
    const contextValue = useContext(CitiesContext);
    const { cityList } = contextValue;
    return (
        <>
            {cityList && cityList.map((item) =>
                <Container
                    key={item.cityName}
                    style={style.container}
                >
                    <Card style={style.card}>
                        <img
                            alt={item.cityName}
                            src={item.url_img}
                            style={style.cardImage}
                        />
                        <div style={style.cardBottomBlock}>
                            <div style={style.cardTitle}>
                                <h2>{item.cityName}</h2>
                                <p style={style.cardAdresse}>
                                    {item.addresse.length > 60 ? item.addresse.slice(60).concat("...") : item.addresse}
                                </p>
                            </div>
                            <Toggle id={item.cityName} status={item.status} />
                            <div style={style.cardFooter}>
                                <div style={style.statsBlock}>
                                    <p>{parseInt(item.nb_habitants) / 1000000} M</p>
                                    <p>Habitants</p>
                                </div>
                                <div style={style.statsBlock}>
                                    <p>{item.nb_hotels}</p>
                                    <p>Hôtels</p>
                                </div>
                                <div style={style.statsBlock}>
                                    <p>{item.revenu_moy} €</p>
                                    <p>Revenu Moy</p>
                                </div>
                                <div style={style.statsBlock}>
                                    <p>{item.superficie}</p>
                                    <p>km2</p>
                                </div>
                            </div>
                        </div>
                    </Card>
                </Container>
            )};
        </>
    )
};

const style: { [key: string]: React.CSSProperties } = {
    container: {
        display: "flex",
        // flexWrap:"wrap", 
        width: "35wh",
    },
    card: {
        width: "100%",
        height: "50vh",
        padding: "0px",
    },
    cardImage: {
        height: "50%",
        display: "flex",
        width: "100%",
        objectFit: "fill",
    },
    cardBottomBlock: {
        width: "100%",
        height: "50%",
        minHeight: "50%",
        maxHeight: "50%",
        display: "flex",
        flexWrap: "wrap",
        alignContent: "space-around",
        alignItems: "center"
    },
    cardTitle: {
        padding: "10px",
        width: "80%",
        height: "60%",
        display: "flex",
        flexDirection: "column",
    },
    cardAdresse: {
        maxWidth: "100%",
        display: "flex",
        wordBreak: "break-word"
    },
    cardFooter: {
        borderTop: "1px solid lightGrey",
        width: "100%",
        display: "flex",
        height: "40%"
    },
    statsBlock: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "25%",
    }
};
