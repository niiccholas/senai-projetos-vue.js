// src/services/userService.js

// precisa de "npm install axios"
import axios from "axios"

export async function getRandomDog() {
  try {
    const res = await axios.get(`https://dog.ceo/api/breeds/image/random`);

    return res.data;
  } catch (error) {
    console.error("Erro ao buscar cachorro:", error)
    return null
  }
}