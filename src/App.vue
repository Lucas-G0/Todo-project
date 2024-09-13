<script>
import TodoSpinner from "@/components/TodoSpinner.vue";
import TodoFormAdd from "./components/TodoFormAdd.vue";
import TodoItems from "./components/TodoItems.vue";
import TodoEmpty from "./components/TodoEmpty.vue";

export default {
  data() {
    return {
      loading: false,
    };
  },
  components: {
    TodoSpinner,
    TodoFormAdd,
    TodoItems,
    TodoEmpty,
  },
  created() {
    this.loading = true;
    this.$store.dispatch("getTodos").finally(() => {
      this.loading = false;
    });
  },
};
</script>

<template>

  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Todo List</title>
  </head>

  <body class="bg-gray-800">
    <div class="px-3 py-10 md:px-10">
      <div class="w-full sm:w-1/2 lg:w-1/3 mx-auto">
        <TodoSpinner v-if="loading" />

        <template v-else>

          <TodoFormAdd />
          <TodoItems v-if="$store.state.todos.length" />
          <TodoEmpty v-else />

        </template>
      </div>
    </div>
  </body>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
