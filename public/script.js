const API_URL = "http://localhost:3000/locais";

document.addEventListener("DOMContentLoaded", () => {
    carregarLocais();
});

document.getElementById("form-local").addEventListener("submit", function (e) {
    e.preventDefault();

    const id = document.getElementById("id").value;
    const titulo = document.getElementById("titulo").value;
    const descricao = document.getElementById("descricao").value;
    const foto = document.getElementById("foto").value;

    const local = { titulo, descricao, foto };

    if (id) {
        atualizarLocal(id, local);
    } else {
        adicionarLocal(local);
    }

    this.reset();
    document.getElementById("id").value = "";
});

function carregarLocais() {
    fetch(API_URL)
        .then(res => res.json())
        .then(locais => {
            const container = document.getElementById("locais-container");
            container.innerHTML = "";
            locais.forEach(local => {
                const div = document.createElement("div");
                div.classList.add("local");
                div.innerHTML = `
                    <img src="${local.foto}" alt="${local.titulo}">
                    <h3>${local.titulo}</h3>
                    <p>${local.descricao}</p>
                    <button onclick="editarLocal('${local.id}', '${local.titulo}', '${local.descricao}', '${local.foto}')">✏️ Editar</button>
                    <button onclick="removerLocal('${local.id}')">🗑️ Excluir</button>
                `;
                container.appendChild(div);
            });
        });
}

function adicionarLocal(local) {
    fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(local)
    }).then(() => carregarLocais());
}

function atualizarLocal(id, local) {
    fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        params: { id },
        body: JSON.stringify(local)
    }).then(() => carregarLocais());
}

function editarLocal(id, titulo, descricao, foto) {
    document.getElementById("id").value = id;
    document.getElementById("titulo").value = titulo;
    document.getElementById("descricao").value = descricao;
    document.getElementById("foto").value = foto;
}

function removerLocal(id) {
    if (confirm("Tem certeza que deseja excluir este local?")) {
        fetch(`${API_URL}/${id}`, { method: "DELETE", params: { id } })
            .then(() => carregarLocais());
    }
}
