function Alexa() {
    var q = this;
    var topics = {}, subUid = -1;
    var ws;

    q.connect = function(){
      var wsUri = window.location.protocol.replace("http", "ws") + "//" + window.location.hostname;
      if(window.location.port){
        wsUri = wsUri + ":" + window.location.port;
      }
      wsUri = wsUri + "/ws/alexa";

      ws = new WebSocket(wsUri);

      ws.onopen = function(){
        q.publish("connect", null);
      };

      ws.onclose = function(e){
        q.publish("disconnect", null);
      };

      ws.onmessage = handleMessage;
    }


    function handleMessage(message){
  		var contents = JSON.parse(message.data);
      q.publish( contents.type, contents.data );
  	}

    q.subscribe = function(topic, func) {
        if (!topics[topic]) {
            topics[topic] = [];
        }
        var token = (++subUid).toString();
        topics[topic].push({
            token: token,
            func: func
        });
        return token;
    };

    q.publish = function(topic, args) {
      console.log(topic, args);
        if (!topics[topic]) {
            return false;
        }
        setTimeout(function() {
            var subscribers = topics[topic],
                len = subscribers ? subscribers.length : 0;

            while (len--) {
                subscribers[len].func(topic, args);
            }
        }, 0);
        return true;

    };

    q.unsubscribe = function(token) {
        for (var m in topics) {
            if (topics[m]) {
                for (var i = 0, j = topics[m].length; i < j; i++) {
                    if (topics[m][i].token === token) {
                        topics[m].splice(i, 1);
                        return token;
                    }
                }
            }
        }
        return false;
    };
    return q;
};
