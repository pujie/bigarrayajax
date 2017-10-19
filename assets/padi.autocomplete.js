(function($){
    var continueLoop = true;
    process = function(result,str){
        result.prepend('<li>'+str+'</li>');
    }
    fillcombo = function(dataArray,doProcess,result,callback){
        var endTime = +new Date()+maxtime,maxtime = 200;
        setTimeout(function(){
            do{
                if(!continueLoop){
                    break;
                }
                obj = dataArray.shift();
                doProcess(result,obj.name);
            }while(dataArray.length>0 && endTime > +new Date() );
            if(dataArray.length>0){
                setTimeout(arguments.callee,20);
            }else{
                console.log('Sampun');
            }
        },20);
        continueLoop = true;
    }
    $.fn.makeAutoComplete = function(options){
        var settings = $.extend({
            result:'',
        },options);
        that = $(this);
        that.keyup(function(){
            settings.result.empty();
            $.ajax({
                url:'/Bigarray/clients',
                data:{'filter':that.val()},
                dataType:'json',
                type:'post'
            })
            .done(function(res){
                //make sure existing loop stop here
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
    $('#stop').click(function(){
        continueLoop = false;
    });
}(jQuery))
