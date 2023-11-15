// Import necessary modules and dependencies
import axios from 'axios';
import { loadData , storeData } from '../helpers/databaseHelper.js';
import { v4 as uuidv4, validate as uuidValidate } from 'uuid';


// Load data from the database
const pokemonList = loadData();

// Function to get the list of Pokemon from the PokeAPI
export const getPokemonList = async (req, res) => {
  if (pokemonList.length > 0) {
    // If data exists in the database, return it
    res.status(200).json({ pokemonList });
  } else {
    try {
      const response = await axios.get('https://pokeapi.co/api/v2/pokemon/');
      const fetchedPokemonList = response.data.results.map((pokemon) => pokemon.name);
      // Store the fetched data in the database
      storeData(fetchedPokemonList);
      res.status(200).json({ pokemonList: fetchedPokemonList });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch Pokemon list.' });
    }
  }
};

// Function to get the details of a specific Pokemon
export const getPokemonDetail = async (req, res) => {
    try{
      const { name } = req.params;
      const formattedName = name.replace(/\s/g, '').toLowerCase();
  
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${formattedName}`);
      const { data } = response;
      
      res.status(200).json({data, status: 'Success'});
    }catch(error){
      return res.status(500).json({ message: 'Internal Server Error' })
    }
  }


// Function to simulate catching a Pokemon with a 50% probability
export const catchPokemon = async (req, res) => {
    try {
      const { name } = req.params;
      const formattedName = name.replace(/\s/g, '').toLowerCase();
           
      
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
      const random = Math.random() >= 0.5;
  
      if (random) {
        const data = {
          id: uuidv4(),
          name,
        };
  
        // Load data from your database or storage (replace with your own implementation)
        const currentData = loadData();
  
        // Check if the Pokemon with the same name is already caught
        const isPokemonExists = currentData.some((pokemon) => {
          const existingNameParts = pokemon.name.split('-');
          return existingNameParts[0] === formattedName;
        });
  
        if (isPokemonExists) {
          res.status(400).json({ message: 'You already caught this Pokemon.' });
          return;
        }
  
        // Add the newly caught Pokemon to the data
        currentData.push(data);
  
        // Save the updated data to your database or storage (replace with your own implementation)
        storeData(currentData);
  
        res.status(200).json({ data, message: 'You caught the Pokemon successfully.' });
      } else {
        res.status(400).json({ message: 'Oops, the Pokemon got away.' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };