const form = document.getElementById("clienteForm");

// 1. Obtener datos del formulario
function getFormData() {
  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());
  data.estado = data.estado === "true"; // convertir string a boolean
  return data;
}

// 2. Llenar el formulario al buscar
function llenarFormulario(data) {
    // Datos del cliente
    form.primerNombre.value = data.primerNombre || "";
    form.segundoNombre.value = data.segundoNombre || "";
    form.primerApellido.value = data.primerApellido || "";
    form.segundoApellido.value = data.segundoApellido || "";
    form.cedula.value = data.cedula || "";
    form.telefonoUno.value = data.telefonoUno || "";
    form.telefonoDos.value = data.telefonoDos || "";
    form.email.value = data.email || "";
    //----------------DIRECCION
    form.direccion.value = data.direccion || "";
      form.departamento.value = data.departamento || "";
      form.ciudad.value = data.ciudad || "";
      form.barrio.value = data.barrio || "";
      form.descripcion.value = data.descripcion || "";
      form.estado.value = data.estado ? "true" : "false";
    
  }
  

// 3. Limpiar el formulario
function limpiarFormulario() {
  form.reset();
}

// 4. Buscar cliente por cédula
document.getElementById("btnBuscarCliente").addEventListener("click", async () => {
  const cedula = form.cedulaBuscar.value;
  if (!cedula) return alert("Ingresa una cédula");

  try {
    const response = await fetch(`http://localhost:8080/clientes/cedula/${cedula}`);
    if (!response.ok) return alert("Cliente no encontrado");

    const cliente = await response.json();
    llenarFormulario(cliente);
    // alert("Cliente encontrado");
  } catch (err) {
    console.error(err);
    alert("Error al buscar cliente");
  }
});

// 5. Agregar cliente + dirección
form.addEventListener("submit", async function (e) {
  e.preventDefault();
  const data = getFormData();

  try {
    const res = await fetch("http://localhost:8080/clientes/cliente-direccion", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    if (res.ok) {
    //   alert("Cliente agregado ✅");
      limpiarFormulario();
    } else {
      const errorText = await res.text();
      console.error(errorText);
      alert("Error al agregar cliente ❌");
    }
  } catch (err) {
    console.error(err);
    alert("Error de red");
  }
});

// 6. Actualizar cliente + dirección
document.getElementById("btnActualizar").addEventListener("click", async () => {
  const data = getFormData();
  const cedula = data.cedula;

  try {
    const res = await fetch(`http://localhost:8080/clientes/cliente-direccion/${cedula}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    if (res.ok) {
      alert("Cliente actualizado ✅");
      limpiarFormulario();
    } else {
      const errorText = await res.text();
      console.error(errorText);
      alert("Error al actualizar cliente ❌");
    }
  } catch (err) {
    console.error(err);
    alert("Error de red");
  }
});

// 7. Botón de limpiar
document.getElementById("btnLimpiar").addEventListener("click", limpiarFormulario);
