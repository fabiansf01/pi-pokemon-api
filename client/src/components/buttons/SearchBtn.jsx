//componente que recibe la función que trae el pokemon buscado
import { useState } from "react";
import { useDispatch } from "react-redux";
import { searchPokemon, filterPokemonByType, filterPokemonBymiType } from "../../actions";
import { searchBox, btnSearch, inputSearch, neoinput, buscar } from "../../styles/SearchBtn.module.css";

function SearchBtn() {
  const [name, setName] = useState("");
  const dispatch = useDispatch();

  const handleSearchName = (e) => {
    setName(e.target.value);
  };



  const handleSearchxxtipo = (e) => {
    setName(e.target.value);
  };


  const getPokemonbyName = (e) => {
        e.preventDefault();
    e.target[0].value = "";
    console.log("**/*/*/*/*/*/ searchbtn",name)
    
    // requerimiento matias
    //return dispatch(searchPokemon(name));
    return dispatch(searchPokemon(name))


  };



  const getPokemonBymitipo = (e) => {
    e.preventDefault();
e.target[0].value = "";
console.log("**/*/*/*/*/*/ searchbtn",name)

// requerimiento matias
//return dispatch(searchPokemon(name));
return dispatch(filterPokemonBymiType(name))


};





  return (
    <div className={searchBox}>
             
      <form onSubmit={getPokemonBymitipo} name="search">
      {/*<button className={btnSearch}><i className="fas fa-search"></i></button>*/}
        <input
          type="text"
          name="name"
          onChange={handleSearchxxtipo}
          autoComplete="off"
          className={neoinput}
          placeholder="Ingrese un nombre válido"
        />
        
        <button className={buscar} type="submit">Buscar por Tipo</button> 
        
      </form>
    </div>
  );
}

export default SearchBtn;
