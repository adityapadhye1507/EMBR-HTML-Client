/**
Initialise Pose table on the HTML
*/

function initPoseTable(){
    
    var $poseTable = $('#poseTable > tbody').html("");
    
    
    var currentPose = 0;
    
    if(simpleStorage.hasKey('pose')){
      currentPose = simpleStorage.get('pose');
    }  
        
    var poses = scriptObject.K_POSE_SEQUENCE.K_POSE;
    if(poses != undefined){
        for(var i = 0; i < poses.length; i++){
            var poseId = '<td>'+ i +'</td>';
            var activeBit = '<td><input class="activeBit" type="checkbox" name="'+ i +'" value="active" checked/></td>';
            
            var option1 = '<option value="start">Start</option>';
            var option2 = '<option value="ready">Stroke Begin</option>';
            var option3 = '<option value="stroke_end">Stroke Finish</option>';
            var option4 = '<option value="end">End</option>';
            
            var phase = '<td>'
                        + '<select class="phase" name="'+ i +'">'
                        + option1
                        + option2
                        + option3
                        + option4
                        + '</select>' 
                        + '</td>';
            
            
            var frame = '<td>'+ (new Number(poses[i].TIME_POINT)/40).toFixed(0) +'</td>';
            var time = '<td><input name="'+ i +'" class="time" type="text" size="15" value="' + poses[i].TIME_POINT + '"/></td>';
            var hold = '<td><input name="'+ i +'" class="hold" type="text" size="15" value="' + poses[i].HOLD + '"/></td>';
            var comment = '<td>--- Pose '+ i +'</td>';
            
            var $lastRow = $('#poseTable  > tbody:last-child');
            $lastRow.append('<tr class="poseRow" name="'+ i +'">' 
                              + poseId 
                              + activeBit
                              + phase
                              + frame
                              + time
                              + hold
                              + comment
                              + '</tr>');
            
            $("#poseTable select")[i].value = poses[i].FEEDBACK_ID.replace("feedback_", "");;
        } 
    //Highlight the current selection
    document.getElementById('poseTable').rows[currentPose+1].style.backgroundColor = '#fdee9a';
    
    addListeners();
    //update EMBR script in text area
    embrScript.value = jsonToEMBR(scriptObject);
    }
}

/**
Add respective event listeners to all the columns of each row in Pose Table
*/
var addListeners = function( ){
    
    //Add onChange listener to each Row
    $( ".poseRow" ).click( rowSelector );
    
    //Add listener to active bit
    $( ".activeBit" ).change( activeBitListener );
    
    //Add onChange listener to phase property
    $( ".phase" ).change( phaseListener );
    
    //Add onChange listener to time property
    $( ".time" ).change( timeListener );
    
    //Add onChange listener to hold property
    $( ".hold" ).change( holdListener );
}

var rowSelector = function() {

    var id = parseInt(this.firstChild.textContent);
    
    //Set current row as the clicked row
    simpleStorage.set('pose', id);
    
    //Unhighlight every other row
    var table = document.getElementById('poseTable');
    
    for (var i=0;i < table.rows.length;i++){
        var row = table.rows[i];
        row.style.backgroundColor="#FFFFFF";
    }
    
    //Highlight the current row
    this.style.backgroundColor='#fdee9a';
    
    //Initialise the facial expression table after the pose is changed
    initMorph();
    
    //TODO: Initialise the controls with the repective pose values
}

var activeBitListener = function() {

        var id = parseInt(this.name);
        
        //update value of actvie bit in pose
        scriptObject.K_POSE_SEQUENCE.K_POSE[id].active = this.checked;

        //update EMBR script in text area
        embrScript.value = jsonToEMBR(scriptObject);
        
}

var phaseListener = function(){
    var id = parseInt(this.name);
    
    //update value of actvie bit in pose
    scriptObject.K_POSE_SEQUENCE.K_POSE[id].SYNC = this.value;
    scriptObject.K_POSE_SEQUENCE.K_POSE[id].FEEDBACK_ID = "feedback_" + this.value;
    
    //update EMBR script in text area
    embrScript.value = jsonToEMBR(scriptObject);
}

var timeListener = function(){
    var id = parseInt(this.name);
    
    //update value of actvie bit in pose
    scriptObject.K_POSE_SEQUENCE.K_POSE[id].TIME_POINT = this.value;
    
    //update EMBR script in text area
    embrScript.value = jsonToEMBR(scriptObject);
}

var holdListener = function(){
    var id = parseInt(this.name);
    
    //update value of actvie bit in pose
    scriptObject.K_POSE_SEQUENCE.K_POSE[id].HOLD = this.value;
    
    //update EMBR script in text area
    embrScript.value = jsonToEMBR(scriptObject);
}


var initPose = function(){
    var pose = {
                "active" : true,
                "HOLD" : "0",
                "SYNC" : "start",
                "FEEDBACK_ID" : "feedback_start"
    }
    
    return pose;
}

/**
    Add a pose to the pose table
*/
var addPose = function(){
    
    //Initialize a new pose object
    var pose = initPose();
    
    //Check if there are any pose objects present in the script
    if(typeof scriptObject.K_POSE_SEQUENCE.K_POSE == "undefined"){
        //If no object present in the script
        
        pose.TIME_POINT = "450";
        scriptObject.K_POSE_SEQUENCE.K_POSE = [pose];
        
    } else{
        //If there are pose objects in the script
        
        //Get length of the pose array
        var index = scriptObject.K_POSE_SEQUENCE.K_POSE.length;
        
        //Get last pose object
        var prevTime = parseInt(scriptObject.K_POSE_SEQUENCE.K_POSE[index - 1].TIME_POINT);
        
        pose.TIME_POINT = prevTime + 400;
         
        scriptObject.K_POSE_SEQUENCE.K_POSE[index] = pose;
        
        simpleStorage.set("pose", index);
        simpleStorage.set("script", scriptObject);
    }

    initPoseTable();
    
    initMorph();
}

/**
    Delete a pose from the pose table
*/
var deletePose = function(){
    
    if(simpleStorage.hasKey('pose')){
        currentPose = simpleStorage.get('pose');
        
        swal({
          title: "Are you sure?",
          text: "Do you want to delete Pose " + currentPose,
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#DD6B55",
          confirmButtonText: "Yes, delete it!",
          closeOnConfirm: false
        },
        function(){
            
            //Code to delete the pose
            var length = scriptObject.K_POSE_SEQUENCE.K_POSE.length;
            
            if(length == 1 ){
                swal("Cannot Delete!", "There should be atleast 1 Pose in the table!!", "error");
            }
            if(currentPose < length && length != 1){
                scriptObject.K_POSE_SEQUENCE.K_POSE.splice( currentPose, 1 );
                simpleStorage.set("script", scriptObject);
                if(currentPose == (length-1)){
                    simpleStorage.set("pose", (currentPose-1));
                }
                initPoseTable();
                swal("Deleted!", "Pose "+ currentPose +" deleted succesfully!!", "success");
            }
            
        });
        
    }else{
        swal("No pose selected to delete", "Please select a pose by clicking it in pose table!!");
    }  
}

var duplicatePose = function(){
    if(simpleStorage.hasKey('pose')){
        currentPose = simpleStorage.get('pose');
        
        var pose = scriptObject.K_POSE_SEQUENCE.K_POSE[currentPose];
        var newPose = {};
        
        // Merge object2 into object1
        $.extend( newPose, pose );
        
        newPose.TIME_POINT = parseInt(pose.TIME_POINT) + 1;
        scriptObject.K_POSE_SEQUENCE.K_POSE.splice( currentPose+1, 0, newPose );
        
        simpleStorage.set('pose', (currentPose+1));
        simpleStorage.set("script", scriptObject);
        
        initPoseTable();
    }
}