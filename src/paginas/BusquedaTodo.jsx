import React, { useState, useEffect } from 'react'
import { Container, Spinner,Row,Col,Button,Modal} from 'react-bootstrap';
import {TabContent, TabPane, Nav, NavItem, NavLink} from "reactstrap";
import { useLocation } from 'react-router-dom';
import axios from 'axios'; // Importa Axios
import CardCat from '../componentes/CardCat'// Importa tu componente Card
import TabArtista from '../componentes/filtrado/TabArtista';
import NavArtista from '../componentes/filtrado/NavArtista';
import TabAnio from '../componentes/filtrado/TabAnio';
import NavAnio from '../componentes/filtrado/NavAnio';

function BusquedaTodo() {
  const [comicsData, setComicsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Inicialmente, isLoading se establece en true
  const itemsPerPage = 9;
  const [currentPage, setCurrentPage] = useState(1);
  const location = useLocation();
  const search = new URLSearchParams(location.search).get("search");
  const[activeTab,setActiveTab] = useState("1");

  const cambiarTab = (numeroTab) =>{
    if(activeTab !== numeroTab){
      setActiveTab(numeroTab);
    }
  }

  useEffect(() => {
    setIsLoading(true);
    console.log(search)
    axios.get('https://comic-next-laravel.vercel.app/api/api/buscar/'+search)
      .then((response) => {
        // Almacena los datos JSON en el estado local
        console.log(response.data);
        setComicsData(response.data);
      })
      .catch((error) => {
        console.error('Error al obtener datos:', error);
      })
      .finally(() => {
        // Establece isLoading en false una vez que la solicitud se ha completado (ya sea con éxito o con error)
        setIsLoading(false);
      });
  }, [search]);

  const getCurrentComics = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return comicsData.slice(startIndex, endIndex);
  };

  const getCurrentComicsTitulo = () => {
    const startIndex = (currentPage - 1) * 3;
    const endIndex = startIndex + 3;
    return comicsData.slice(startIndex, endIndex);
  };

  return (
    <div>
      <Container className="text-center my-5">
      <h1 className="display-4 badabb">Resultados</h1>
      <hr className="my-4" style={{ borderColor: 'var(--celestito)', borderWidth: '2px' }} />
    </Container>
    
      <div className="TabB"  >
       <Nav tabs>
         <NavItem>
           <NavLink 
           className={(activeTab=="1" ? "activeTab baseTab" : "baseTab" )}
           onClick={()=>cambiarTab("1")}style={{ textShadow: "2px 2px 4px black", color: activeTab === "1" ? 
            "#61dafb" : "white", borderRadius: "20px" , marginRight: "20px", fontWeight: "bold"}}>
             Todo
           </NavLink>
         </NavItem>

         <NavItem>
           <NavLink 
              className={(activeTab=="2" ? "activeTab baseTab" : "baseTab" )}
           onClick={()=>cambiarTab("2")}style={{ textShadow: "2px 2px 4px black",color: activeTab === "2" ? 
            "#61dafb" : "white", borderRadius: "20px" , marginRight: "20px",fontWeight: "bold"}}>
             Títulos
           </NavLink>
         </NavItem>

         <NavItem>
           <NavLink 
              className={(activeTab=="3" ? "activeTab baseTab" : "baseTab" )}
           onClick={()=>cambiarTab("3")}style={{  textShadow: "2px 2px 4px black",color: activeTab === "3" ? 
            "#61dafb" : "white", borderRadius: "20px" , marginRight: "20px", fontWeight: "bold"}}>
            Artistas
           </NavLink>
         </NavItem>

         <NavItem>
           <NavLink 
              className={(activeTab=="4" ? "activeTab baseTab" : "baseTab" )}
           onClick={()=>cambiarTab("4")}style={{  textShadow: "2px 2px 4px black",color: activeTab === "4" ? 
            "#61dafb" : "white", borderRadius: "20px" , marginRight: "20px", fontWeight: "bold"}}>
            Categorías
           </NavLink>
         </NavItem>

         <NavItem>
           <NavLink 
              className={(activeTab=="5" ? "activeTab baseTab" : "baseTab" )}
           onClick={()=>cambiarTab("5")}style={{  textShadow: "2px 2px 4px black",color: activeTab === "5" ? 
            "#61dafb" : "white", borderRadius: "20px" , marginRight: "20px", fontWeight: "bold"}}>
            Año de publicación
           </NavLink>
         </NavItem>

       </Nav>





       <TabContent activeTab={activeTab} style={{ margin: "0 auto" }} lazy={true}>
         <TabPane tabId="1">
           <div className='container'>
           <h1 style={{textAlign: "left", fontFamily: "Comic Sans MS",color:"white",
                 textShadow: "2px 2px 4px black"}}>Títulos</h1>
             <div className="container">
        {isLoading ? (
         <div className="text-center my-3">
         <Spinner animation="border" variant="primary" role="status">
           <span className="sr-only">.</span>
         </Spinner>
         <p className="mt-2">Cargando cómics...</p>
       </div>
        ) : comicsData.length === 0 ? (
          <p style={ { textAlign: "center", fontFamily: "Comic Sans MS", fontSize: "20px" }}>
          {search !== "¡" ? `No se han encontraron resultados para "${search}"` 
          : 'No se han encontraron resultados para ""'}
        </p>
        ) : (
          <div>
            <div className="row row-cols-1 row-cols-md-4 g-4 mt-4">
              {getCurrentComicsTitulo().map((comic) => (
                <div className="col-md-4" key={comic.comic.cod_comic}>
                  <CardCat comic={comic} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
     </div>
          <div className='container'> <h1 style={{textAlign: "left", fontFamily: "Comic Sans MS", 
                color:"white", textShadow: "2px 2px 4px black"}}>Artistas</h1>
          </div> 

          <NavArtista/>

          <div className='container'> <h1 style={{textAlign: "left", fontFamily: "Comic Sans MS", 
                color:"white", textShadow: "2px 2px 4px black"}}>Categorías</h1>
          </div> 



          <div className='container'> <h1 style={{textAlign: "left", fontFamily: "Comic Sans MS", 
                color:"white", textShadow: "2px 2px 4px black"}}>Año de publicación</h1>
          </div> 
             
          <NavAnio/>

         </TabPane>

         <TabPane tabId="2">
        
             <div className="container">
        {isLoading ? (
         <div className="text-center my-3">
         <Spinner animation="border" variant="primary" role="status">
           <span className="sr-only">.</span>
         </Spinner>
         <p className="mt-2">Cargando cómics...</p>
       </div>
        ) : comicsData.length === 0 ? (
          <p style={ { textAlign: "center", fontFamily: "Comic Sans MS", fontSize: "20px" }}>
          {search !== "¡" ? `No se han encontraron resultados para "${search}"` 
          : 'No se han encontraron resultados para ""'}
        </p>
        ) : (
          <div>
            <div className="row row-cols-1 row-cols-md-4 g-4 mt-4">
              {getCurrentComics().map((comic) => (
                <div className="col-md-4" key={comic.comic.cod_comic}>
                  <CardCat comic={comic} />
                </div>
              ))}
            </div>
            {comicsData.length > itemsPerPage && (
              <div className="mt-4 text-center">
                <button
                  className="btn custom-btn-color mx-2"
                  onClick={() => setCurrentPage(currentPage - 1)}
                  disabled={currentPage === 1}>
                  Página Anterior
                </button>
                <button
                  className="btn custom-btn-color mx-2"
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={currentPage * itemsPerPage >= comicsData.length}
                >
                  Siguiente Página
                </button>
              </div>
            )}
          </div>
        )}
      </div>
          

         </TabPane>


         <TabPane tabId="3">
           
             <TabArtista/>
           
         </TabPane>

         <TabPane tabId="4">
           
             <p>Aun no funciona</p>
           
         </TabPane>

         <TabPane tabId="5">
           
             <TabAnio/>
           
         </TabPane>

       </TabContent>
    </div>
  </div>
  )
}

export default BusquedaTodo;