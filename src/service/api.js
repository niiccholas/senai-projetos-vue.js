// src/services/userService.js

// precisa de "npm install axios"
import axios from "axios"

export async function getRandomDog() {
  try {
    const res = await axios.get(`https://dog.ceo/api/breeds/image/random`);

    return res.data
  } catch (error) {
    console.error("Erro ao buscar cachorro:", error)
    return null
  }
}

export async function getDogsByBreed(breed) {
  try {

    const res = await axios.get(`https://dog.ceo/api/breed/${breed}/images`)

    console.log(res.data.message)

    return res.data.message
  } catch (error) {
    console.error("Erro ao buscar raça de cachorro:", error)
    return null
  }
}
