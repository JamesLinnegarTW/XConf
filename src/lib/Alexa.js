"use strict"
import Observable from './Observable';

export default class Alexa extends Observable {

    constructor(){
    //  this.topics = {};
    //  this.subUid = -1;
      super();
      this.ws;
      this.reconnect;
    }

    connect(){
      var wsUri = [window.location.protocol.replace("http", "ws"),
                   "//",
                   window.location.hostname].join("");

      if(window.location.port){
        wsUri = wsUri + ":" + window.location.port;
      }

      wsUri = wsUri + "/ws/alexa";

      this.ws = new WebSocket(wsUri);

      this.ws.onopen = ()=>{
        this.emit("connect", null);
        if(this.reconnect){
          clearInterval(this.reconnect);
        };
      };

      this.ws.onclose = (e)=>{
        const q = this;
        this.emit("disconnect", null);
        this.reconnect = setInterval(q.connect(), 5000);
      };

      this.ws.onmessage = (e)=> {
        this.handleMessage(e);
      };
    }

    send(message){
      try {
        this.ws.send(message);
      } catch(e){
        console.log(e);
      }
    }

    handleMessage(message){
      try {

  		    var contents = JSON.parse(message.data);
          this.emit( contents.type, contents.data );
        }
        catch(e){
          console.warn(e, "unparsed content", message.data);
        }
    }

};
