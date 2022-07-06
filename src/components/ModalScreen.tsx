import React, { useEffect, useState, useContext } from 'react';
import {
  Modal,
  Button,
} from "react-bootstrap";
import Toggle from './Toggle';
import { CitiesContext, City, CityContextType } from '../utils/context/CitiesContext';

const ModalScreen: React.FC = () => {
  const contextValue = useContext<CityContextType>(CitiesContext);
  const [modalIsVisible, setModalIsVisible] = useState<boolean>(false);
  const [obj, setObj] = useState<City>({
    cityName: "",
    addresse: "",
    url_img: "",
    nb_habitants: "",
    nb_hotels: "",
    revenu_moy: "",
    superficie: "",
    status: false,
  });
  const [listError, setListError] = useState<string[]>([]);
  const handleClick = (city: City): void => {
    let missingFields: string[] = []
    Object.entries(city)
      .forEach(([key, value]) => {
        if (value === "") {
          missingFields.push(`${key} is missing !`)
        };
      })
    if (contextValue.cityList.length > 0) {
      if (contextValue.cityList.filter(el => el.cityName.toLowerCase().trim() === city.cityName.toLowerCase().trim()).length > 0) {
        missingFields.push("this city already exists");
      }
    }
    if (missingFields.length === 0) {
      contextValue.updateList([...contextValue.cityList, city]);
      handleClose();
    } else {
      setListError(missingFields);
    };
  };
  const handleClose = () => {
    setModalIsVisible(false);
  };
  const setStatus = (status: boolean) => {
    setObj({ ...obj, status: status });
  };
  useEffect(() => {
    setListError([]);
    setObj({
      cityName: "",
      addresse: "",
      url_img: "",
      nb_habitants: "",
      nb_hotels: "",
      revenu_moy: "",
      superficie: "",
      status: false,
    });
  }, [modalIsVisible]);
  useEffect(() => {
    const close = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose()
      }
    }
    window.addEventListener('keydown', close)
    return () => window.removeEventListener('keydown', close)
  }, [])

  return (
    <>
      <button
        data-testid="addCity-btn"
        style={style.addBtn}
        onClick={() => { setModalIsVisible(!modalIsVisible) }}
      >
        <img
          alt="plus-icon"
          style={{
            width: "15px",
            marginRight: "5px",
          }}
          src="../../plus-solid.svg"
        />
        AJOUTER
      </button>
      <Modal
        show={modalIsVisible}
        onHide={handleClose}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>
            Ajouter une nouvelle destination
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={style.topBlock}>
            <input
              autoFocus
              placeholder="Nom de la destination"
              style={style.inputLong}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setObj({ ...obj, cityName: e.target.value })
              }}
            />
            <input
              placeholder="Adresse"
              style={style.inputLong}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setObj({ ...obj, addresse: e.target.value })
              }}
            />
            <input
              placeholder="Lien de l'image"
              style={style.inputLong}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setObj({ ...obj, url_img: e.target.value })
              }}
            />
            <div style={style.bottomBlock} >
              <input
                placeholder="Nb d'habitants"
                style={style.inputCourt}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setObj({ ...obj, nb_habitants: e.target.value })
                }}
              />
              <input
                placeholder="Nb Hôtels"
                style={style.inputCourt}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setObj({ ...obj, nb_hotels: e.target.value })
                }}
              />
              <input
                placeholder="Revenu moy"
                style={style.inputCourt}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setObj({ ...obj, revenu_moy: e.target.value })
                }}
              />
              <input
                placeholder="Supeficie"
                style={style.inputCourt}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setObj({ ...obj, superficie: e.target.value })
                }}
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Toggle setStatus={setStatus} />
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => { handleClick(obj) }}>
            Save Changes
          </Button>
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            {listError.length > 0
              ? listError.map((item, i) =>
                <p key={i}>
                  <span style={{ fontWeight: "800" }}>Error: </span>
                  {item}&nbsp;&nbsp;
                </p>
              )
              : null
            }
          </div>
        </Modal.Footer>
      </Modal>
    </>
  )
}

const style: { [key: string]: React.CSSProperties } = {
  addBtn: {
    backgroundColor: "#2FCB99",
    color: "#FFF",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "5px",
    width: "115px",
    height: "40px",
    alignSelf: "center",
  },
  topBlock: {
    display: "flex",
    flexDirection: "column",
  },
  bottomBlock: { 
    display: "flex",
    justifyContent: "space-between",
    marginTop: "10px",
  },
  inputLong: {
    marginTop: "10px",
    backgroundColor: "lightgrey"
  },
  inputCourt: {
    maxWidth: "20%",
    backgroundColor: "lightgrey"
  }
};

export default ModalScreen;