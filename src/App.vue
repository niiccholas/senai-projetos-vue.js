<script setup>
import { ref } from "vue"
import { getRandomDog } from "./services/api.js"

const list = ref([])

async function addDog() {
  const dog = await getRandomDog()
  list.value.push(dog.message)
}
</script>

<template>
  <div id="container">
    <button @click="addDog">Adicione um cachorro!</button>
    <ul id="galeria">
      <div id="galeriaItem" v-for="(item, index) in list" :key="index">
        <img :src="item" alt="">
      </div>
    </ul>
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
  padding: 40px 20px;
}

/* Botão estilizado */
button {
  background-color: #ff7eb9;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 18px;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-bottom: 30px;
}

button:hover {
  transform: scale(1.05);
  background-color: #ff65a3;
}

/* Galeria */
#galeria {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 20px;
  width: 100%;
  max-width: 70vw;
}

/* Itens da galeria */
#galeriaItem {
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 12px;
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
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0,0,0,0.2);
}
</style>