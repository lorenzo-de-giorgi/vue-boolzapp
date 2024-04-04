import { contacts } from "./data.js";
const {createApp} = Vue;
const dt = luxon.DateTime;

createApp({
    data(){
        return{
            contacts,
            activeContactId: 1,
            searchText: '',
            settingActive: false
        }
    },
    methods: {
        newMessage(){
            const msg = {
                date: dt.now().setLocale('it').toFormat('dd/MM/yyyy hh:mm:ss'),
                message: this.newMsg,
                status: 'sent'
            }
            // this.contacts.messages.push(msg);
            this.contacts[this.activeContactId].messages.push(msg)
            console.log(this.contacts[this.activeContactId])
            this.newMsg = ''
            setTimeout(()=>{this.contacts[this.activeContactId].messages.push({date: dt.now().setLocale('it').toFormat('dd/MM/yyyy hh:mm:ss'), message: 'Ok', status: 'received'})}, 1000);
        },
        messageSettings(index) {
            this.settingActive = !this.settingActive;
            this.activeMessage = index;
        },
        deleteMessage(activeContactId, index) {
            this.contacts[activeContactId].messages.splice(index, 1);
            this.settingActive = !this.settingActive;
            },
    },
    computed: {
        activeContact(){
            return this.contacts.find((el) => el.id === this.activeContactId)
        },
        filteredContacts(){
            return this.contacts.filter((el) => el.name.toLowerCase().includes(this.searchText))
        },
    },
    mounted() {
        // console.log(this.contacts)
    },
}).mount('#app');
