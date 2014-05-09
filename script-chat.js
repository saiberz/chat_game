(function (global, document, $, undefined) {
    "use strict";
    
    // datos del usuario
    var user_name = null;
    var fb_id = null;
    var hora = null;
    var flag = false;
    // conección a Firebase
    var lastMessages = null;
    var Fire = new Firebase("https://saiberz.firebaseio.com/chat");
    var auth = new FirebaseSimpleLogin(Fire, function(error, user) {
        if (error) {
            console.error("An error occurred while attempting login.");
        } else if (user) {
            $("input").prop("disabled", false);        
            $("input:text").prop("placeholder", "Escribe");        
            user_name = user.displayName;
            fb_id = user.id;
            $("#fbl").hide(1000);
            $("#fblo").show(1000);
            myrequest();
        } else {
            user_name = "Anonymous!";
            $("#fbl").show(1000);
            $("#fblo").hide(1000);
        }
    });
    lastMessages = Fire.endAt().limit(50);
    lastMessages.on("child_added", function(ss) {
        ss = ss.val();


        addmessage(ss.text, ss.name, ss.id, ss.hour);
        if(ss.text[0] === "#" && flag)
                    notificar(ss.text,ss.id,ss.name);
        $('.comment').emoticonize();
    });

    function addmessage(m, un, user_id, hour) {
        var newdivbox = document.createElement("div");
        var newdiv1 = document.createElement("figure");    
        var newdiv2 = document.createElement("div");
        var contenedor = document.createElement("div");
        contenedor.setAttribute("id", "todo");

        var timeago = moment(hour).fromNow();
        newdivbox.setAttribute("id", "container");
        var newimg = document.createElement("img");
        newimg.src = "http://graph.facebook.com/" + user_id + "/picture";
        newimg.setAttribute("id", "user-image");
        newdiv1.appendChild(newimg);
        newdiv2.setAttribute("id", "user-message");
        
        var text = document.createElement("p");
        text.appendChild(document.createTextNode(m));
        text.setAttribute("id", "user-comment");
        text.setAttribute("class","comment");       
        
        var text2 = document.createElement("span");
        text2.appendChild(document.createTextNode(" ("+timeago+")"));
        text2.setAttribute("id", "user-comment-time");
        var userlink = document.createElement("a");
        userlink.setAttribute("href", "http://fb.com/" + user_id);
        userlink.setAttribute("id", "user-name");
        userlink.appendChild(document.createTextNode(un));    
        newdiv2.appendChild(userlink);
        newdiv2.appendChild(text2);
        newdiv2.appendChild(text);        
        newdivbox.appendChild(newdiv1);
        newdivbox.appendChild(newdiv2);
        contenedor.appendChild(newdivbox);
        $("#chatbox").prepend(contenedor);
    }

    function notificar(m,id,un) {
        var image_src = "http://graph.facebook.com/" + id + "/picture"
        // If the user agreed to get notified
        if (Notification && Notification.permission === "granted") {
            var notification = new Notification(un, { icon : image_src, body : m.slice(1) });
            setTimeout(function(){
                notification.close();
            },3000);
        }
    };
    
    function myrequest(){
        if (Notification && Notification.permission !== "granted") {
            Notification.requestPermission(function (status) {
                if (Notification.permission !== status) {
                    Notification.permission = status;
                }
            });
        }
    }
    // event handlers

    $("#fblo").click(function() {
        if(confirm("Are you sure")) {
            auth.logout();
            $("input").prop("disabled", true);
        }
    });
    //Estp es un comentario de prueba
    $("#fbl").click(function() {
        auth.login("facebook");
    });

    $("#Message-input").keypress(function (event) {
        flag = true;
        var ENTER_KEY = 13;
        if (event.keyCode === ENTER_KEY) {      
            if($("#message-input").val() !== "") {
                var text = $("#message-input").val();
                var hour = moment().valueOf();
                Fire.push({name: user_name, text: text, id: fb_id,hour: hour});
                $("#message-input").val("");
            }
        }
    });

})(window, window.document, window.jQuery);
