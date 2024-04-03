import { contacts } from "./data.js";
const {createApp} = Vue;

createApp({
    data(){
        return{
            contacts,
            activeContactId: 1
        }
    },
    methods: {

    },
    computed: {
        activeContact(){
            return this.contacts.find((el) => el.id === this.activeContactId)
        }
    },
    mounted() {
        console.log(this.contacts)
    },
}).mount('#app')