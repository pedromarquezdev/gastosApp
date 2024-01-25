const ulIngresos = document.querySelector(".ul-ingresos");
const ulGastos = document.querySelector(".ul-gastos");
//evaluamos si el valor ingresado está vacio
const isEMpty = (value) => !value.length;
//evaluamos son el texto ingresado tiene letras mayúsculas, minúsculas, números y letras con tilde.
const isText = (text) => /^[A-Za-z0-9\sáéíóúÁÉÍÓÚñÑ]+$/g.test(text);

//evaluamos si el input ingrsado es un número
const isNumber = (number) => /^[0-9]*$/.test(number);
//función para evaluar el input y arrojar un mensaje en caso de que no se cumpla
//alguna condicion necesaria.
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
//función para borrar el error del input
const clearError = (input) => {
  const formField = input.parentElement;
  formField.classList.remove("error");
  const smallText = formField.querySelector("small");
  smallText.textContent = "";
};

//ingreso de un objeto a una estructura html
const productsToHtmlIngresos = ({ nombre, precio, tipo, id, cantidad }) => {
  return `<li class="li-items_Ing"> 
  <div class="nombreYPrecio"> <p class="nombre-producto"  >${nombre}</p> <p>$${precio} </p>  </div>
  <div class="sumaYRestaBtn" > 
  <div class="suma-y-resta-btns">  
  <img id="boton-restar" src="./assets/boton-menos.png" class="restar-cantidad" item-id="${id}" > 
  <p id="cantidadValor">${cantidad}</p>
  <img id="btn-mas-png" src="./assets/mas.png" class="sumar-cantidad" item-id="${id}" > 
  </div> 
  <img id="btn-eliminar-png" class="span-li_Ing" item-id="${id}"  src="./assets/eliminar.png"   alt=""> 
  </div></li>
    
  `;
};
//ingreso de un objeto a una estructura html
const productsToHtmlGastos = ({ nombre, precio, tipo, id, cantidad }) => {
  return `    <li class="li-items_Gas"> <div class="nombreYPrecio"><p class="nombre-producto" >${nombre}</p>  <p>$${precio} </p></div > 
   <div class="sumaYRestaBtn" > <div class="suma-y-resta-btns"> 
   <img id="boton-restar" src="./assets/boton-menos.png" class="restar-cantidad" item-id="${id}" > 
   <p id="cantidadValor">${cantidad}</p>  
  <img id="btn-mas-png" src="./assets/mas.png" class="sumar-cantidad" item-id="${id}" >
  </div> 
  <img id="btn-eliminar-png" class="span-li_Gas" item-id="${id}"  src="./assets/eliminar.png"  alt="">   </div> </li>
    
  `;
};
//función para renderizar un array dentro de una estructura html.
const renderToHtmlIngresos = (array) => {
  const render = array
    .map((element) => productsToHtmlIngresos(element))
    .join("");
  //console.log(render)
  ulIngresos.innerHTML = render;
};
//función para renderizar un array dentro de una estructura html.
const renderToHtmlGastos = (array) => {
  const render = array.map((element) => productsToHtmlGastos(element)).join("");
  //console.log(render)
  ulGastos.innerHTML = render;
};
//función que suma la cantidad del item de ingresos y el precio del item por cada
//vez que presionamos el botón
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
//función que resta la cantidad del item de ingresos y el precio del item por cada
//vez que presionamos el botón
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
//función que suma la cantidad del item de gastos y el precio del item por cada
//vez que presionamos el botón
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
//función que resta la cantidad del item de gastos y el precio del item por cada
//vez que presionamos el botón
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
