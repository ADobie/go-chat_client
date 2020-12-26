<template>
<JwChat :taleList="list" scrollType="norell" :config="config" @enter="bindEnter" v-model="inputMsg" :toolConfig="tool" style: width="850px" height="850px" >
  <div slot="tools">插槽</div>
</JwChat>
  </template>
<script>

    export default {

        data () {
            return {
                inputMsg: '',
                config: { historyConfig: {tip: '查看更多'} },
                list: [
                ],
                tool: {
                    show: ['file', 'history', 'img'],
                    callback: this.toolEvent,
                    showEmoji: true,
                },
            }
        },
        mounted(){
            const ws = new WebSocket("ws://127.0.0.1:4444/ws?token="+localStorage.getItem("token"));
            const recv=JSON.stringify({"receive":"111"});
            ws.onopen = function() {
                console.log("Connection open ...");
                ws.send(recv)
            };

        },
        methods: {
            bindEnter () {
                const msg = this.inputMsg;
                const recv=JSON.stringify({"receive":msg});
                const myDate = new Date();
                if (!msg) return;
                const msgObj = {
                    "date": myDate.toLocaleTimeString(),
                    "text": { "text": msg },
                    "mine": true,
                    "name": "JwChat",
                    "img": ""
                };
                this.list.push(msgObj);


            },
            toolEvent (type) {
                console.log('tools', type)
            },
        }
    }
</script>

