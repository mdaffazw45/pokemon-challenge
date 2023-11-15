import express from 'express';
import {getPokemonDetail , getPokemonList , catchPokemon} from '../controllers/pokemonController.js';

const router = express.Router();

router.get('/list', getPokemonList);
router.get('/detail/:name', getPokemonDetail);
router.post('/catch/:name', catchPokemon);

export default router;