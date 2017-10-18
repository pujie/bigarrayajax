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
                fillcombo = function(){
                    var endTime = +new Date() + maxtime;
                    var maxtime = 200;
                    $.ajax({
                        url:'/Bigarray/clients',
                        dataType:'json'
                    })
                    .done(function(res){
                        do{
                            obj = res.shift();
                            console.log('NAME',obj.name);
                        }while(res.length>0 )&& endTime > +new Date());
                    })
                    .fail(function(err){
                        console.log(err);
                    });
                }
                fillcombo();
            }(jQuery))
        </script>
    </body>
</html>