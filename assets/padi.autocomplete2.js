(function($){
    //var continueLoop = true;
    var obj = {
        continueLoop:true,
        fillcombo : function(dataArray,doProcess,result){
            console.log('Process begin !!!');
            var endTime = +new Date()+maxtime,maxtime = 200;
            setTimeout(function(){
                do{
                    if(!obj.continueLoop){
                        break;
                    }
                    obj_ = dataArray.shift();
                    doProcess(result,obj_.name);
                }while(dataArray.length>0 && endTime > +new Date() );
                if(dataArray.length>0){
                    setTimeout(arguments.callee,20);
                    //setTimeout(obj.fillcombo(dataArray,doProcess,result),20);
                }else{
                    console.log('Sampun');
                }
            },20);
        },
        stopfill:function(){
            console.log('Process Stopped !!!    ');
            obj.continueLoop = false;
        },
        continuefill:function(){
            console.log('Process Run');
            obj.continueLoop=true;
        }
    }
    process = function(result,str){
        result.prepend('<li>'+str+'</li>');
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
                obj.continuefill();
                obj.fillcombo(res,process,settings.result);
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
        //continueLoop = false;
        obj.stopfill();
    });
}(jQuery))
