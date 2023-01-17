//Componente que renderizara todos los botones de filtrado y busqueda
import SearchBtn from "../buttons/SearchBtn";
import Sort from "../buttons/Sort";
import Sortb from "../buttons/Sortb";
import { useSelector } from "react-redux";
import Filters from "../buttons/Filters";
import CreateBtn from "../buttons/CreateBtn";
import styles from "../../styles/NavHome.module.css";
import Swal from "sweetalert2";
function NavHome({
  handleSortAlph,
  handleSortStrength,
  handleTypeFilter,
  handleSourceFilter,
}) {
  const types = useSelector((state) => state.types);

  const sourceOptions = [
    { name: "api", id: 1 },
    { name: "created", id: 2 },
  ];

  return (
    <>
      <ul className={styles.navhome_ul}>
        <li>
          <SearchBtn />
        </li>
        <li>
          <Sort
            handleSort={handleSortAlph}
            sortDescription="Orden por nombre"
          />
        </li>
        <li>
          <Sortb
            handleSort={handleSortStrength}
            sortDescription="Orden por fuerza"
          />
        </li>
        <li>
          <Filters
            items={types}
            defaultDescription="Filtrar por tipo PK"
            handleFilter={handleTypeFilter}
          />
        </li>
        <li>
          <Filters
            items={sourceOptions}
            defaultDescription="API / BD"
            handleFilter={handleSourceFilter}
          />
        </li>
        <li>
          <CreateBtn />
        </li>
        <li>
          
        </li>
      </ul>
    </>
  );
}

export default NavHome;
