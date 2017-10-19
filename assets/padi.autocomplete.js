(function($){
    process = function(result,str){
        result.prepend('<li>'+str+'</li>');
    }
    fillcombo = function(dataArray,doProcess,result){
        var endTime = +new Date()+maxtime,maxtime = 200;
        setTimeout(function(){
            do{
                obj = dataArray.shift();
                doProcess(result,obj.name);
            }while(dataArray.length>0 && endTime > +new Date());
            if(dataArray.length>0){
                setTimeout(arguments.callee,20);
            }else{
                console.log('Sampun');
            }
        },20);
    }
    $.fn.makeAutoComplete = function(options){
        var settings = $.extend({
            result:'',
        },options);
        that = $(this);
        that.bind('keyup',function(event){
            settings.result.empty();
            console.log('Event Which',event.which);
            $.ajax({
                url:'/Bigarray/clients',
                data:{'filter':that.val()},
                dataType:'json',
                type:'post'
            })
            .done(function(res){
                fillcombo(res,process,settings.result);
            })
            .fail(function(err){
                console.log(err);
            });
        });
    }    
    $('#padiText').makeAutoComplete({
        result:$('#result'),
    });
}(jQuery))
