//Función para validar formulario. Agrega msj de errores al objeto errors
export default function validateForm(dataForm) {
  let errors = {};
  if (!dataForm.name || dataForm.name.length > 20)
    errors.name = "Es necesario agregar un nombre de hasta 20 caracteres";
  if (dataForm.hp < 0 || dataForm.hp > 200)
    errors.hp = "Las unidades de poder deben ser entre 0 - 200";
  if (dataForm.attack < 0 || dataForm.attack > 200)
    errors.attack = "Las unidades de ataque deben ser entre 0 - 200";
  if (dataForm.defense < 0 || dataForm.defense > 200)
    errors.defense = "Las unidades de defensa deben ser entre 0 - 200";
  if (dataForm.speed < 0 || dataForm.speed > 200)
    errors.speed = "La velocidad debe ser entre  0 - 200";
  if (dataForm.height < 0 || dataForm.height > 200)
    errors.height = "La altura debe ser entre 0 - 200";
  if (dataForm.weight < 0 || dataForm.weight > 200)
    errors.weight = "El peso debe ser entre  0 - 200";
  if (!urlValidation(dataForm.urlImg) && dataForm.urlImg !== "") {
    errors.urlImg = "Dirección URL inválida / no devuelve un archivo de imagen";
  }
  return errors;
}

const urlValidation = (URL) => {
  
  /* documentación en https://stackoverflow.com/questions/3809401/what-is-a-good-regular-expression-to-match-a-url */
  const regex = new RegExp(/(https?:\/\/.*\.(?:png|jpg|gif))/);
  return regex.test(URL);
};


