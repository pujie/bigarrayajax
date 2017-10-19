<html>
    <head>
        <script type='text/javascript' src='http://code.jquery.com/jquery-latest.js'></script>
        <script type='text/javascript' src='/vendors/padi.autocomplete.js'></script>
    </head>
    <body>
        <input type='text' id='padiText' />
		<button id='populate'> show </button>
		<button id='stoppopulate'> stop </button>
		<ul id='result'>
        </ul>
        <script type='text/javascript'>
            (function($){
                process = function(str){
                    console.log(str);
                    $('#result').prepend('<li>'+str+'</li>');
                }
                main = function(param){
                    $('#result').empty();
                    var endTime = +new Date() + maxtime;
                    var maxtime = 200;
                    $.ajax({
                        url:'/Bigarray/clients',
                        data:{'filter':param},
                        dataType:'json',
                        type:'post'
                    })
                    .done(function(res){
                        fillcombo = function(lres,pr){
                            setTimeout(function(){
                            do{
                                obj = lres.shift();
                                pr(obj.name);
                            }while(lres.length>0 && endTime > +new Date());
                            if(lres.length>0){
                                setTimeout(arguments.callee,20);
                            }else{
                                console.log('Sampun');
                            }
                            },20);
                        }
                        fillcombo(res,process);
                    })
                    .fail(function(err){
                        console.log(err);
                    });
                }
                //main();
                $('#populate').click(function(){
                    main($('#padiText').val());
                });

            }(jQuery))
        </script>
    </body>
</html>