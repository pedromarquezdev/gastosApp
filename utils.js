const ulIngresos = document.querySelector(".ul-ingresos");
const ulGastos = document.querySelector(".ul-gastos");

const isEMpty = (value) => !value.length;

const isText = (text) => /^[A-Za-z0-9\sñÑ]+$/g.test(text);

const isNumber = (number) => /^[0-9]*$/.test(number);

const showError = (input, message) => {
  const formField = input.parentElement;
  //console.log("el parent element es:", formField);
  input.classList.add("error");
  const smallText = formField.querySelector("SMALL");
  smallText.textContent = message;
  setTimeout(() => {
    smallText.textContent = "";
  }, 2000);
};

const clearError = (input) => {
  const formField = input.parentElement;
  formField.classList.remove("error");
  const smallText = formField.querySelector("small");
  smallText.textContent = "";
};

const productsToHtmlIngresos = ({ nombre, precio, tipo, id, cantidad }) => {
  return `<li class="li-items_Ing"> <div class="nombreYPrecio"> <p>${nombre}</p> <p>$${precio} </p>  </div><div class="sumaYRestaBtn" > <div class="suma-y-resta-btns">  <span class="restar-cantidad" item-id="${id}">-</span> <p id="cantidadValor">${cantidad}</p><span class="sumar-cantidad" item-id="${id}">+</span> </div> <span class="span-li_Ing" item-id="${id}" >X</span> </div></li>
    
  `;
};
// ejemplo de como estaban los botones antes con el botón de eliminar
/*
const productsToHtmlIngresos = ({ nombre, precio, tipo, id, cantidad }) => {
  return `<li class="li-items_Ing">${nombre} $${precio} <span class="restar-cantidad" item-id="${id}">-</span> ${cantidad}<span class="sumar-cantidad" item-id="${id}">+</span>  <span class="span-li_Ing" item-id="${id}" >X</span></li>
    
  `;
};  
*/
const productsToHtmlGastos = ({ nombre, precio, tipo, id, cantidad }) => {
  return `<li class="li-items_Gas"> <div class="nombreYPrecio"><p>${nombre}</p>  <p>$${precio} </p></div >  <div class="sumaYRestaBtn" > <div class="suma-y-resta-btns">  <span class="restar-cantidad" item-id="${id}">-</span> <p id="cantidadValor">${cantidad}</p>  <span class="sumar-cantidad" item-id="${id}">+</span></div><span class="span-li_Gas" item-id="${id}" >X</span>  </div> </li>
    
  `;
};

const renderToHtmlIngresos = (array) => {
  const render = array
    .map((element) => productsToHtmlIngresos(element))
    .join("");
  //console.log(render)
  ulIngresos.innerHTML = render;
};
const renderToHtmlGastos = (array) => {
  const render = array.map((element) => productsToHtmlGastos(element)).join("");
  //console.log(render)
  ulGastos.innerHTML = render;
};

const sumaCantidad = (e) => {
  if (e.target.classList.contains("sumar-cantidad")) {
    const itemId = parseInt(e.target.getAttribute("item-id"));
    for (item of ingresos) {
      if (item.id === itemId) {
        const cantidadAnterior = item.cantidad;
        item.cantidad += 1;
        const nuevoPrecio = (item.precio / cantidadAnterior) * item.cantidad;

        item.precio = nuevoPrecio;
        setIngresosLocalStorage();
        renderToHtmlIngresos(ingresos);
        renderPresupuesto();
        //console.log("El nuevo precio es:", item.precio);
      }
    }
    renderToHtmlIngresos(ingresos);
    renderPresupuesto();
  }
};

const restarCantidad = (e) => {
  if (e.target.classList.contains("restar-cantidad")) {
    const itemId = parseInt(e.target.getAttribute("item-id"));
    //console.log("restando el:", itemId);

    for (item of ingresos) {
      if (item.id === itemId) {
        if (item.cantidad === 1) {
          if (confirm("¿Deseas eliminar el producto?")) {
            console.log("eliminando");
            ingresos = ingresos.filter((item) => item.id !== itemId);
            setIngresosLocalStorage();
            renderToHtmlIngresos(ingresos);
            renderPresupuesto();
          }
        } else {
          const cantidadAnterior = item.cantidad;
          item.cantidad -= 1;
          const nuevoPrecio = (item.precio / cantidadAnterior) * item.cantidad;
          item.precio = nuevoPrecio;
          setIngresosLocalStorage();
          renderToHtmlIngresos(ingresos);
          renderPresupuesto();
        }
      }
      renderToHtmlIngresos(ingresos);
      renderPresupuesto();
    }

    //renderToHtmlIngresos(ingresos);
    //renderPresupuesto();
  }
};

const sumaCantidadGastos = (e) => {
  if (e.target.classList.contains("sumar-cantidad")) {
    const itemId = parseInt(e.target.getAttribute("item-id"));
    for (item of gastos) {
      if (item.id === itemId) {
        const cantidadAnterior = item.cantidad;
        item.cantidad += 1;
        const nuevoPrecio = (item.precio / cantidadAnterior) * item.cantidad;
        item.precio = nuevoPrecio;
        setGastosLocalStorage();
      }
    }
    renderToHtmlGastos(gastos);
    renderPresupuesto();
  }
};

const restarCantidadGastos = (e) => {
  if (e.target.classList.contains("restar-cantidad")) {
    const itemId = parseInt(e.target.getAttribute("item-id"));
    //console.log("restando el:", itemId);

    for (item of gastos) {
      if (item.id === itemId) {
        if (item.cantidad === 1) {
          if (confirm("¿Deseas eliminar el producto?")) {
            console.log("eliminando");
            gastos = gastos.filter((item) => item.id !== itemId);
            setGastosLocalStorage();
            renderToHtmlGastos(gastos);
            renderPresupuesto();
          }
        } else {
          const cantidadAnterior = item.cantidad;
          item.cantidad -= 1;
          const nuevoPrecio = (item.precio / cantidadAnterior) * item.cantidad;
          item.precio = nuevoPrecio;
          setGastosLocalStorage();
          renderToHtmlGastos(gastos);
          renderPresupuesto();
        }
      }
    }
    renderToHtmlGastos(gastos);
    renderPresupuesto();
  }
};
