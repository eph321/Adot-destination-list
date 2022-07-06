
import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row } from "react-bootstrap";
import ModalScreen from "./components/ModalScreen";
import { CitiesContext, CityContextType } from "./utils/context/CitiesContext";
import useLocalStorage from "./utils/hooks/useLocalStorage";
import DataList from "./views/DataList";

const App : React.FC = () => {
  const [cityList, setCityList] = useLocalStorage("cityList", []);
  const contextValue: CityContextType = {
    cityList: cityList,
    updateList: setCityList
  };
  return (
      <CitiesContext.Provider value={contextValue}>
        <div>
          <header style={style.header}>
            <h1>Destinations</h1> 
            <ModalScreen />
          </header>
          <Container>
            <Row xs={1} md={2} lg={3} className="g-4" style={{marginBottom:"10vh"}}>
              <DataList />
            </Row>
          </Container>
        </div>
      </CitiesContext.Provider>
  ); 
}

const style: { [key: string]: React.CSSProperties } = {
  header: {
    display: "flex",
    justifyContent: "space-between",
    justifyItems: "center",
    marginBottom: "5vh",
    marginTop: "10vh",
    paddingLeft: "10vh",
    paddingRight: "10vh",
  }
};

export default App;
