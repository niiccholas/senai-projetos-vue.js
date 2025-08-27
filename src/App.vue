<script setup>
import { ref } from "vue"
import { getDogsByBreed, getRandomDog } from "./service/api";

const list = ref([])
const message = ref("") 
const randomDog = ref("")
const showGif = ref(false)
const showRandomDog = ref(false)
const showCarregando = ref(false)

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]] // troca posições
  }
  return array
}

// Espera a imagem carregar antes de exibir o GIF
async function addRandomDog(){
  showCarregando.value = true

  list.value = []

  showRandomDog.value = true

  const dog = await getRandomDog()
  randomDog.value = dog.message
}

// Mostra GIF temporariamente
function temporaryGif(){
  showGif.value = true
  setTimeout(() => {
    showGif.value = false
  }, 1000);
}

async function addInputDogs(message) {
  showCarregando.value = false

  list.value = []
  showRandomDog.value = false
  const images = await getDogsByBreed(message.toLowerCase())
  if(images){
    list.value.push(...shuffleArray(images))
  }
}

function openImage(image){

  window.open(image, "_blank");
}

// Dispara o GIF apenas quando a imagem aleatória carregar
function onRandomDogLoaded(){
  temporaryGif()
  showCarregando.value = false
}

</script>

<template>
  <div id="container">
    <input v-model="message" @keyup.enter="addInputDogs(message)" placeholder="Digite uma raça aqui..."/>
    <button @click="addRandomDog">Clique aqui para uma explosão de fofura!</button>
    
    <section id="galeria">
      <div id="galeriaItem" v-for="(item, index) in list" :key="index">
        <img style="cursor:pointer" @click="openImage(item)" :src="item" alt="">
      </div>
    </section>

    <div id="containerExplosao">
      <!-- GIF só aparece quando showGif for true -->
      <img v-show="showGif" id="gif" src="https://img1.picmix.com/output/stamp/normal/1/6/0/2/2342061_cf355.gif" alt="">
      
      <!-- imagem aleatória dispara GIF ao carregar -->
      <img v-show="showRandomDog" style="cursor:pointer" @click="openImage(randomDog)" id="randomDog" :src="randomDog" alt="" @load="onRandomDogLoaded">

      <!-- aparece q está carregando quando o showCarregando for true -->
      <h3 v-show="showCarregando" style="text-align: center; color: whitesmoke;">Carregando...</h3>
    </div>
  </div>
</template>


<style>
/* Reset básico */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

#container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  background: linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%);
  padding: 4vh 2vw;
}

/* Input estilizado */
input {
  padding: 1.2vh 1.6vw;
  font-size: 2vh;
  border-radius: 1vh;
  border: 0.2vh solid #fff;
  outline: none;
  transition: all 0.3s ease;
  margin-bottom: 3vh; /* distância para o botão */
  width: 30vw;
  text-align: center;
}

input:focus {
  border-color: #ff7eb9;
  box-shadow: 0 0 2vh rgba(255, 126, 185, 0.5);
}

input::placeholder {
  color: rgba(0, 0, 0, 0.7);
  font-style: italic;
}

/* Botão estilizado */
button {
  background-color: #ff7eb9;
  color: white;
  border: none;
  padding: 1.2vh 2vw;
  border-radius: 1vh;
  font-size: 2vh;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-bottom: 3vh;
}

button:hover {
  transform: scale(1.05);
  background-color: #ff65a3;
}

/* Galeria */
#galeria {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(25vh, 1fr));
  gap: 2vw;
  width: 100%;
  max-width: 70vw;
}

/* Itens da galeria */
#galeriaItem {
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 1.2vh;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

#galeriaItem img {
  width: 100%;
  height: 15vh;
  object-fit: cover;
}

/* Hover nos itens */
#galeriaItem:hover {
  transform: translateY(-0.5vh);
  box-shadow: 0 1vh 2vh rgba(0,0,0,0.2);
}

#containerExplosao {
  position: relative;
  width: 50vh;
  height: 50vh;
  margin-top: 4vh;
}

#randomDog {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

#gif {
  position: absolute;
  height: 125%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

</style>