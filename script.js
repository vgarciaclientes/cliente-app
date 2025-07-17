const sheetURL = "https://opensheet.elk.sh/1qllik4uYpXaWtRo4wEj00hY-UromJrNozlwMX4cTreg/Datos_Clientes";
const postURL = "https://sheetdb.io/api/v1/b521jn1u4z7v0";

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("cliente-form");
    const tbody = document.getElementById("clientes-body");

    // Cargar datos existentes
    fetch(sheetURL)
        .then(res => res.json())
        .then(data => {
            data.forEach(cliente => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${cliente.NOMBRE}</td>
                    <td>${cliente.CORREO}</td>
                    <td>${cliente.TELÉFONO}</td>
                    <td>${cliente.EMPRESA}</td>
                    <td>${cliente.ESTADO}</td>
                    <td>${cliente.NOTAS}</td>
                `;
                tbody.appendChild(row);
            });
        });

    // Enviar nuevo cliente
    form.addEventListener("submit", e => {
        e.preventDefault();

        console.log("nombre:", document.getElementById("nombre"));
        console.log("correo:", document.getElementById("correo"));
        console.log("telefono:", document.getElementById("telefono"));
        console.log("empresa:", document.getElementById("empresa"));
        console.log("estado:", document.getElementById("estado"));
        console.log("notas:", document.getElementById("notas"));

        const nuevoCliente = {
            data: {
                Nombre: document.getElementById("nombre").value,
                Correo: document.getElementById("correo").value,
                Teléfono: document.getElementById("telefono").value,
                Empresa: document.getElementById("empresa").value,
                Estado: document.getElementById("estado").value,
                Notas: document.getElementById("notas").value
            }
        };

        fetch(postURL, {
            method: "POST",
            body: JSON.stringify(nuevoCliente),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(res => res.json())
        .then(response => {
            alert("Cliente agregado correctamente.");
            form.reset();
            location.reload(); // Recargar para mostrar el nuevo cliente
        })
        .catch(err => {
            console.error("Error al enviar datos:", err);
            alert("Hubo un error al agregar el cliente.");
        });
    });
});

