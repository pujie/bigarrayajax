<html>
    <head>
        <script type='text/javascript' src='http://code.jquery.com/jquery-latest.js'></script>
        <script type='text/javascript' src='/vendors/padi.autocomplete.js'></script>
    </head>
    <body>
        <input type='text' id='padiText' />
		<button id='save'> >> </button>
		<ul id='result'>
        </ul>
        <script type='text/javascript'>
            (function($){
                process = function(str){
                    console.log(str);
                    $('#result').append('<li>'+str+'</li>');
                }
                    var endTime = +new Date() + maxtime;
                    var maxtime = 200;
                    $.ajax({
                        url:'/Bigarray/clients',
                        dataType:'json'
                    })
                    .done(function(res){
                        fillcombo = function(lres,pr){
                            setTimeout(function(){
                            do{
                                obj = lres.shift();
                                pr('NAME '+obj.name);
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
            }(jQuery))
        </script>
    </body>
</html>