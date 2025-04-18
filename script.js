document.getElementById("agregar-cliente").addEventListener("click", async function () {

    // Obtener formulario cliente
    const formCliente = new FormData(document.getElementById("clienteForm"));
    const clienteData = Object.fromEntries(formCliente.entries());

    // Obtener formulario dirección
    const formDireccion = new FormData(document.getElementById("direccionForm"));
    const direccionData = Object.fromEntries(formDireccion.entries());

    // Unir datos
    const data = {
        ...clienteData,
        ...direccionData,
        estado: true
    };
    //ver el json
    const jsonData = JSON.stringify(data);
    console.log("Datos que se envían:", jsonData);

    // Enviar al backend
    const response = await fetch("http://localhost:8080/clientes/cliente-direccion", {
        method: "POST",
        headers: {
            "Content-Type": "application/json" // aquí va con C mayúscula
        },
        body: JSON.stringify(data)
    });

    if (response.ok) {
        alert("Cliente creado correctamente");
        clienteForm.reset();
      direccionForm.reset();
    } else {
        alert("Error al crear cliente");
    }

});
