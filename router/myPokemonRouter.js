import express from 'express';
import {getMyPokemonList , releasePokemon , renamePokemon} from '../controllers/myPokemonController.js';

const router = express.Router();

router.get('/mylist', getMyPokemonList);
router.delete('/release/:id', releasePokemon);
router.put('/rename/:id', renamePokemon);

export default router;
