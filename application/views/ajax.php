<html>
    <head>
        <script type='text/javascript' src='http://code.jquery.com/jquery-latest.js'></script>
    </head>
    <body>
        <div>Count:<div id='counter'></div></div>
        <div id='main'></div>
        <script type='text/javascript'>
            (function($){
                console.log('test');
                $.ajax({
                    url:'/Bigarray/clients',
                    dataType:'json'
                })
                .done(function(res){
                    console.log(res);
                    c = 0;
                    $.each(res,function(key,val){
                        console.log('VAL',val);
                        console.log('KEY',key);
                        $('#main').append('<div>'+val.name+'</div>');
                        c++;
                        $('#counter').html(c);
                    })
                })
                .fail(function(err){
                    console.log(err);
                });
            }(jQuery))
        </script>
    </body>
</html>