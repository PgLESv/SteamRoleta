// import fetch from 'node-fetch'; // Não é necessário importar fetch no navegador

const url = 'http://localhost:3000/api/apps';
var games;

async function fetchApps() {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            console.error(`Erro na resposta da fetch: ${response.status} ${response.statusText}`);
            return [];
        }
        const data = await response.json();
        if (Array.isArray(data)) {
            return data;
        } else if (data.error) {
            console.error('Erro da API:', data.error);
            return [];
        } else {
            console.error('Estrutura de dados inesperada:', data);
            return [];
        }
    } catch (error) {
        console.error('Erro ao buscar aplicativos:', error);
        return [];
    }
}

function createRoleta(apps) {
    const roleta = document.getElementById('roleta');
    const angleStep = 360 / apps.length;

    apps.forEach((app, index) => {
        if (!app || !app.name) {
            console.warn(`App na posição ${index} está faltando a propriedade 'name'.`);
            return;
        }
        const wheelSegment = document.createElement('div');
        wheelSegment.className = 'segmento-roleta';
        wheelSegment.style.transform = `rotate(${index * angleStep}deg)`;
        const appElement = document.createElement('div');
        appElement.className = 'app';
        // appElement.style.transform = `rotate(${index * angleStep}deg)`;
        appElement.innerText = app.name;
        roleta.appendChild(wheelSegment);
        wheelSegment.appendChild(appElement);
        console.log(`App adicionado: ${app.name}`);
    });
}

function spinRoleta() {
    const num = Math.floor(Math.random() * games.length) + 1;
    const roleta = document.getElementById('roleta');
    // const randomAngle = Math.floor(Math.random() * 360) + (360 * 5); // Gira pelo menos 5 voltas
    roleta.style.transition = 'transform 4s ease-out'
    roleta.style.transform = `rotate(${1440 + 45 * (num - 1)}deg)`;
    setTimeout(() => {
        alert(`O jogo é: ${games[num].name}`)
        location.reload();
    }, 1500)
}

document.getElementById('botao').addEventListener('click', spinRoleta);

fetchApps().then(apps => {
    games = apps;
    if (apps.length > 0) {
        createRoleta(apps);
    } else {
        console.log('Nenhum aplicativo encontrado.');
    }
});