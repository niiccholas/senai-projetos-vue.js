<script setup>
import { ref } from "vue"
import { getRandomDog } from "./services/api.js"

function changeTitle() {
  title.value = "Agora sou dinâmico 🎉"
}

const title = ref("Make me dynamic!")
const imagem = ref("https://vuejs.org/images/logo.png")
const list = ref([])

// Função para buscar a imagem e adicionar à lista
async function addDog() {
  const dog = await getRandomDog(); // espera a resposta da API
  list.value.push(dog.message); // adiciona a URL na lista
}

</script>

<template>
  <div>
    <h1>{{ title }}</h1>
    <button @click="changeTitle">Mudar título</button>
    <button @click="addDog">Adicione um cachorro!</button>
    <ul>
      <!-- v-for renderiza o elemento (com todos seus "filhos" dentro) conforme cada item
         em um array. -->
      <div v-for="(item, index) in list" :key="index"> <!-- o key é necessário para identificar e separar cada item de forma individual. 
                                                           ele é mais necessário em listas dinâmicas (que os dados podem mudar)-->
        <!-- o "item" é como nomeamos a variável de cada elemento dentro do array -->
        <img :src="item" alt="">
      </div>
    </ul>

  </div>
</template>