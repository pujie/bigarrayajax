implementProcess = function(data){
    console.log("Data",data);
}
makeComplete = function(){
    var forceExit = false,
    maxTime = 200;
    functs = {
        doProcess = function(queue){
            do{
                if(forceExit){
                    break;
                }
                obj = queue.shift();
                implementProcess(obj);
            }while(
                queue.length > 0 && maxTime > +new Date()
            );
            if(queue.length > 0){
                setTimeout(arguments.callee,20);
            }
        },
        breakProcess = function(){
            forceExit = true;
        }
    }
}
