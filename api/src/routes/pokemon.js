const { Router } = require("express");
const axios = require("axios");
const { Pokemon, Type } = require("../db");
const { normalizeDataApi, normalizeDataDb } = require("./utils");

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get("/pokemons", async (req, res) => {
  const { name } = req.query;
  try {
    /////////////Llamada a DB por name/////////////////
    if (name) {
      console.log("************************   pokemon.js ---->>> desde busqueda", name);
      const nameLower = name.trim().toLowerCase(); //Lo busco en DB con minuscula ya que así lo almacené
      const pokemonDbByName = await Pokemon.findOne({
        where: { name: nameLower },
        include: Type,
      });
      if (pokemonDbByName !== null)
        return res.json(normalizeDataDb(pokemonDbByName));
      else {
        ////////////////Consulta a la API por name/////////////////
        
        console.log("******** no lo encontro con findone, lobusca en api *********")
        const dataApiResponse = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${nameLower}`
        );
        const dataApiByName = normalizeDataApi(dataApiResponse);

        return res.json(dataApiByName);
      }
    }
    ////////7///////Llamada a la API/////////////////////7
    const dataApi = await Promise.all([
      axios.get("https://pokeapi.co/api/v2/pokemon"),
      axios.get("https://pokeapi.co/api/v2/pokemon/?offset=20&limit=20"),
    ]);
    // console.log(datApi) ---> [{ data: {results:[] } }, { data:{results:[] } }]
    console.log("********* llamada general a la API *************")
    dataArr1 = dataApi[0].data.results;
    dataArr2 = dataApi[1].data.results;
    console.log("resultado--->>", dataArr1, dataArr2);
   
   
    const pokemonsDataApi = dataArr1.concat(dataArr2); //[{name, url}, {name2, url2}, ...]
    console.log("******************* UNIO LAS DOS MATRICES de las dos consultas ************")
    const pokemonsDataApiPromises = pokemonsDataApi?.map((pokemon) => {
      return axios
        .get(pokemon.url)
        .then((response) => {
          // const { name, types, urlImg, createInDb } = normalizeDataApi(response);
          return { ...normalizeDataApi(response) };
        })
        .catch((e) => console.log(e));
    });

    const pokemonsApi = await Promise.all(pokemonsDataApiPromises);

    ////////7///////Consulta a la base de datos/////////////////////7
    console.log("***************** SE TRAE TODO DE LA DB CON findall()")
    const dataDB = await Pokemon.findAll({
      include: {
        model: Type,
        attributes: ["name"],
        through: { attributes: [] },
      },
      // attributes: ["name", "urlImg", "createInDb"],
    });
    //Normalizamos la info para que llegue igual que la API
    const dataDBNormalized = dataDB?.map((pokemon) => {
      return normalizeDataDb(pokemon);
    });

    //Concatenamos los pokemones de DB y API
    console.log("****************** une lo de la api con lo de la bd normalizada ****")
    const totalPokemons = pokemonsApi.concat(dataDBNormalized);
    return res.json(totalPokemons);
  } catch (error) {
    res.status(404).json({ msg: "Pokemons  not found. " + error });
  }
});

//{type, urlimg, id, height, weitght, stats:{hp, attack...}}
router.get("/pokemon/:idPokemon", async (req, res) => {
  console.log("********************** ruta d ebusqueda por id.pok ******")
  const { idPokemon } = req.params;

  try {
    const pokemonDB = await Pokemon.findByPk(idPokemon, { include: Type });
    if (pokemonDB === null)
      return res.status(404).json("Error, id not found: " + error);
    return res.json(normalizeDataDb(pokemonDB));
  } catch {
    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${idPokemon}`
      );
      const dataApiResponse = normalizeDataApi(response);
      console.log("*********** ENGANCHO EN FORMA CORRECTA EL ID:",{idPokemon})
      return res.json(dataApiResponse);
    } catch (error) {
      res.status(404).json("Error, no encuentra el id: " + error);
    }
  }
});

router.post("/pokemons", async (req, res) => {
 console.log("******************** RUTA POST DE GRABACION ******************")
  try {
    let { name, types, urlImg, height, weight, hp, attack, defense, speed } =
      req.body;

    if (!name) return res.status(404).send("problemas con los parametros");
    if (name) {
      if (!hp) hp = 1;
      if (!attack) attack = 1;
      if (!defense) defense = 1;
      if (!speed) speed = 1;
      if (!height) height = 1;
      if (!weight) weight = 1;
      if (!types.length) types = ["unknown"];

      const nameLower = name.trim().toLowerCase(); //Lo almaceno con minuscula en Db, así estan en la API
      const typesLower = types?.map((type) => type.toLowerCase());
      const pokemonCreated = await Pokemon.create({
        name: nameLower,
        urlImg,
        height,
        weight,
        hp,
        attack,
        defense,
        speed,
      });

      const typeDbArr = await Type.findAll({
        where: { name: typesLower },
      });

      const typeDbId = typeDbArr?.map((p) => p.dataValues.id);

      await pokemonCreated.addType(typeDbId);
      console.log("************** ANTES DE GRABAR SE FIJA SI EXIRTE EL NAME " , nameLower , " EN LA BD" )
      const newPokemon = await Pokemon.findOne({
        where: { name: nameLower },
        include: Type,
      });
      const newPokemonNormalized = normalizeDataDb(newPokemon);
      return res.json(newPokemonNormalized);
    }
  } catch (e) {
    return res.status(404).json("Error ---> " + e);
  }
});

router.delete("/delete/:id", async (req, res) => {
  
  
  try {
    const { id } = req.params;
    console.log("***************** BORRANDO EL POKEMON --->>>  ", {id} )
    const pokemon = await Pokemon.findByPk(id);
    if (pokemon !== null) {
      await pokemon.destroy();
      res.json("Pokemon deleted correctly");
    }
  } catch (e) {
    return res.status(404).json("Error ---> " + e);
  }
});

module.exports = router;
