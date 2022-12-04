<template>
  <div id="app">
    <nav>
      <router-link to="/">Inicio</router-link> |
      <router-link to="/articulos">Artículos</router-link> |
      <router-link to="/proveedores">Proveedores</router-link> |
      <router-link to="/clientes">Clientes</router-link> | 
      <router-link to="/ventas">Ventas</router-link>
    </nav>
    <main class="container">
      <router-view/>
    </main>
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
