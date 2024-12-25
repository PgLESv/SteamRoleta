// filepath: /E:/Roleta/server.cjs
require('dotenv').config();

const STEAM_ID = process.env.STEAM_ID;
const FAMILY_ID = process.env.FAMILY_ID;
const ACCESS_TOKEN = process.env.ACCESS_TOKEN;

const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());

const url = `https://api.steampowered.com/IFamilyGroupsService/GetSharedLibraryApps/v1/?access_token=${ACCESS_TOKEN}&family_groupid=${FAMILY_ID}&include_own=true&steamid=${STEAM_ID}`;

app.get('/api/apps', async (req, res) => {
    try {
        const response = await fetch(url);
        const data = await response.json();
        res.json(data.response.apps); // Retorna diretamente o array de apps
    } catch (error) {
        console.error('Erro ao buscar aplicativos:', error);
        res.status(500).json({ error: 'Erro ao buscar aplicativos' });
    }
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});

// const url