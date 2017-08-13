var connection;

$(document).ready(function(){
    
    
    document.getElementById("Arms").style.display = "block";
        
    embrScript.value = jsonToEMBR(scriptObject);
    
    parse(embrScript.value);
    
    /*$('#modern').bind('input', function() {
    $(this).next().stop(true, true).fadeIn(0).html('[input event fired!]: ' + $(this).val()).fadeOut(2000);
});*/
    
    $.extend( $.ui.slider.prototype.options, { 
        animate: 300
    });
    
    $(".up_down, .forward_backward")
    .slider({
        max: 1,
        min: -1,
        range: "min",
        value: 0,
        step: 0.01,
        orientation: "vertical",
        change: function( event, ui ) {
            sliderChange(this);
        }
    })
    .slider("pips", {
        first: "pip",
        last: "pip"
    })
    .slider("float");
    
    
    $(".left_right, .fd_x")
    .slider({
        max: 1,
        min: -1,
        range: "min",
        value: 0,
        step: 0.01,
        orientation: "horizontal",
        change: function( event, ui ) {
            sliderChange(this);
        }
    })
    .slider("pips", {
        first: "pip",
        last: "pip"
    })
    .slider("float");
    
    
    $(".sConstraint")
    .slider({
        max: 180,
        min: -180,
        range: "min",
        value: 75,
        step: 0.1,
        orientation: "horizontal",
        change: function( event, ui ) {
            sliderChange(this);
        }
    })
    .slider("pips", {
        first: "pip",
        last: "pip"
    })
    .slider("float");
    
    $(".shader")
    .slider({
        max: 1,
        min: 0,
        range: "min",
        value: 0.5,
        step: 0.01,
        orientation: "horizontal",
        change: function( event, ui ) {
            sliderChange(this);
        }
    })
    .slider("pips", {
        first: "pip",
        last: "pip"
    })
    .slider("float");
    
    initPoseTable();
    
    initMorph();
    
});

function connect(){
    
    if(connection == undefined || connection.readyState!=1){
        
        connection = new WebSocket('ws://localhost:1337/');
    
        connection.onopen = function() {
            console.log("Connection open now, Try to send some data!!");
        };

        // Log errors
        connection.onerror = function (error) {
            console.log('WebSocket Error!!!');
            console.dir(error);
        };

        // Log messages from the server
        connection.onmessage = function (e) {
          console.log('OMG Server responded!!!', e.data);
        };

        connection.onclose = function(e){
            console.log("Connection Closed now!! bye bye!!");
        }
    }
}

function animateBen(){

    var text = $("#embrScript")[0].value;
    
    if(connection){
        console.log("Sending EMBR Script!!");
        if(text != ""){
            connection.send(text);
        } else{
            console.log("No data in text area to send!!");
        }
        
    } else{
        console.log("Not Connected to WS Server!!");
    }
}

function closeConnection(){
    console.log("We want to close the connection!");
    if(connection != undefined || connect.readyState == 1){
        connection.close();
    }
}

function str2ab(str) {
  var buf = new ArrayBuffer(str.length*2); // 2 bytes for each char
  var bufView = new Uint16Array(buf);
  for (var i=0, strLen=str.length; i<strLen; i++) {
    bufView[i] = str.charCodeAt(i);
  }
  return buf;
}

function clearStorage(){
    swal({
      title: "Are you sure you want to clear the storage and reload?",
      text: "You will not be able to recover the work!",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DD6B55",
      confirmButtonText: "Yes, clear it!",
      closeOnConfirm: true
    },
    function(){      
      simpleStorage.flush();
      location.reload();
    });
    
    
}
/**
Add a new postion constraint object
INPUT: options {
            TIME: "",
            HOLD: "",
            FEEDBACK_ID: "",
            LEFT: boolean
        }


*/
/*
function addPositionConstraint(options){
    
    var pose = {};
    pose.TIME_POINT = options.TIME;
    pose.HOLD = options.HOLD;
    
    var arm = {};
    arm.FEEDBACK_ID = "feedback_" + options.FEEDBACK_ID;
    if(options.LEFT){
        arm.BODY_GROUP = "larm";
    }else{
        arm.BODY_GROUP = "rarm";
    }
    
    arm.TARGET = [ 0, 0, 0 ];
    
    if(options.LEFT){
        arm.JOINT = "lhand";
    }else{
        arm.JOINT = "rhand";
    }
    
    arm.OFFSET = [ 0, 0, 0];
    
    pose.POSITION_CONSTRAINT = [arm];
    
    addPose(scriptObject, pose);
    console.log(jsonToEMBR(scriptObject));
    embrScript.value = jsonToEMBR(scriptObject);
}

*/
/* Functions not used currently */
/*
function addPose0(){
    addPose(scriptObject, pose0);
    console.log(jsonToEMBR(scriptObject));
    embrScript.value = jsonToEMBR(scriptObject);
}
function addPose1(){
    addPose(scriptObject, pose1);
    console.log(jsonToEMBR(scriptObject));
    embrScript.value = jsonToEMBR(scriptObject);
}
function addPose2(){
    addPose(scriptObject, pose2);
    console.log(jsonToEMBR(scriptObject));
    embrScript.value = jsonToEMBR(scriptObject);
}
function addPose3(){
    addPose(scriptObject, pose3);
    console.log(jsonToEMBR(scriptObject));
    embrScript.value = jsonToEMBR(scriptObject);
}
*/
