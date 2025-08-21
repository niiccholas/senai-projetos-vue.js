<script setup>
import { ref } from "vue"

function changeTitle() {
  title.value = "Agora sou dinâmico 🎉"
}


const title = ref("Make me dynamic!")
const imagem = ref("https://vuejs.org/images/logo.png")
const list = ref([])

</script>

<template>
  <div>
    <h1>{{ title }}</h1>
    <button @click="changeTitle">Mudar título</button>
    <button @click="list.push(list.length + 1)">Aumente um número!</button>
    <img :src="imagem" alt="">

    <ul>
      <li v-for="item of list">{{ item }}</li>
    </ul>
  </div>
</template>