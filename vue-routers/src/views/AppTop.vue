<template>
  <h3>TOP Page</h3>
  <nav id="breadcrums">
    <ul>
      <li>TOP</li>
      <li>TOP</li>
      <li>TOP</li>
    </ul>
  </nav>
  <section>
    <p>
      <!-- to="/member/add -->
      <RouterLink v-bind:to="{ name: 'MemberList' }">회원관리 </RouterLink>
    </p>
  </section>
</template>

<script setup>
import { RouterLink } from "vue-router";
</script>
