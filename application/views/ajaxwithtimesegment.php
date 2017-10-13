<html>
    <head>
        <script type='text/javascript' src='http://code.jquery.com/jquery-latest.js'></script>
    </head>
    <body>
        <div>Count:<div id='counter'></div></div>
        <div id='main'></div>
        <script type='text/javascript'>
            (function($){
                processArray = function(data,handler,callback){
                    var endtime = +new Date() + maxtime;
                    var maxtime = 100;
                    var delay = 20;
                    var queue = data.concat();
                    console.log('queue',queue);
                    setTimeout(function(){
                        do{
                            handler(queue.shift());
                        }while(queue.length > 0 && endtime > +new Date());
                        
                        if(queue.length>0){
                            setTimeout(arguments.callee,delay);
                        }else{
                            if(callback) callback();
                        }
                        
                    } ,delay);
                }
                process = function(dataitem){
                    console.log('Item',dataitem);
                }
                done = function(){
                    console.log('Done');
                }
                console.log('test');
                $.ajax({
                    url:'/Bigarray/clients',
                    dataType:'json'
                })
                .done(function(res){
                    //console.log(res);
                    processArray(res,process,done);
                })
                .fail(function(err){
                    console.log(err);
                });
            }(jQuery))
        </script>
    </body>
</html>