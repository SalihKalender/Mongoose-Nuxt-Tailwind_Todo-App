<template>
    <div class="flex mt-4">
        <input v-model="description" class="shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-grey-darker" placeholder="Add Todo">
        <button @click="add_Todo" class="flex-no-shrink p-2 border-2 rounded text-teal border-teal border-green-200 text-green-600 hover:text-white hover:bg-teal-600">Add</button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            description: ''
        }
    },
    methods: {
        async add_Todo() {
            if(this.description == '') {
                alert('Lütfen Aciklamayi Doldurunuz');
            }
            else {
               try {
                   const response = await this.$axios.$post('/api/add-todo-item',{ description: this.description });
                   console.log(response.data);
                   this.$store.commit('add_Todo',response.data)
               }
               catch(err) {
                   console.log(err);
               }
               this.description = '';
            }
        }
    }
}
</script>