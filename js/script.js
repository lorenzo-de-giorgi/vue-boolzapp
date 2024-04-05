import { contacts } from "./data.js";
import Picker from './emoji-picker.js';
const {createApp} = Vue;
const dt = luxon.DateTime;

createApp({
    data(){
        return{
            contacts,
            activeContactId: 1,
            newMsg: '',
            searchText: '',
            settingActive: false,
            showEmoji: false
        }
    },
    methods: {
        createMessage(msg, status){
            const createMessage = {
                date: dt.now().setLocale('it').toFormat('dd/MM/yyyy hh:mm:ss'),
                message: msg,
                status: status
            }
            return createMessage;
        },
        newMessage(){
            const createMessage = this.createMessage(this.newMsg, 'sent');
            if(this.newMsg.trim() === '') return;
            this.activeContact.messages.push(createMessage);
            this.newMsg = '';
            setTimeout(() => {
                const createMessage = this.createMessage('ok', 'received');
                this.activeContact.messages.push(createMessage);
            },1000);
        },

        // newMessage(){ 
        //     // this.contacts.messages.push(msg);
        //     this.contacts[this.activeContactId].messages.push(msg)
        //     this.$nextTick(() => {
        //         this.$refs.messages [this.$refs.messages.length - 1].scrollIntoView({ behavior: 'smooth' });
        //     });
        //     console.log(this.contacts[this.activeContactId]);
        //     this.newMsg = '',
        //     setTimeout(()=>{
        //         this.contacts[this.activeContactId].messages.push({
        //             date: dt.now().setLocale('it').toFormat('dd/MM/yyyy hh:mm:ss'), 
        //             message: 'Ok', 
        //             status: 'received'
        //         }
        //     )}, 1000);
        // },
        messageSettings(index) {
            this.settingActive = !this.settingActive;
            this.activeMessage = index;
        },
        deleteMessage(activeContactId, index) {
            this.contacts[activeContactId].messages.splice(index, 1);
            this.settingActive = !this.settingActive;
        },
        getContactMessage(id){
            const index = this.contacts.findIndex((el) => el.id === id);
            const msgLastindex = this.contacts[index].messages.length - 1;
            if(msgLastindex >= 0){
                return this.contacts[index].messages[msgLastindex]
            } else {
                return '';
            }
        },
        getLastMessage(id){
            if(this.getContactMessage(id)){
                return this.getContactMessage(id).message;
            } else {
                return 'Non ci sono messaggi';
            }
        },
        getLastMsgDate(id){
            if(this.getContactMessage(id)){
                return this.getContactMessage(id).date;
            } else {
                return ''
            }
        },
        onSelectEmoji(emoji) {
            console.log(emoji)
            this.messageText += emoji.i;
            /*
              // result
              { 
                  i: "😚", 
                  n: ["kissing face"], 
                  r: "1f61a", // with skin tone
                  t: "neutral", // skin tone
                  u: "1f61a" // without tone
              }
              */
        },

    },
    computed: {
        activeContact(){
            return this.contacts.find((el) => el.id === this.activeContactId)
        },
        filteredContacts(){
            return this.contacts.filter((el) => el.name.toLowerCase().includes(this.searchText))
        },
        lastAccess(){
            const index = this.activeContact.messages.length - 1;
            if(index >= 0){
                return this.activeContact.messages[index].date;
            } else {
                return ''
            }
        }
    },
    mounted() {
        console.log(this.contacts)
    },
}).component('Picker', Picker).mount('#app');
