(function($){
    var obj = {
        continueLoop:true,
        maxrow:10,
        objdata:[],
        fillcombo : function(doProcess,result){
            var endTime = +new Date()+maxtime,maxtime = 200;
            if(result.attr('display','hidden')){
                result.show();
            }
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
            result.hide();
        },
        setData:function(_data){
            obj.objdata = _data;
        },
        setMaxRow:function(maxrow){
            obj.maxrow = maxrow;
        }
    }
    process = function(result,str){
        result.prepend('<li>'+str+'</li>');
    }
    $.fn.makeAutoComplete = function(options){
        var settings = $.extend({
            result:'',
            maxrow:10,
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
                obj.setMaxRow(settings.maxrow);
                obj.continuefill();
                obj.fillcombo(process,settings.result);
            })
            .fail(function(err){
                console.log(err);
            });
        });
        var liSelected;
        that.on('keyup',function(event){
            $('#result li').each(function(){
                $(this).removeClass('selected');
            })
            li = $('#result li');
            switch(event.which){
                case 40:
                    if(liSelected){
                        liSelected.removeClass('selected');
                        next = liSelected.next();
                        if(next.length>0){
                            liSelected = next.addClass('selected');
                        }else{
                            liSelected = li.eq(0).addClass('selected');
                        }
                    }else{
                        liSelected = li.eq(0).addClass('selected');
                    }
                break;
                case 38:
                    if(liSelected){
                        liSelected.removeClass('selected');
                        prev = liSelected.prev();
                        if(prev.length>0){
                            liSelected = prev.addClass('selected');
                        }else{
                            liSelected = li.last().addClass('selected');
                        }
                    }else{
                        liSelected = li.last().addClass('selected');
                    }
                    break;
                case 27:
                    console.log('Iam Emtptying result');
                    obj.emptyresult($('#result'));
                    console.log('Emtptiying result');
                break;
            }
        })
    }    
    $('#padiText').makeAutoComplete({
        result:$('#result'),
    });
}(jQuery))
