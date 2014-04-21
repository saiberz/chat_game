var d = document;
var user_name = "Usuario";
var fb_id="";

  var Fire = new Firebase("https://saiberz.firebaseio.com");

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
    auth.login('facebook');
});

$('#message-input').keypress(function (e) {
    if (e.keyCode == 13) {      
        if($('#message-input').val()!=""){
            var text = $('#message-input').val();
            addmessage(text,user_name)
            $('#message-input').val("");
            $('#chatbox')[0].scrollTop = $('#chatbox')[0].scrollHeight;
        }
/*      messagesRef.push({name:name, text:text});*/
/*      $('#messageInput').val('');*/
    }
  });


function addmessage(m,un){
    newdivbox = d.createElement("div");
    newdiv1 = d.createElement("div");    
    newdiv2 = d.createElement("div");
    newdivbox.setAttribute("id","container")
    newimg = d.createElement("img");
    newimg.setAttribute("src","http://lorempixel.com/50/50/");
    newimg.setAttribute("id","user-image");
    newdiv1.appendChild(newimg);
    newdiv2.setAttribute("id","user-message")    
    text = d.createElement("p");
    text.appendChild(d.createTextNode(m));
    text.setAttribute("id","user-comment");
    userlink = d.createElement("a");
    userlink.setAttribute("href","http://fb.com/" + fb_id);
    userlink.setAttribute("id","user-name");
    userlink.appendChild(d.createTextNode(un));    
    newdiv2.appendChild(userlink);
    newdiv2.appendChild(text);
    newdivbox.appendChild(newdiv1);
    newdivbox.appendChild(newdiv2);
    $("#chatbox").append(newdivbox);
}










