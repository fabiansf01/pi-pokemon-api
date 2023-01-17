import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearPokemons, getTypes, saveNewPokemon } from "../actions";
import BackBtn from "./buttons/BackBtn";
import validateForm from "../utils/validateForm";
import styles from "../styles/Form.module.css";

function Create() {
  
  const xmax=200;
  const xmin=10;
  const ymax=999;
  const ymin=1;

  const ramname= [
    "Verga_saur",
   "Synto_flix", 
   "Mega_raptor", 
   "Oculus_dex",
"Foxy_killer",
"Omega_destro",
"Panda_killer",
 "Bravo_flash", 
 "Deca_blind",
 "Exeter_sink",
"Lima_death",
"Pitus_cortus",
"Espantus_rex",
"Tuki_raptor"]


const fakename= ramname[Math.floor((Math.random() * (14)) + 1)]+Math.floor((Math.random() * (ymax - ymin + 1)) + ymin);

const [dataForm, setDataForm] = useState({
   /* name: "",
    hp: "",
    attack: "",
    defense: "",
    speed: "",
    height: "",
    weight: "",
    types: [],
    urlImg: "",*/


    //Math.floor((Math.random() * (xmax - xmin + 1)) + xmin);

    // MODO RAM 

    name: fakename,
    hp: Math.floor((Math.random() * (xmax - xmin + 1)) + xmin),
    attack: Math.floor((Math.random() * (xmax - xmin + 1)) + xmin),
    defense: Math.floor((Math.random() * (xmax - xmin + 1)) + xmin),
    speed: Math.floor((Math.random() * (xmax - xmin + 1)) + xmin),
    height: Math.floor((Math.random() * (xmax - xmin + 1)) + xmin),
    weight: Math.floor((Math.random() * (xmax - xmin + 1)) + xmin),
    types: [],
    urlImg: "",



  });
  const [error, setError] = useState({}); //Estado local para validar el formulario
  const [disabled, setDisabled] = useState(true); //Habilitador del botón submit cuando no haya ningun error en el formulario
  let navigate = useNavigate();
  const types = useSelector((state) => state.types);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTypes());
    dispatch(clearPokemons());
  }, [dispatch]);

  useEffect(() => {
    //control de campos faltantes
    if (
      dataForm.name.length > 0 &&
      dataForm.name.length <= 200 &&
      dataForm.types.length < 3 &&
      !error.hasOwnProperty("urlImg") &&
      !error.hasOwnProperty("hp") &&
      !error.hasOwnProperty("attack") &&
      !error.hasOwnProperty("defense") &&
      !error.hasOwnProperty("speed") &&
      !error.hasOwnProperty("height") &&
      !error.hasOwnProperty("weight")
    ) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [error, dataForm, disabled]);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const cleanTypes = dataForm.types?.reduce((prev, actual) => {
      if (!prev.includes(actual)) {
        prev.push(actual);
      }
      return prev;
    }, []);
    setDataForm((prevState) => {
      return { ...prevState, types: cleanTypes };
    });
    if (dataForm.urlImg.length === 0) {
      dataForm.urlImg =
        "http://www.fpsoft.com.ar/pi/images/babyyoda.png";
    }

    dispatch(saveNewPokemon(dataForm));
    setDataForm({
      name: "",
      hp: "",
      attack: "",
      defense: "",
      speed: "",
      height: "",
      weight: "",
      types: [],
      urlImg: "",
    });
    setTimeout(() => {
      navigate(-1);
    }, 1000);
  };

  const handleInput = (e) => {
    setError(validateForm({ ...dataForm, [e.target.name]: e.target.value }));
    setDataForm((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value.trim() };
    });
  };

  const handleCheckbox = (e) => {
    if (e.target.checked) {
      setDataForm((prevState) => {
        return {
          ...prevState,
          types: [...prevState.types, e.target.value],
        };
      });
    }
    if (!e.target.checked) {
      dataForm.types.splice(dataForm.types.indexOf(e.target.value), 1);
      setDataForm((prevState) => {
        return { ...prevState };
      });
    }
  };

  return (
    
    
    
    
    
    
   <div className={styles.contagen}>
                
                <br></br>
                <BackBtn />
               
               <br></br><br></br>
                <h2 className={styles.titupokeh2}>Genere un Pokemon - MODO RAM para valores</h2>
                <br></br><br></br>


                  <form  onSubmit={handleOnSubmit} >
            
                      <div className={styles.formulario}>
      
                        <div >
                           <label className={styles.formulario__label} htmlFor="name">Nombre: {error.name}</label>
                           <input
                            className={styles.formulario__input}
                            onChange={handleInput}
                            type="text"
                            id="name"
                            name="name"
                            required
                            autoComplete="off"
                            value={dataForm.name}
                             />
                          </div>
          


                         <div >
                            <label className={styles.formulario__label} htmlFor="urlImg">URL de imágen:{error.urlImg}</label>
                            <input
                            className={styles.formulario__input}
                            onChange={handleInput}
                            type="url"
                             id="urlImg"
                            name="urlImg"
                            autoComplete="off"
                            value={dataForm.urlImg}
                             />
                          </div>

                        <div >
                            <label className={styles.formulario__label} htmlFor="height">Altura Pokemon:{error.height}</label>
                            <input
                            className={styles.formulario__input}
                            onChange={handleInput}
                            type="number"
                            id="height"
                            name="height"
                            autoComplete="off"
                            value={dataForm.height}
                            />
                        </div>


                        <div >
                            <label className={styles.formulario__label} htmlFor="weight">Peso Pokemon: {error.weight}</label>
                            <input
                             className={styles.formulario__input}
                             onChange={handleInput}
                              type="number"
                             id="weight"
                              name="weight"
                              autoComplete="off"
                              value={dataForm.weight}
                            />
                          </div>
  
                        <div>
                          <label className={styles.formulario__label} htmlFor="hp">Salud  Pokemon: {error.hp}</label>
                          <input
                          className={styles.formulario__input}
                          onChange={handleInput}
                          type="number"
                          id="hp"
                          name="hp"
                          autoComplete="off"
                          value={dataForm.hp}
                         />
                        </div>


                        <div >
                          <label className={styles.formulario__label} htmlFor="attack">Poder de ataque: {error.attack}</label>
                          <input
                          className={styles.formulario__input}
                          onChange={handleInput}
                          type="number"
                          id="attack"
                          name="attack"
                          autoComplete="off"
                          value={dataForm.attack}
                          />
                        </div>
          
          
          
                        <div >
                          <label className={styles.formulario__label} htmlFor="defense">Poder de Defensa:{error.defense}</label>
                          <input
                          className={styles.formulario__input}
                          onChange={handleInput}
                          type="number"
                          id="defense"
                          name="defense"
                          autoComplete="off"
                          value={dataForm.defense}
                          />
                        </div>
          
                 
        
                        <div >
                          <label className={styles.formulario__label} htmlFor="speed">Velocidad total: {error.speed}</label>
                          <input
                          className={styles.formulario__input}
                          onChange={handleInput}
                          type="number"
                          id="speed"
                          name="speed"
                          autoComplete="off"
                          value={dataForm.speed}
                          />
                        </div>
        
        
        
        </div>
        
      
        
        
        
        <br></br>
        <br></br>

        <h2 className={styles.titupokeh2}>Seleccione solo dos tipos de poderes</h2>
        <br></br>
        <br></br>
        <div className={styles.partecheck}>
                    {types?.map((type) => {
                      return (
                          <div  key={type.id}>
                              <input
                               className={`${styles.MyCheckbox} ${styles[type.name]}`}
                               type="checkbox"
                                name="types"
                                value={type.name}
                                onChange={(e) => handleCheckbox(e)}
                              />
                              <label className={styles.checknombre}> {type.name} </label>
                          </div>
            );
          })}
        </div>
        
        {dataForm.types.length > 2 && <p className={styles.solodos}>Solo puede tener dos tipos de poder</p>}
        
        


         <input
          type="submit"
          value="Crear"
          disabled={disabled}
          className={`${styles.form_button} ${disabled || styles.is_valid}`}
           />
   






      </form>
    
      
      
      
      
     
    
    
    </div>
  );
}

export default Create;
