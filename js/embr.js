/** 
    Declaired a default script object
    TODO: Should replce this with script object saved in local storage
*/

var scriptObject = {
      "K_POSE_SEQUENCE": {
        "CHARACTER": "Ben",
        "START": 0,
        "FADE_IN": 100,
        "FADE_OUT": 500
      }
    };

if(simpleStorage.hasKey('script')){
        
    scriptObject = simpleStorage.get('script');
}

/*var pose0 = {
                "TIME_POINT": "+450",
                "HOLD": "500",
                "POSITION_CONSTRAINT": [
                  {
                    "FEEDBACK_ID": "feedback_start",
                    "BODY_GROUP": "larm",
                    //"TARGET": "0.18;-0.38;1",
                    "TARGET": [0.18, -0.38, 1],
                    "JOINT": "lhand",
                    "OFFSET": [0, 0, 0]
                  },
                  {
                    "FEEDBACK_ID": "feedback_start",
                    "BODY_GROUP": "rarm",
                    "TARGET": [0.18, -0.38, 1],
                    "JOINT": "rhand",
                    "OFFSET": [0, 0, 0]
                  }
                ],
                "SWIVEL_CONSTRAINT": [
                  {
                    "FEEDBACK_ID": "feedback_start",
                    "BODY_GROUP": "larm",
                    "SWIVEL_ANGLE": "75.0"
                  },
                  {
                    "FEEDBACK_ID": "feedback_start",
                    "BODY_GROUP": "rarm",
                    "SWIVEL_ANGLE": "75.0"
                  }
                ]
              };

var pose1 = {
                "TIME_POINT": "+1250",
                "HOLD": "500",
                "POSITION_CONSTRAINT": [
                  {
                    "FEEDBACK_ID": "feedback_start",
                    "BODY_GROUP": "larm",
                    "TARGET": "-0.08;-0.38;1",
                    "JOINT": "lhand",
                    "OFFSET": "0;0;0"
                  },
                  {
                    "FEEDBACK_ID": "feedback_start",
                    "BODY_GROUP": "rarm",
                    "TARGET": "0.08;-0.38;1",
                    "JOINT": "rhand",
                    "OFFSET": "0;0;0"
                  }
                ],
                "SWIVEL_CONSTRAINT": [
                  {
                    "FEEDBACK_ID": "feedback_start",
                    "BODY_GROUP": "larm",
                    "SWIVEL_ANGLE": "50.0"
                  },
                  {
                    "FEEDBACK_ID": "feedback_start",
                    "BODY_GROUP": "rarm",
                    "SWIVEL_ANGLE": "50.0"
                  }
                ]
              };

var pose2 = {
                "TIME_POINT": "+2050",
                "HOLD": "500",
                "POSITION_CONSTRAINT": [
                  {
                    "FEEDBACK_ID": "feedback_start",
                    "BODY_GROUP": "larm",
                    "TARGET": "1;-0.38;1",
                    "JOINT": "lhand",
                    "OFFSET": "0;0;0"
                  },
                  {
                    "FEEDBACK_ID": "feedback_start",
                    "BODY_GROUP": "rarm",
                    "TARGET": "-1;-0.38;1",
                    "JOINT": "rhand",
                    "OFFSET": "0;0;0"
                  }
                ],
                "SWIVEL_CONSTRAINT": [
                  {
                    "FEEDBACK_ID": "feedback_start",
                    "BODY_GROUP": "larm",
                    "SWIVEL_ANGLE": "50.0"
                  },
                  {
                    "FEEDBACK_ID": "feedback_start",
                    "BODY_GROUP": "rarm",
                    "SWIVEL_ANGLE": "50.0"
                  }
                ]
              };
var pose3 = {
                "TIME_POINT": "+2850",
                "HOLD": "500",
                "POSITION_CONSTRAINT": [
                  {
                    "FEEDBACK_ID": "feedback_start",
                    "BODY_GROUP": "larm",
                    "TARGET": "-0.1;-0.38;1",
                    "JOINT": "lhand",
                    "OFFSET": "0;0;0"
                  },
                  {
                    "FEEDBACK_ID": "feedback_start",
                    "BODY_GROUP": "rarm",
                    "TARGET": "0.1;-0.38;1",
                    "JOINT": "rhand",
                    "OFFSET": "0;0;0"
                  }
                ],
                "SWIVEL_CONSTRAINT": [
                  {
                    "FEEDBACK_ID": "feedback_start",
                    "BODY_GROUP": "larm",
                    "SWIVEL_ANGLE": "50.0"
                  },
                  {
                    "FEEDBACK_ID": "feedback_start",
                    "BODY_GROUP": "rarm",
                    "SWIVEL_ANGLE": "50.0"
                  }
                ]
              };

*/
/** 
    Translate the main script object to EMBR script
*/
function jsonToEMBR(scriptObject){
    var script = "TIME_RESET";
    script += "\nBEGIN K_POSE_SEQUENCE  # --- LEXEME:";
    script += "\nCHARACTER:" + scriptObject.K_POSE_SEQUENCE.CHARACTER;
    script += "\nSTART:" + scriptObject.K_POSE_SEQUENCE.START;
    script += "\nFADE_IN:" + scriptObject.K_POSE_SEQUENCE.FADE_IN;
    script += "\nFADE_OUT:" + scriptObject.K_POSE_SEQUENCE.FADE_OUT;
    
    var poses = scriptObject.K_POSE_SEQUENCE.K_POSE;
    if(poses != undefined){
        for(var i = 0; i < poses.length; i++){
            if(poses[i].active){
                script += "\n BEGIN K_POSE  # --- Pose "+ i +" --- SYNC:" + poses[i].SYNC;
                script += "\n  TIME_POINT:+" + poses[i].TIME_POINT;
                script += "\n  HOLD:" + poses[i].HOLD;
                script += poseToEMBR(poses[i]);
                script += "\n END";
            }
        }
    }
    script += "\nEND\n";
    return script;
}


/** 
    Translate the pose object to EMBR script
*/
function poseToEMBR(pose){
    var script = "";
    
    if(typeof pose.POSITION_CONSTRAINT !="undefined"){
        var pConstraints = pose.POSITION_CONSTRAINT;
        for(var i = 0; i < pConstraints.length; i++){
            script += "\n  BEGIN POSITION_CONSTRAINT";
            script += "\n   FEEDBACK_ID:" + pose.FEEDBACK_ID;
            script += "\n   BODY_GROUP:" + pConstraints[i].BODY_GROUP;
            script += "\n   TARGET:" + pConstraints[i].TARGET[0] + ";" 
                + pConstraints[i].TARGET[1] + ";" + pConstraints[i].TARGET[2];
            script += "\n   JOINT:" + pConstraints[i].JOINT;
            script += "\n   OFFSET:" + pConstraints[i].OFFSET[0] + ";" 
                + pConstraints[i].OFFSET[1] + ";" + pConstraints[i].OFFSET[2];
            script += "\n  END";
        }
    }
    
    if(typeof pose.SWIVEL_CONSTRAINT !="undefined"){
        var sConstraints = pose.SWIVEL_CONSTRAINT
        for(var i = 0; i < sConstraints.length; i++){
            script += "\n  BEGIN SWIVEL_CONSTRAINT";
            script += "\n   FEEDBACK_ID:" + pose.FEEDBACK_ID;
            script += "\n   BODY_GROUP:" + sConstraints[i].BODY_GROUP;
            script += "\n   SWIVEL_ANGLE:" + sConstraints[i].SWIVEL_ANGLE;
            script += "\n  END";
        }
    }
    
    if(typeof pose.ORIENTATION_CONSTRAINT !="undefined"){
        var oConstraints = pose.ORIENTATION_CONSTRAINT;
        for(var i = 0; i < oConstraints.length; i++){
            script += "\n  BEGIN ORIENTATION_CONSTRAINT";
            script += "\n   FEEDBACK_ID:" + pose.FEEDBACK_ID;
            script += "\n   BODY_GROUP:" + oConstraints[i].BODY_GROUP;
            script += "\n   DIRECTION:" + oConstraints[i].DIRECTION[0] + ";" 
                + oConstraints[i].DIRECTION[1] + ";" + oConstraints[i].DIRECTION[2];
            script += "\n   JOINT:" + oConstraints[i].JOINT;
            script += "\n   NORMAL:" + oConstraints[i].NORMAL;
            script += "\n  END";
        }
    }
    
    if(typeof pose.SHADER !="undefined"){
        var shader = pose.SHADER
        for(var i = 0; i < shader.length; i++){
            script += "\n  BEGIN SHADER";
            script += "\n   FEEDBACK_ID:" + pose.FEEDBACK_ID;
            script += "\n   SHADER_KEY:" + shader[i].SHADER_KEY;
            script += "\n   SHADER_VALUE:" + shader[i].SHADER_VALUE;
            script += "\n  END";
        }
    }
    
    return script;
}

/** 
    Add a pose object to the main script object
*/
/*function addPose(pose){
    if(typeof scriptObject.K_POSE_SEQUENCE.K_POSE == "undefined"){
        scriptObject.K_POSE_SEQUENCE.K_POSE = [pose];
    } else{
        var index = scriptObject.K_POSE_SEQUENCE.K_POSE.length;
        scriptObject.K_POSE_SEQUENCE.K_POSE[index] = pose;
    }
}*/


/**
    Update the Contraint values in the JSON object of EMBR script
*/

function updateEMBRJson( options ){
    //check if script has any poses
    if(typeof scriptObject.K_POSE_SEQUENCE.K_POSE == "undefined"){
        //add a new pose 0 to the json object and local storage
        scriptObject.K_POSE_SEQUENCE.K_POSE = [];
        
        //TODO: Manipulate the time point and hold for the pose here
        var pose = {
                        "active" : true,
                        "TIME_POINT" : "450",
                        "HOLD" : "0",
                        "SYNC" : "start",
                        "FEEDBACK_ID" : "feedback_start"
                   }
        scriptObject.K_POSE_SEQUENCE.K_POSE.push(pose);
        simpleStorage.set("pose", (scriptObject.K_POSE_SEQUENCE.K_POSE.length - 1));
        //console.log("Current Pose Set to:", localStorage.getItem("pose"));
    }
    
    //Update the respective pose
    scriptObject.K_POSE_SEQUENCE.K_POSE = updatePose(options);
    
    //Save the updated JSON to LocalStorage
    simpleStorage.set('script', scriptObject); 
    
    //Convert the JSON to EMBR
    embrScript.value = jsonToEMBR(scriptObject);
}

function updatePose(options){
    //get the current pose number
    var currentPose = 0;
    if(simpleStorage.hasKey('pose')){
        currentPose = simpleStorage.get('pose');        
    }else{
        simpleStorage.set("pose", 0);
    }
    
    var poseArray = scriptObject.K_POSE_SEQUENCE.K_POSE;
    var pose = poseArray[currentPose];
    
    //check the constraint value, if the constraint is already there, update the constraint
    //else add a new constraint with the value
    
    //convert the constraint into a json object
    var newConstraint = {};
    if(options.constraint === "pConstraint"){
        newConstraint = getPConstraint(options);
        constraintName = "POSITION_CONSTRAINT";
    }if(options.constraint === "sConstraint"){
        newConstraint = getSConstraint(options.left);
        constraintName = "SWIVEL_CONSTRAINT";
    }if(options.constraint === "oConstraint"){
        newConstraint = getOConstraint(options);
        constraintName = "ORIENTATION_CONSTRAINT";
    }if(options.constraint === "shader"){
        newConstraint = getShader(options);
        constraintName = "SHADER";
    }
    

    if( pose.hasOwnProperty( constraintName ) ){
        //check which value to update i.e. left or right
        var constraintArray = pose[constraintName];
        var index = -1;
        
        //to check if the constraint is orientation constraint and the value of NORMAL is y or z axis
        if(constraintName == "ORIENTATION_CONSTRAINT"){
            /*//Check if the body group is head or arm
            if(options.bodyGroup == "Body"){
                //Check for the Body constraint object
                for(var i=0; i < constraintArray.length; i++){
                    var currentConstraint = constraintArray[i];
                    if(currentConstraint.BODY_GROUP == "spine"){
                        index = i;
                    }
                }
            }if(options.bodyGroup == "Head"){
                //Check for the Head constraint object
                for(var i=0; i < constraintArray.length; i++){
                    var currentConstraint = constraintArray[i];
                    if(currentConstraint.BODY_GROUP == "headNeck"){
                        var axis = (currentConstraint.NORMAL == "Yaxis") ? "yaxis" : "zaxis";
                        if(axis == options.axis){
                            index = i;
                        }
                    }
                }
            }else{
                //BodyGroup == Arms
                
                for(var i=0; i < constraintArray.length; i++){
                    var currentConstraint = constraintArray[i];
                    var side = (currentConstraint.BODY_GROUP.split("")[0]=="l") ? true : false;
                    var axis = currentConstraint.NORMAL.split("")[0];
                    
                    if(side && options.left && (axis == "Y") && (options.axis == "yaxis")){
                        index = i;
                    }
                    if(side && options.left && (axis == "Z") && (options.axis == "zaxis")){
                        index = i;
                    }
                    if(!side && !options.left && (axis == "Y") && (options.axis == "yaxis")){
                        index = i;
                    }
                    if(!side && !options.left && (axis == "Z") && (options.axis == "zaxis")){
                        index = i;
                    }
                }
            }*/
                
            var bodyGroup = getBodyGroup(options);
            var normal = ("yaxis" === options.axis) ? "Yaxis" : "Zaxis";
                
            for(var i=0; i < constraintArray.length; i++){
                var currentConstraint = constraintArray[i];
                
                if(currentConstraint.BODY_GROUP == bodyGroup){
                    if(currentConstraint.NORMAL == normal){
                        index = i;
                    }
                }
            }    
                
                
        }
        if(constraintName == "POSITION_CONSTRAINT"){
            var bodyGroup = getBodyGroup(options);
            var joint = getJoint(options);
            
            for(var i=0; i < constraintArray.length; i++){
                var currentConstraint = constraintArray[i];
                
                if(currentConstraint.BODY_GROUP == bodyGroup){
                    if(currentConstraint.JOINT == joint){
                        index = i;
                    }
                }
            }    
        }if(constraintName == "SHADER"){
            
            for(var i=0; i < constraintArray.length; i++){
                var currentConstraint = constraintArray[i];
                
                if(currentConstraint.SHADER_KEY == options.axis){
                    index = i;
                }
            }    
        }else{
            //to check which index of constraint array to update
            for(var i=0; i < constraintArray.length; i++){
                var currentConstraint = constraintArray[i];
                var side = currentConstraint.BODY_GROUP.split("")[0];
                if(side === "l" && options.left){
                    index = i;
                }
                if(side === "r" && !options.left){
                    index = i;
                }
            }
        
        }
        
        if(index == -1){
            pose[constraintName].push(newConstraint);
        }else{
            pose[constraintName][index] = newConstraint;
        }
        
    }else{
        //add a new constraint array and push the values of the constraint
        pose[constraintName] = [];
        pose[constraintName].push(newConstraint);
    }
    poseArray[currentPose] = pose;
    return poseArray;
}

function getPConstraint(options){
    var bodyGroup = getBodyGroup(options);
    var joint =     getJoint(options);
    var feedback =  "feedback_start";
    var target = [];
    
    //var div = (options.left) ? "left" : "right";
    var div = "#"+ options.bodyGroup;
    if(options.left){
            div = div + " .left";
        }else{
            div = div + " .right";
        }
    
    
    $(div).find('.pConstraint').each(function(index){
        var value = $( this ).slider( "option", "value" );
        target.push(value);
    });
    
    //swapping up_down and left_right values, to translate it in EMBR Script format
    var swap = target[0];
    target[0] = target[2];
    target[2] = swap;
    
    //TODO: implement a function to get the offset value
    var newConstraint = {
                            "FEEDBACK_ID": feedback,
                            "BODY_GROUP": bodyGroup,
                            "TARGET": target,
                            "JOINT": joint,
                            "OFFSET": [0, 0, 0]
                    };
    
    return newConstraint;
}

function getSConstraint(left){
    var bodyGroup = (left) ? "larm" : "rarm";
    var feedback =  "feedback_start";
    var swivelAngle;
    
    var div = (left) ? "left" : "right";
    
    //Read the slider value for swivel angle
    $('.' + div).find('.sConstraint').each(function(index){
        swivelAngle = $( this ).slider( "option", "value" );
    });
    
    var newConstraint = {
                            "FEEDBACK_ID": feedback,
                            "BODY_GROUP": bodyGroup,
                            "SWIVEL_ANGLE": swivelAngle
                    };
    
    return newConstraint;
}

function getOConstraint(options){
    
    var bodyGroup = getBodyGroup(options);
    var div = "#"+ options.bodyGroup;
    if(options.left){
            div = div + " .left";
        }else{
            div = div + " .right";
        }
    
    var joint = getJoint(options);
    
    
    var normal =      ("yaxis" === options.axis) ? "Yaxis" : "Zaxis";
    var feedback =  "feedback_start";
    var direction = [];
    
    //var div = (options.left) ? "left" : "right";
    
    $(div).find('.oConstraint.' + options.axis).each(function(index){
        
        var value = $( this ).slider( "option", "value" );
        //console.dir($(this));
        direction.push(value);
    });
    
    console.log($(div).find('.oConstraint.' + options.axis));
    
    //swapping up_down and left_right values, to translate it in EMBR Script format
    var swap = direction[0];
    direction[0] = direction[2];
    direction[2] = swap;
    
    //TODO: implement a function to get the offset value
    var newConstraint = {
                            "FEEDBACK_ID": feedback,
                            "BODY_GROUP": bodyGroup,
                            "DIRECTION": direction,
                            "JOINT": joint,
                            "NORMAL": normal
                    };
    
    return newConstraint;
}
       
function getShader(options){
    //console.log(options);
    var value = "";
    var feedback =  "feedback_start";
    
    //console.log($(".shader"));
    
    $("."+options.constraint).each(function(index){
        value = $( this ).slider( "option", "value" );
    });
    
    
    
    var newConstraint = {
                            "FEEDBACK_ID": feedback,
                            "SHADER_KEY": options.axis,
                            "SHADER_VALUE": value
                        }
    
    return newConstraint;
}

function getBodyGroup(options){
    var bodyGroup = "";
    if(options.bodyGroup == "Arms"){
        
        bodyGroup = (options.left) ? "larm" : "rarm";
        
    }if(options.bodyGroup == "Head"){
        
        bodyGroup = "headNeck";
        
    }if(options.bodyGroup == "Body"){
        
        bodyGroup = "spine";
    }
    
    return bodyGroup;
}
        
function getJoint(options){
    var joint = "";
    if(options.bodyGroup == "Arms"){
        
        joint = (options.left) ? "lhand" : "rhand";
        
    }if(options.bodyGroup == "Head"){
        
        joint = "head";
        
    }if(options.bodyGroup == "Body"){
        
        joint = "spine4";
    }
    
    return joint;
}