document.getElementById("buscarClienteForm").addEventListener("submit", async function (e) {
    e.preventDefault();
  
    const cedula = document.getElementById("cedula").value;
  
    try {
      const response = await fetch(`http://localhost:8080/clientes/cedula/${cedula}`);
  
      if (!response.ok) {
        document.getElementById("resultado").innerText = "Cliente no encontrado.";
        return;
      }
  
      const cliente = await response.json();
  
      document.getElementById("resultado").innerHTML = `
        <h3>Resultado:</h3>
        <p><strong>Nombre:</strong> ${cliente.primerNombre} ${cliente.segundoNombre || ""}</p>
        <p><strong>Apellidos:</strong> ${cliente.primerApellido} ${cliente.segundoApellido || ""}</p>
        <p><strong>Cédula:</strong> ${cliente.cedula}</p>
        <p><strong>Teléfono:</strong> ${cliente.telefonoUno}</p>
        <p><strong>Email:</strong> ${cliente.email || "Sin correo"}</p>
      `;
    } catch (error) {
      console.error("Error al buscar cliente:", error);
      document.getElementById("resultado").innerText = "Error al buscar el cliente.";
    }
  });
  