// Import necessary modules and dependencies
import { isPrime, getFibonacciNumber } from '../helpers/primeHelper.js';
import { loadData, storeData } from '../helpers/databaseHelper.js';

// Load data from the database
const myPokemonList = loadData();

// Function to get the list of captured Pokemon
export const getMyPokemonList = (req, res) => {
    try {
      const data = loadData();
  
      if (data.length === 0) {
        return res.status(404).json({ message: 'Data is empty' });
      }
  
      res.status(200).json({ myPokemonList: data });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };

// Function to release a Pokemon (returns a prime number)
export const releasePokemon = async (req, res) => {
    try {
      const { id } = req.params;
      const currentData = loadData();

      console.log(currentData)
  
      // Find the index of the Pokemon with the matching ID to release
      const releasedPokemonIndex = currentData.findIndex((pokemon) => pokemon.id === id);
  
      if (releasedPokemonIndex === -1) {
        res.status(404).json({ message: 'Pokemon not found.' });
        return;
      }
  
      // Generate a random number between 0 and 999
      const randomResult = Math.floor(Math.random() * 1000);
      
      console.log(randomResult , 'Angka Keluar')
      // Check if the random number is prime
      if (!isPrime(randomResult)) {
        res.status(400).json({ message: 'Release failed; try again.' });
        return;
      }
  
      // Remove the released Pokemon from the data
      currentData.splice(releasedPokemonIndex, 1);
  
      // Save the updated data to your database or storage
      storeData(currentData);
  
      res.status(200).json({
        message: 'Pokemon released successfully.',
        currentData,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };

// Function to rename a Pokemon based on the rules
export const renamePokemon = async (req, res) => {
    try {
      const { id } = req.params;
      const data = loadData();
      const pokemon = data.find((item) => item.id === id);
  
      if (!pokemon) {
        res.status(404).json({ message: 'Pokemon not found.' });
        return;
      }
  
      const name = pokemon.name.split('-');
      const renameCount = pokemon.renameCount || 0;
  
      // Generate the new name based on your friend's logic and the renaming rule
      const newName = `${name[0]}-${name[1] ? getFibonacciNumber(renameCount) : 0}`;
  
      // Update the Pokemon's name and renameCount
      pokemon.name = newName;
      pokemon.renameCount = renameCount + 1;
  
      storeData(data);
  
      return res.status(200).json({ newName, message: 'Pokemon name successfully changed.' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  };