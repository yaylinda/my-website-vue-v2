<template>
  <div id="app">

    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/data-viz">Data Visualizations</router-link> |
      <router-link to="/simple-war">Simple War</router-link> |
      <a href="resume.pdf" target="_blank">Resume</a>
    </div>

    <router-view/>

  </div>
</template>

<style lang="scss">
#app {
  position: relative;
  font-family: 'Roboto Mono', sans-serif;
  color: #2c3e50;
  min-height: 100vh;
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
