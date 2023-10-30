import React, { Component, useState } from "react";
import { Navbar, Button, Input } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from 'react-router-dom'; 

const NavComponent = () => {
  let navigate = useNavigate();
  const [inputValue, setInputValue] = useState('');
  const [inputVisible, setInputVisible] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const showInput = () => {
    setInputVisible(true);
  };

  const hideInput = () => {
    setInputVisible(false);
    setShowAlert(false);
    //setInputValue('');
    //navigate(-1);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    const otro = '¡'
    if(value == 0){
      setInputValue(value);
      setShowAlert(false);
      navigate(`/buscar?search=${otro}`);}
    else if(value.length <= 30) {
      setInputValue(value);
      setShowAlert(false);
      navigate(`/buscar?search=${value}`);
    } else {
      setShowAlert(true);
    }
  };

  const handleLimpiarClick = () => {
    setShowAlert(false);
    setInputValue('');
    const otro = '¡';
    navigate(`/buscar?search=${otro}`);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault(); 
    }
  }

  const borrar = ()=>{setShowAlert(false);}

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
                  <div style={{position: "absolute", marginLeft:"9px", marginTop:"5px", color: "darkgray"}}>  
                    <FontAwesomeIcon icon={faMagnifyingGlass} /> </div>
                      <Input className="form-control me-2" 
                          type="search" placeholder="¿Qué quiere leer?" 
                          value={inputValue} aria-label="Search"
                          onChange={handleInputChange} onKeyDown={handleKeyPress}
                          style={{border: "2px solid #ccc", borderRadius: "15px", 
                          padding: "10px 0px 10px 25px", width: "295px", height: "30px", 
                          outline:"none",   backgroundColor: "#F6F5F5", // Color de fondo cuando no está enfocado
                          fontFamily: 'Arial, sans-serif', color: "#6B6A6A"
                      }}
                      />
                      {inputValue && (<span
                        title="Limpiar" onClick={handleLimpiarClick}
                        style={{position: 'absolute', right: '16px', top: '16px', color: 'lightgray',
                          transform: 'translateY(-50%)',cursor: 'pointer',fontSize: '23px'
                        }}
                      ><i class="bi bi-trash-fill"></i></span>
                      )}{showAlert && (
                        <div class="alert alert-danger d-flex align-items-center" role="alert" 
                             style={{position:"absolute", height:"25px", top:"35px", width:'317px', right:'0px'}}>
                          <svg xmlns="http://www.w3.org/2000/svg" class="bi bi-exclamation-triangle-fill flex-shrink-0 me-2" 
                              viewBox="0 0 16 16" role="img" aria-label="Warning:" style={{width: "16px", height: "16px"}}>
                            <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                          </svg>
                          <div> No puede ingresar más de 30 caracteres</div>
                          <button type="button" className="btn-close" onClick={borrar} aria-label="Close" ></button>
                        </div> )}               
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

