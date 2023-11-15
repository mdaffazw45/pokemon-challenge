import express from 'express';
import pokemonRouter from './router/pokemonRouter.js';
import myPokemonRouter from './router/myPokemonRouter.js';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/pokemon', pokemonRouter);
app.use('/mypokemon', myPokemonRouter);

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
