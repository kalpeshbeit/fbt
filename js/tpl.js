function privatePriceRowWithRadio(radio_name,radio_value,label,price,ischecked)
{
	var htm='';
	htm+='<ons-list-item modifier="tappable">';
    htm+='<ons-row class="row">';
     htm+='<ons-col class="concat-text" width="80%">';
       htm+='<label class="radio-button checkbox--list-item">';
	     htm+='<input type="radio" name="'+radio_name+'" class="'+radio_name+'" value="'+radio_value+'" '+ischecked+' >';
	     htm+='<div class="radio-button__checkmark checkbox--list-item__checkmark"></div>';
	     htm+='<p class="description item-name rrrrrrrrrrrrrrrrrrrrr"> '+label+'</p>';
	   htm+='</label>';
	  htm+='</ons-col>';	
	  htm+='<ons-col class="text-right" ><price>'+price+'</price></ons-col>';
    htm+='</ons-row>';
    htm+='</ons-list-item>';
    return htm;
}

function privatePriceRowWithRadio2(radio_name,radio_value,label,price,ischecked)
{
	var htm='';
	htm+='<ons-list-item modifier="tappable">';
    htm+='<ons-row class="row">';
     htm+='<ons-col class="concat-text" width="50%">';
       htm+='<label class="radio-button checkbox--list-item">';
	     htm+='<input type="radio" name="'+radio_name+'" class="'+radio_name+'" value="'+radio_value+'" '+ischecked+' >';
	     htm+='<div class="radio-button__checkmark checkbox--list-item__checkmark"></div>';
	     htm+='<p class="description item-name concat-text"> '+label+'</p>';
	   htm+='</label>';
	  htm+='</ons-col>';	
	  htm+='<ons-col class="text-right" >'+price+'</ons-col>';
    htm+='</ons-row>';
    htm+='</ons-list-item>';
    return htm;
}

function subItemRowWithRadio(subcat_id,radio_name,radio_value,label,price,ischecked)
{
	
	radioData=radio_value.split('|');
	var htm='';
	htm+='<ons-list-item modifier="tappable">';
    htm+='<ons-row class="row">';
     htm+='<ons-col class="concat-text" width="80%">';
       htm+='<label class="radio-button checkbox--list-item">';
	     htm+='<input type="radio" name="'+radio_name+'_'+subcat_id+'" class="'+radio_name+' sub_item_name_'+subcat_id+'" value="'+radio_value+'" '+ischecked+' data-id="'+subcat_id+'"  data-price="'+radioData[1]+'"  >';
	     htm+='<div class="radio-button__checkmark checkbox--list-item__checkmark"></div>';
	     htm+='<p class="description item-name concat-text"> '+label+'</p>';
	   htm+='</label>';
	  htm+='</ons-col>';	
	  htm+='<ons-col class="text-right" ><price>'+price+'</price></ons-col>';
    htm+='</ons-row>';
    htm+='</ons-list-item>';
    return htm;
}

function subItemRowWithCheckbox(subcat_id, radio_name, radio_value, label, price, multi_option_val)
{
	
	radioData=radio_value.split('|');
	var htm='';
	htm+='<ons-list-item modifier="tappable">';
    htm+='<ons-row class="row">';
     htm+='<ons-col class="concat-text" width="80%">';
       htm+='<label class="checkbox checkbox--list-item">';
	     htm+='<input type="checkbox" name="'+radio_name+'_'+subcat_id+'" class="sub_item_custom '+radio_name+' sub_item_name_'+subcat_id+' " value="'+radio_value+'" data-id="'+subcat_id+'"   data-price="'+radioData[1]+'" data-multi="'+multi_option_val+'"  >';
	     htm+='<div class="checkbox__checkmark checkbox--list-item__checkmark"></div>';
	     htm+='<p class="description item-name concat-text"> '+label+'</p>';
	   htm+='</label>';
	  htm+='</ons-col>';	
	  htm+='<ons-col class="text-right" ><price>'+price+'</price></ons-col>';
    htm+='</ons-row>';
    htm+='</ons-list-item>';
    return htm;
}

function subItemRowWithCheckboxQty(subcat_id,radio_name,radio_value,label,price)
{
	radioData=radio_value.split('|');
	var htm='';
	htm+='<ons-list-item modifier="tappable">';
    htm+='<ons-row class="row">';
     htm+='<ons-col class="concat-text" width="73%">';
       htm+='<label class="checkbox checkbox--list-item">';
	     htm+='<input type="checkbox" name="'+radio_name+'_'+subcat_id+'" class="'+radio_name+' sub_item_name_'+subcat_id+'" " value="'+radio_value+'" data-id="'+subcat_id+'" data-withqty="2"   data-price="'+radioData[1]+'" >';
	     htm+='<div class="checkbox__checkmark checkbox--list-item__checkmark"></div>';
	     htm+='<p class="description item-name concat-text"> '+label+'</p>';
	   htm+='</label>';
	  htm+='</ons-col>';	
	  
	  htm+='<ons-col class="concat-text" width="10%">';
	  htm+='<input name="subitem-qty" type="number" class=" numeric_only small-input text-center text-input text-input--underbar subitem-qty " ';
      htm+='placeholder="qty" value="1">';
	  htm+='</ons-col>';	
	  
	  htm+='<ons-col class="text-right" ><price>'+price+'</price></ons-col>';
    htm+='</ons-row>';
    htm+='</ons-list-item>';
    return htm;
}

function privateRowWithRadio(radio_name,radio_value,label)
{
	
	radioData=radio_value.split('|');
	var htm='';
	htm+='<ons-list-item modifier="tappable">';
       htm+='<label class="radio-button checkbox--list-item">';
	     htm+='<input type="radio" name="'+radio_name+'" class="'+radio_name+'" value="'+radio_value+'" >';
	     htm+='<div class="radio-button__checkmark checkbox--list-item__checkmark"></div>';
	     htm+='<p class="description item-name"> '+label+'</p>';
	   htm+='</label>';
	htm+='</ons-list-item>';
	return htm;
}

function privateRowWithCheckbox(radio_name,class_name,radio_value,label)
{
	var htm='';
	htm+='<ons-list-item modifier="tappable">';
       htm+='<label class="checkbox checkbox--list-item">';
	     htm+='<input type="checkbox" name="'+radio_name+'" class="'+class_name+'" value="'+radio_value+'" >';
	     htm+='<div class="checkbox__checkmark checkbox--list-item__checkmark"></div>';
	     htm+='<p class="description item-name"> '+label+'</p>';
	   htm+='</label>';
	htm+='</ons-list-item>';
	return htm;
}

function cartFooter(currency_code)
{
  var htm='';  
  

   
   htm+='<ons-row class="row cart-total-wrap my-cart-totl">';
    htm+='<ons-col  class="total qtt-text trn" width="71%"  style="padding-left:10px; padding-top: 7px;float:left;" data-trn-key="total">Quantity</ons-col>';
	
	
	
	  htm+='<ons-col class="concat-text qu-min" width="35px">';
        htm+='<button class="button button--quiet" onclick="addCartQty(1)">';
          htm+='<ons-icon class="icon-green" icon="fa-minus"></ons-icon>';
        htm+='</button>';
      htm+='</ons-col>';
	  
	     htm+='<ons-col class="qu-box" width="31px" style="">';
      
         htm+='<ons-row class="row grey-border-bottom qu-box-bdr">';
           
		   
             htm+='<ons-col>';
             htm+='<input name="qty" type="number" style="text-align: center; font-size: 16px; padding-bottom: 7px;" class="qty numeric_only text-input text-input--transparent" value="1">';
             htm+='</ons-col>';
		
         htm+='</ons-row>';
         
      htm+='</ons-col>';
	  
      htm+='<ons-col class="concat-text qu-plus" width="35px">';
         htm+='<button class="button button--quiet" onclick="addCartQty(2)">';
          htm+='<ons-icon class="icon-green" icon="fa-plus"></ons-icon>';
        htm+='</button>';
      htm+='</ons-col>';
	  
	  
	  
    htm+='</ons-row>';
            
    htm+='<div id="totalCountitem" class="wrapper cart-total-wrap">';
    htm+='<ons-row class="row">';
      htm+='<ons-col class="total text-center trn" width="50%" data-trn-key="total">Total</ons-col>';
      htm+='<ons-col class="total_value text-right" width="50%">'+ currency_code+'</ons-col>';
    htm+='</ons-row>';
    htm+='</div>';	
    return htm
}

function tplCartRowNoBorder(item_id, item_name, price, pretty_price, qty, field_name,size,x ,price2, discount)
{	
   var htm='';
   htm+='<ons-list-item class="row-no-border">';
   htm+='<ons-row >';
	   htm+='<ons-col class="concat-text" width="73%">';
		 htm+='<input name="qty" type="number" class="item-qty qty numeric_only small-input text-center text-input text-input--underbar" ';
		  htm+='placeholder="qty" value="'+qty+'" data-rowid="'+x+'">';
		  
		  htm+='<input type="hidden" name="'+field_name+'" class="'
		  +field_name + ' price'+x + ' " value="'+price+'" >';		  
		  
		  htm+='<input type="hidden" name="item_id" class="item_id'+x+' " value="'+ item_id +'" >';
		  htm+='<input type="hidden" name="discount" class="discount'+x+' " value="'+ discount +'" >';

		  if (discount>0){
		  	  price2='<price class="discount">'+ (parseFloat(price2)+parseFloat(discount)) +'</price> '+price2;
		  }
		  
		  if (empty(size))	{
		     htm+='<p class="description item-name concat-text bold r-item"> '+item_name+'</p>';
		  } else {
		  	htm+='<p class="description item-name concat-text bold r-item"> '+item_name+
		  	' <size>('+size+")</size>"
		  	+'</p>';
		  }
	   htm+='</ons-col>';
	   htm+='<p class="description item-name concat-text bold notification grey qtyCustom r_qty">'+qty+'</p>';
	   htm+='<ons-col class="text-right" ><price>'+pretty_price+'</price></ons-col>';
   htm+='</ons-row>';
   
   htm+='<ons-row class="row-del-wrap" >';
   htm+='<ons-col class="text-right" width="100%">';
   htm+='<ons-button modifier="quiet" class="delete-item" data-id="'+x+'"><ons-icon icon="fa-times"></ons-icon></ons-button>';
   htm+='</ons-col>';
   htm+='</ons-row>';
   
   htm+='</ons-list-item>';
   return htm;
}


function tplCartRowNoBorderMore(item_id, item_name, price, pretty_price, qty, field_name,size,x ,price2, discount,htmlSub)
{	
   var htm='';
   htm+='<ons-list-item class="row-no-border">';
   htm+='<ons-row >';
	   htm+='<ons-col class="concat-text" width="73%">';
		
		  htm+='<input type="hidden" name="'+field_name+'" class="'
		  +field_name + ' price'+x + ' " value="'+price+'" >';		  
		  
		  htm+='<input type="hidden" name="item_id" class="item_id'+x+' " value="'+ item_id +'" >';
		  htm+='<input type="hidden" name="discount" class="discount'+x+' " value="'+ discount +'" >';

		  if (discount>0){
		  	  price2='<price class="discount">'+ (parseFloat(price2)+parseFloat(discount)) +'</price> '+price2;
		  }
		  
		  if (empty(size))	{
		     htm+='<p class="description item-name concat-text bold r-item"> '+item_name+'</p>';
		  } else {
		  	htm+='<p class="description item-name concat-text bold r-item"> '+item_name+
		  	' <size>('+size+")</size>"
		  	+'</p>';
		  }
	   htm+='</ons-col>';
     var htm_input='<input name="qty" type="number" class="item-qty qty numeric_only small-input text-center text-input text-input--underbar" ';
    htm_input+='placeholder="qty" value="'+qty+'" data-rowid="'+x+'">';
  
     htm+='<p class="description item-name concat-text bold notification grey qtyCustom r_qty">'+qty+'</p>';
    htm+='<p class="">'+htm_input+'</p>';
	  
	   htm+='<ons-col class="text-right" ><price>'+pretty_price+'</price></ons-col>';
   htm+='</ons-row>';
   
   htm+='<ons-row class="row-del-wrap" >';
   htm+='<ons-col class="text-right" width="100%">';
   htm+='<ons-button modifier="quiet" class="delete-item" data-id="'+x+'"><ons-icon icon="fa-times"></ons-icon></ons-button>';
   htm+='</ons-col>';
   htm+='</ons-row>';
   htm+=htmlSub;
   htm+='</ons-list-item>';
   return htm;
}

function tplCartRowNoBorderSub(subcat_id, sub_item_id, item_name, price, pretty_price, qty, qty2,x )
{
   var htm='';
   htm+='<ons-list-item class="row-no-border subitem-row'+x+' ">';
   htm+='<ons-row >';
     /* htm+='<ons-col width="3%"></ons-col>';*/
	   htm+='<ons-col class="concat-text" width="80%">';
		 htm+='<input name="qty" type="number" class="subitem-qty'+x+' qty small-input text-center text-input text-input--underbar" ';
		  htm+='placeholder="qty" value="'+qty+'" data-qty="'+qty2+'" >';
		  		  
		  htm+='<input type="hidden" name="subcat_id" class="subcat_id" value="'+subcat_id+'">';
		  htm+='<input type="hidden" name="sub_item_id" class="sub_item_id" value="'+sub_item_id+'">';
		  htm+='<input type="hidden" name="sub_item_price" class="sub_item_price" value="'+price+'">';
		  htm+='<input type="hidden" name="sub_item_name" class="sub_item_name" value="'+item_name+'">';
		  if(pretty_price=='0'){
		 htm+='<p class="description item-name concat-text">  '+item_name+'</p>';
		
		}else{
		  htm+='<p class="description item-name concat-text">  '+item_name+' (+<price>'+pretty_price+'</price>) </p>';
		}
	   htm+='</ons-col>';
	  // htm+='<p class="description item-name concat-text bold notification grey qtyCustom r_qty">'+qty+'</p>';
	   
	   //htm+='<ons-col class="text-right" ><price>'+pretty_price+'</price></ons-col>';
   htm+='</ons-row>';
   htm+='</ons-list-item>';
   return htm;
}

function tplCartRowNoBorderAddon(subcat_id, sub_item_id, item_name, price, pretty_price, qty, qty2,x )
{
   var htm='';
   htm+='<ons-row class="row-sub-item R-bullet" >';
     /* htm+='<ons-col width="3%"></ons-col>';*/
	   htm+='<ons-col class="concat-text" width="80%">';
		 htm+='<input name="qty" type="number" class="subitem-qty'+x+' qty small-input text-center text-input text-input--underbar" ';
		  htm+='placeholder="qty" value="'+qty+'" data-qty="'+qty2+'" >';
		  		  
		  htm+='<input type="hidden" name="subcat_id" class="subcat_id" value="'+subcat_id+'">';
		  htm+='<input type="hidden" name="sub_item_id" class="sub_item_id" value="'+sub_item_id+'">';
		  htm+='<input type="hidden" name="sub_item_price" class="sub_item_price" value="'+price+'">';
		  htm+='<input type="hidden" name="sub_item_name" class="sub_item_name" value="'+item_name+'">';
		  if(pretty_price=='0'){
			htm+='<p class="description item-name concat-text bullet">  '+item_name+'</p>';
			  
			 }else{
		  htm+='<p class="description item-name concat-text bullet">  '+item_name+' (+<price>'+pretty_price+'</price>) </p>';
			 }
	   htm+='</ons-col>';
	  // htm+='<p class="description item-name concat-text bold notification grey qtyCustom r_qty">'+qty+'</p>';
	   
	  // htm+='<ons-col class="text-right" ><price>'+pretty_price+'</price></ons-col>';
   htm+='</ons-row>';
   return htm;
}

function tplCartRow(label,price,class_name)
{
	var htm='';	
	htm+='<ons-list-item class="'+class_name+'">';
	  htm+='<ons-row >';
		   htm+='<ons-col class="concat-text" width="70%">';
			  htm+='<p class="description item-name concat-text">'+label+'</p>';
		   htm+='</ons-col>';
		   htm+='<ons-col class="text-right" ><price>'+price+'</price></ons-col>';
	   htm+='</ons-row>';
	htm+='</ons-list-item>';
	return htm;
}

function tplCartRowHiddenFields(label, value, field_name, x, class_name)
{
	var htm='';	
	htm+='<ons-list-item class="'+class_name+' subitem-row'+x+' " >';
	  htm+='<ons-row >';
		   htm+='<ons-col class="concat-text" >';
		      htm+='<input type="hidden" name="'+field_name+x+'"  class="'+field_name+x+'" value="'+value+'" >';
			  htm+='<p class="description item-name concat-text">'+label+'</p>';
		   htm+='</ons-col>';		   
	   htm+='</ons-row>';
	htm+='</ons-list-item>';
	return htm;	
}

function tplCartRowInstructionFields(label, value, field_name, x, class_name)
{
	var htm='';	
	htm+='<ons-list-item class="'+class_name+' nomargin subitem-row'+x+' " >';
	  htm+='<ons-row >';
		   htm+='<ons-col class="concat-text" >';
		      htm+='<input type="hidden" name="'+field_name+x+'"  class="'+field_name+x+'" value="'+value+'" >';
			  htm+='<p class="description item-name concat-text">'+label+'</p>';
		   htm+='</ons-col>';		   
	   htm+='</ons-row>';
	htm+='</ons-list-item>';
	return htm;	
}

function parseTime(s) {
    var part = s.match(/(\d+):(\d+)(?: )?(am|pm)?/i);
    var hh = parseInt(part[1], 10);
    var mm = parseInt(part[2], 10);
    var ap = part[3] ? part[3].toUpperCase() : null;
    if (ap === "AM") {
        if (hh == 12) {
            hh = 0;
        }
    }
    if (ap === "PM") {
        if (hh != 12) {
            hh += 12;
        }
    }
    return { hh: hh, mm: mm };
}

function getTodayDate(){

	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth()+1; //January is 0!
	var yyyy = today.getFullYear();
	
	if(dd<10) {
		dd='0'+dd
	} 
	
	if(mm<10) {
		mm='0'+mm
	} 
	var todayd = yyyy+'-'+mm+'-'+dd;
	
	return todayd;	
}

function addMinutes(time/*"hh:mm"*/, minsToAdd/*"N"*/) {
  function z(n){
    return (n<10? '0':'') + n;
  }
  var bits = time.split(':');
  var mins = bits[0]*60 + (+bits[1]) + (+minsToAdd);

  return z(mins%(24*60)/60 | 0) + ':' + z(mins%60);  
}  

function checkValidTime(TimeSelected){
var time24=parseTime(TimeSelected);
time24=time24.hh+':'+time24.mm;
var timeEstimation=parseInt(appdata.delivery_est);
if(timeEstimation==''){
	timeEstimation=0;	
}
//time24=addMinutes(time24,timeEstimation);
//console.log(time24);

var selectedtimeDate=getTodayDate()+' '+time24;
var startTimeDate=getTodayDate()+' '+addMinutes(appdata.startFrom,timeEstimation);
var endTimeDate=getTodayDate()+' '+appdata.endFrom;


// console.log("selectedtimeDate"+selectedtimeDate);
// console.log("startTimeDate"+startTimeDate);
// console.log("endTimeDate"+endTimeDate);

 var selectedTime = new Date(selectedtimeDate);
 var start = new Date(startTimeDate);
 var end = new Date(endTimeDate);


// console.log("selectedTime"+selectedTime);
// console.log("start"+start);
// console.log("end"+end);

 var start_diff =  (selectedTime- start);
 var end_diff =  (end- selectedTime);
 
 console.log("start_diff"+start_diff);
 console.log("end_diff"+end_diff);	
	if(start_diff<0 || end_diff<0){
		return false;	
	}
	return true;
} 

function initMobileScroller()
{	
	if ( $('.delivery_date').exists()){
		$('.delivery_date').mobiscroll().date({
			theme: 'android-holo-light', 
			mode: "scroller",
			display: "modal",
			
			dateFormat : "yy-mm-dd"
		});
	}
	
/*	if ( $('.delivery_time').exists()){
		$('.delivery_time').mobiscroll().time({
			theme: 'android-holo-light', 
			mode: "scroller",
			display: "modal",
			steps: { 
				minute: 15,
				zeroBased: true
			},
			dateFormat : "yy-mm-dd",
			onBeforeClose: function (valueText, btn, inst) {
				if(btn=='set'){
					if(checkValidTime(valueText)){
						//return true;	
					}else{
						var timeEstimation=parseInt(appdata.delivery_est);
						if(timeEstimation==''){
						timeEstimation=0;	
						}
						alert("Sorry but we allow time between "+addMinutes(appdata.startFrom,timeEstimation)+" to "+appdata.endFrom+" only.Please check merchant opening hours");
					return false;
					}
				}
    		}
		});
	}
*/		
	if ( $('.date_booking').exists()){
		$('.date_booking').mobiscroll().date({
			theme: 'android-holo-light', 
			mode: "scroller",
			display: "modal",
			dateFormat : "yy-mm-dd"
		});
	}
	
	if ( $('.booking_time').exists()){
		$('.booking_time').mobiscroll().time({
			theme: 'android-holo-light', 
			mode: "scroller",
			display: "modal",
			dateFormat : "yy-mm-dd"
		});
	}
}

function tplPaymentList(radio_name, radio_value, label, icons)
{
	var htm='';	
	 htm+='<ons-list-item modifier="tappable">';
       htm+='<ons-row class="row">';
          htm+='<ons-col class="concat-text" width="80%">';
             htm+='<label class="radio-button checkbox--list-item">';
               htm+='<input type="radio" name="'+radio_name+'" class="'+radio_name+'" value="'+radio_value+'">';
               htm+='<div class="radio-button__checkmark checkbox--list-item__checkmark"></div>';
               htm+='<p class="description item-name concat-text"> '+label+'</p>';
             htm+='</label>';
          htm+='</ons-col>';
          htm+='<ons-col class="text-right '+radio_value+'" >';
            htm+='<ons-icon icon="'+icons+'"></ons-icon>';
          htm+='</ons-col>';
       htm+='</ons-row>';
     htm+='</ons-list-item>';
     return htm;
}

function tplPaymentListStatic(radio_value, label, icons)
{
	var htm='';	
	 htm+='<ons-list-item modifier="tappable">';
       htm+='<ons-row class="row">';
          htm+='<ons-col class="concat-text" width="80%">';          
               htm+='<p class="description item-name concat-text"> '+label+'</p>';             
          htm+='</ons-col>';
          htm+='<ons-col class="text-right '+radio_value+'" >';
            htm+='<ons-icon icon="'+icons+'"></ons-icon>';
          htm+='</ons-col>';
       htm+='</ons-row>';
     htm+='</ons-list-item>';
     return htm;
}

function tplPaymentProvider(radio_name, radio_value, label, icons)
{
	var htm='';	
	 htm+='<ons-list-item modifier="tappable">';
       htm+='<ons-row class="row">';
          htm+='<ons-col class="concat-text" width="80%">';
             htm+='<label class="radio-button checkbox--list-item">';
               htm+='<input type="radio" name="'+radio_name+'" class="'+radio_name+'" value="'+radio_value+'">';
               htm+='<div class="radio-button__checkmark checkbox--list-item__checkmark"></div>';
               htm+='<p class="description item-name concat-text"> '+label+'</p>';
             htm+='</label>';
          htm+='</ons-col>';
          htm+='<ons-col class="text-right" >';
            htm+='<div class="logo-wrap">';
            htm+='<img src="'+icons+'" alt="" title="" />';
            htm+='</div>';
          htm+='</ons-col>';
       htm+='</ons-row>';
     htm+='</ons-list-item>';
     return htm;
}

function tplReviews(rating, client_name, review, date_review)
{
   var htm='';
   htm+='<ons-list class="review-list">';
	  htm+='<ons-list-item modifier="tappable" class="list-item-container">';
	     htm+='<ons-row class="row"> ';
		     htm+='<ons-col class="col-image" width="90px">';
			   htm+='<ons-icon icon="fa-user" class="icon-user"></ons-icon>';
			 htm+='</ons-col>';
			 
			 htm+='<ons-col class="col-description">';
			   htm+='<div class="rating-stars" data-score="'+rating+'"></div>';
			   htm+='<p class="restauran-title concat-text">'+client_name+'</p>';
			   htm+='<p class="small-font-dim small-font-dim-smaller">'+date_review+'</p> ';
			   htm+='<p class="small-font-dim">'+review+'</p>';
			 htm+='</ons-col>';
			 
		 htm+='</ons-row>';
	  htm+='</ons-list-item>';
	htm+='</ons-list>';
	return htm;
}