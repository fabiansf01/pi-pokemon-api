import { useEffect, useState } from "react";
import NavHome from "./NavHome";
import PokemonsContainer from "./PokemonsContainer";
import Refresh from "../buttons/Refresh";
import { useDispatch, useSelector } from "react-redux";
import {
  filterPokemonByType,
  filterPokemonCreated,
  getPokemons,
  getTypes,
  setLoaderTrue,
  sortPokemonsAlphabetically,
  sortPokemonsByStrength,
} from "../../actions/index";
import Pagination, { objIndexPagination } from "../Pagination";
import spinner from "../../assets/200x300_spinner_load.gif";
import {
  homeContainer,
  spinnerStyle,
  refresh_span,
} from "../../styles/Home.module.css";
import Footer from "../Presentadores/Footer";

function Home() {
  //Hooks para manejar el estado local y el renderizado de mi componente
  //eslint-disable-next-line
  const [order, setOrder] = useState(""); // Hook para manejar el ordenamiento. Necesario para que se modifique el estado del componente y así re-renderice
  const [currentPage, setCurrentPage] = useState(1); // Hook para manejar el paginado
  const spinnerLoader = useSelector((state) => state.spinnerLoader);

  const pokemons = useSelector((state) => state.pokemons);
  const dispatch = useDispatch();
  const quantityXPage = 12; //Cantidad pokemons por página

  //Llamado a la API para obtener types y pokemons
  useEffect(() => {
    dispatch(setLoaderTrue());
    dispatch(getTypes());
    dispatch(getPokemons());
  }, [dispatch]);

  //Funciones de ordenamientos
  const handleSortAlph = (type) => {
    dispatch(sortPokemonsAlphabetically(type));
    setOrder(type);
    setCurrentPage(1);
  };
  const handleSortStrength = (type) => {
    dispatch(sortPokemonsByStrength(type));
    setOrder(type);
    setCurrentPage(1);
  };

  //Funciones de filtrado
  const handleTypeFilter = (type) => {
    dispatch(filterPokemonByType(type));
    setOrder(type);
    setCurrentPage(1);
  };
  const handleSourceFilter = (isCreated) => {
    dispatch(filterPokemonCreated(isCreated));
    setOrder(isCreated);
    setCurrentPage(1);
  };

  //Paginado
  const handlePagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const { lastItemIndex, firstItemIndex } = objIndexPagination(
    currentPage,
    quantityXPage
  );

  //Función para el boton refresh. Setea la pagina en 1
  const handleRefresh = () => {
    dispatch(setLoaderTrue());
    dispatch(getPokemons());
    setCurrentPage(1);
  };

  return (
    <div className={homeContainer}>
      <div>
        <NavHome
          handleSortAlph={handleSortAlph}
          handleSortStrength={handleSortStrength}
          handleTypeFilter={handleTypeFilter}
          handleSourceFilter={handleSourceFilter}
        />
      </div>

      <Refresh handleRefresh={handleRefresh} />
      <span className={refresh_span}></span>
      <>
        {!spinnerLoader ? (
          <Pagination
            items={pokemons}
            quantityXPage={quantityXPage}
            handlePagination={handlePagination}
            currentPage={currentPage}
          />
        ) : null}
      </>

      {spinnerLoader ? (
        <img src={spinner} alt="actualizando ..." className={spinnerStyle} />
      ) : (
        <div>
          <PokemonsContainer
            lastItemIndex={lastItemIndex}
            firstItemIndex={firstItemIndex}
          />
        </div>
      )}
      <Footer />
    </div>
  );
}

export default Home;
