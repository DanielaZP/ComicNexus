import React, { Component, useState } from "react";
import { Navbar, Button, Input } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons"

const NavComponent = () => {
  // Creamos un estado para controlar si el input está visible o no
  const [inputVisible, setInputVisible] = useState(false);

  // Creamos una función para cambiar el estado del input al presionar el botón de lupa
  const showInput = () => {
    setInputVisible(true);
  };

  // Creamos una función para cambiar el estado del input al presionar el botón de cruz
  const hideInput = () => {
    setInputVisible(false);
  };

  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleLimpiarClick = () => {
    setInputValue('');
  };

  return (
    <Navbar>
      {/* Si el input no está visible, mostramos el botón de lupa y le pasamos la función showInput como prop onClick */}
      {!inputVisible && (
        <button className="btn esact-btn-color" onClick={showInput}>
          <i class="bi bi-search"></i> </button>
      )}
      {/* Si el input está visible, mostramos el input y el botón de cruz y le pasamos la función hideInput como prop onClick */}
      {inputVisible && (
        <>  
            <form style={{display:"flex", alignItems:"center", gap: "10px"}}>
              <form className="d-flex" role="search" style={{display:"flex", alignItems:"center"}}>
                <div className="input-wrapper" style={{ position: 'relative' }}>
                  <div style={{position: "absolute", marginLeft:"9px", marginTop:"5px"}}>  
                    <FontAwesomeIcon icon={faMagnifyingGlass} /> </div>
                      <Input className="form-control me-2" maxLength="30"
                          type="search" placeholder="¿Que quiere leer?" 
                          value={inputValue} aria-label="Search"
                          onChange={(e) => setInputValue(e.target.value)}
                          style={{border: "2px solid #ccc", borderRadius: "15px", 
                          padding: "10px 0px 10px 25px", width: "295px", height: "30px", 
                          outline:"none",   backgroundColor: "#F6F5F5", // Color de fondo cuando no está enfocado
                          fontFamily: 'Arial, sans-serif', color: "#6B6A6A"
                      }}
                      />
                      {inputValue && (<span
                        title="Limpiar" onClick={handleLimpiarClick}
                        style={{position: 'absolute', right: '16px', top: '14px', color: 'lightgray',
                          transform: 'translateY(-50%)',cursor: 'pointer',fontSize: '30px',   
                        }}
                      >&times;</span>
                      )}
                </div>
                </form>
                <button className="btn esact-btn-color"
                  style={{ fontSize: '18px',padding: '2px 5px', color: '#969696'  }}
                  onClick={hideInput}> <i className="bi bi-x-circle"></i>
                </button>
              </form> 
        </>
      )}     
    </Navbar>    
  );
};

export default NavComponent;
