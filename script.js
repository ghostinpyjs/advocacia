// Seleção de elementos do DOM
const clientForm = document.getElementById('clientForm');
const clientList = document.getElementById('clientList');

// Função para buscar os clientes no "Banco de Dados" (LocalStorage)
function getClients() {
    const clients = localStorage.getItem('advocacia_clientes');
    return clients ? JSON.parse(clients) : [];
}

// Função para salvar clientes no "Banco de Dados"
function saveClients(clients) {
    localStorage.setItem('advocacia_clientes', JSON.stringify(clients));
}

// Função para renderizar a tabela
function renderTable() {
    const clients = getClients();
    clientList.innerHTML = ''; // Limpa a tabela antes de recriar

    if (clients.length === 0) {
        clientList.innerHTML = '<tr><td colspan="4" style="text-align: center;">Nenhum cliente cadastrado ainda.</td></tr>';
        return;
    }

    clients.forEach((client, index) => {
        const tr = document.createElement('tr');
        
        tr.innerHTML = `
            <td><strong>${client.nome}</strong></td>
            <td>${client.telefone}<br><small>${client.email}</small></td>
            <td><span style="background: #fef08a; padding: 2px 6px; border-radius: 4px; color: #854d0e; font-size: 0.85rem;">${client.area}</span></td>
            <td><button class="btn-delete" onclick="deleteClient(${index})">Deletar</button></td>
        `;
        
        clientList.appendChild(tr);
    });
}

// Escutando o evento de envio do formulário
clientForm.addEventListener('submit', function(e) {
    e.preventDefault(); // Impede a página de recarregar

    // Pegando os valores
    const newClient = {
        nome: document.getElementById('nome').value,
        email: document.getElementById('email').value,
        telefone: document.getElementById('telefone').value,
        area: document.getElementById('area').value,
        descricao: document.getElementById('descricao').value,
        data: new Date().toLocaleDateString('pt-BR')
    };

    // Salvando
    const clients = getClients();
    clients.push(newClient);
    saveClients(clients);

    // Limpando o form e atualizando a tela
    clientForm.reset();
    renderTable();
    
    alert('Caso registrado com sucesso no banco de dados local!');
});

// Função para deletar um cliente
function deleteClient(index) {
    if(confirm('Tem certeza que deseja apagar este registro?')) {
        const clients = getClients();
        clients.splice(index, 1); // Remove o item do array
        saveClients(clients);
        renderTable();
    }
}

// Renderiza a tabela assim que a página carrega
document.addEventListener('DOMContentLoaded', renderTable);
