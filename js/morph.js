//Function to add a Morph value into JSON for the current pose
var addMorph = function(){
    //Get the current pose
    var currentPose = 0;
    
    if(simpleStorage.hasKey('pose')){
      currentPose = simpleStorage.get('pose');
    }  
    
    var pose = scriptObject.K_POSE_SEQUENCE.K_POSE[currentPose];
    
    if( pose != "undefined" ){
        //Check if MORPH_TARGET array is already present
        if(pose.MORPH_TARGET == undefined){
            pose.MORPH_TARGET = [];
        }
        pose.MORPH_TARGET.push({
            "FEEDBACK_ID":"feedback_start",
            "MORPH_KEY":"undefined",
            "MORPH_VALUE":0.67
        });
        
        simpleStorage.set("script", scriptObject);
        
        //Initialise the Morph table again to see the changes
        initMorph();
    }else{
        console.error("No pose found!!!");
    }
}


//Initialise the Morph Table with existing values in Script JSON for the current pose
var initMorph = function(){
    var $morphTable = $('#morphTable > tbody').html("");
    var $lastRow = $('#morphTable  > tbody:last-child');
    
    var currentPose = 0;
    
    if(simpleStorage.hasKey('pose')){
      currentPose = simpleStorage.get('pose');
    }  
    
    var pose = scriptObject.K_POSE_SEQUENCE.K_POSE[currentPose];

    
    if( pose != "undefined" ){
        if(pose.MORPH_TARGET != undefined){
            for(var i=0; i<pose.MORPH_TARGET.length; i++){
                var select = "<td class='col-md-4'><select name="+i+" class='expression'>";
                //Populate Select with options from predefined morph keys
                $.each(morphKeys, function(key, value){
                    //select.append($('<option>').text(obj.text).attr('value', obj.val));
                    if(pose.MORPH_TARGET[i].MORPH_KEY == value){
                        select += '<option value='+ value +' selected>'+ key +'</option>';
                    } else{
                        select += '<option value='+ value +'>'+ key +'</option>';
                    }
                    
                    
                });
                
                select += '</select></td>';
                
                var morphValue = "<td class='col-md-6'>Intensity<div id='Morph_"+ i +"' class='fConstraint left_right'></div></td>";
                
                var deleteButton = "<td class='col-md-2'><button onClick='deleteMorph(" + i + ")'>X</button></td>";
                
                $lastRow.append('<tr class="morphRow" name="'+ i +'">' 
                              + select
                              + morphValue
                              + deleteButton
                              + '</tr>');
            }
            
            
            
            //Add onChange listener to select statement
            $( ".expression" ).change( changeMorphListener );
            
            initMorphSlider(pose); 
        }
    }
    
    //update EMBR script in text area
    embrScript.value = jsonToEMBR(scriptObject);
     
}

//Initialise the sliders with their respective values
var initMorphSlider = function(pose){
    
    $(".fConstraint")
    .slider({
        max: 1.5,
        min: 0,
        range: "min",
        step: 0.001,
        orientation: "horizontal",
        //Initialize the slider with existing value
        create : function( event, ui){
            //Select the expression by it's ID
            var morphId = parseInt(this.id.substr(6));
            
            //Get value from JSON
            $(this).slider({
                value: parseFloat(pose.MORPH_TARGET[morphId].MORPH_VALUE)
            });
            
        }
    })
    .slider("pips", {
        first: "pip",
        last: "pip"
    })
    .slider("float");
    
    $( ".fConstraint" ).on( "slidechange", function( event, ui ) {
            sliderChange(this);
    });
}


//Function to delete Morph value from Morph Table
var deleteMorph = function(morphId){
    
    //Get the current pose
    var currentPose = 0;
    
    if(simpleStorage.hasKey('pose')){
      currentPose = simpleStorage.get('pose');
    }  
    
    var pose = scriptObject.K_POSE_SEQUENCE.K_POSE[currentPose];
    
    //Code to delete the morph
    
    pose.MORPH_TARGET.splice( morphId, 1 );

    simpleStorage.set("script", scriptObject);
    
    initMorph();
}

//Function to change Morph value from Morph Table
var changeMorphListener = function(){
    
    //Get the current pose
    var currentPose = 0;
    
    if(simpleStorage.hasKey('pose')){
      currentPose = simpleStorage.get('pose');
    }  
    
    var pose = scriptObject.K_POSE_SEQUENCE.K_POSE[currentPose];
    
    var morphId = parseInt(this.name);
    
    pose.MORPH_TARGET[morphId].MORPH_KEY = this.value;
    
    //Save the updated JSON to LocalStorage
    simpleStorage.set('script', scriptObject); 
    
    initMorph();
}
