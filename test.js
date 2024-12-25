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
    roleta.innerHTML = ''; // Limpa a roleta antes de adicionar novos segmentos
    const angleStep = 360 / apps.length;
    const fontSize = Math.max(12, 360 / apps.length); // Tamanho mínimo da fonte

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
        appElement.innerText = app.name;
        appElement.style.fontSize = `${fontSize}px`;
        appElement.style.transform = `rotate(${angleStep / 2}deg)`; // Rotaciona o texto para centralizar

        roleta.appendChild(wheelSegment);
        wheelSegment.appendChild(appElement);
        console.log(`App adicionado: ${app.name}`);
    });
}

function spinRoleta() {
    const num = Math.floor(Math.random() * games.length);
    const roleta = document.getElementById('roleta');
    roleta.style.transition = 'transform 4s ease-out';
    roleta.style.transform = `rotate(${1440 + 45 * num}deg)`;
    
    setTimeout(() => {
        const selectedGame = games[num];
        exibirPopup(selectedGame.name);
    }, 4000); // Sincroniza com a duração da rotação
}

function exibirPopup(nomeDoJogo) {
    const popup = document.getElementById('popup');
    const overlay = document.getElementById('popup-overlay');
    const popupText = document.getElementById('popup-text');
    const popupClose = document.getElementById('popup-close');

    popupText.innerText = nomeDoJogo;
    popup.style.display = 'block';
    overlay.style.display = 'block';

    popupClose.addEventListener('click', () => {
        popup.style.display = 'none';
        overlay.style.display = 'none';
    });
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