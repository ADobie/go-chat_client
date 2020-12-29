<template>
<JwChat :taleList="list" scrollType="norell" :config="config" @enter="bindEnter" v-model="inputMsg" :toolConfig="tool" style: width="850px" height="850px" >
  <div slot="tools">插槽</div>
</JwChat>
  </template>
<script>

    export default {

        data () {
            return {
                websock:null,
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
        created(){
            this.initWebSocket();
            //const ws = new WebSocket("ws://127.0.0.1:4444/ws?token=" + localStorage.getItem("token"));
             //ws = new WebSocket("ws://127.0.0.1:4444/ws?token=" + localStorage.getItem("token"));
            // const recv=JSON.stringify({"receive":"111"});
        },
        destroyed(){
            this.websocketclose()
        },
        methods: {
            initWebSocket(){ //初始化weosocket
                const wsuri = "ws://127.0.0.1:4444/ws?token=" + localStorage.getItem("token");
                this.websock = new WebSocket(wsuri);
                this.websock.onmessage = this.websocketonmessage;
                this.websock.onopen = this.websocketonopen;
                this.websock.onerror = this.websocketonerror;
                this.websock.onclose = this.websocketclose;
            },
            websocketonopen(){
                this.$message({
                    message: '连接成功',
                    type: 'success',
                })
            },
            websocketonerror(){//连接建立失败重连
                this.initWebSocket();
            },
            websocketclose(e){  //关闭
                console.log('断开连接',e);
            },
            websocketonmessage(e){ //数据接收
                const redata = JSON.parse(e.data);
                const myDate = new Date();
                if (!redata) return;
                const msgObj = {
                    "date": myDate.toLocaleTimeString(),
                    "text": { "text": e.data},
                    "mine": false,
                    "name": "JwChat",
                    "img": ""
                };
                this.list.push(msgObj);
            },

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
                this.websock.send(recv)
            },
            toolEvent (type) {
                console.log('tools', type)
            },
        }
    }
</script>

