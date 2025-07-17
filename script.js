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
                    <td>${cliente.ID || ''}</td>
                    <td>${cliente.Nombre || ''}</td>
                    <td>${cliente.Correo || ''}</td>
                    <td>${cliente.Teléfono || ''}</td>
                    <td>${cliente.Empresa || ''}</td>
                    <td>${cliente.Estado || ''}</td>
                    <td>${cliente.Notas || ''}</td>
                    <td>
                        <button class="btn btn-sm btn-warning me-1" onclick="editarCliente('${cliente.ID}')">Editar</button>
                        <button class="btn btn-sm btn-danger" onclick="eliminarCliente('${cliente.ID}')">Eliminar</button>
                    </td>
                `;
                tbody.appendChild(row);
            });
        })
        .catch(err => {
            console.error("Error al cargar datos:", err);
        });

    // Generar ID único basado en timestamp
    const generarID = () => {
        return 'ID-' + Date.now();
    };

    // Enviar nuevo cliente o actualizar existente
    form.addEventListener("submit", e => {
        e.preventDefault();

        const idExistente = document.getElementById("cliente-id").value;

        const clienteData = {
            ID: idExistente || generarID(),
            Nombre: document.getElementById("nombre").value,
            Correo: document.getElementById("correo").value,
            Teléfono: document.getElementById("telefono").value,
            Empresa: document.getElementById("empresa").value,
            Estado: document.getElementById("estado").value,
            Notas: document.getElementById("notas").value
        };

        const method = idExistente ? "PUT" : "POST";
        const url = idExistente ? `${postURL}/ID/${idExistente}` : postURL;

        fetch(url, {
            method: method,
            body: JSON.stringify({ data: clienteData }),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(res => res.json())
        .then(response => {
            alert(idExistente ? "Cliente actualizado." : "Cliente agregado.");
            form.reset();
            location.reload();
        })
        .catch(err => {
            console.error("Error al enviar datos:", err);
            alert("Hubo un error al guardar el cliente.");
        });
    });
});

// Función para editar cliente
function editarCliente(id) {
    fetch(sheetURL)
        .then(res => res.json())
        .then(data => {
            const cliente = data.find(c => c.ID === id);
            if (!cliente) return alert("Cliente no encontrado");

            document.getElementById("cliente-id").value = cliente.ID;
            document.getElementById("nombre").value = cliente.Nombre;
            document.getElementById("correo").value = cliente.Correo;
            document.getElementById("telefono").value = cliente.Teléfono;
            document.getElementById("empresa").value = cliente.Empresa;
            document.getElementById("estado").value = cliente.Estado;
            document.getElementById("notas").value = cliente.Notas;
        });
}

// Función para eliminar cliente
function eliminarCliente(id) {
    if (!confirm("¿Estás seguro de que deseas eliminar este cliente?")) return;

    fetch(`${postURL}/ID/${id}`, {
        method: "DELETE"
    })
    .then(res => res.json())
    .then(response => {
        alert("Cliente eliminado correctamente.");
        location.reload();
    })
    .catch(err => {
        console.error("Error al eliminar cliente:", err);
        alert("Hubo un error al eliminar el cliente.");
    });
}
