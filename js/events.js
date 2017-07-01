var sliderChange = function(slider){
    var value = $(slider).slider( "option", "value" );
    var parent = slider.parentElement;
    
    var bodyGroup = parent.parentElement.parentElement.id;
    
    var parentName = $(parent).attr('class').split(' ')[0];
    var left = false;
    
    if(parentName == "left"){
        left = true;
    }    
    var constraint = $(slider).attr('class').split(' ')[0];
    var axis = $(slider).attr('class').split(' ')[1];
    
    var options = {
                    left : left,
                    constraint : constraint,
                    axis : axis,
                    bodyGroup : bodyGroup
    }
    
    //console.dir(options);
    
    updateEMBRJson(options);
    for(var i=0; i<6; i++){
        //setTimeout(function(){animateBen();}, 100);
    }
}