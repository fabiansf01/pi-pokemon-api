import React from "react";
/*import styles from "../../styles/PokemonDetail.module.css";*/
import stylePokemon from "../../styles/Pokemon.module.css";
import styleDark from "../../styles/PokemonDarkDetail.module.css";


import  { btn } from "../../styles/Buttons.module.css";
import { Link } from "react-router-dom";

const PokemonDetail = ({ pokemonDetail }) => {
  const {
    name,
    id,
    types,
    urlImg,
    hp,
    attack,
    defense,
    speed,
    height,
    weight,
    createInDb,
  } = pokemonDetail;
  return (
    
       
    <div className={styleDark.contagen}>    
    <div className={styleDark.contenedor}>
      
     
          

          <div className={styleDark.contenedorsecundario}>
        
          
          <div className={styleDark.card}>
            <p className={styleDark.p_id}>ID .POK:{createInDb ? id.slice(0, 5) : id}</p>
            <h2>{name}</h2>
           </div>

          <div className={styleDark.card}>
          <h3> TIPO </h3>
            
            {types?.map((type, i) => (
              <p> {type}  </p>
            ))}
          </div>
       

       
          
            
          <div className={styleDark.card}> 
          <div className={styleDark.textos}>
           
            <h3>  SALUD  </h3>
            <p>{hp}</p>    
          </div>
          </div>

          <div className={styleDark.card}>
          <div className={styleDark.textos}>
            <h3> ATAQUE  </h3>
            <p>{attack}</p>
          </div>
          </div>

          <div className={styleDark.card}>          
          <div className={styleDark.textos}>
            <h3>  DEFENSA  </h3>
            <p>{defense}</p>
          </div>
          </div>

          <div className={styleDark.card}>      
          <div className={styleDark.textos}>
            <h3> VELOCIDAD </h3>
            <p> {speed}</p>  
          </div>   
          </div>     

          <div className={styleDark.card}>      
          <div className={styleDark.textos}>
            <h3> ALTURA </h3>    
            <p>{height} </p>  
          </div>
          </div>

          <div className={styleDark.card}>      
          <div className={styleDark.textos}>
            <h3> PESO  </h3>  
            <p>{weight}</p>      
          </div> 
          </div>     
          


          
          
          </div>

       
          <div className={styleDark.imager}>   
         <img src={urlImg} alt="Pokemon" />
         </div>



       <div>
          <Link to="/home">
             
            <button className={btn}> Página Principal</button>
          </Link>
       </div>

    </div>



    


    </div>
  
    
  );
};

export default PokemonDetail;
