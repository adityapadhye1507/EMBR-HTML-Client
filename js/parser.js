var lines = [];

var parse = function(text){

    lines = text.split('\n');

    //var object = parseRecursion(1, {}, "");
    //console.dir(object);
}

var parseRecursion = function(lineNumber, parent, key){

    var i = lineNumber;
    //i starts with 1 to ignore the first line i.e. TIME_RESET
    while(lines[i]){
        var tokens = lines[i].trim().split(' ');
        //console.log('-----Line '+ i + '------');
        var child = {};
        
        for(j = 0; j < tokens.length; j++){
            //console.log(tokens[j]);
            if(tokens[0] === 'BEGIN'){
                //TODO: Begin creating an object
                key = tokens[1];
                parent[key] = child;
                child = parseRecursion((i+1), parent, key);
            }else if(tokens[0] === 'END'){
                //TODO: End of the object
                return parent;
            }else{
                //TODO: Create a new property of the object
                var properties = tokens[0].split(':');
                parent[key][properties[0]] = properties[1];
                //parent[key] = child;
            }
            i++;
        }
    }
}