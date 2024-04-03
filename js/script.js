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
        newMsg(){
            const msgSent = {
                date: 'ciao',
                message: this.messageSent,
                status: 'sent'
            }
            this.messageSent = ''
            this.activeContactId.messages.push(msgSent)
        },
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