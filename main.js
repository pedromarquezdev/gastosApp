const formBtn = document.querySelector(".form_btn");
const deleteIngBtn = document.querySelector(".span-li_Ing");
const deleteGasBtn = document.querySelector(".span-li_Gas");
const listasDeIngGas = document.querySelector(".listas");
const valorDelPresupuesto = document.querySelector(".presupuesto_valor");
const ingresosValor = document.querySelector(".valor-ingresos");
const gastosValor = document.querySelector(".valor-gastos");
const deleteAllBtn = document.querySelector(".delete-all");

let ingresos = JSON.parse(localStorage.getItem("ingresos")) || [];
let gastos = JSON.parse(localStorage.getItem("gastos")) || [];

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

  guardarIngYGas();
  renderPresupuesto();

  form.reset();
};

const sumarELtOTAL = (array) => {
  let total = 0;
  array.forEach((item) => {
    total += parseInt(item.precio);
  });

  // console.log("El total es:", total);
  return total;
};

const setIngresosLocalStorage = () =>
  localStorage.setItem("ingresos", JSON.stringify(ingresos));

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

const diferenciaEntreNum = (a, b) => {
  return a - b;
};

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
  /*
  console.log(
    "El presupuesto es de:",
    diferenciaEntreNum(sumarELtOTAL(ingresos), sumarELtOTAL(gastos))
  );
  */
};

const deleteAll = (e) => {
  e.preventDefault();
  if(ingresos.length === 0 && gastos.length === 0){
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
