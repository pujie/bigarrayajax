(function($){
    var obj = {
        continueLoop:true,
        objdata:[],
        fillcombo : function(doProcess,result){
            var endTime = +new Date()+maxtime,maxtime = 200;
            setTimeout(function(){
                do{
                    if(!obj.continueLoop){
                        break;
                    }
                    obj_ = obj.objdata.shift();
                    doProcess(result,obj_.name);
                }while(obj.objdata.length>0 && endTime > +new Date() );
                if(obj.objdata.length>0){
                    setTimeout(arguments.callee,20);
                }else{
                    console.log('Sampun');
                }
            },20);
        },
        stopfill:function(){
            obj.continueLoop = false;
        },
        continuefill:function(){
            console.log('Process Run');
            obj.continueLoop=true;
        },
        emptyresult:function(result){
            console.log('Empty Result');
            result.empty()
        },
        setData:function(_data){
            obj.objdata = _data;
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
        that.on('input',function(){
            obj.stopfill();
            settings.result.empty();
            $.ajax({
                url:'/Bigarray/clients',
                data:{'filter':that.val()},
                dataType:'json',
                type:'post'
            })
            .done(function(res){
                obj.setData(res);
                obj.continuefill();
                obj.fillcombo(process,settings.result);
            })
            .fail(function(err){
                console.log(err);
            });
        });
    }    
    $('#padiText').makeAutoComplete({
        result:$('#result'),
    });
    $('#start').click(function(){
        obj.continuefill();
        obj.fillcombo(process,$('#result'));
    });
    $('#stop').click(function(){
        obj.stopfill();
        obj.emptyresult();
    });
}(jQuery))
