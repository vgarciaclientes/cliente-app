const sheetURL = "https://sheetdb.io/api/v1/b521jn1u4z7v0";
const postURL = "https://script.google.com/macros/s/AKfycbxt7bYeVL9SlXJe5SAVnO_0Fwbz-W6OrgkaqepBzZmV7UTi1qC7VKLNVYSiQ2k4OIE8/exec";

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("cliente-form");
    const tbody = document.getElementById("clientes-body");

    // Cargar datos existentes (opcional)
    fetch(sheetURL)
        .then(res => res.json())
        .then(data => {
            data.forEach(cliente => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${cliente.Nombre}</td>
                    <td>${cliente.Correo}</td>
                    <td>${cliente.Teléfono}</td>
                    <td>${cliente.Empresa}</td>
                    <td>${cliente.Estado}</td>
                    <td>${cliente.Notas}</td>
                `;
                tbody.appendChild(row);
            });
        });

    // Enviar nuevo cliente
    form.addEventListener("submit", e => {
        e.preventDefault();

        const nuevoCliente = {
            Nombre: document.getElementById("nombre").value,
            Correo: document.getElementById("correo").value,
            Teléfono: document.getElementById("telefono").value,
            Empresa: document.getElementById("empresa").value,
            Estado: document.getElementById("estado").value,
            Notas: document.getElementById("notas").value
        };

        fetch(postURL, {
            method: "POST",
            body: JSON.stringify(nuevoCliente),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(res => res.text())
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
