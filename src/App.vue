<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/data-viz">Data Visualizations</router-link> |
      <router-link to="/simple-war">Simple War</router-link> |
      <router-link to="/resume">Resume</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style lang="scss">
#app {
  font-family: 'Roboto Mono', sans-serif;
  color: #2c3e50;
  margin-left: 5%;
  margin-right: 5%;
}
#nav {
  padding: 30px;
  text-align: center;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

</style>
