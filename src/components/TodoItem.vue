<template>
  <div class="bg-gray-300 rounded-sm" :class="{'bg-gray300':!isCompleted, 'bg-green-200': isCompleted}">
    <div
      class="flex items-center px-4 py-3 border-b border-gray-400 last:border-b-0"
    >
      <div class="flex items-center justify-center mr-2">
        <button 
        :class="{
          'text-green-400': isCompleted,
          'text-gray-400': !isCompleted
        }"
        @click="onCheckClick"
        >
          <svg
            class="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5 13l4 4L19 7"
            ></path>
          </svg>
        </button>
      </div>

      <div class="w-full">
        <input
          type="text"
          placeholder="Digite a sua tarefa"
          :value="todo.title"
          @keyup.enter="onTitleChange"
          class="placeholder-gray-500 text-gray-700 font-light focus:outline-none block w-full appearance-none leading-normal mr-3 bg-gree"
          :class="{
            'bg-gray-300': !isCompleted,
            'bg-green-200': isCompleted
          }"
        />
      </div>

      <div class="ml-auto flex items-center justify-center">
        <button class="focus:outline-none">
          <svg
            class="ml-3 h-4 w-4"
            @mouseover="isMouseOver = true"
            @mouseleave="isMouseOver = false"
            @click="deleteTodo"
            :class="{'text-red-500': isMouseOver, 'text-gray-500': !isMouseOver}"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19 7L18.1327 19.1425C18.0579 
  20.1891 17.187 21 16.1378 21H7.86224C6.81296 21 5.94208 20.1891 5.86732 
  19.1425L5 7M10 11V17M14 11V17M15 7V4C15 3.44772 14.5523 3 14 3H10C9.44772 
  3 9 3.44772 9 4V7M4 7H20"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: this.todo.title,
      isCompleted: this.todo.completed,
      isMouseOver: false
    }
  },
  props: {
    todo: {
      type: Object,
      default: () => ({}),
    },
  },
  methods: {
    updateTodo() {
      const payload = {
        id: this.todo.id,
        data: {
          title: this.title,
          completed: this.isCompleted
        },
      };
      
      this.$store.dispatch("updateTodo", payload);
    },
    onTitleChange($evt) {
      this.title = $evt.target.value;

      if (!this.title) return false;

      this.updateTodo()

      this.$swal("Tarefa alterada com sucesso!", "", "success");
    },
    onCheckClick() {
      this.isCompleted = !this.isCompleted;
      this.updateTodo()
      if (this.isCompleted) {
        this.$swal("Tarefa concluída com sucesso!", "", "success");
      } else {
        this.$swal("Tarefa desmarcada!", "", "warning");
      }
    },
    deleteTodo() {
      this.$swal({
        title: 'Tem certeza que deseja excluir essa tarefa?',
        showCancelButton: true,
        confirmButtonText: 'Excluir',
        cancelButtonText: 'Cancelar',
      }).then((willDelete) => {
        if (!willDelete.isConfirmed) return false;
        this.$store.dispatch("deleteTodo", this.todo.id).finally(() => {
        this.$swal("Tarefa deletada com sucesso!", "", "success");
      })
      });
      
    }
  }
};
</script>