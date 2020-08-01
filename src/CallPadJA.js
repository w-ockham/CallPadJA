/* Callsign Entry Pad for Amateur radio station in JA. 
   Author: JL1NIE
   Based on the following keypad-plugin  
   Author:Vijay krish
   URL:"https://github.com/VijayKrish93/Keypad-plugin"
   Type:Jquery plugin
   Description:Compact keypad plugin which supports text and Numeric
*/

(function($){
    $.fn.keypad=function(options){
	var options=$.extend({width:300,height:100,candidates:20},options);
	var ele=this;
	var keymap=[];
	var keystate = 0;
	var num_query=''
	var list_query=''
	var query_param=''
	var list_query_param=''
	var target={
	    init:function(){
		num_query = 'https://www.tele.soumu.go.jp/musen/num?'
		list_query = 'https://www.tele.soumu.go.jp/musen/list?'
		query_param = 'ST=1&OW=AT&OF=2&MA='
		list_query_param = 'ST=1&OW=AT&OF=2&DA=0&SC=0&DC=1&MA='
		funckey = {
		    "11":'Clear',"12":"BS"
		}
		keymap= [
		    {
			"1":'J',"2":'7',"3":'8',"4":'*',"5":'*',
			"6":'*',"7":'*',"8":'*',"9":'*',"10":'*',
			"11":'*',"12":'*',"13":'*',"14":'*',"15":'*',
			"16":'*',"17":'*',"18":'*',"19":'*',"20":'*'
		    },
		    {
			"1":'J',"2":'K',"3":'L',"4":'M',"5":'N',
			"6":'*',"7":'*',"8":'*',"9":'*',"10":'*',
			"11":'*',"12":'*',"13":'*',"14":'*',"15":'*',
			"16":'*',"17":'*',"18":'*',"19":'*',"20":'*'

		    },
		    {
			"1":'A D',"2":'E F',"3":'G H',"4":'I J',"5":'K L',
			"6":'M N',"7":'O P',"8":'Q R',"9":'S',"10":'*',
			"11":'1',"12":'2',"13":'3',"14":'4',"15":'5',
			"16":'6',"17":'7',"18":'8',"19":'9',"20":'0'
		    },
		    {
			"1":'A B',"2":'C D',"3":'E F',"4":'G H',"5":'I J',
			"6":'K L',"7":'M N',"8":'O P',"9":'Q R',"10":'S T',
			"11":'U V',"12":'W X',"13":'Y Z',"14":'/',"15":'*',
			"16":'*',"17":'*',"18":'*',"19":'*',"20":'*'
		    },
		    {
			"1":'1',"2":'2',"3":'3',"4":'4',"5":'5',
			"6":'6',"7":'7',"8":'8',"9":'9',"10":'0',
			"11":'*',"12":'*',"13":'*',"14":'*',"15":'*',
			"16":'*',"17":'*',"18":'*',"19":'*',"20":'*',
		    }
		];
		keystate = 0
	    },
	    markup:function(){
		var input=document.createElement("INPUT");
		input.setAttribute('list',"__soumu_callsign_list")
		input.setAttribute('oninput',"station_input();")
		input.style.width=options.width-50+"px";
		input.style.height="20px";
		input.style.margin="0px 0px 5px 0px";
		input.style.padding="0px";
		input.style.fontSize="15px";
		ele.append(input);
		var span=document.createElement("SPAN");
		span.style.width=20+"px";
		span.style.height="10px";
		span.style.margin="0px 0px 5px 0px";
		span.style.padding="0px";
		span.style.fontSize="10px";
		ele.append(span);
		var datalist=document.createElement("DATALIST")
		datalist.id="__soumu_callsign_list";
		ele.append(datalist);
		ele.css({"width":options.width,"height":options.height,"display":"block"});
		for(var key in keymap[keystate]){
		    var button=document.createElement("BUTTON");
		    button.style.display="inline-block";
		    button.style.height=(options.height/2)-5+"px";
		    button.style.width=(options.width/5)-5+"px";
		    var fontSize=((options.width/4)-5)/6;
		    button.style.margin="2px 2px";
		    button.style.fontSize=fontSize+"px";
		    button.setAttribute("data-value",key);
		    button.innerHTML=keymap[keystate][key];
		    $(ele).append(button);
		}
		for(var key in funckey){
		    var button=document.createElement("BUTTON");
		    button.style.display="inline-block";
		    button.style.height=(options.height/3)-5+"px";
		    button.style.width=(options.width/2)-5+"px";
		    var fontSize=((options.width/4)-5)/6;
		    button.style.margin="2px 2px";
		    button.style.fontSize=fontSize+"px";
		    button.setAttribute("data-value",key);
		    button.innerHTML=funckey[key];
		    $(ele).append(button);
		}

	    }
	};
	target.init();    
	target.markup();
	$(ele).find("button").mouseup(function(event){
            var button_val=$(event.currentTarget).attr("data-value");
            $(ele).children("input").val(inputmessage($(ele).children('input').val(),button_val));
	});

	window.station_input = function station_input (){
	    text = $('input').val()
	    $(ele).find("span").each(function(index, s) { s.innerHTML = '';});
	    station_query(text)
	    console.log(keystate)
	    if (text.length > 2) {
		if (text[text.length -1] == '/')
		    keystate = 2
		    else
			keystate = 3
	    }
	    else if (text.length > 1) {
		keystate = 2
	    } else if (text.length > 0) {
		if (text[0] == 'J')
		   keystate = 2
		else
		    keystate = 1
	    } else
		this.keystate = 0

	    $(ele).find("button").each(function( index, b) {
		if (index < 20)
		    b.innerHTML=keymap[keystate][index+1];
		})
	}
	function station_query(text) {
	    if (text.length > 2)
		if (options.candidates > 0) {
		    dl = $('datalist')
		    dl.empty()
		    $.getJSON(num_query, query_param + text,function(res) {
			number = res['musenInformation']['totalCount']
			$(ele).find("span").each(function(index, s) { s.innerHTML = number+'局';});
			if (number < options.candidates ) {
			    $.getJSON(list_query, list_query_param + text,function(res){
				station = res['musen']
				if (station) {
				    for (var s of station) {
					name = s['listInfo']['name']
					call = name.replace(/\S*（(\w+)）\S*/g,'$1')
					addr = s['listInfo']['tdfkCd']
					console.log(call +' ' +  addr + ' ' +name)
					var opt = document.createElement("OPTION")
					opt.value=call
					dl.append(opt)
				    }
				}
			    })
			}
		    })
		}
	}

	function inputmessage(text,button_pressed){
	    if($("#time").length)
	    {  
		var currenttime=+new Date();
		var diff=currenttime-$("#time").val();
		document.getElementById("time").value=currenttime;
	    }
	    else
	    {
		var inp=document.createElement("INPUT");
		inp.setAttribute("type","hidden");
		inp.setAttribute("id","time");
		inp.setAttribute("value",+new Date());
		document.body.appendChild(inp);
	    }

	    var str=$(event.currentTarget).text();
	    str=str.split(" ");
	    var i=0, samestate = false;
	    
	    if (str.length > 1) {
		if(!diff||diff<1500) {
		    if (str.length==2) {
			if(text[text.length-1]==str[i])
			{
			    text=text.split('');
			    text.pop();
			    var arr=text.join('');
			    text=arr+str[i+1];
			}
			else if(text[text.length-1]==str[i+1])
			{
			    text=text.split('');
			    text.pop();
			    var arr=text.join('');
			    text=arr+str[i];
			} else
			    text=text+str[i];
		    } if (str.length==3) {
			if(text[text.length-1]==str[i])
			{
			    text=text.split('');
			    text.pop();
			    var arr=text.join('');
			    text=arr+str[i+1];
			}
			else if(text[text.length-1]==str[i+1])
			{
			    text=text.split('');
			    text.pop();
			    var arr=text.join('');
			    text=arr+str[i+2];
			}
			else if(text[text.length-1]==str[i+2])
			{
			    text=text.split('');
			    text.pop();
			    var arr=text.join('');
			    text=arr+str[i];
			} else
			    text=text+str[i];
		    }
		} else
		    text=text+str[i];
		samestate = true;
	    }
	    else if (str[i] == 'Clear') {
		text = ''
		keystate = 0
		$(ele).find("button").each(function( index, b) {
		    if (index < 20)
			b.innerHTML=keymap[keystate][index+1];
		})
		$(ele).find("span").each(function(index, s) { s.innerHTML = '';});
		return text
	    } else if (str[i] == 'BS') {
		text = text.slice(0,-1)
		if (text.length > 2) {
		    if (text[text.length -1] == '/')
			keystate = 2
		    else
			keystate = 3
		}
		else if (text.length > 1) {
			keystate = 2
		} else if (text.length > 0) {
		    if (text[0] == 'J')
			keystate = 2
		    else
			keystate = 1
		} else
		    keystate = 0
		
		$(ele).find("button").each(function( index, b) {
		    if (index < 20)
			b.innerHTML=keymap[keystate][index+1];
		})
		station_query(text)
		return text
	    } else if(str[i] != '*') {
		text=text+$(event.currentTarget).text();
		if (str[i] == 'S')
		    samestate = true;
	    } else {
		document.getElementById("time").value=0
		samestate = true;
	    }
	    
	    if(!samestate) {
		if (keystate == 0) {
		    if (str[i] == 'J')
			keystate = 2
		    else
			keystate = 1;
		} else if (keystate == 1) {
		    keystate = 2;
		} else if (str[i] == '/' && keystate == 3) {
		    keystate = 4
		} else if (keystate == 4) {
		    keystate = 3
		} else {
		    keystate++;
		    if (keystate > 4)
			keystate = 3;
		}
		$(ele).find("button").each(function( index, b) {
		    if (index < 20)
			b.innerHTML=keymap[keystate][index+1];
		})
	    }
	    station_query(text)
	    return text;
	}
	return target;  
    };
}(jQuery));
