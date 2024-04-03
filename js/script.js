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
        mewMessage(){
            const msg = {
                date: '',
                message: this.newMsg,
                status: 'sent'
            }
            // this.contacts.messages.push(msg);
            this.contacts[this.activeContactId].messages.push(msg)
            console.log(this.contacts[this.activeContactId])
            this.newMsg = ''
            setTimeout(()=>{this.contacts[this.activeContactId].messages.push({date:'ciao', message: 'Ok', status: 'received'})}, 1000);
        },
    },
    computed: {
        activeContact(){
            return this.contacts.find((el) => el.id === this.activeContactId)
        }
    },
    mounted() {
        // console.log(this.contacts)
    },
}).mount('#app')