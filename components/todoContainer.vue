<template>
    <div class="h-100 w-full flex items-center justify-center bg-teal-lightest font-sans">
        <div class="bg-white rounded shadow p-6 m-4 w-full lg:w-3/4 lg:max-w-lg">
            <div class="mb-4">
                <h1 class="text-grey-darkest">Todo List</h1>
                <addTodo />
            </div>
            <Todo v-for="todo in todos" :key="todo._id" :todo="todo" />
        </div>
    </div>
</template>

<script>
import addTodo from '@/components/add_todo'
import Todo from '@/components/todo'

export default {
    components: {
        addTodo,
        Todo
    },
    data() {
        return {
            todos: this.$store.getters.get_Todos
        }
    }
}
</script>

<style>

</style>