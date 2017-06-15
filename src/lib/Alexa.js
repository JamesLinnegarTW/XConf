"use strict"
export default class Alexa {

    constructor(){
      this.topics = {};
      this.subUid = -1;
      this.ws;
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
        this.publish("connect", null);
      };

      this.ws.onclose = (e)=>{
        this.publish("disconnect", null);
      };

      this.ws.onmessage = (e)=> {
        this.handleMessage(e);
      }
    }


    handleMessage(message){
      try {
  		    var contents = JSON.parse(message.data);
          this.publish( contents.type, contents.data );
        }
        catch(e){
          console.warn(e, "unparsed content", message.data);
        }
    }

    subscribe(topic, func) {
        if (!this.topics[topic]) {
            this.topics[topic] = [];
        }
        var token = (++this.subUid).toString();
        this.topics[topic].push({
            token: token,
            func: func
        });
        return token;
    }

    publish(topic, args) {
      let q = this;
      console.log("publish", topic, args);
      if (!q.topics[topic]) {
          return false;
      }
      setTimeout(function() {
          var subscribers = q.topics[topic],
              len = subscribers ? subscribers.length : 0;

          while (len--) {
              subscribers[len].func(topic, args);
          }
      }, 0);
      return true;
    }

    unsubscribe(token) {
      for (var m in this.topics) {
          if (this.topics[m]) {
              for (var i = 0, j = topics[m].length; i < j; i++) {
                  if (this.topics[m][i].token === token) {
                      this.topics[m].splice(i, 1);
                      return token;
                  }
              }
          }
      }
      return false;
    }

};
