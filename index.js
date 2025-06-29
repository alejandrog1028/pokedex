const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.get('/:name/type', async (req, res) => {
  const name = req.params.name.toLowerCase();
  try {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
    const types = response.data.types.map(t => t.type.name);
    res.send(`
      <h1>${name.toUpperCase()} Types</h1>
      <p>${types.join(', ')}</p>
    `);
  } catch (error) {
    res.status(404).send('<h1>Pokémon not found</h1>');
  }
});

app.get('/:name', async (req, res) => {
  const name = req.params.name.toLowerCase();
  try {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
    const image = response.data.sprites.front_default;
    res.send(`
      <h1>${name.toUpperCase()}</h1>
      <img src="${image}" alt="${name}" />
    `);
  } catch (error) {
    res.status(404).send('<h1>Pokémon not found</h1>');
  }
});

app.listen(PORT, () => {
  console.log(`Pokédex server running on http://localhost:${PORT}`);
});