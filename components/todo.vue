<template>
    <div class="flex mb-4 items-center">
        <p  v-if="!is_Edit" class="w-full text-grey-darkest"> {{ todo.description }}</p>
        <input v-if="is_Edit" v-model="selected_Todo" class="shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-grey-darker" placeholder="Add Todo">
        <button class="flex-no-shrink p-2 ml-4 mr-2 border-2 rounded hover:text-white border-green-500 text-green-700 border-green hover:bg-green-600" :disabled="!is_Edit" @click="done_Edit(todo._id)">Done</button>
        <button v-if="!is_Edit" class="flex-no-shrink p-2 ml-2 border-2 rounded text-red-600 border-red border-red-600 hover:text-white hover:bg-red-600" @click="remove_Todo(todo._id)">Remove</button>
        <button class="flex-no-shrink p-2 ml-2 border-2 rounded text-yellow-600 border-yellow border-yellow-600 hover:text-white hover:bg-yellow-600" @click="edit_Todo()">Edit</button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            is_Edit: false,
            selected_Todo: this.todo.description
        }
    },
    props: {
        todo: {
            require: true,
            type: Object
        }
    },
    methods: {
        async remove_Todo(id) {
            await this.$axios.$post('/api/delete-todo-item',{ id: id });
            this.$store.commit('delete_Todo',id)
        },
        edit_Todo() {
            this.is_Edit = !this.is_Edit;
            this.selected_Todo = this.todo.description;
        },
        async done_Edit(id) {
            if(this.selected_Todo != this.todo.description) {
                await this.$axios.post('/api/edit-todo-item',{ id: id , description: this.selected_Todo  , date: this.todo.date});
                this.$store.commit('update_Todo',{ id: this.todo._id , description: this.selected_Todo });
            }
            this.is_Edit = !this.is_Edit;
        }
    }
}
</script>