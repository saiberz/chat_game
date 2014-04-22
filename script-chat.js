var d = document;
var user_name = "Usuario";
var fb_id="";

var Fire = new Firebase("https://saiberz.firebaseio.com/chat");

var usuario;

var auth = new FirebaseSimpleLogin(Fire, function(error, user) {
  if (error) {
    // an error occurred while attempting login
    console.log(error);
    alert(error);
  } else if (user) {
    $( "input" ).prop( "disabled", false );        
    $( "input:text" ).prop( "placeholder", "Escribe" );        
    user_name=user.displayName;
    fb_id = user.id;
    $("#fbl").hide(1000);
  } else {
    console.log("Sign in!");
    user_name="Anonymus!";
  }
});

$("#fblo").click( function(){
    if(confirm("Are you sure"))
        auth.logout();
});

$("#fbl").click( function(){
    console.log("fu");
    auth.login('facebook');
});

$('#message-input').keypress(function (e) {
    if (e.keyCode == 13) {      
        if($('#message-input').val()!=""){
            var text = $('#message-input').val();
            /*addmessage(text,user_name)*/
            Fire.push({name:user_name, text:text, id:fb_id});
            $('#message-input').val("");
            $('#chatbox')[0].scrollTop = $('#chatbox')[0].scrollHeight;
        }
/*      messagesRef.push({name:name, text:text});*/
/*      $('#messageInput').val('');*/
    }
  });

Fire.on('child_added',function(ss){
    ss = ss.val();
    console.warn(ss.text);
    addmessage(ss.text,ss.name,ss.id);
});


/*  $('#messageInput').keypress(function (e) {
    if (e.keyCode == 13) {
      var name = $('#nameInput').val();
      var text = $('#messageInput').val();
      messagesRef.push({name:name, text:text});
      $('#messageInput').val('');
    }
  });*/
/*var i = 0;
  // Add a callback that is triggered for each chat message.
messagesRef.on('child_added', function (snapshot) {
    var message = snapshot.val();
    console.log(message);
    console.log(i);
    $('<div/>').text(message.text).prepend($('<em/>').text(message.name+': ')).appendTo($('#messagesDiv'));
    $('#messagesDiv')[0].scrollTop = $('#messagesDiv')[0].scrollHeight;
  });*/


function addmessage(m,un,id){
    newdivbox = d.createElement("div");
    newdiv1 = d.createElement("div");    
    newdiv2 = d.createElement("div");
    newdivbox.setAttribute("id","container")
    newimg = d.createElement("img");
    newimg.setAttribute("src","http://graph.facebook.com/"+id+"/picture");
    newimg.setAttribute("id","user-image");
    newdiv1.appendChild(newimg);
    newdiv2.setAttribute("id","user-message")    
    text = d.createElement("p");
    text.appendChild(d.createTextNode(m));
    text.setAttribute("id","user-comment");
    userlink = d.createElement("a");
    userlink.setAttribute("href","http://fb.com/" + id);
    userlink.setAttribute("id","user-name");
    userlink.appendChild(d.createTextNode(un));    
    newdiv2.appendChild(userlink);
    newdiv2.appendChild(text);
    newdivbox.appendChild(newdiv1);
    newdivbox.appendChild(newdiv2);
    $("#chatbox").append(newdivbox);
}










