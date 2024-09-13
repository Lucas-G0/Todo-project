<script>
import TodoItem from '@/components/TodoItem.vue';

export default {
    components: {
        TodoItem
    }
}
</script>

<template>
  <div class="space-y-2">
    <TodoItem v-for="todo in this.$store.state.todos" :key="todo.id" :todo="todo" />
  </div>
</template>
