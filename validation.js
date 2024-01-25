const inputProducto = document.querySelector(".input_producto");
const inputPrecio = document.querySelector(".input_precio");
const inputsRadio = document.querySelectorAll("input[name='ingreso_egreso']");
const form = document.querySelector(".form_");
const spanDeTexto = document.querySelector(".spanDeTexto");
const radioSmall = document.querySelector(".small-radio");
const fatherRadio = document.querySelector("#radios_btn")

//función para evaluar si el input es válido o no
const checkTextInput = () => {
  let isvalid = false;

  const inputValue = inputProducto.value.trim();

  if (isEMpty(inputValue)) {
    showError(inputProducto, "-Debes escribir el producto.");
  } else if (!isText(inputValue)) {
    showError(inputProducto, "-Debes escribir sólo texto.");
  } else {
    clearError(inputProducto);
    isvalid = true;
  }

  return isvalid;
};
//función para evaluar si el input es válido o no
const checkPrice = () => {
  let isValid = false;

  const inputPrice = inputPrecio.value.trim();

  if (isEMpty(inputPrice)) {
    showError(inputPrecio, "-Debes escribir el precio.");
  } else if (!Number(inputPrice)) {
    showError(inputPrecio, "-Debes completar sólo con números.");
  } else {
    clearError(inputPrecio);
    isValid = true;
  }

  return isValid;
};
//función para evaluar si el input es válido o no
const validarInputRadio = () => {
  let isValid = false;
  if (conteinerRadio() === undefined) {
    radioSmall.textContent = "Debes seleccionar una opción.";
    fatherRadio.classList.add("error")
    setTimeout(() => {
      radioSmall.textContent = "";
      fatherRadio.classList.remove("error")
    }, 2000);
  } else {
    isValid = true;
  }

  return isValid;
};

//función que retorna el valor del input 0 o 1
const conteinerRadio = () => {
  let inputValue;

  if (inputsRadio[0].checked) {
    inputValue = inputsRadio[0].value;
    //console.log(inputValue);
  } else if (inputsRadio[1].checked) {
    inputValue = inputsRadio[1].value;
    // console.log(inputValue);
  } else {
    console.log("No se ingreso nada");
    
  }
  return inputValue;
};
