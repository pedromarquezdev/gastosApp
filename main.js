const formBtn = document.querySelector(".form_btn");
const deleteIngBtn = document.querySelector(".span-li_Ing");
const deleteGasBtn = document.querySelector(".span-li_Gas");
const listasDeIngGas = document.querySelector(".listas");
const valorDelPresupuesto = document.querySelector(".presupuesto_valor");
const ingresosValor = document.querySelector(".valor-ingresos");
const gastosValor = document.querySelector(".valor-gastos");
const deleteAllBtn = document.querySelector(".delete-all");

//array de ingresos
let ingresos = JSON.parse(localStorage.getItem("ingresos")) || [];
//array de gastos
let gastos = JSON.parse(localStorage.getItem("gastos")) || [];

//función para añadir un item.
const addFunction = (e) => {
  e.preventDefault();
  const productoValue = inputProducto.value;
  const precioValue = parseInt(inputPrecio.value);
  const radioValue = conteinerRadio();
  //console.log("Resultado del radio:", radioValue);

  if (!checkTextInput() || !checkPrice() || !validarInputRadio()) {
    return;
  }

  const newObj = {
    nombre: productoValue,
    precio: precioValue,
    tipo: radioValue,
    id: Date.now(),
    cantidad: 1,
  };
  //función que evalúa si el item va a un array o al otro
  //dependiendeo de si es de tipo ingreso o gasto
  const guardarIngYGas = () => {
    if (newObj.tipo === "Ingreso") {
      ingresos = [...ingresos, newObj];
      setIngresosLocalStorage();
      renderToHtmlIngresos(ingresos);
    } else if (radioValue === "Gasto") {
      gastos = [...gastos, newObj];
      setGastosLocalStorage();
      renderToHtmlGastos(gastos);
    }
    return;
  };

  //guardado, renderizado y reseteo del form
  guardarIngYGas();
  renderPresupuesto();
  form.reset();
};

//función que permite sumar el total de los items de un array
const sumarELtOTAL = (array) => {
  let total = 0;
  array.forEach((item) => {
    total += parseInt(item.precio);
  });

  // console.log("El total es:", total);
  return total;
};
//función para guardar los item en en LS 
const setIngresosLocalStorage = () =>
  localStorage.setItem("ingresos", JSON.stringify(ingresos));
//función para guardar los item en en LS 
const setGastosLocalStorage = () =>
  localStorage.setItem("gastos", JSON.stringify(gastos));

// función para agregarle el boton de eliminar el item por completo
const deleteIng = (e) => {
  if (e.target.classList.contains("span-li_Ing")) {
    //console.log(e.target.classList)
    if (confirm("¿Deseas eliminar este item?")) {
      //console.log("borrando un ingreso");
      const deletedId = parseInt(e.target.getAttribute("item-id"));
      //console.log(deletedId);
      ingresos = ingresos.filter((item) => item.id !== deletedId);
      setIngresosLocalStorage();
      renderToHtmlIngresos(ingresos);
      renderPresupuesto();
    }
  } else if (e.target.classList.contains("span-li_Gas")) {
    if (confirm("¿Deseas eliminar este item?")) {
      //console.log("borrando un gasto");
      const deletedIdGas = parseInt(e.target.getAttribute("item-id"));
      //console.log(deletedIdGas);
      gastos = gastos.filter((item) => item.id !== deletedIdGas);
      setGastosLocalStorage();
      renderToHtmlGastos(gastos);
      renderPresupuesto();
    }
  }

  return;
};
//función para obtener la diferencia entre un valor y otro
const diferenciaEntreNum = (a, b) => {
  return a - b;
};

//función para renderizar el presupuesto
const renderPresupuesto = () => {
  let valorAcPres = diferenciaEntreNum(
    sumarELtOTAL(ingresos),
    sumarELtOTAL(gastos)
  );
  let valorTotalIngresos = sumarELtOTAL(ingresos);
  let valorTotalGastos = sumarELtOTAL(gastos);

  valorDelPresupuesto.textContent = `$${valorAcPres}`;
  ingresosValor.textContent = `Ingresos totales: $${valorTotalIngresos}`;
  gastosValor.textContent = `Gastos totales: $${valorTotalGastos}`;
};
//función para borrar todos los items
const deleteAll = (e) => {
  e.preventDefault();
  if (ingresos.length === 0 && gastos.length === 0) {
    return;
  }
  if (confirm("¿Deseas borrar todo?")) {
    ingresos = [];
    gastos = [];
    setGastosLocalStorage();
    setIngresosLocalStorage();

    renderPresupuesto();
  }
  renderToHtmlIngresos(ingresos);
  renderToHtmlGastos(gastos);
};

function init() {
  renderPresupuesto();
  renderToHtmlIngresos(ingresos);
  renderToHtmlGastos(gastos);
  formBtn.addEventListener("click", addFunction);
  listasDeIngGas.addEventListener("click", deleteIng);
  listasDeIngGas.addEventListener("click", sumaCantidad);
  listasDeIngGas.addEventListener("click", restarCantidad);
  listasDeIngGas.addEventListener("click", sumaCantidadGastos);
  listasDeIngGas.addEventListener("click", restarCantidadGastos);
  deleteAllBtn.addEventListener("click", deleteAll);
}

init();
