/**



 KMRS MOBILE



 Version 1.0



 */







/**



 Default variable declarations



 */



var ajax_url= krms_config.ApiUrl ;



var dialog_title_default= krms_config.DialogDefaultTitle;



var search_address;



var ajax_request;



var cart=[];



var networkState;







document.addEventListener("deviceready", onDeviceReady, false);







function onDeviceReady() {







    navigator.splashscreen.hide();







    if ( !empty(krms_config.pushNotificationSenderid)) {







        var push = PushNotification.init({



            "android": {



                "senderID": krms_config.pushNotificationSenderid



            },



            "ios": {"alert": "true", "badge": "true", "sound": "true"},



            "windows": {}



        });







        push.on('registration', function(data) {







            setStorage("device_id", data.registrationId );







            var params="registrationId="+ data.registrationId;



            params+="&device_platform="+device.platform;



            params+="&client_token="+getStorage("client_token");



            callAjax("registerMobile",params);



        });







        push.on('notification', function(data) {



            //alert(JSON.stringify(data));



            if ( data.additionalData.foreground ){



                if ( data.additionalData.additionalData.push_type=="order"){



                    showNotification( data.title,data.message );



                } else {



                    showNotificationCampaign( data.title,data.message  );



                }



            } else {



                if ( data.additionalData.additionalData.push_type=="order"){



                    showNotification( data.title,data.message );



                } else {



                    showNotificationCampaign( data.title,data.message  );



                }



            }



            push.finish(function () {



                //alert('finish successfully called');



            });



        });







        push.on('error', function(e) {



            //onsenAlert("push error");



        });







    }



}







/*document.addEventListener("offline", onOffline, false);



 function onOffline() {



 $(".home-page").hide();



 $(".no-connection").show();



 }







 document.addEventListener("online", onOnline, false);



 function onOnline()



 {



 $(".home-page").show();



 $(".no-connection").hide();



 }*/







jQuery.fn.exists = function(){return this.length>0;}







function dump(data)



{



    console.debug(data);



}







function setStorage(key,value)



{



    localStorage.setItem(key,value);



}







function getStorage(key)



{



    return localStorage.getItem(key);



}







function removeStorage(key)



{



    localStorage.removeItem(key);



}







function explode(sep,string)



{



    var res=string.split(sep);



    return res;



}







function urlencode(data)



{



    return encodeURIComponent(data);



}







$( document ).on( "keyup", ".numeric_only", function() {



    this.value = this.value.replace(/[^0-9\.]/g,'');



});







ons.bootstrap();



ons.ready(function() {



    dump('ready');











    //navigator.splashscreen.hide()



    $("#s").val( getStorage("search_address") );







    refreshConnection();







    //getLanguageSettings();



    setTimeout('getLanguageSettings()', 1100);







}); /*end ready*/







function refreshConnection()



{



    if ( !hasConnection() ){



        $(".home-page").hide();



        $(".no-connection").show();



    } else {



        $(".home-page").show();



        $(".no-connection").hide();



    }



}







function hasConnection()



{



    return true;



    networkState = navigator.network.connection.type;







    if ( networkState=="Connection.NONE" || networkState=="none"){



        return false;



    }



    return true;



}







function geoComplete()



{



    dump( "country_code_set=>" + getStorage("country_code_set"));



    if ( empty(getStorage("country_code_set")) ){



        $("#s").geocomplete();



    } else {



        $("#s").geocomplete({



            country: getStorage("country_code_set")



        });



    }



}







function createElement(elementId,elementvalue)



{



    var content = document.getElementById(elementId);



    content.innerHTML=elementvalue;



    ons.compile(content);



}







function searchMerchant()



{







    var s = $('#s').val();



  var searchcuisine=$('#searchcuisine').val();

    setStorage("searchcuisine",searchcuisine);



    /*clear all storage*/



    setStorage("search_address",s);



    removeStorage('merchant_id');



    removeStorage('shipping_address');



    removeStorage('merchant_id');



    removeStorage('transaction_type');



    removeStorage('merchant_logo');



    removeStorage('order_total');



    removeStorage('merchant_name');



    removeStorage('total_w_tax');



    removeStorage('currency_code');



    removeStorage('paymet_desc');



    removeStorage('order_id');



    removeStorage('order_total_raw');



    removeStorage('cart_currency_symbol');



    removeStorage('paypal_card_fee');







    if(s!=""){



        var options = {



            address:s,



            closeMenu:true,



            animation: 'slide'



        };



        menu.setMainPage('searchResults.html',options);







    } else{



        onsenAlert(   getTrans('Address is required','address_is_required')  );



    }



}







/*ons.ready(function() {



 kNavigator.on('prepush', function(event) {



 dump("prepush");



 });



 });*/







document.addEventListener("pageinit", function(e) {



    dump("pageinit");



    dump("pagname => "+e.target.id);


    appdata.pagename=e.target.id;




    switch (e.target.id)



    {



        case "menucategory-page":



        case "page-merchantinfo":



        case "page-reviews":



        case "page-cart":



        case "page-receipt":



            translatePage();



            break;







        case "page-booking":



            translatePage();



            $(".number_guest").attr("placeholder", getTrans("Number Of Guests","number_of_guest") );



            break;







        case "page-paymentoption":



            translatePage();



            $(".order_change").attr("placeholder", getTrans('change? For how much?','order_change') );



            break;







        case "page-addressbook-details":



            translatePage();



            translateValidationForm();







            $(".street").attr("placeholder",  getTrans("Street",'street') );



            $(".city").attr("placeholder",  getTrans("City",'city') );



            $(".state").attr("placeholder",  getTrans("State",'state') );



            $(".zipcode").attr("placeholder",  getTrans("Postal code/Zip Code",'zipcode') );



            $(".location_name").attr("placeholder",  getTrans("Location name",'location_name') );







            break;







        case "page-signup":



            translatePage();



            translateValidationForm();



            $(".first_name").attr("placeholder",  getTrans("First Name",'first_name') );



            $(".last_name").attr("placeholder",  getTrans('Last Name','last_name') );



            $(".contact_phone").attr("placeholder",  getTrans('Mobile Phone','contact_phone') );



            $(".email_address").attr("placeholder",  getTrans('Email address','email_address') );



            $(".password").attr("placeholder",  getTrans('Password','password') );



            $(".cpassword").attr("placeholder",  getTrans('Confirm Password','confirm_password') );







            break;







        case "page-checkoutsignup":



            translatePage();



            translateValidationForm();







            $(".first_name").attr("placeholder",  getTrans("First Name",'first_name') );



            $(".last_name").attr("placeholder",  getTrans('Last Name','last_name') );



            $(".contact_phone").attr("placeholder",  getTrans('Mobile Phone','contact_phone') );



            $(".email_address").attr("placeholder",  getTrans('Email address','email_address') );



            $(".password").attr("placeholder",  getTrans('Password','password') );



            $(".cpassword").attr("placeholder",  getTrans('Confirm Password','confirm_password') );



            break;







        case "page-shipping":







            $(".street").attr("placeholder", getTrans('Street','street') );



            $(".city").attr("placeholder", getTrans('City','city') );



            $(".state").attr("placeholder", getTrans('State','state') );



            $(".zipcode").attr("placeholder", getTrans('Postal code/Zip Code','zipcode') );



            $(".contact_phone").attr("placeholder", getTrans('Contact phone','contact_phone') );



            $(".location_name").attr("placeholder", getTrans('Apartment suite, unit number, or company name','location_name2') );



            $(".delivery_instruction").attr("placeholder", getTrans('Delivery instructions','delivery_instruction') );







            translatePage();



            translateValidationForm();



            break;







        case "searchresult-page":



          var searchdata=getStorage("search_address");
            var addressTemp=searchdata;
            var searchArray=searchdata.split(',');
            if(searchdata!=''){
                addressTemp=searchArray[0];
            }
            $("#search-text").html(addressTemp);
            callAjax("search","address="+ getStorage("search_address")+"&category="+ getStorage("searchcuisine"));






            break;







        case "page-home":



            geoComplete();







            search_address=getStorage("search_address");



			searchcuisine=getStorage("searchcuisine");



            if (typeof search_address === "undefined" || search_address==null || search_address=="" ) {



            } else {


setTimeout('$("#s").val(search_address);$("#searchcuisine").val(searchcuisine)', 1000);



            }



            translatePage();







            $("#s").attr("placeholder",  getTrans('Street Address,City,State','home_search_placeholder') );







            break;







        case "page-filter-options":



            callAjax('filtrList','');



            break;







        case "page-browse":



            callAjax('browseRestaurant','');



            break;







        case "page-profile":



            callAjax('getProfile',



                "client_token="+getStorage("client_token")



            );



            translatePage();



            translateValidationForm();







            $(".first_name").attr("placeholder",  getTrans('First Name','first_name') );



            $(".last_name").attr("placeholder",  getTrans('Last Name','last_name') );



            $(".email_address").attr("placeholder",  getTrans("Email Address",'email_address') );



            $(".password").attr("placeholder",  getTrans("Password",'password') );







            break;







        case "page-orders":



            callAjax('getOrderHistory',



                "client_token="+getStorage("client_token")



            );



            translatePage();



            break;







        case "page-addressbook":



            callAjax('getAddressBook',



                "client_token="+getStorage("client_token")



            );



            translatePage();



            break;







        case "page-dialog-addressbook":



            callAjax('getAddressBookDialog',



                "client_token="+getStorage("client_token")



            );



            break;







        case "page-login":



        case "page-prelogin":



            initFacebook();



            translatePage();



            translateValidationForm();







            $(".email_address").attr("placeholder",  getTrans('Email address','email_address') );



            $(".password").attr("placeholder",  getTrans('Password','password') );







            break;







        case "page-settings":



            callAjax("getSettings",



                "device_id="+getStorage("device_id")



            );



            translatePage();



            break;







        case "page-locations":



            callAjax('mobileCountryList',



                "device_id="+getStorage("device_id")



            );



            break;







        case "page-languageoptions":



            callAjax('getLanguageSelection','');



            break;







        default:



            break;



    }







}, false);







function searchResultCallBack(address)



{



    search_address=address;



}







function showFilterOptions()



{



    if (typeof navDialog === "undefined" || navDialog==null || navDialog=="" ) {



        ons.createDialog('filterOptons.html').then(function(dialog) {



            dialog.show();



            translatePage();



        });



    } else {



        navDialog.show();



        //translatePage();



    }



}







function applyFilter()
{



    navDialog.hide();







    var services='';



    if (  $(".delivery_type").exists()){



        $.each( $(".delivery_type:checked") , function( key, val ) {



            services+= $(this).val() +",";



        });



    }







    dump("services=>"+services);



    var cuisine_type='';



    if (  $(".cuisine_type").exists()){



        $.each( $(".cuisine_type:checked") , function( key, val ) {



            cuisine_type+= $(this).val() +",";



        });



    }

 
 
    var price_type='';



    if (  $(".price_type").exists()){



        $.each( $(".price_type:checked") , function( key, val ) {



            price_type= $(this).val() +"";



        });



    }
	
	
    var sort_order_filter='restaurant_name';
    if (  $(".sort_order_filter").exists()){
        $.each( $(".sort_order_filter:checked") , function( key, val ) {
            sort_order_filter= $(this).val() +"";
        });
    }

    dump("cuisine_type=>"+cuisine_type);
    callAjax("search","address="+ getStorage("search_address") +"&services=" + services +
        "&cuisine_type="+cuisine_type+"&price_type="+price_type+'&sort_order_filter='+sort_order_filter );
}






function onsenAlert(message,dialog_title)



{



    if (typeof dialog_title === "undefined" || dialog_title==null || dialog_title=="" ) {



        dialog_title=dialog_title_default;



    }

dump(dialog_title);

    ons.notification.alert({



        message: message,



        title:dialog_title



    });



}







function hideAllModal()



{



    setTimeout('loaderSearch.hide()', 1);



    setTimeout('loader.hide()', 1);



    setTimeout('loaderLang.hide()', 1);



}







/*mycallajax*/



function callAjax(action,params)



{







    if ( !hasConnection() ){



        if ( action!="registerMobile"){



            onsenAlert(  getTrans("CONNECTION LOST",'connection_lost') );



        }



        return;



    }







    /*add language use parameters*/



    params+="&lang_id="+getStorage("default_lang");







    dump(ajax_url+"/"+action+"?"+params);







    ajax_request = $.ajax({



        url: ajax_url+"/"+action,



        data: params,



        type: 'post',



        async: false,



        dataType: 'jsonp',



        timeout: 6000,



        crossDomain: true,



        beforeSend: function() {



            if(ajax_request != null) {



                /*abort ajax*/



                hideAllModal();



                ajax_request.abort();



            } else {



                /*show modal*/



                switch(action)



                {



                    case "registerMobile":



                        break;



                    case "search":



                        loaderSearch.show();



                        translatePage();



                        break;



                    case "getLanguageSettings":



                        loaderLang.show();



                        break;



                    default:



                        loader.show();



                        break;



                }



            }



        },



        complete: function(data) {



            ajax_request=null;



            hideAllModal();



        },



        success: function (data) {

 		appdata.response=data;

            dump(data);



            if (data.code==1){



                switch (action)



                {



                    case "search":



                        displayRestaurantResults(data.details.data ,'restaurant-results');

				$('[type=search]').attr('placeholder','Search '+data.details.total+' restaurants');

                        //$(".result-msg").text(data.details.total+" Restaurant found");



                        $(".result-msg").text(data.details.total+" "+getTrans("Restaurant found",'restaurant_found') );



                        break;







                    case "MenuCategory":



                        /*save merchant logo*/



                        setStorage("merchant_logo",data.details.logo);



                        dump(data.details.restaurant_name);



                        setStorage("merchant_name",data.details.restaurant_name);







                        menuCategoryResult(data.details);

						 appdata.tempMerchantDeliveryEst=data.details.delivery_est;

                        break;







                    case "cuisineList":



                        cuisineResults(data.details);



                        break;

					 case "filtrList":



                        filtrResults(data.details);



                        break;





                    case "getItemByCategory":



                        displayItemByCategory(data.details);



                        break;







                    case "getItemDetails":



                        displayItem(data.details);



                        break;



                    case "clienttoken":

                        displayPaymentForm(data.details);

                        break;


                    case "merchanttip":
                        console.log('merchanttip call back');
                        console.log(data.details);
                        var hdata=$.map(data.details,function(val,index){
                            if(index!='default_tip'){
                                if(data.details.default_tip==index){
                                    return {tip_key:index,tip_val:val,is_default:'active'};
                                }else{
                                    return {tip_key:index,tip_val:val,is_default:''};
                                }
                            }else{
                                appdata.tip.key=val;
                                var adata=getStorage('order_total').split(';')[1];
                                appdata.tip.val=(val*adata).toFixed(2);
                                appdata.tip.total=parseFloat(appdata.tip.val)+parseFloat(adata);
                            }

                        });
                        var html=appdata.creteHtmldata('tipTemplate',hdata);
                        $('#tipContainer').html(html);
                        $('.tips').on('click',function(){appdata.setTip(this);});
                        if(appdata.tip.total>0){
                        $(".total-amount").html(appdata.tip.total);}
                        break;




                    case "loadOrder":
                        //displayCart(data.details);
                        displayOrderData(data.details);


                        break;
                    case "loadCart":



                        $("#page-cart .wrapper").show();



                        $(".checkout-footer").show();



                        $("#page-cart .frm-cart").show();







                        displayCart(data.details);







                        if (typeof addressDialog === "undefined" || addressDialog==null || addressDialog=="" ) {



                        } else {



                            if ( addressDialog.isShown()){



                                addressDialog.hide();



                            }



                        }







                        break;







                    case "checkout":







                        if ( data.details=="shipping"){



                            var options = {



                                animation: 'slide',



                                onTransitionEnd: function() {



                                    displayMerchantLogo2( getStorage("merchant_logo") ,



                                        getStorage("order_total") ,



                                        'page-shipping');







                                    if (data.msg.length>0){



                                        $(".select-addressbook").show();



                                    } else $(".select-addressbook").hide();



                                }



                            };



                            sNavigator.pushPage("shipping.html", options);







                        } else if ( data.details =="payment_method") {







                            var options = {



                                animation: 'slide',



                                onTransitionEnd: function() {



                                    displayMerchantLogo2(



                                        getStorage("merchant_logo") ,



                                        getStorage("order_total") ,



                                        'page-paymentoption'



                                    );



                                    var params="merchant_id="+ getStorage("merchant_id");



                                    //callAjax("getPaymentOptions",params);

                                    callAjax("clienttoken",params);

                                }



                            };



                            sNavigator.pushPage("paymentOption.html", options);







                        } else {

							showLogin(1);
/*
                            var options = {



                                animation: 'slide',



                                onTransitionEnd: function() {



                                    dump( getStorage("merchant_logo") );



                                    dump( getStorage("order_total") );



                                    displayMerchantLogo2( getStorage("merchant_logo") ,



                                        getStorage("order_total") ,



                                        'page-checkoutsignup');



                                }

								

                            };



                            sNavigator.pushPage("checkoutSignup.html", options);
*/


                        }



                        break;







                    case "signup":



                        setStorage("client_token", data.details.token ); // register token



                        if (data.details.next_step=="shipping_address"){



                            var options = {



                                animation: 'slide',



                                onTransitionEnd: function() {



                                    displayMerchantLogo2( getStorage("merchant_logo") ,



                                        getStorage("order_total") ,



                                        'page-shipping');



                                }



                            };



                            sNavigator.pushPage("shipping.html", options);







                        } else if ( data.details.next_step =="return_home") {



                            onsenAlert(data.msg);



                            menu.setMainPage('home.html', {closeMenu: true});



                        } else {



                            dump('payment_option');



                            var options = {



                                animation: 'slide',



                                onTransitionEnd: function() {



                                    displayMerchantLogo2(



                                        getStorage("merchant_logo") ,



                                        getStorage("order_total") ,



                                        'page-paymentoption'



                                    );



                                    var params="merchant_id="+ getStorage("merchant_id");



                                    //callAjax("getPaymentOptions",params);

                                    callAjax("clienttoken",params);



                                }



                            };



                            sNavigator.pushPage("paymentOption.html", options);



                        }



                        break;







                    case "getPaymentOptions":



                        $(".frm-paymentoption").show();



                        $(".paypal_flag").val( data.details.paypal_flag );



                        $(".paypal_mode").val( data.details.paypal_credentials.mode );



                        $(".client_id_sandbox").val( data.details.paypal_credentials.client_id_sandbox );



                        $(".client_id_live").val( data.details.paypal_credentials.client_id_live );







                        $(".paypal_card_fee").val( data.details.paypal_credentials.card_fee );



                        setStorage("paypal_card_fee", data.details.paypal_credentials.card_fee );







                        if (data.details.voucher_enabled=="yes"){



                            $(".voucher-wrap").show();



                            $(".voucher_code").attr("placeholder", getTrans("Enter Voucher here",'enter_voucher_here') );



                        } else {



                            $(".voucher-wrap").hide();



                        }







                        displayPaymentOptions(data);



                        break;







                    case "placeOrder":







                        setStorage("order_id",data.details.order_id);



                        //TODO:: code for redirect after success payment

                    

                        switch (data.details.next_step){







                            case "paypal_init":







                                setStorage("currency_code", data.details.payment_details.currency_code);



                                setStorage("paymet_desc", data.details.payment_details.paymet_desc);



                                setStorage("total_w_tax", data.details.payment_details.total_w_tax);







                                app_paypal.initPaymentUI();



                                break;







                            default:



                                var options = {



                                    animation: 'slide',



                                    onTransitionEnd: function() {



                                        /*displayMerchantLogo2( getStorage("merchant_logo") ,



                                         getStorage("order_total") ,



                                         'page-receipt');*/



                                        displayMerchantLogo2( getStorage("merchant_logo") ,



                                            data.details.payment_details.total_w_tax_pretty ,



                                            'page-receipt');



                                        $(".receipt-msg").html(data.msg);



                                    }



                                };



                                sNavigator.pushPage("receipt.html", options);







                                break;



                        }



                        break;







                    case "paypalSuccessfullPayment":



                        var options = {



                            animation: 'slide',



                            onTransitionEnd: function() {



                                displayMerchantLogo2( getStorage("merchant_logo") ,



                                    getStorage("order_total") ,



                                    'page-receipt');



                                $(".receipt-msg").html(data.msg);



                            }



                        };



                        sNavigator.pushPage("receipt.html", options);



                        break;







                    case "getMerchantInfo":



                        showMerchantInfo(data.details)



                        break;







                    case "bookTable":



                        var options = {



                            animation: 'slide',



                            onTransitionEnd: function() {



                                displayMerchantLogo2(



                                    getStorage("merchant_logo") ,



                                    '' ,



                                    'page-booking-ty'



                                );







                                $(".book-ty-msg").html(data.msg);



                            }



                        };



                        sNavigator.pushPage("bookingTY.html", options);



                        break;







                    case "merchantReviews":



                        displayReviews(data.details);



                        break;







                    case "addReview":



                        onsenAlert(data.msg);



                        sNavigator.popPage({cancelIfRunning: true});



                        loadMoreReviews();



                        break;











                    case "browseRestaurant":



                        displayRestaurantResults( data.details.data ,'browse-results');



                        //$(".result-msg").text(data.details.total+" Restaurant found");



                        $(".result-msg").text(data.details.total+" "+ getTrans("Restaurant found",'restaurant_found')  );



                        break;







                    case "getProfile":



                        $(".first_name").val( data.details.first_name );



                        $(".last_name").val( data.details.last_name );



                        $(".email_address").val( data.details.email_address );


						appdata.userInfo=data.details;
						$('[name=contact_phone]').val(data.details.contact_phone);
                        break;







                    case "registerUsingFb":



                    case "login":



                        //onsenAlert(data.msg);



                        setStorage("client_token",data.details.token);



                        switch (data.details.next_steps)



                        {



                            case "delivery":



                                var options = {



                                    animation: 'slide',



                                    onTransitionEnd: function() {



                                        displayMerchantLogo2( getStorage("merchant_logo") ,



                                            getStorage("order_total") ,



                                            'page-shipping');







                                        if (data.details.has_addressbook==2){



                                            $(".select-addressbook").show();



                                        } else {



                                            $(".select-addressbook").hide();



                                        }



                                    }



                                };



                                sNavigator.pushPage("shipping.html", options);



                                break;







                            case "pickup":







                                var options = {



                                    animation: 'slide',



                                    onTransitionEnd: function() {



                                        displayMerchantLogo2(



                                            getStorage("merchant_logo") ,



                                            getStorage("order_total") ,



                                            'page-paymentoption'



                                        );



                                        var params="merchant_id="+ getStorage("merchant_id");



                                        //callAjax("getPaymentOptions",params);

                                        callAjax("clienttoken",params);



                                    }



                                };



                                sNavigator.pushPage("paymentOption.html", options);







                                break;







                            default:



                                menu.setMainPage('home.html', {closeMenu: true});



                                break;



                        }



                        break;







                    case "forgotPassword":



                        onsenAlert(data.msg);



                        dialogForgotPass.hide();



                        break;







                    case "getOrderHistory":



                        displayOrderHistory(data.details);



                        break;







                    case "ordersDetails":



                        displayOrderHistoryDetails(data.details);



                        break;







                    case "getAddressBook":



                        displayAddressBook(data.details);



                        break;







                    case "getAddressBookDetails":



                        fillAddressBook(data.details);



                        break;







                    case "saveAddressBook":



                        if (data.details=="add"){



                            sNavigator.popPage({cancelIfRunning: true});







                            callAjax('getAddressBook',



                                "client_token="+getStorage("client_token")



                            );



                        } else {



                            onsenAlert(data.msg);



                        }



                        break;







                    case "deleteAddressBook":



                        sNavigator.popPage({cancelIfRunning: true});



                        callAjax('getAddressBook',



                            "client_token="+getStorage("client_token")



                        );



                        break;







                    case "getAddressBookDialog":



                        displayAddressBookPopup(data.details);



                        break;







                    case "reOrder":



                        setStorage("merchant_id",data.details.merchant_id)



                        cart=data.details.cart;



                        showCart();



                        break;







                    /*case "registerUsingFb":



                     onsenAlert(data.msg);



                     setStorage("client_token",data.details.token);



                     menu.setMainPage('home.html', {closeMenu: true});



                     break;*/







                    case "registerMobile":



                        /*silent */



                        break;







                    case "reverseGeoCoding":



                        $("#s").val( data.details );



                        break;











                    case "getSettings":



                        if ( data.details.enabled_push==1){



                            enabled_push.setChecked(true);



                        } else {



                            enabled_push.setChecked(false);



                        }



                        $(".country_code_set").val( data.details.country_code_set);



                        break;







                    case "mobileCountryList":



                        displayLocations(data.details);



                        break;







                    case "getLanguageSelection":



                        displayLanguageSelection(data.details);



                        break;







                    case "getLanguageSettings":



                        setStorage("translation",JSON.stringify(data.details.translation));







                        var device_set_lang=getStorage("default_lang");



                        dump("device_set_lang=>"+device_set_lang);







                        if (empty(device_set_lang)){



                            dump('proceed');



                            if(!empty(data.details.settings.default_lang)){



                                setStorage("default_lang",data.details.settings.default_lang);



                            } else {



                                setStorage("default_lang","");



                            }



                        }







                        translatePage();



                        break;







                    case "applyVoucher":



                        dump(data.details);



                        $(".voucher_amount").val( data.details.amount );



                        $(".voucher_type").val( data.details.voucher_type );







                        $(".apply-voucher").hide();



                        $(".remove-voucher").css({



                            "display":"block"



                        });







                        $(".voucher-header").html(data.details.less);







                        break;







                    default:



                        //onsenAlert("Sorry but something went wrong during processing your request");



                        onsenAlert(data.msg);



                        break;



                }



            } else {



                /*failed condition*/



                switch(action)



                {







                    case "search":



                        //$(".result-msg").text("No Restaurant found");



                        $(".result-msg").text(data.msg);



                        createElement('restaurant-results','');



                        break;







                    case "getItemByCategory":



                        //onsenAlert(data.msg);



                        displayMerchantInfo(data.details);



                        //sNavigator.popPage({cancelIfRunning: true});	back button



                        break;







                    case "loadCart":



                        displayMerchantLogo(data.details,'page-cart');



                        onsenAlert(data.msg);



                        $("#page-cart .wrapper").hide();



                        $("#page-cart .frm-cart").hide();



                        $(".checkout-footer").hide();



                        showCartNosOrder();



                        break;







                    case "getPaymentOptions":



                        $(".frm-paymentoption").hide();



                        onsenAlert(data.msg);



                        break;







                    case "browseRestaurant":



                        createElement('browse-results','');



                        $(".result-msg").text(data.msg);



                        break;







                    case "getProfile":



                        dump('show login form')



                        menu.setMainPage('prelogin.html', {closeMenu: true});



                        break;







                    case "getAddressBook":



                        //onsenAlert(data.msg);



                        createElement('address-book-list', '');



                        if (data.code==3){



                            menu.setMainPage('prelogin.html', {closeMenu: true});



                        }



                        break;







                    case "getOrderHistory":



                        if (data.code==3){



                            menu.setMainPage('prelogin.html', {closeMenu: true});



                        }



                        break;







                    case "registerMobile":



                    case "getSettings":



                    case "getLanguageSettings":



                        /*silent */



                        break;







                    default:



                        onsenAlert(data.msg);



                        break;



                }



            }







        },



        error: function (request,error) {



            hideAllModal();



            if ( action=="getLanguageSettings" || action=="registerMobile"){



            } else {



                onsenAlert( getTrans("Network error has occurred please try again!",'network_error') );



            }



        }



    });



}







function setHome()



{



    dump("setHome");



    var options = {



        closeMenu:true,



        animation: 'slide',



        callback:setHomeCallback



    };



    menu.setMainPage('home.html',options);



}







function setHomeCallback()



{



    refreshConnection();



}







function displayRestaurantResults(data , target_id)



{



    dump(data);



    var htm='';



    htm+='<ons-list class="restaurant-list r-bdr-wide">';

    $.each( data, function( key, val ) {

        htm+='<ons-list-item modifier="tappable" class="list-item-container r-list" onclick="loadRestaurantCategory('+val.merchant_id+');">';

        htm+='<ons-row class="row my-row">';

        htm+='<ons-col class="col-img"><div class="col-image logo-wrap2" >';

        htm+='<img src="'+val.logo+'" />';

        htm+='</div></ons-col>';

        //col 1 start

        htm+='<ons-col class="col-description my-disc" >';

        htm+='<p class="restauran-title concat-text rest-ttl">'+val.restaurant_name+'</p>';
		  htm+='<div class="rating-stars p-small" data-score="'+val.ratings.ratings+'" ></div>';

   
		
		 htm+='<p class="p-small trn p-mrg-nn" data-trn-key="min_order" style="display: inline-block;"><b>Min:</b>&nbsp;</p>';

        htm+='<price class="p-small">'+val.minimum_order+'</price>';
		if(val.delivery_est!=''){
			 htm+='<p class="p-small trn p-mrg-nn" data-trn-key="min_order" style="display: inline-block;">&nbsp;| <b>Est:</b>&nbsp;</p>';

        	htm+='<price class="p-small">' +val.delivery_est+'</price>';
		}
        htm+='<p class="p-small trn p-mrg-nn" data-trn-key="delivery" style="display: inline-block;">&nbsp;| <b>Fee:</b>&nbsp;</p>';
		if(!val.delivery_fee){
			htm+='<price class="p-small">&nbsp;Free</price>';	
		}else{
			htm+='<price class="p-small">&nbsp;'+val.delivery_fee+'</price>';	
		}
		
		
	     htm+='<p class="concat-text p-mrg-nn p-small">'+val.cuisine+'</p>';
		 
		 	htm+='<div class="div-right">';

	      if(val.delivery_est!='' && val.distance>0) {
			  htm+='<p class="p-mrg-nn mile-font">'+val.distance+' Miles</p>';

           // htm+='<p class="p-mrg-nn mile-font">'+val.distance+' Miles - '+val.delivery_est+'</p>';

        }else if(val.distance>0) {

            htm+='<p class="p-mrg-nn mile-font">'+val.distance+' Miles</p>';

        }else if(val.delivery_est>0) {

            htm+='<p class="p-mrg-nn mile-font">'+val.delivery_est+'</p>';

        }

		
		 htm+='</div>';
     

       
        htm+='</ons-col>';

        //col 1 end

        //col 2 start

   /*  htm+='<ons-col class="my-price-menu">'; htm+='<div class="" >';  htm+='<ons-col class="right-part">';*/
		
		
	<!--right part-->

     /* htm+='</ons-col>'; htm+='</div>'; htm+='</ons-col>';*/

        //col 2 end

        htm+='</ons-row>';


        htm+='</ons-list-item>';

    });


    htm+='</ons-list>';

    //createElement('restaurant-results',htm);


    createElement(target_id,htm);

    initRating();

}

function initRating()

{

    $('.rating-stars').raty({



        readOnly: true,



        score: function() {



            return $(this).attr('data-score');



        },



        path: 'lib/raty/images'



    });



    translatePage();



}

var nonceB;

function displayTip(data){
    console.log('tip display');
    console.log(data);
    //TOdo : tip input init
    callAjax("merchanttip","merchant_id="+data);
}
function displayPaymentForm(data){

    displayTip(getStorage("merchant_id"));

    console.log(data);

    braintree.setup(	data,

        'dropin', {

            container: 'divCheckout',

            paymentMethodNonceReceived: function (event, nonce) {

                console.log('payment');

                console.log(nonce);

                /*$.ajax({

                 url:'checkoutbraintree',

                 method:'post',

                 data:{payment_method_nonce:nonce},

                 success:function(response){

                 console.log(response);

                 }

                 });*/

                nonceB=nonce;

                $('#braintree_nonce').val(nonce);

                placeOrder();

            }

        }

    );

    $('#Braintreeform').submit(function(e){

        e.preventDefault;

        console.log($('[name=payment_method_nonce]').val());

    });

}



function loadRestaurantCategory(mtid)



{



    cart = [] ; /*clear cart variable*/



    dump('clear cart');



    var options = {



        animation: 'slide',



        onTransitionEnd: function() {



            callAjax("MenuCategory","merchant_id="+mtid);



        }



    };



    setStorage("merchant_id",mtid);



    sNavigator.pushPage("menucategory.html", options);



}


function filtrResults(data)
{



    var htm='';
    htm+='<ons-list>';
	
	 htm+='<ons-list-header class="list-header trn" data-trn-key="sort" onclick="setFilterToggle(this);" ><div class="left" style="display: inline-block;">Sort by:</div><div style="float: right; padding-right: 5px;" class="right"><span class="sortby_text">Default</span></div></ons-list-header>';
  	htm+='<div style="display:none;">';

    	$.each( data.sort_option, function( key, val ) {



        htm+='<ons-list-item modifier="tappable">';



        htm+='<label class="checkbox checkbox--list-item">';



        htm+='<input type="radio" name="sort_order_filter" onclick="$(\'.sortby_text\').html(\''+val+'\')" class="sort_order_filter" value="'+key+'">';



        htm+='<div class="checkbox__checkmark checkbox--list-item__checkmark"></div>';



        htm+=' '+val;



        htm+='</label>';



        htm+='</ons-list-item>';



    });

	htm+='</div>';

	
	
    htm+='<ons-list-header class="list-header trn" data-trn-key="services" onclick="setFilterToggle(this);">Services</ons-list-header>';
	htm+='<div>';

    htm+='<ons-list-item modifier="tappable">';



    htm+='<label class="checkbox checkbox--list-item">';



    htm+='<input type="checkbox" name="delivery_type" class="delivery_type" value="1" >';



    htm+='<div class="checkbox__checkmark checkbox--list-item__checkmark"></div>';



    htm+=' <span class="trn" data-trn-key="delivery_n_pickup" >Delivery & Pickup</span>';



    htm+='</label>';



    htm+='</ons-list-item>';







    htm+='<ons-list-item modifier="tappable">';



    htm+='<label class="checkbox checkbox--list-item">';



    htm+='<input type="checkbox" name="delivery_type" class="delivery_type" value="2">';



    htm+='<div class="checkbox__checkmark checkbox--list-item__checkmark"></div>';



    htm+=' <span class="trn" data-trn-key="delivery_only">Delivery Only</span>';



    htm+='</label> ';



    htm+='</ons-list-item>';







    htm+='<ons-list-item modifier="tappable">';



    htm+='<label class="checkbox checkbox--list-item">';



    htm+='<input type="checkbox" name="delivery_type" class="delivery_type" value="3">';



    htm+='<div class="checkbox__checkmark checkbox--list-item__checkmark"></div>';



    htm+=' <span class="trn" data-trn-key="pickup_only">Pickup Only</span>';



    htm+='</label>      ';

	htm+='</div>';

    htm+='</ons-list-item> ';
    htm+='<ons-list-header class="list-header trn" data-trn-key="cuisine" onclick="setFilterToggle(this);" >Cuisine</ons-list-header>';
	htm+='<div>';

    $.each( data.cusine, function( key, val ) {



        htm+='<ons-list-item modifier="tappable">';



        htm+='<label class="checkbox checkbox--list-item">';



        htm+='<input type="checkbox" name="cuisine_type" class="cuisine_type" value="'+key+'">';



        htm+='<div class="checkbox__checkmark checkbox--list-item__checkmark"></div>';



        htm+=' '+val;



        htm+='</label>';



        htm+='</ons-list-item>';



    });
htm+='</div>';

  htm+='<ons-list-header class="list-header trn" data-trn-key="price" onclick="setFilterToggle(this);" >Price</ons-list-header>';
  htm+='<div>';

    $.each( data.price, function( key, val ) {



        htm+='<ons-list-item modifier="tappable">';



        htm+='<label class="checkbox checkbox--list-item">';



        htm+='<input type="radio" name="price_type" class="price_type" value="'+key+'">';



        htm+='<div class="checkbox__checkmark checkbox--list-item__checkmark"></div>';



        htm+=' '+val;



        htm+='</label>';



        htm+='</ons-list-item>';



    });

htm+='</div>';





    htm+='</ons-list>';



    createElement('filter-options-list',htm);







    translatePage();



}




function cuisineResults(data)



{



    var htm='';



    htm+='<ons-list>';



    htm+='<ons-list-header class="list-header trn" data-trn-key="services">Services</ons-list-header>';







    htm+='<ons-list-item modifier="tappable">';



    htm+='<label class="checkbox checkbox--list-item">';



    htm+='<input type="checkbox" name="delivery_type" class="delivery_type" value="1" >';



    htm+='<div class="checkbox__checkmark checkbox--list-item__checkmark"></div>';



    htm+=' <span class="trn" data-trn-key="delivery_n_pickup" >Delivery & Pickup</span>';



    htm+='</label>';



    htm+='</ons-list-item>';







    htm+='<ons-list-item modifier="tappable">';



    htm+='<label class="checkbox checkbox--list-item">';



    htm+='<input type="checkbox" name="delivery_type" class="delivery_type" value="2">';



    htm+='<div class="checkbox__checkmark checkbox--list-item__checkmark"></div>';



    htm+=' <span class="trn" data-trn-key="delivery_only">Delivery Only</span>';



    htm+='</label> ';



    htm+='</ons-list-item>';







    htm+='<ons-list-item modifier="tappable">';



    htm+='<label class="checkbox checkbox--list-item">';



    htm+='<input type="checkbox" name="delivery_type" class="delivery_type" value="3">';



    htm+='<div class="checkbox__checkmark checkbox--list-item__checkmark"></div>';



    htm+=' <span class="trn" data-trn-key="pickup_only">Pickup Only</span>';



    htm+='</label>  	   ';



    htm+='</ons-list-item>	';







    htm+='<ons-list-header class="list-header trn" data-trn-key="cuisine">Cuisine</ons-list-header>';







    $.each( data, function( key, val ) {



        htm+='<ons-list-item modifier="tappable">';



        htm+='<label class="checkbox checkbox--list-item">';



        htm+='<input type="checkbox" name="cuisine_type" class="cuisine_type" value="'+key+'">';



        htm+='<div class="checkbox__checkmark checkbox--list-item__checkmark"></div>';



        htm+=' '+val;



        htm+='</label>';



        htm+='</ons-list-item>';



    });







    htm+='</ons-list>';



    createElement('filter-options-list',htm);







    translatePage();



}



var catArray=[];



var mid='';



function menuCategoryResult(data)



{



    $("#menucategory-page .restauran-title").text(data.restaurant_name);



    console.log("Restaurant data:"+data);

    var hstring='';



    hstring+='<div class="rating-stars" data-score=""></div>';

    hstring+='<div style="color: black;" ><b>Contact </b>: '+data.contact_phone+'</div>';

    hstring+='<div class=""><b>Min </b>:  '+data.minimum_order+  '</div>';

    hstring+='<div class="RRR">';



    if(data.delivery_est!=''){

        hstring+='<b>Estimated Delivery :</b> '+data.delivery_est+'';

    }
	
	hstring+='</div>';
  	hstring+='<div class="RRR">';
	
    if(data.free_delivery=='1'){

        hstring+='<b>Delivery</b> : Free';

    }

 

    if(data.delivery_fee>0){

        hstring+='<b>Delivery Fee :</b> '+data.delivery_fee+'';

    }



    hstring+='</div>';

    hstring+='';


    $("#menucategory-page .restauran-title").after(hstring);


    $("#menucategory-page .rating-stars").attr("data-score",data.ratings.ratings).css('display','inline-block').after('<span style="display:inline-block; vertical-align: top; font-size: 14px; padding-left: 2px;">('+data.ratings.votes+')</span>');
	$($("#menucategory-page .rating-stars")[0]).next().remove().end().remove()



    initRating();



    $("#menucategory-page .logo-wrap").html('<img src="'+data.logo+'" />')







    if ( data.open){



        $("#merchant_open").val(2);



    } else $("#merchant_open").val(1);







    if (data.merchant_close_store){



        $("#close_store").val(2);



    } else $("#close_store").val(1);







    if (data.has_menu_category==2){



        var htm='';



        htm+='<ons-list>';



        $.each( data.menu_category, function( key, val ) {



            htm+='<ons-list-item modifier="tappable" id="'+val.cat_id+'" class="row my-tab" data-onclick="" onclick="setmenu(this);">'+val.category_name+'</ons-list-item>';







            // alert(65656)



            //console.log(val.category_items);



            var reHml=displayItemByCategory(val.category_items);



            htm+=reHml;



            //callAjax("getItemByCategory","cat_id="+val.cat_id+"&merchant_id="+val.merchant_id);



            mid=val.merchant_id;



            catArray.push(val.cat_id);



        });



        htm+='</ons-list>';











        createElement('category-list',htm);



        /*	catArray.forEach(function(index,data){



         setTimeout(function(){



         $('#'+data).click();



         },index*800);



         });*/



    } else {



        onsenAlert(  getTrans("This restaurant has not published their menu yet.",'this_restaurant_no_menu') );



    }



}



function setmenu(obj){



    var obj=$(obj);



    obj.attr('onclick','setmenuback(this)');



    obj.next().hide();



}







function setmenuback(obj){



    var obj=$(obj);



    obj.attr('onclick','setmenu(this)');



    obj.next().show();



}


function setFilterToggle(obj){

    var obj=$(obj);
	if (obj.next().css('display') == 'none') {
		obj.next().show();
	}else{
		obj.next().hide();	
		}
}




function loadmenu(cat_id,mtid,obj)



{



    var obj=$(obj);



    obj.data('onclick',obj.attr('onclick')).attr('onclick','setmenu(this);');







    //console.log(obj.data('onclick'));







    if ( $("#close_store").val()==2 || $("#merchant_open").val()==1 ){



        onsenAlert( getTrans("This Restaurant Is Closed Now.  Please Check The Opening Times",'restaurant_close') );



        return;



    }



    callAjax("getItemByCategory","cat_id="+cat_id+"&merchant_id="+mtid);







    var options = {



        animation: 'none',



        onTransitionEnd: function() {



            callAjax("getItemByCategory","cat_id="+cat_id+"&merchant_id="+mtid);



            showCartNosOrder();



        }



    };



    //sNavigator.pushPage("menuItem.html", options);



}







function displayMerchantInfo(data)



{



    if (!empty(data)){



        $("#page-menubycategoryitem #search-text").html(data.category_info.category_name);



        $("#page-menubycategoryitem .restauran-title").text(data.merchant_info.restaurant_name);



        $("#page-menubycategoryitem .rating-stars").attr("data-score",data.merchant_info.ratings.ratings);



        initRating();



        $("#page-menubycategoryitem .logo-wrap").html('<img src="'+data.merchant_info.logo+'" />')



    }



}







function displayMerchantLogo(data,page_id)



{



    if(!empty(data.merchant_info)){


        $("#"+ page_id +" #restaurant-text").html(data.merchant_info.restaurant_name);
        $("#"+ page_id +" .logo-wrap").html('<img src="'+data.merchant_info.logo+'" />')



    }



    if (!empty(data.cart_total)){



        $("#"+ page_id +" .total-amount").html(data.cart_total);



    }



}



function displayMerchantLogo2(logo,total,page_id)



{



    if(!empty(logo)){



        $("#"+ page_id +" .logo-wrap").html('<img src="'+logo+'" />')



    }



    if (!empty(total)){



        $("#"+ page_id +" .total-amount").html(total);



    }







    var merchant_name=getStorage("merchant_name");



    if (!empty(merchant_name)){



        $("#"+ page_id +" .restauran-title").html(merchant_name);



    }



}







function displayItemByCategory(data)



{







    $("#page-menubycategoryitem #search-text").html(data.category_info.category_name);



    $("#page-menubycategoryitem .restauran-title").text(data.merchant_info.restaurant_name);



    $("#page-menubycategoryitem .rating-stars").attr("data-score",data.merchant_info.ratings.ratings);



    initRating();



    $("#page-menubycategoryitem .logo-wrap").html('<img src="'+data.merchant_info.logo+'" />')











    var html='';



    html+='<ons-list class="restaurant-list listExtra my-row-bdr-nn">';



    $.each( data.item, function( key, val ) {







        if (data.disabled_ordering==2){



            html+='<ons-list-item modifier="tappable" class="list-item-container my-row-bdr-nn" onclick="itemNotAvailable(2)" >';



        } else {



            if (val.not_available==2){



                html+='<ons-list-item modifier="tappable" class="list-item-container my-row-bdr-nn" onclick="itemNotAvailable(1)" >';



            } else {



                html+='<ons-list-item modifier="tappable" class="list-item-container my-row-bdr-nn" onclick="loadItemDetails('+val.item_id+','+data.merchant_info.merchant_id+','+data.category_info.cat_id+');"  >';



            }



        }







        html+='<ons-row class="row my-row-bdr">';







        html+='<ons-col class="col-description my-dis-1">';



        html+='<p class="restauran-title concat-text-rmv food-ttl">'+val.item_name+'</p>';



        


        html+='</ons-col>';



        html+='<ons-col class="col-description my-price-1">';



        if ( val.prices.length>0){


			var i=0;
            $.each( val.prices, function( key_price, price ) {

if(i==0){

                if (!empty(price.price_discount_pretty)){



                    html+='<p class="p-small p-mrg-nn"><price class="discount">'+price.price_pretty+'</price>';



                    html+='<price>'+price.price_discount_pretty+'</price>';



                    html+='</p>';



                } else {



                    html+='<p class="p-small p-mrg-nn"><price>'+price.price_pretty+'</price></p>';



                }
}
i++;

            });



        }







        if (val.not_available==2){



            html+='<p>item not available</p>';



        }







        html+='</ons-col>';



        html+='</ons-row>';
        
		html+='<ons-row class="item-space">';

			html+='<p class="p-mrg-nn">'+val.item_description+'</p>';
        
		html+='</ons-row>';


        html+='</ons-list-item>';



    });



    html+='</ons-list>';



    return html;



    //console.log(html);



    $('#'+data.category_info.cat_id).after(html);



    //createElement('menu-list',html);



}







function empty(data)



{



    if (typeof data === "undefined" || data==null || data=="" ) {



        return true;



    }



    return false;



}







function loadItemDetails(item_id,mtid,cat_id)



{



    var options = {



        animation: 'slide',



        onTransitionEnd: function() {



            callAjax("getItemDetails","item_id="+item_id+"&merchant_id="+mtid+"&cat_id="+cat_id);



        }



    };



    sNavigator.pushPage("itemDisplay.html", options);



}







function displayItem(data)



{



    $("#page-itemdisplay .item-header").css({



        'background-image':'url('+data.photo+')'



    });







    $("#page-itemdisplay .title").text(data.item_name);





    $("#page-itemdisplay .description").text(data.item_description);











    if (!empty(data.category_info)){



        $("#page-itemdisplay #search-text").text(data.category_info.category_name);



    }







    var htm='';







    htm+='<input type="hidden" name="item_id" class="item_id" value="'+data.item_id+'">';



    htm+='<input type="hidden" name="currency_symbol" class="currency_symbol" value="'+data.currency_symbol+'">';



    htm+='<input type="hidden" name="discount" class="discount discount_amt" value="'+data.discount+'">';







    if ( data.has_price==2){



        htm+='<ons-list-header class="list-header trn" data-trn-key="price">Size</ons-list-header>';



        var x=0



        $.each( data.prices, function( key, val ) {



            if (data.discount>0){



                var discount_price='<price class="discount">'+val.pretty_price;



                discount_price+='</price>';



                discount_price+='<price>'+val.discounted_price_pretty+'</price>';



                if (x==0){



                    htm+=privatePriceRowWithRadio2('price',



                        val.price+'|'+val.size ,



                        val.size,



                        discount_price,



                        'checked="checked"');



                } else {



                    htm+=privatePriceRowWithRadio2('price',



                        val.price+'|'+val.size,



                        val.size,



                        discount_price);



                }



            } else {



                if (x==0){



                    htm+=privatePriceRowWithRadio('price',



                        val.price+'|'+val.size ,



                        val.size,



                        val.pretty_price,



                        'checked="checked"');



                } else {



                    htm+=privatePriceRowWithRadio('price',



                        val.price+'|'+val.size,



                        val.size,



                        val.pretty_price);



                }



            }



            x++;



        });



    }

 

    if (!empty(data.cooking_ref)){



        htm+='<ons-list-header class="list-header trn" data-trn-key="cooking_ref">Cooking Preference</ons-list-header>';



        $.each( data.cooking_ref, function( key, val ) {



            htm+=privateRowWithRadio('cooking_ref',val,val);



        });



    }







    if (!empty(data.ingredients)){



        htm+='<ons-list-header class="list-header trn" data-trn-key="ingredients">Ingredients</ons-list-header>';



        $.each( data.ingredients, function( key, val ) {



            htm+=privateRowWithCheckbox('ingredients','ingredients',val,val);



        });



    }







    if (!empty(data.addon_item)){



        $.each( data.addon_item, function( key, val ) {



            htm+='<ons-list-header class="list-header require_addon_'+val.subcat_id+' ">'+val.subcat_name+'</ons-list-header>';







            htm+='<input type="hidden" name="require_addon_'+val.subcat_id+'" class="require_addon" value="'+val.require_addons+'" data-id="'+val.subcat_id+'" data-name="'+val.subcat_name+'" >'







            if (!empty(val.sub_item)){



                $.each( val.sub_item, function( key2, val2 ) {



                    if (val.multi_option == "custom"){



                        htm+=subItemRowWithCheckbox(



                            val.subcat_id,



                            'sub_item',



                            val2.sub_item_id+"|"+val2.price +"|"+val2.sub_item_name,



                            val2.sub_item_name,



                            val2.pretty_price ,



                            val.multi_option_val



                        );



                    } else if ( val.multi_option == "multiple") {



                        htm+=subItemRowWithCheckboxQty(



                            val.subcat_id,



                            'sub_item',



                            val2.sub_item_id+"|"+val2.price +"|"+val2.sub_item_name,



                            val2.sub_item_name,



                            val2.pretty_price );



                    } else {



                        htm+=subItemRowWithRadio(



                            val.subcat_id,



                            "sub_item",



                            val2.sub_item_id+"|"+val2.price + "|"+val2.sub_item_name ,



                            val2.sub_item_name,



                            val2.pretty_price);



                    }



                });



            }



        });



    }






    htm+=cartFooter(data.currency_code);


 htm+='<ons-list-header class="list-header trn" data-trn-key="price">'+getTrans("Special Instructions",'special_instruction')+'</ons-list-header>';

    htm+='<ons-list-item class="spec-box"><div class="">';
    htm+='<div class="field-wrapper padd-top-nn">';
    htm+='<textarea name="order_notes" class="trn order_notes text-input text-input--underbar my-txt-area" placeholder="'+getTrans("How can we make your meal just the way you like it?",'special_instruction')+'"></textarea>';
    htm+='</div>';
    htm+='</div></ons-list-item>';




    createElement('item-info',htm);







    setCartValue()







    translatePage();







}







jQuery(document).ready(function() {







    /*jquery onclick*/







    $( document ).on( "click", ".price", function() {



        setCartValue();



    });



    $( document ).on( "change", ".qty", function() {



        setCartValue();



    });







    $( document ).on( "change", ".sub_item", function() {



        setCartValue();



    });







    $( document ).on( "change", ".subitem-qty", function() {



        setCartValue();



    });







    $( document ).on( "click", ".edit-order", function() {

        $('#locationChangeBtn').hide();


        editOrderInit();



    });







    $( document ).on( "click", ".order-apply-changes", function() {


        $('#locationChangeBtn').show();

        applyCartChanges();



    });







    $( document ).on( "click", ".delete-item", function() {



        var id=$(this).data('id');



        var parent=$(this).parent().parent().parent();



        parent.remove();



        $(".subitem-row"+id).remove();



    });







    $( document ).on( "click", ".sub_item_custom", function() {



        var this_obj=$(this);



        var multi=$(this).data("multi");



        if (empty(multi)){



            return;



        }



        var id=$(this).data("id");



        var total_check=0;



        $('.sub_item_custom:checked').each(function(){



            if ( $(this).data("id") == id){



                total_check++;



            }



        });



        if (multi<total_check){



            onsenAlert( getTrans('Sorry but you can select only','sorry_but_you_can_select') + " "+multi+" "  +



                getTrans('addon','addon') );



            this_obj.attr("checked",false);



            return;



        }



    });







    $( document ).on( "click", ".transaction_type", function() {



        var transaction_type=$(this).val();



        setStorage('transaction_type',transaction_type);







        var cart_params=JSON.stringify(cart);



        var extra_params= "&delivery_date=" +  $(".delivery_date").val();



        if ( !empty($(".delivery_time").val()) ){



            extra_params+="&delivery_time="+$(".delivery_time").val();



        }







        callAjax("loadCart","merchant_id="+ getStorage('merchant_id')+"&search_address=" +



            encodeURIComponent(getStorage("search_address")) + "&cart="+cart_params +"&transaction_type=" +



            getStorage("transaction_type") + extra_params );







    });







    $( document ).on( "click", ".payment_list", function() {



        dump( $(this).val() );



        var paypal_card_fee=$(".paypal_card_fee").val();



        switch( $(this).val() )



        {



            case "paypal":



            case "pyp":



                if (paypal_card_fee>0){



                    var total_order_plus_fee=parseFloat(getStorage("order_total_raw")) + parseFloat(paypal_card_fee);



                    total_order_plus_fee= number_format(total_order_plus_fee,2);



                    $(".total-amount").html( getStorage("cart_currency_symbol")+" "+total_order_plus_fee);



                }







                $(".order-change-wrapper").hide();



                $(".payon-delivery-wrapper").hide();



                break;







            case "cod":



                if (paypal_card_fee>0){



                    $(".total-amount").html( getStorage("order_total"));



                }



                $(".order-change-wrapper").show();



                $(".payon-delivery-wrapper").hide();



                break;







            case "pyr":



                if (paypal_card_fee>0){



                    $(".total-amount").html( getStorage("order_total"));



                }



                $(".order-change-wrapper").hide();



                $(".payon-delivery-wrapper").show();



                break;







            default:



                if (paypal_card_fee>0){



                    $(".total-amount").html( getStorage("order_total"));



                }



                $(".order-change-wrapper").hide();



                $(".payon-delivery-wrapper").hide();



                break;



        }



    });







    $( document ).on( "click", ".merchantInfo", function() {



        var page = sNavigator.getCurrentPage();



        dump("pagename=>"+page.name);



        if ( page.name=="merchantInfo.html"){



            return;



        }







        var options = {



            animation: 'none',



            onTransitionEnd: function() {



                displayMerchantLogo2(



                    getStorage("merchant_logo") ,



                    '' ,



                    'page-merchantinfo'



                );



                callAjax("getMerchantInfo","merchant_id="+ getStorage('merchant_id'));



            }



        };







        var found=false;



        var _pages = sNavigator.getPages();



        dump( _pages.length );



        if ( _pages.length>0){



            $.each( _pages, function( key, val ) {



                if (!empty(val)){



                    dump(val.name);



                    if ( val.name=="merchantInfo.html"){



                        dump('found');



                        found=true;



                        //sNavigator.resetToPage("merchantInfo.html",options);



                        sNavigator.popPage();



                    }



                }



            });



        }







        if (found){



            dump('exit');



            return;



        }







        sNavigator.pushPage("merchantInfo.html", options);



    });







    $( document ).on( "click", ".setAddress", function() {



        var address=$(this).data("address");
		//appdata.tempAddress=address;


        var address_split=address.split("|");

		

        dump(address_split);



        if ( address_split.length>0){



            $(".street").val( address_split[0] );



            $(".city").val( address_split[1] );



            $(".state").val( address_split[2] );



            $(".zipcode").val( address_split[3] );



            $(".location_name").val( address_split[4] );



            dialogAddressBook.hide();



        } else {



            onsenAlert(  getTrans("Error: cannot set address book",'cannot_set_address')  );



            dialogAddressBook.hide();



        }



    });







}); /*end ready*/







function setCartValue()



{



    /*set the default total price based on selected price*/



    var selected_price=parseFloat($(".price:checked").val());



    var discount= parseFloat( $(".discount_amt").val() );



    if (isNaN(discount)){



        discount=0;



    }



    /*dump("discount=>"+discount);



     dump("selected_price=>"+selected_price);*/



    var qty=parseFloat($(".qty").val());



    var total_value=qty* (selected_price-discount);







    //adon



    dump('addon total');



    var addon_total=0;



    $('#page-itemdisplay .sub_item:checkbox:checked').each(function(){



        var addo_price=explode("|",$(this).val());



        if ( $(this).data("withqty")==2 ){



            var p=$(this).parent().parent().parent();



            var qtysub= parseFloat(p.find('.subitem-qty').val());



            addon_total+=qtysub* parseFloat(addo_price[1]);



        } else {



            addon_total+=qty* parseFloat(addo_price[1]);



        }



    });







    $('#page-itemdisplay .sub_item:radio:checked').each(function(){



        var addo_price=explode("|",$(this).val());



        addon_total+=qty * parseFloat(addo_price[1]);



    });







    total_value+=addon_total;



   
	$(".total_value").html(  $(".currency_symbol").val() +" "+ total_value.toFixed(2));


}







function addCartQty(bolean)



{



    var qty=parseInt($("#page-itemdisplay .qty").val());



    if ( bolean==2){



        qty=qty+1;



    } else {



        qty=qty-1;



    }



    if ( qty>1){



        $("#page-itemdisplay .qty").val(qty)



    } else {



        $("#page-itemdisplay .qty").val(1)



    }



    setCartValue();



}







function addToCart()



{



    var proceed=true;



    /*check if sub item has required*/



    if ( $(".require_addon").exists()){



        $(".small-red-text").remove();



        $('.require_addon').each(function () {



            if ( $(this).val()==2 ) {



                var required_addon_id=$(this).data("id");



                var required_addon_name=$(this).data("name");



                var required_addon_selected=$(".sub_item_name_"+required_addon_id+":checked").length;



                if ( required_addon_selected <=0){



                    proceed=false;







                    $(".require_addon_"+required_addon_id).after(



                        "<span class=\"small-red-text\">You must select at least one addon - "+required_addon_name



                        +'</span');



                }



            }



        });



    }







    dump("proceed=>"+proceed);



    if (!proceed){



        return;



    }







    var sub_item=[];



    var cooking_ref=[];



    var ingredients=[];



    var item_id='';



    var qty=0;



    var price=0;



    var order_notes='';



    var discount='';



    //dump('add to cart');



    //var params = $( "#page-itemdisplay .frm-foodorder").serialize();



    var params = $( "#page-itemdisplay .frm-foodorder").serializeArray();



    if (!empty(params)){



        $.each( params, function( key, val ) {



            /*item*/



            if (val.name=="item_id"){



                item_id=val.value;



            }



            if (val.name=="qty"){



                qty=val.value;



            }



            if (val.name=="price"){



                price=val.value;



            }



            /*sub item*/



            /*if ( val.name=="sub_item"){



             sub_item[sub_item.length]={"value":val.value};



             }*/



            /*cooking_ref*/



            if ( val.name=="cooking_ref"){



                cooking_ref[cooking_ref.length]={"value":val.value};



            }



            /*ingredients*/



            if ( val.name=="ingredients"){



                ingredients[ingredients.length]={"value":val.value};



            }



            if ( val.name=="order_notes"){



                order_notes=val.value;



            }



            if ( val.name=="discount"){



                discount=val.value;



            }



        });







        /*get sub item */



        $.each( $(".sub_item:checked") , function( key, val ) {



            var parent=$(this).parent().parent().parent();



            var sub_item_qty = parent.find(".subitem-qty").val()



            if (empty(sub_item_qty)){



                sub_item_qty="itemqty";



            }



            var subcat_id=$(this).data("id");



            sub_item[sub_item.length] = {



                'subcat_id':subcat_id,



                'value':$(this).val(),



                'qty':sub_item_qty



            };



        });







        cart[cart.length]={



            "item_id":item_id,



            "qty":qty,



            "price":price,



            "sub_item":sub_item,



            "cooking_ref":cooking_ref,



            "ingredients":ingredients,



            'order_notes': order_notes,



            'discount':discount



        };



        dump(cart);



        sNavigator.popPage({cancelIfRunning: true}); //back button



        onsenAlert(  getTrans("Item added to cart",'item_added_to_cart') );







        showCartNosOrder();



    }



}







function showCart()



{



    var options = {



        animation: 'none',



        onTransitionEnd: function() {



            var cart_params=JSON.stringify(cart);



            callAjax("loadCart","merchant_id="+ getStorage('merchant_id')+"&search_address=" +



                encodeURIComponent(getStorage("search_address")) + "&cart="+cart_params +"&transaction_type=" +



                getStorage("transaction_type") );



        }



    };



    sNavigator.pushPage("cart.html", options);



}







function showCartNosOrder()



{



    dump('showCartNosOrder');



    dump(  cart.length );



    if ( cart.length>0 ){

        var price=0;

        $.each(cart,function(index,val){

            console.log(val);

            price+=parseFloat(val.price,2)*val.qty;

            //price-=parseFloat(val.discount,2);

        });

        console.log(price);
		  price=parseFloat(price).toFixed(2);
        $(".cart-num").show();

        $(".cart-num").text(price);

    } else {



        $(".cart-num").hide();



    }



}







function displayOrderData(data){
    var delivery_date=(data.history[0])?data.history[0].date_created:'';
    var detailMain={OrderId:appdata.tempOrderId,delivery_date:'Delivery/Pickup : '+delivery_date,restaurant_name:data.merchant_info.restaurant_name};
    $('#merchantData').html(appdata.renderHtmldata('orderDetailsTemplate',[detailMain]));

    var htm='';
    htm+='<input type="hidden" name="validation_msg" class="validation_msg" value="'+data.validation_msg+'">';
    htm+='<input type="hidden" name="required_time" class="required_time" value="'+data.required_time+'">';

    if (!empty(data.delivery_date)){
        $("[name=delivery_date]").val( data.delivery_date);
        $("[name=delivery_date2]").attr('placeholder', 'Today');
    }

    if (!empty(data.cart)){
        if(!empty(data.cart.grand_total.amount_pretty)){



            $(".total-amount").html(data.cart.grand_total.amount_pretty);



        }







        var xx=1;



        $.each( data.cart.cart, function( key, val ) {



            /*sub item*/
            var htmsub='';


            if (!empty(val.sub_item)){



                var x=0;



                $.each( val.sub_item , function( key_sub, val_sub ) {



                    // htm+='<ons-list-header class="subitem-row'+xx+'">'+key_sub+'</ons-list-header>';



                    $.each( val_sub  , function( key_sub2, val_sub2 ) {



                        dump(val_sub2);



                        if ( val_sub2.qty =="itemqty"){



                            subitem_qty=val.qty;



                        } else {



                            subitem_qty=val_sub2.qty;



                        }







                        htmsub+=tplCartRowNoBorderAddon(



                            val_sub2.subcat_id,



                            val_sub2.sub_item_id,



                            val_sub2.sub_item_name,



                            val_sub2.price,



                            val_sub2.total_pretty,



                            subitem_qty ,



                            val_sub2.qty,



                            xx



                        );



                        x++;



                    });



                });



            }






            if (val.discount>0){



                htm+=tplCartRowNoBorderMore(



                    val.item_id,



                    val.item_name,



                    val.price+'|'+val.size,



                    val.total_pretty,



                    val.qty,



                    'price',



                    val.size,



                    xx,



                    val.discounted_price,



                    val.discount,

                    htmlSub



                );







            } else {



                htm+=tplCartRowNoBorderMore(



                    val.item_id,



                    val.item_name,



                    val.price+'|'+val.size,



                    val.total_pretty,



                    val.qty,



                    'price',



                    val.size,



                    xx,



                    val.price,



                    val.discount,

                    htmsub



                );



            }







            /*if ( !empty(val.order_notes)){



             htm+=tplCartRowHiddenFields( val.order_notes ,



             val.order_notes ,



             'order_notes',



             xx ,



             'row-no-border' );



             }
             */






            if (!empty(val.cooking_ref)){



                htm+=tplCartRowHiddenFields( val.cooking_ref ,



                    val.cooking_ref ,



                    'cooking_ref',



                    xx ,



                    'row-no-border' );



            }







            if (!empty(val.ingredients)){



                htm+='<ons-list-header class="subitem-row'+xx+'">Ingredients</ons-list-header>';



                $.each( val.ingredients, function( key_ing, val_ing ) {



                    htm+=tplCartRowHiddenFields( val_ing , val_ing ,'ingredients', xx ,'row-no-border' );



                });



            }







            /*if (!empty(val.sub_item)){



             var x=0



             $.each( val.sub_item , function( key_sub, val_sub ) {



             if (x==0){



             htm+='<ons-list-header>'+val_sub.category_name+'</ons-list-header>';



             }



             htm+=tplCartRowNoBorderSub(



             val_sub.sub_item_id,



             val_sub.sub_item_name,



             val_sub.price,



             val_sub.total_pretty,



             val_sub.qty ,



             'sub_item',



             xx



             );



             x++;



             });



             }*/














            xx++;



        });












        htm+='<ons-list-item class="main-total r-total" >';


        if (!empty(data.cart.discount)){



            htm+=tplCartRow(data.cart.discount.display, '('+data.cart.discount.amount_pretty+')' ,'price-normal' );



        }



        if (!empty(data.cart.sub_total)){



            htm+=tplCartRow( getTrans('Sub Total','sub_total') , data.cart.sub_total.amount_pretty ,'price-normal');



        }



        if (!empty(data.cart.delivery_charges)){



            htm+=tplCartRow( getTrans('Delivery Fee','delivery_fee') , data.cart.delivery_charges.amount_pretty, 'price-normal');



        }



        if (!empty(data.cart.packaging)){



            htm+=tplCartRow( getTrans('Packaging','packaging') , data.cart.packaging.amount_pretty, 'price-normal');



        }



        if (!empty(data.cart.tax)){



            htm+=tplCartRow(data.cart.tax.tax_pretty, data.cart.tax.amount, 'price-normal');



        }



        if (!empty(data.cart.grand_total)){



            htm+=tplCartRow('<b class="trn" data-trn-key="total">Total</b>', data.cart.grand_total.amount_pretty );



        }




        htm+='</ons-list-item >';


    }


    createElement('cart-item',htm);
    if ( data.request_from=="mobile_app"){
        var htmlbtn='<button class="button green-btn button--large trn" onclick="reOrder('+data.order_id+');" data-trn-key="click_here_to_reorder" >';

        htmlbtn+='Click here to Re-order';
        htmlbtn+='</button>';
        createElement('re-order-wrap', htmlbtn );
    }
    
    
    var htm='<ons-list-header class="center trn" data-trn-key="status_history">Status History</ons-list-header>';



    if ( data.history.length>0 ){



        $.each( data.history, function( key, val ) {



            dump(val);



            htm+='<ons-list-item>';



            htm+='<ons-row class="row">';



            htm+='<ons-col class="" >';



            htm+= val.date_created;



            htm+='</ons-col>';



            htm+='<ons-col class="padding-left5" width="20%">';



            htm+=val.status;



            htm+='</ons-col>';



            



            htm+='</ons-row>';



            htm+='</ons-list-item>';



        });



    } else {



        htm+='<ons-list-item class="center">';



        htm+='No history found';



        htm+='</ons-list-item>';



    }



    createElement('item-history', htm );
    
    initMobileScroller();
    translatePage();
}

function displayCart(data)

{
    // display merchant logo
    displayMerchantLogo(data,'page-cart');
    var htm='';
    htm+='<input type="hidden" name="validation_msg" class="validation_msg" value="'+data.validation_msg+'">';



    htm+='<input type="hidden" name="required_time" class="required_time" value="'+data.required_time+'">';







    /*set storage merchant logo*/



    setStorage("merchant_logo",data.merchant_info.logo);



    setStorage("order_total",data.cart.grand_total.amount_pretty);







    setStorage("order_total_raw",data.cart.grand_total.amount);



    setStorage("cart_currency_symbol",data.currency_symbol);







    if (!empty(data.delivery_date)){



       $("[name=delivery_date]").val( data.delivery_date);
        $("[name=delivery_date2]").attr('placeholder', 'Today');


    }







    if (!empty(data.cart)){







        if(!empty(data.cart.grand_total.amount_pretty)){



            $(".total-amount").html(data.cart.grand_total.amount_pretty);



        }







        var xx=1;



        $.each( data.cart.cart, function( key, val ) {



				            /*sub item*/
				var htmsub='';


            if (!empty(val.sub_item)){



                var x=0;



                $.each( val.sub_item , function( key_sub, val_sub ) {



                   // htm+='<ons-list-header class="subitem-row'+xx+'">'+key_sub+'</ons-list-header>';



                    $.each( val_sub  , function( key_sub2, val_sub2 ) {



                        dump(val_sub2);



                        if ( val_sub2.qty =="itemqty"){



                            subitem_qty=val.qty;



                        } else {



                            subitem_qty=val_sub2.qty;



                        }







                        htmsub+=tplCartRowNoBorderAddon(



                            val_sub2.subcat_id,



                            val_sub2.sub_item_id,



                            val_sub2.sub_item_name,



                            val_sub2.price,



                            val_sub2.total_pretty,



                            subitem_qty ,



                            val_sub2.qty,



                            xx



                        );



                        x++;



                    });



                });



            }






            if (val.discount>0){



                htm+=tplCartRowNoBorderMore(



                    val.item_id,



                    val.item_name,



                    val.price+'|'+val.size,



                    val.total_pretty,



                    val.qty,



                    'price',



                    val.size,



                    xx,



                    val.discounted_price,



                    val.discount,
					
					htmlSub



                );







            } else {



                htm+=tplCartRowNoBorderMore(



                    val.item_id,



                    val.item_name,



                    val.price+'|'+val.size,



                    val.total_pretty,



                    val.qty,



                    'price',



                    val.size,



                    xx,



                    val.price,



                    val.discount,
					
					htmsub



                );



            }







            /*if ( !empty(val.order_notes)){



                htm+=tplCartRowHiddenFields( val.order_notes ,



                    val.order_notes ,



                    'order_notes',



                    xx ,



                    'row-no-border' );



            }
*/






            if (!empty(val.cooking_ref)){



                htm+=tplCartRowHiddenFields( val.cooking_ref ,



                    val.cooking_ref ,



                    'cooking_ref',



                    xx ,



                    'row-no-border' );



            }







            if (!empty(val.ingredients)){



                htm+='<ons-list-header class="subitem-row'+xx+'">Ingredients</ons-list-header>';



                $.each( val.ingredients, function( key_ing, val_ing ) {



                    htm+=tplCartRowHiddenFields( val_ing , val_ing ,'ingredients', xx ,'row-no-border' );



                });



            }







            /*if (!empty(val.sub_item)){



             var x=0



             $.each( val.sub_item , function( key_sub, val_sub ) {



             if (x==0){



             htm+='<ons-list-header>'+val_sub.category_name+'</ons-list-header>';



             }



             htm+=tplCartRowNoBorderSub(



             val_sub.sub_item_id,



             val_sub.sub_item_name,



             val_sub.price,



             val_sub.total_pretty,



             val_sub.qty ,



             'sub_item',



             xx



             );



             x++;



             });



             }*/














            xx++;



        });












	htm+='<ons-list-item class="main-total r-total" >';


        if (!empty(data.cart.discount)){



            htm+=tplCartRow(data.cart.discount.display, '('+data.cart.discount.amount_pretty+')' ,'price-normal' );



        }



        if (!empty(data.cart.sub_total)){



            htm+=tplCartRow( getTrans('Sub Total','sub_total') , data.cart.sub_total.amount_pretty ,'price-normal');



        }



        if (!empty(data.cart.delivery_charges)){



            htm+=tplCartRow( getTrans('Delivery Fee','delivery_fee') , data.cart.delivery_charges.amount_pretty, 'price-normal');



        }



        if (!empty(data.cart.packaging)){



            htm+=tplCartRow( getTrans('Packaging','packaging') , data.cart.packaging.amount_pretty, 'price-normal');



        }



        if (!empty(data.cart.tax)){



            htm+=tplCartRow(data.cart.tax.tax_pretty, data.cart.tax.amount, 'price-normal');



        }



        if (!empty(data.cart.grand_total)){



            htm+=tplCartRow('<b class="trn" data-trn-key="total">Total</b>', data.cart.grand_total.amount_pretty );



        }




htm+='</ons-list-item >';


    }







    var transaction_type=getStorage("transaction_type");



    if (empty(transaction_type)){



        transaction_type='delivery';



    }



    dump("transaction_type=>"+transaction_type);



    setStorage('transaction_type',transaction_type);







    htm+='<ons-list-header class="trn receiptData" data-trn-key="delivery_options">Delivery Options</ons-list-header>';



    /*htm+=privateRowWithRadio('transaction_type','delivery','Delivery');



     htm+=privateRowWithRadio('transaction_type','pickup','Pickup');*/



    htm+='<div class="center del-opt-bck">';
	
    htm+=appdata.creteHtml('buttonTemplate',{_NAME_:'transaction_type',_VALUE_:'delivery',_LABEL_:'<i style="font-size: x-large;" class="fa fa-shopping-bag"></i> Delivery'});

    htm+=appdata.creteHtml('buttonTemplate',{_NAME_:'transaction_type',_VALUE_:'pickup',_LABEL_:'<i style="font-size: x-large;" class="fa fa-car"></i> Pickup'});

    htm+='</div>';
    //htm+=privateRowWithRadio('transaction_type','delivery', '<i class="fa fa-shopping-bag"></i>' );



    //htm+=privateRowWithRadio('transaction_type','pickup',  '<i class="fa fa-car"></i>' );


appdata.tempContact=data.merchant_info.contact_phone; appdata.tempCartHtml=htm;




    createElement('cart-item',htm);







    //$('.transaction_type[value="' + transaction_type + '"]').prop('checked', true);



    $.each( $(".transaction_type") , function() {



        if ( $(this).val()==transaction_type ){



            $(this).attr("checked",true);



        }



    });







    if ( transaction_type=="delivery"){



      
    } else {


    }







    initMobileScroller();



    translatePage();



}







function editOrderInit()



{



    $("#page-cart .numeric_only").show();



    $(".order-apply-changes").show();



    $(".edit-order").hide();



    $(".qty-label").hide();



    $(".row-del-wrap").show();







    var x=1;



    $.each( $(".item-qty") , function( key, val ) {



        $.each( $(".subitem-qty"+x) , function( key2, val2 ) {



            if ( $(this).data("qty")!="itemqty"){



                $(this).show();



            }



        });



        x++;



    });



}







function applyCartChanges()



{



    $("#page-cart .numeric_only").hide();



    $(".order-apply-changes").hide();



    $(".edit-order").show();



    $(".qty-label").show();



    $(".subitem-qty").hide();



    $(".row-del-wrap").hide();







    dump( "qty L=>"+ $(".item-qty").length );



    if (!empty( $(".item-qty") )){



        cart=[];



        var x=1;



        $.each( $(".item-qty") , function( key, val ) {







            var x=$(this).data("rowid");



            dump("rowid=>"+x);







            var sub_item=[];



            var ingredients=[];



            var cooking_ref=[];



            var order_notes='';



            var discount='';







            /*$.each( $(".subitem-qty"+x) , function( key2, val2 ) {



             sub_item[sub_item.length]={



             'value': $(".sub_item_id"+x).val() + "|" + $(".sub_item_price"+x).val() +'|' + $(".sub_item_name"+x).val()



             };



             });*/







            if ( $(".ingredients"+x).exists() ){



                ingredients[ingredients.length]={



                    'value': $(".ingredients"+x).val()



                };



            }







            if ( $(".cooking_ref"+x).exists() ){



                cooking_ref[cooking_ref.length]={



                    'value': $(".cooking_ref"+x).val()



                };



            }







            if ( $(".order_notes"+x).exists() ){



                /*order_notes[order_notes.length]={



                 'value': $(".order_notes"+x).val()



                 };*/



                order_notes=$(".order_notes"+x).val();



            }







            /*get sub item*/



            $.each( $(".subitem-qty"+x) , function( key2, val2 ) {



                subqty = $(this).data("qty");



                if ( $(this).data("qty") != "itemqty"){



                    subqty = $(this).val();



                }



                var parent=$(this).parent().parent();



                var subcat_id=parent.find(".subcat_id").val();



                var subcat_value= parent.find(".sub_item_id").val()+'|'+



                    parent.find(".sub_item_price").val()+'|'+parent.find(".sub_item_name").val();







                sub_item[sub_item.length]={



                    'qty':subqty,



                    'subcat_id': subcat_id ,



                    'value': subcat_value



                };



            });



            cart[cart.length]={



                'item_id':$(".item_id"+x).val(),



                'qty': $(this).val(),



                'price': $(".price"+x).val(),



                "sub_item":sub_item,



                'cooking_ref': cooking_ref ,



                "ingredients":ingredients,



                "order_notes":order_notes,



                "discount":$(".discount"+x).val(),



            };



            x++;



        });







        dump('updated cartx');



        dump(cart);







        var cart_params=JSON.stringify(cart);







        var extra_params= "&delivery_date=" +  $(".delivery_date").val();



        if ( !empty($(".delivery_time").val()) ){



            extra_params+="&delivery_time="+$(".delivery_time").val();



        }







        callAjax("loadCart","merchant_id="+ getStorage('merchant_id')+"&search_address=" +



            encodeURIComponent(getStorage("search_address")) + "&cart="+cart_params+"&transaction_type=" +



            getStorage("transaction_type") + extra_params );







    }



}







function checkOut()



{



    var validation_msg=$(".validation_msg").val();



    dump(validation_msg);



    dump(cart);



    if ( cart.length<1){



        onsenAlert( getTrans("Your cart is empty",'your_cart_is_empty') );



        return;



    }







    if ( validation_msg!="" ){



        dump('d2');



        onsenAlert(validation_msg);



        return;



    }



    //var tr_type=getStorage("transaction_type");



    var tr_type = $(".transaction_type:checked").val();



    dump("tr_type=>"+tr_type);







    if ( tr_type =="pickup"){



        if ( $(".delivery_time").val()==""){



            onsenAlert(  getTrans("Pickup time is required",'pickup_time_is_required') );



            return;



        }



    }







    if ( $(".required_time").val()==2){



        if ( $(".delivery_time").val() ==""){



            onsenAlert( tr_type+ " "+ getTrans('time is required','time_is_required') );



            return;



        }



    }



  appdata.tempDeliveryData={type:tr_type,delivery_time:$(".delivery_time").val()}



       var extra_params= "&delivery_date=" +  $("[name=delivery_date]").val();



    if ( !empty($(".delivery_time").val()) ){



        extra_params+="&delivery_time="+$(".delivery_time").val();



    }



    extra_params+="&client_token="+getStorage("client_token");







    callAjax("checkout","merchant_id="+ getStorage('merchant_id')+"&search_address=" +



        encodeURIComponent(getStorage("search_address")) + "&transaction_type=" +



        getStorage("transaction_type") + extra_params );



}







function clientRegistration()



{



    $.validate({



        form : '#frm-checkoutsignup',



        borderColorOnError:"#FF0000",



        onError : function() {



        },



        onSuccess : function() {



            var params = $( "#frm-checkoutsignup").serialize();



            params+="&transaction_type=" +  getStorage("transaction_type") ;



            params+="&device_id="+ getStorage("device_id");



            callAjax("signup",params);



            return false;



        }



    });



}







function clientShipping()



{
    
    
    $.fn.serializeObject = function()
{
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};




    $.validate({



        form : '#frm-shipping',



        borderColorOnError:"#FF0000",



        onError : function() {



        },



        onSuccess : function() {



            var params = $( "#frm-shipping").serialize();

           
            appdata.tempAddress = $( "#frm-shipping").serializeObject();

            setStorage('shipping_address',params);



            dump(params);



            var options = {



                animation: 'slide',



                onTransitionEnd: function() {



                    displayMerchantLogo2(



                        getStorage("merchant_logo") ,



                        getStorage("order_total") ,



                        'page-paymentoption'



                    );



                    var params="merchant_id="+ getStorage("merchant_id");



                    //callAjax("getPaymentOptions",params);

                    callAjax("clienttoken",params);



                }



            };



            sNavigator.pushPage("paymentOption.html", options);



            return false;



        }



    });



}







function displayPaymentOptions(data)



{



    var htm='';



    $.each( $(data.details.payment_list) , function( key, val ) {



        dump(val);



        htm+=tplPaymentList('payment_list', val.value, val.label, val.icon);



    });



    createElement('payment-list',htm);







    var htm='';



    if (data.details.pay_on_delivery_flag==1){



        $.each( $(data.details.pay_on_delivery_list) , function( key, val ) {



            dump(val);



            htm+=tplPaymentProvider('payment_provider_name', val.payment_name, val.payment_name, val.payment_logo);



        });



        createElement('payon-deliver-list',htm);



    }



}







function placeOrder()



{

    if(!nonceB){

        $('#BraintreeSubmit').click();

        return false;

    }

    if ( true){







        var selected_payment=$('.payment_list:checked').val();



        dump(selected_payment);



        if ( selected_payment=="pyr"){



            dump( $('.payment_provider_name:checked').length );



            if ( $('.payment_provider_name:checked').length <= 0){



                onsenAlert( getTrans("Please select payment provider",'please_select_payment_provider') );



                return;



            }



        }







        var params = $( "#frm-paymentoption").serialize();



        var cart_params = JSON.stringify(cart);



        var extra_params= "&delivery_date=" +  $(".delivery_date").val();



        if ( !empty($(".delivery_time").val()) ){



            extra_params+="&delivery_time="+$(".delivery_time").val();



        }



        //extra_params+="&payment_method="+ $(".payment_list:checked").val();



        //extra_params+="&order_change="+ $(".order_change").val();



        extra_params+="&"+getStorage("shipping_address") ;



        extra_params+="&client_token="+ getStorage('client_token');



        extra_params+="&search_address="+ getStorage('search_address');



        extra_params+='&payment_list=braintree';
        extra_params+='&cart_tip_value='+appdata.tip.val;
        extra_params+='&cart_tip_percentage='+appdata.tip.key;

        extra_params+="&"+params;







        callAjax("placeOrder","merchant_id="+ getStorage('merchant_id') +



            "&cart="+ urlencode(cart_params) +

            "&braintree_nonce="+ nonceB +

            "&transaction_type=" +



            getStorage("transaction_type") + extra_params );







    } else {



        onsenAlert( getTrans("Please select payment method",'please_select_payment_method') );



    }



}







/*sliding menu*/



ons.ready(function() {



    menu.on('preopen', function() {



        console.log("Menu page is going to open");



        if (isLogin()){



            $(".logout-menu").show();

            $(".login-menu").hide();


        } else {

            $(".logout-menu").hide();
            $(".login-menu").show();
        }






        translatePage();



    });



});







function showMerchantInfo(data)



{



    dump(data);



    $("#page-merchantinfo h3").html(data.merchant_info.restaurant_name);



    $("#page-merchantinfo h5").html(data.merchant_info.cuisine);
/*
	var addressMer=data.merchant_info.address;
	        var address_split=addressMer.split(",");
			
			var DispalyAddress=address_split[0]; 
			if (typeof address_split[1] !== "undefined" ){
				DispalyAddress+='<br>'+address_split[1];
			}
			
			if (typeof address_split[2] !== "undefined" ){
				DispalyAddress+='<br>'+address_split[2];
			}
			
			if (typeof address_split[3] !== "undefined" ){
				DispalyAddress+='<br>'+address_split[3];
			}
			
			if (typeof address_split[4] !== "undefined" ){
				DispalyAddress+='<br>'+address_split[4];
			}
			*/

    $("#page-merchantinfo address").html(data.merchant_info.address_formated);



    $("#page-merchantinfo .rating-stars").attr("data-score",data.merchant_info.ratings.ratings);



    if (!empty(data.reviews)){


$('.totalReview').append(' ('+data.reviews.total_review+' RATINGS)');
        $(".total-reviews").html(data.reviews.total_review + " "+ getTrans("reviews",'reviews') );
$(".latest-review").after('<ons-row><div class="review-txt" onclick="$(this).next().click();">'+data.reviews.review+'</div><div class="review-icon" onclick="loadMoreReviews();"><i class="fa fa-chevron-right"></i></div></ons-row>');



    }

$(".contactMerchant").html(data.merchant_info.contact_phone);


    $(".opening-hours").html(data.opening_hours);







    if (!empty(data.payment_method)){



        var p='';



        p+='<ons-list-header class="center trn" data-trn-key="payment_methods">Payment Methods</ons-list-header>';



        $.each( $(data.payment_method) , function( key, val ) {



            p+=tplPaymentListStatic(val.value , val.label, val.icon);



        });



        createElement('merchant-payment-list', p );



    }





    

    if (!empty(data.reviews)){



        $(".latest-review").html( 'By '+ data.reviews.client_name+" - "+data.reviews.date_created );



    }







    if (!empty(data.maps)){



        $("#merchant-map").show();







        var locations={



            "name":data.merchant_info.restaurant_name,



            "lat":data.maps.merchant_latitude,



            "lng":data.maps.merchant_longtitude



        };







        /*dump(locations);



         initializeMarker(locations); */







        /*show merchant map location*/



        dump('show merchant map location');



        initMerchantMap(locations);







    } else {



        $("#merchant-map").hide();



    }







    /*check if booking is enabled*/



    if ( data.enabled_table_booking==2){



        $("#book-table").show();



    } else $("#book-table").hide();







    initRating();



}







function loadBookingForm()



{



    var options = {



        animation: 'slide',



        onTransitionEnd: function() {







            displayMerchantLogo2(



                getStorage("merchant_logo") ,



                '' ,



                'page-booking'



            );







            initMobileScroller();







            /*translate booking form*/



            $(".number_guest").attr("placeholder", getTrans('Number Of Guests','number_of_guest') );



            $(".date_booking").attr("placeholder", getTrans('Date Of Booking','date_of_booking') );



            $(".booking_time").attr("placeholder", getTrans('Time Of Booking','time_of_booking') );



            $(".booking_name").attr("placeholder", getTrans('Name','name') );



            $(".email").attr("placeholder", getTrans('Email Address','email_address') );



            $(".mobile").attr("placeholder", getTrans('Mobile Number','mobile_number') );



            $(".booking_notes").attr("placeholder", getTrans('Your Instructions','your_instructions') );







            translateValidationForm();







        }



    };



    sNavigator.pushPage("booking.html", options);



}







function submitBooking()



{



    $.validate({



        form : '#frm-booking',



        borderColorOnError:"#FF0000",



        onError : function() {



        },



        onSuccess : function() {



            var params = $( "#frm-booking").serialize();



            params+="&merchant_id=" +  getStorage("merchant_id") ;



            callAjax("bookTable",params);



            return false;



        }



    });



}







function loadMoreReviews()



{



    var page = sNavigator.getCurrentPage();



    if ( page.name=="reviews.html"){



        var params="merchant_id=" +  getStorage("merchant_id") ;



        callAjax("merchantReviews",params);



        return;



    }







    var options = {



        animation: 'slide',



        onTransitionEnd: function() {



            displayMerchantLogo2(



                getStorage("merchant_logo") ,



                '' ,



                'page-reviews'



            );



            var params="merchant_id=" +  getStorage("merchant_id") ;



            callAjax("merchantReviews",params);



        }



    };



    sNavigator.pushPage("reviews.html", options);



}







function displayReviews(data)



{



    var htm='';



    $.each( data, function( key, val ) {



        htm+=tplReviews(val.rating, val.client_name, val.review, val.date_created );



    });



    createElement('review-list-scroller',htm);



    initRating();



}







function showReviewForm()



{



    var options = {



        animation: 'none',



        onTransitionEnd: function() {



            displayMerchantLogo2(



                getStorage("merchant_logo") ,



                '' ,



                'page-addreviews'



            );







            translatePage();



            $(".rating").attr("placeholder", getTrans('Your Rating 1 to 5','your_rating') );



            $(".review").attr("placeholder", getTrans('Your reviews','your_reviews') );



            translateValidationForm();



        }



    };



    sNavigator.pushPage("addReviews.html", options);



}







function addReview()



{



    $.validate({



        form : '#frm-addreview',



        borderColorOnError:"#FF0000",



        onError : function() {



        },



        onSuccess : function() {



            var params = $( "#frm-addreview").serialize();



            params+="&merchant_id=" +  getStorage("merchant_id") ;



            params+="&client_token="+ getStorage("client_token");



            callAjax("addReview",params);



            return false;



        }



    });



}















function showFilterResto()



{



    if (typeof dialogBrowseResto === "undefined" || dialogBrowseResto==null || dialogBrowseResto=="" ) {



        ons.createDialog('filterBrowseResto.html').then(function(dialog) {



            $(".restaurant_name").val('');



            dialog.show();







            translatePage();



            translateValidationForm();



            $(".restaurant_name").attr("placeholder", getTrans('Enter Restaurant name','enter_resto_name')  );







        });



    } else {



        $(".restaurant_name").val('');



        dialogBrowseResto.show();







        /*translatePage();



         translateValidationForm();



         $(".restaurant_name").attr("placeholder", getTrans('Enter Restaurant name','enter_resto_name')  );*/



    }



}







function submitFilterBrowse()



{



    $.validate({



        form : '#frm-filterbrowse',



        borderColorOnError:"#FF0000",



        onError : function() {



        },



        onSuccess : function() {



            dialogBrowseResto.hide();



            var params = $( "#frm-filterbrowse").serialize();



            callAjax("browseRestaurant",params);



            return false;



        }



    });



}







function showProfile()



{



    if (isLogin()){



        menu.setMainPage('profile.html', {closeMenu: true});



    } else {



        menu.setMainPage('prelogin.html', {closeMenu: true})



    }



}







function saveProfile()



{



    $.validate({



        form : '#frm-profile',



        borderColorOnError:"#FF0000",



        onError : function() {



        },



        onSuccess : function() {



            var params = $( "#frm-profile").serialize();



            params+="&client_token="+ getStorage("client_token");



            callAjax("saveProfile",params);



            return false;



        }



    });



}







function login()



{



    $.validate({



        form : '#frm-login',



        borderColorOnError:"#FF0000",



        onError : function() {



        },



        onSuccess : function() {



            var params = $( "#frm-login").serialize();



            params+="&device_id="+ getStorage("device_id");



            callAjax("login",params);



            return false;



        }



    });



}







function logout()



{



    removeStorage("client_token");



    onsenAlert(  getTrans("Your are now logout",'you_are_now_logout') );



    menu.setMainPage('home.html', {closeMenu: true});



}







function isLogin()



{



    if (!empty(getStorage("client_token"))){



        return true;



    }



    return false;



}







function showLogin(next_steps)



{



    var options = {



        animation: 'slide',



        onTransitionEnd: function() {



            if ( !empty(next_steps)){



                $(".page-login-fb").show();



                $(".next_steps").val( getStorage("transaction_type") );



            } else {



                $(".page-login-fb").hide();



                $(".next_steps").val( '' );



            }



        }



    };



    sNavigator.pushPage("login.html", options);



}







function showForgotPass()



{



    $(".email_address").val('');



    if (typeof dialogForgotPass === "undefined" || dialogForgotPass==null || dialogForgotPass=="" ) {



        ons.createDialog('forgotPassword.html').then(function(dialog) {



            dialog.show();



            translatePage();



            translateValidationForm();



            $(".email_address").attr("placeholder",  getTrans('Email Address','email_address') );



        });



    } else {



        dialogForgotPass.show();



    }



}







function forgotPassword()



{



    $.validate({



        form : '#frm-forgotpass',



        borderColorOnError:"#FF0000",



        onError : function() {



        },



        onSuccess : function() {



            var params = $( "#frm-forgotpass").serialize();



            callAjax("forgotPassword",params);



            return false;



        }



    });



}


function showSignupFormChekout()
{
  var options = {
  animation: 'slide',
  onTransitionEnd: function() {
   displayMerchantLogo2( getStorage("merchant_logo") ,
   getStorage("order_total") ,
   'page-checkoutsignup');
   }
  };
  sNavigator.pushPage("checkoutSignup.html", options);
}




function showSignupForm()



{



    var options = {



        animation: 'slide',



        onTransitionEnd: function() {



        }



    };



    sNavigator.pushPage("signup.html", options);



}







function signup()



{



    $.validate({



        form : '#frm-signup',



        borderColorOnError:"#FF0000",



        onError : function() {



        },



        onSuccess : function() {



            var params = $( "#frm-signup").serialize();



            params+="&device_id="+ getStorage("device_id");



            callAjax("signup",params);



            return false;



        }



    });



}







function showOrders()



{



    if (isLogin()){



        menu.setMainPage('orders.html', {closeMenu: true});



    } else {



        menu.setMainPage('prelogin.html', {closeMenu: true});



    }



}







function showAddressBook()



{



    if (isLogin()){



        menu.setMainPage('addressBook.html', {closeMenu: true});



    } else {



        menu.setMainPage('prelogin.html', {closeMenu: true});



    }



}







function displayOrderHistory(data)



{



    var htm='<ons-list>';



    $.each( data, function( key, val ) {



        htm+='<ons-list-item modifier="tappable" class="list-item-container main-order" onclick="showOrderDetails('+val.order_id+');" >';



        htm+='<ons-row class="row">';
        htm+='<ons-col class="col-orders concat-text font-add">';
        htm+='<span class="text-bold">';
        htm+= '#'+val.order_id+' '+val.merchant_name;
        htm+='</span>';
        htm+='<br>';
        htm+= '<b>Delivery:</b> '+val.date_created;
      
        htm+='<i class="fa fa-chevron-right text-right order-icon">';
        htm+='</i>';
        htm+='</ons-col>';
    
        htm+='</ons-row>';



        htm+='</ons-list-item>';



    });



    htm+='</ons-list>';



    createElement('recent-orders',htm);



}







function showOrderDetails(order_id)



{
    appdata.tempOrderId=order_id;


    dump(order_id);



    var options = {



        animation: 'slide',



        onTransitionEnd: function() {



            var params="client_token="+ getStorage("client_token")+"&order_id="+order_id;



            //callAjax("ordersDetails",params);
            callAjax("loadOrder",params);



        }



    };



    sNavigator.pushPage("ordersDetails.html", options);



}







function displayOrderHistoryDetails(data)



{



    //$("#page-orderdetails .title").html("Total : "+ data.total);



    //$("#page-orderdetails #search-text").html("Order Details #"+data.order_id);



    $("#page-orderdetails .title").html( getTrans('Total','total') + " : "+ data.total);



    $("#page-orderdetails #search-text").html( getTrans('Order Details','order_details') + " #"+data.order_id);











    var htm='<ons-list-header class="center trn" data-trn-key="items" >Items</ons-list-header>';



    if ( data.item.length>0){



        $.each( data.item, function( key, val ) {



            htm+='<ons-list-item class="center">'+val.item_name+'</ons-list-item> ';



        });



    } else {



        htm+='<ons-list-item class="center">';



        htm+='no item found';



        htm+='</ons-list-item>';



    }



    createElement('item-details', htm );







    var htm='<ons-list-header class="center trn" data-trn-key="status_history">Status History</ons-list-header>';



    if ( data.history_data.length>0){



        $.each( data.history_data, function( key, val ) {



            dump(val);



            htm+='<ons-list-item>';



            htm+='<ons-row class="row">';



            htm+='<ons-col class="" width="40%">';



            htm+= val.date_created;



            htm+='</ons-col>';



            htm+='<ons-col class="padding-left5" width="30%">';



            htm+=val.status;



            htm+='</ons-col>';



            htm+='<ons-col class="padding-left5"  width="25%">';



            htm+=val.remarks;



            htm+='</ons-col>';



            htm+='</ons-row>';



            htm+='</ons-list-item>';



        });



    } else {



        htm+='<ons-list-item class="center">';



        htm+='No history found';



        htm+='</ons-list-item>';



    }



    createElement('item-history', htm );







    if ( data.order_from.request_from=="mobile_app"){



        var html='<button class="button green-btn button--large trn" onclick="reOrder('+data.order_id+');" data-trn-key="click_here_to_reorder" >';



        html+='Click here to Re-order';



      



        html+='</button>';



        createElement('re-order-wrap', html );



    }







    translatePage();



}







function reOrder(order_id)



{



    var params="client_token="+ getStorage("client_token")+"&order_id="+order_id;



    callAjax("reOrder",params);



}







function displayAddressBook(data)



{



    var htm='<ons-list>';



    if ( data.length>0){



        $.each( data, function( key, val ) {



            htm+='<ons-list-item modifier="tappable" onclick="modifyAddressBook('+val.id+');" >';



            htm+='<ons-row class="row">';



            htm+='<ons-col class="" style="position: relative;">';


            htm+='<p class="small-font-dim font-add-name">'+val.location_name+'</p>';
            htm+='<p class="small-font-dim font-add">'+val.street+'</p>';
            htm+='<p class="small-font-dim font-add">'+val.city+', '+val.state+', '+val.country_code+', '+val.zipcode+'</p>';

            htm+='<i class="fa fa-chevron-right text-right order-icon">';
            htm+='</i>';

            htm+='</ons-col>';



         //   htm+='<ons-col class="text-right" >';



         //   if (val.as_default==2){



          //      htm+='<ons-icon icon="ion-ios-location-outline"></ons-icon>';



          //  }



          //  htm+='</ons-col>';



            htm+='</ons-row>';



            htm+='</ons-list-item>';



        });



    }



    htm+='</ons-list>';







    createElement('address-book-list', htm );



}







function modifyAddressBook(id)



{



    dump(id);



    var options = {



        animation: 'slide',



        onTransitionEnd: function() {



            var params="client_token="+ getStorage("client_token")+"&id="+id;



            callAjax("getAddressBookDetails",params);



        }



    };



    sNavigator.pushPage("addressBookDetails.html", options);



}







function fillAddressBook(data)



{



    $(".action").val('edit');



    $(".delete-addressbook").show();







    $(".id").val( data.id );



    $(".street").val( data.street );



    $(".city").val( data.city );



    $(".state").val( data.state );



    $(".zipcode").val( data.zipcode );



    $(".location_name").val( data.location_name );



    $(".country_code").val( data.country_code );



    if (data.as_default==2){



        $(".as_default").attr("checked","checked");



    } else $(".as_default").removeAttr("checked");



}







function saveAddressBook()



{



    $.validate({



        form : '#frm-addressbook',



        borderColorOnError:"#FF0000",



        onError : function() {



        },



        onSuccess : function() {



            var params = $( "#frm-addressbook").serialize();



            params+="&client_token="+ getStorage("client_token");



            callAjax("saveAddressBook",params);



            return false;



        }



    });



}







function newAddressBook()



{



    $(".delete-addressbook").hide();



    var options = {



        animation: 'slide',



        onTransitionEnd: function() {



            $(".id").val('');



            $(".action").val('add');



        }



    };



    sNavigator.pushPage("addressBookDetails.html", options);



}







function deleteAddressBook()



{



    ons.notification.confirm({



        message: getTrans('Delete this records?','delete_this_records') ,



        title: dialog_title_default,



        buttonLabels: ['Yes', 'No'],



        animation: 'default', // or 'none'



        primaryButtonIndex: 1,



        cancelable: true,



        callback: function(index) {



            dump(index);



            if ( index==0){



                var id=$(".id").val();



                var params="&client_token="+ getStorage("client_token")+"&id="+id;



                callAjax("deleteAddressBook",params);



            }



        }






    });



}


function popUpAddressSearh()
{
    if (typeof dialogAddressSearh === "undefined" || dialogAddressSearh==null || dialogAddressSearh=="" ) {
        ons.createDialog('dialogAddressSearh.html').then(function(dialog) {
        dialog.show();
  //$('.dialog-mask').hide();
  $('.dialog-mask').css('z-index','999');
        $("#s").geocomplete();
            translatePage();
        });

    } else {
  dialogAddressSearh.show();
  //$('.dialog-mask').hide();
        $("#s").geocomplete();
    }
}








function popUpAddressBook()



{



    if (typeof dialogAddressBook === "undefined" || dialogAddressBook==null || dialogAddressBook=="" ) {



        ons.createDialog('dialogAddressBook.html').then(function(dialog) {



            dialog.show();



            translatePage();



        });



    } else {



        dialogAddressBook.show();



        //translatePage();



    }



}







function displayAddressBookPopup(data)



{



    var htm='<ons-list>';



    if ( data.length>0){



        $.each( data, function( key, val ) {



            var complete_address=val.street+"|";



            complete_address+=val.city+"|";



            complete_address+=val.state+"|";



            complete_address+=val.zipcode+"|";



            complete_address+=val.location_name+"|";







            htm+='<ons-list-item modifier="tappable" class="setAddress" data-address="'+complete_address+'" >';



            htm+='<ons-row class="row">';



            htm+='<ons-col class="" width="80%">';


             htm+='<p class="small-font-dim">'+val.location_name+'</p>';
             htm+='<p class="small-font-dim">'+val.street+'</p>';
            htm+='<p class="small-font-dim">'+val.city+', '+val.state+', '+val.zipcode+'</p>';



            htm+='</ons-col>';



            htm+='<ons-col class="text-right" >';



            if (val.as_default==2){



                htm+='<ons-icon icon="ion-ios-location-outline"></ons-icon>';



            }



            htm+='</ons-col>';



            htm+='<ons-row>';



            htm+='</ons-list-item>';



        });



    }



    htm+='</ons-list>';







    createElement('addressbook-popup', htm );



}







function initFacebook()



{



    dump('initFacebook');



    if ( !empty(krms_config.facebookAppId)){



        $(".fb-loginbutton").show();



        openFB.init({appId: krms_config.facebookAppId });



    } else {



        $(".fb-loginbutton").hide();



    }







    /*$.ajaxSetup({ cache: true });



     $.getScript('//connect.facebook.net/en_US/sdk.js', function(){



     FB.init({



     appId: '191654534503876',



     version: 'v2.3' // or v2.0, v2.1, v2.2, v2.3



     });



     });*/



}







function myFacebookLogin()



{



    /*FB.getLoginStatus(function(response) {



     if (response.status === 'connected') {



     dump('already login');



     getFbInfo();



     } else {



     FB.login(function(response){



     dump(response);



     if ( response.status=="connected"){



     getFbInfo();



     } else {



     onsenAlert("Login failed.");



     }



     }, {scope: 'public_profile,email'});



     }



     });	*/



    openFB.login(



        function(response) {



            if(response.status === 'connected') {



                //alert('Facebook login succeeded, got access token: ' + response.authResponse.token);



                getFbInfo();



            } else {



                alert('Facebook login failed: ' + response.error);



            }



        }, {scope: 'public_profile,email'});



}







function getFbInfo()



{



    openFB.api({



        path: '/me',



        params: {



            fields:"email,first_name,last_name"



        },



        success: function(data) {



            dump(data);



            var params="&email="+ data.email;



            params+="&first_name="+data.first_name;



            params+="&last_name="+data.last_name;



            params+="&fbid="+data.id;



            params+="&device_id="+ getStorage("device_id");







            if ( $(".next_steps").exists()){



                params+="&next_steps="+ $(".next_steps").val();



            }



            callAjax("registerUsingFb",params);







        },



        error: fbErrorHandler});







    /*FB.api('/me?fields=email,name', function(response) {



     dump(response);



     var params="&email="+ response.email;



     params+="&name="+response.name;



     params+="&fbid="+response.id;







     if ( $(".next_steps").exists()){



     params+="&next_steps="+ $(".next_steps").val();



     }



     callAjax("registerUsingFb",params);



     });*/



}







function fbErrorHandler(error) {



    alert("ERROR=> "+error.message);



}











function FBlogout()



{



    /*FB.logout(function(response) {



     dump(response);



     });*/



    openFB.logout(



        function() {



            onsenAlert( 'Logout successful' );



        },



        fbErrorHandler);



}







function paypalSuccessfullPayment(response)



{



    var params="response="+response;



    params+="&order_id="+ getStorage("order_id");



    params+="&client_token="+ getStorage("client_token");



    callAjax("paypalSuccessfullPayment",params);



}







function showNotification(title,message)



{







    if (typeof pushDialog === "undefined" || pushDialog==null || pushDialog=="" ) {



        ons.createDialog('pushNotification.html').then(function(dialog) {



            $(".push-title").html(title);



            $(".push-message").html(message);



            dialog.show();



        });



    } else {



        $(".push-title").html(title);



        $(".push-message").html(message);



        pushDialog.show();



    }



}







function showOrders2()



{



    pushDialog.hide();



    if (isLogin()){



        menu.setMainPage('orders.html', {closeMenu: true});



    } else {



        menu.setMainPage('prelogin.html', {closeMenu: true});



    }



}







function initMerchantMap(data)



{



    dump(data);



    if ( !empty(data)){



        var map = new GoogleMap();



        map.initialize('merchant-map', data.lat, data.lng , 15);



    } else {



        $("#merchant-map").hide();



    }



}







function getCurrentLocation()



{



    navigator.geolocation.getCurrentPosition(geolocationSuccess,geolocationError,



        { enableHighAccuracy: true } );



}







function geolocationSuccess(position)



{



    var params="lat="+position.coords.latitude;



    params+="&lng="+position.coords.longitude;



    callAjax("reverseGeoCoding",params);



}







function geolocationError(error)



{



    alert('code: '    + error.code    + '\n' +



        'message: ' + error.message + '\n');



}







function saveSettings()



{



    setStorage("country_code_set", $(".country_code_set").val() );







    var params = $( "#frm-settings").serialize();



    params+="&client_token="+getStorage("client_token");



    params+="&device_id="+getStorage("device_id");



    callAjax("saveSettings",params);



}







function showLocationPopUp()



{



    if (typeof locationDialog === "undefined" || locationDialog==null || locationDialog=="" ) {



        ons.createDialog('locationOptions.html').then(function(dialog) {



            dialog.show();



            translatePage();



        });



    } else {



        locationDialog.show();



        //translatePage();



    }



}







function displayLocations(data)



{



    var htm='';



    htm+='<ons-list>';



    htm+='<ons-list-header class="list-header trn" data-trn-key="country">Country</ons-list-header>';



    $.each( data.list, function( key, val ) {



        ischecked='';



        if ( key==data.selected){



            ischecked='checked="checked"';



        }



        htm+='<ons-list-item modifier="tappable" onclick="setCountry('+"'"+key+"'"+');">';



        htm+='<label class="radio-button checkbox--list-item">';



        htm+='<input type="radio" name="country_code" class="country_code" value="'+key+'" '+ischecked+' >';



        htm+='<div class="radio-button__checkmark checkbox--list-item__checkmark"></div>';



        htm+=' '+val;



        htm+='</label>';



        htm+='</ons-list-item>';



    });



    htm+='</ons-list>';



    createElement('location-options-list',htm);



    translatePage();



}







function setCountry(country_code)



{



    $(".country_code_set").val(country_code);



}







function addressPopup()



{



    if (typeof addressDialog === "undefined" || addressDialog==null || addressDialog=="" ) {



        ons.createDialog('addressPopup.html').then(function(dialog) {



            dialog.show({"callback":geoCompleteChangeAddress});



            translatePage();



            translateValidationForm();



            $(".new_s").attr("placeholder",  getTrans('Enter your address','enter_your_address') );



        });



    } else {



        addressDialog.show( {"callback":geoCompleteChangeAddress} );



    }







}







function changeAddress()



{



    $.validate({



        form : '#frm-adddresspopup',



        borderColorOnError:"#FF0000",



        onError : function() {



        },



        onSuccess : function() {



            dump('change address');



            setStorage("search_address", $(".new_s").val() );



            var cart_params=JSON.stringify(cart);



            callAjax("loadCart","merchant_id="+ getStorage('merchant_id')+"&search_address=" +



                encodeURIComponent($(".new_s").val()) + "&cart="+cart_params +"&transaction_type=" +



                getStorage("transaction_type") );



            return false;



        }



    });



}







function geoCompleteChangeAddress()



{



    dump( "country_code_set=>" + getStorage("country_code_set"));



    if ( empty(getStorage("country_code_set")) ){



        $("#new_s").geocomplete();



    } else {



        $("#new_s").geocomplete({



            country: getStorage("country_code_set")



        });



    }



    $(".pac-container").css( {"z-index":99999} );



}







function showNotificationCampaign(title,message)



{







    if (typeof pushcampaignDialog === "undefined" || pushcampaignDialog==null || pushcampaignDialog=="" ) {



        ons.createDialog('pushNotificationCampaign.html').then(function(dialog) {



            $("#page-notificationcampaign .push-title").html(title);



            $("#page-notificationcampaign .push-message").html(message);



            dialog.show();



        });



    } else {



        $("#page-notificationcampaign .push-title").html(title);



        $("#page-notificationcampaign .push-message").html(message);



        pushcampaignDialog.show();



    }



}







function itemNotAvailable(options)



{



    switch (options)



    {



        case 1:



            onsenAlert( getTrans("item not available",'item_not_available') );



            break;







        case 2:



            return;



            break;



    }



}







function number_format(number, decimals, dec_point, thousands_sep)



{



    number = (number + '')



        .replace(/[^0-9+\-Ee.]/g, '');



    var n = !isFinite(+number) ? 0 : +number,



        prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),



        sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,



        dec = (typeof dec_point === 'undefined') ? '.' : dec_point,



        s = '',



        toFixedFix = function(n, prec) {



            var k = Math.pow(10, prec);



            return '' + (Math.round(n * k) / k)



                    .toFixed(prec);



        };



    // Fix for IE parseFloat(0.55).toFixed(0) = 0;



    s = (prec ? toFixedFix(n, prec) : '' + Math.round(n))



        .split('.');



    if (s[0].length > 3) {



        s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);



    }



    if ((s[1] || '')



            .length < prec) {



        s[1] = s[1] || '';



        s[1] += new Array(prec - s[1].length + 1)



            .join('0');



    }



    return s.join(dec);



}







var translator;



var dictionary;







function getLanguageSettings()



{



    if ( !hasConnection() ){



        return;



    }



    callAjax("getLanguageSettings",'');



}







function translatePage()



{


    dump("TranslatePage");



    //if (getStorage("translation")!="undefined"){



    if (typeof getStorage("translation") === "undefined" || getStorage("translation")==null || getStorage("translation")=="" ) {



        return;



    } else {



        dictionary =  JSON.parse( getStorage("translation") );



    }



    if (!empty(dictionary)){



        //dump(dictionary);



        var default_lang=getStorage("default_lang");



        //dump(default_lang);



        if (default_lang!="undefined" && default_lang!=""){



            dump("INIT TRANSLATE");



            translator = $('body').translate({lang: default_lang, t: dictionary});



        }



    }

    appdata.ontranslationComplete();


}







function getTrans(words,words_key)



{



    var temp_dictionary='';



    /*dump(words);



     dump(words_key);	*/



    if (getStorage("translation")!="undefined"){



        temp_dictionary =  JSON.parse( getStorage("translation") );



    }



    if (!empty(temp_dictionary)){



        //dump(temp_dictionary);



        var default_lang=getStorage("default_lang");



        //dump(default_lang);



        if (default_lang!="undefined" && default_lang!=""){



            //dump("OK");



            if ( array_key_exists(words_key,temp_dictionary) ){



                //dump('found=>' + words_key +"=>"+ temp_dictionary[words_key][default_lang]);



                return temp_dictionary[words_key][default_lang];



            }



        }



    }



    return words;



}







function array_key_exists(key, search) {



    if (!search || (search.constructor !== Array && search.constructor !== Object)) {



        return false;



    }



    return key in search;



}







function translateValidationForm()



{



    $.each( $(".has_validation") , function() {



        var validation_type = $(this).data("validation");







        switch (validation_type)



        {



            case "number":



                $(this).attr("data-validation-error-msg",getTrans("The input value was not a correct number",'validation_numeric') );



                break;







            case "required":



                $(this).attr("data-validation-error-msg",getTrans("this field is mandatory!",'validaton_mandatory') );



                break;







            case "email":



                $(this).attr("data-validation-error-msg",getTrans("You have not given a correct e-mail address!",'validation_email') );



                break;



        }







    });



}







function showLanguageList()



{



    if (typeof languageOptions === "undefined" || languageOptions==null || languageOptions=="" ) {



        ons.createDialog('languageOptions.html').then(function(dialog) {



            dialog.show();



            translatePage();



        });



    } else {



        languageOptions.show();



    }



}







function displayLanguageSelection(data)



{



    var selected = getStorage("default_lang");



    dump("selected=>"+selected);



    var htm='';



    htm+='<ons-list>';



    htm+='<ons-list-header class="list-header trn" data-trn-key="language">Language</ons-list-header>';



    $.each( data, function( key, val ) {



        dump(val.lang_id);



        ischecked='';



        if ( val.lang_id==selected){



            ischecked='checked="checked"';



        }



        htm+='<ons-list-item modifier="tappable" onclick="setLanguage('+"'"+val.lang_id+"'"+');">';



        htm+='<label class="radio-button checkbox--list-item">';



        htm+='<input type="radio" name="country_code" class="country_code" value="'+val.lang_id+'" '+ischecked+' >';



        htm+='<div class="radio-button__checkmark checkbox--list-item__checkmark"></div>';



        htm+=' '+val.language_code;



        htm+='</label>';



        htm+='</ons-list-item>';



    });



    htm+='</ons-list>';



    createElement('language-options-list',htm);



    translatePage();



}







function setLanguage(lang_id)



{



    //removeStorage("translation");



    dump( getStorage("translation") );



    if (typeof getStorage("translation") === "undefined" || getStorage("translation")==null || getStorage("translation")=="" ) {



        languageOptions.hide();



        ons.notification.confirm({



            message: 'Language file has not been loaded, would you like to reload?',



            title: dialog_title_default ,



            buttonLabels: ['Yes', 'No'],



            animation: 'none',



            primaryButtonIndex: 1,



            cancelable: true,



            callback: function(index) {



                if ( index==0 || index=="0"){



                    getLanguageSettings();



                }



            }



        });



        return;



    }







    if ( getStorage("translation").length<=5 ){



        onsenAlert("Translation file is not yet ready.");



        return;



    }







    if ( !empty(lang_id) ){



        setStorage("default_lang",lang_id);



        if ( !empty(translator)){



            translator.lang(lang_id);



        } else {



            translator = $('body').translate({lang: lang_id, t: dictionary});



        }



    }



}







function applyVoucher()



{



    voucher_code = $(".voucher_code").val();



    if ( voucher_code!="" ){



        var params="voucher_code="+ voucher_code;



        params+="&client_token="+getStorage("client_token");



        params+="&merchant_id="+ getStorage("merchant_id");



        callAjax("applyVoucher",params);



    } else {



        onsenAlert(  getTrans('invalid voucher code','invalid_voucher_code') );



    }



}







function removeVoucher()



{



    $(".voucher_amount").val( '' );



    $(".voucher_type").val( '' );



    $(".voucher_code").val('');







    $(".apply-voucher").show();



    $(".remove-voucher").hide();







    $(".voucher-header").html( getTrans("Voucher",'voucher') );



}



$.extend($.expr[':'], {
    'containsi': function(elem, i, match, array)
    {
        return (elem.textContent || elem.innerText || '').toLowerCase()
                .indexOf((match[3] || "").toLowerCase()) >= 0;
    }
});

String.prototype.replaceAll = function(search, replacement) {
    return this.replace(new RegExp(search, 'g'), replacement);
};

var appdata={
   search2:function(string){
        if(string){
            $('[modifier="tappable"]').removeClass('insearch').find('.restauran-title:containsi("'+string+'")').closest('[modifier="tappable"]').show().addClass('insearch');
            $('[modifier="tappable"]').removeClass('insearch').find('.concat-text:containsi("'+string+'")').closest('[modifier="tappable"]').show().addClass('insearch');
            $('[modifier="tappable"]').not('.insearch').hide();
        }else{
            $('[modifier="tappable"]').show();
        }
    },
    searchRestaurent:function(string){
        if(string){
            $('[modifier="tappable"]').removeClass('insearch').find('.restauran-title:containsi("'+string+'")').closest('[modifier="tappable"]').show().addClass('insearch');
            $('[modifier="tappable"]').not('.insearch').hide();
        }else{
            $('[modifier="tappable"]').show();
        }
    },
    search:function(string) {

        callAjax("search", "address="+ getStorage("search_address") +"&filter_name=" +string);
    },
    pagename:'',

    ontranslationComplete:function(){
        if(this.pagename=='searchresult-page'){
            this.shortText($('.searchShortenText'));
        }
		  if(this.pagename=='page-shipping'){
            callAjax('getProfile',"client_token="+getStorage("client_token"));

        }
		if(this.pagename=='page-receipt'){
            this.displayReceiptInfo()
        }
		var t=0;
		if(this.pagename=='page-home'){
            var t=setInterval(function(){if($('.pac-item').length){$('.pac-item').on('click',function(){$('#s').val($(this).text());})}},200);
        }else{
			if(t){clearInterval(t);t=0;}
		}
		if(this.pagename=='page-signup'){
            $('[name=contact_phone]').mask('(000)-000-0000');
        }
        if(this.pagename=='menucategory-page'){
            setTimeout(function(){
                $('.concat-text').css('white-space','inherit');
            },1000)
        }
		if(this.pagename=='page-itemdisplay'){
		$('.ion-ios-arrow-back').removeClass('ion-ios-arrow-back').addClass('fa fa-remove cross-font newRemove');
		$('.newRemove').on('click',function(){console.log(this);$('.newRemove').removeClass('fa fa-remove cross-font newRemove').addClass('ion-ios-arrow-back');});
		}
    },
    allHtml:'',
    texthide:function(obj){
        $(obj).find('i').toggle();
        var target=$(obj).prev();
        if(target.hasClass('ellipsis')){
            target.removeClass('ellipsis');
            target.css('white-space','normal');
            $('.navigation-bar__center').css('height','auto');
            $('.navigation-bar').css('height','auto');
        }else{
            target.addClass('ellipsis');
            $('.navigation-bar').css('height','44px');
        }
    },
	displayReceiptInfo:function(){
        createElement('cartdata',appdata.tempCartHtml);
        $('.item-qty').remove();
        $('.receiptData').next().remove().end().remove();
        //var d=appdata.tempAddress.split('|');
        //var a=d[0];d[0]='';
        //var str=d.join(', ');
        var addressDisplay=appdata.tempAddress.street+'<br>'+appdata.tempAddress.city+', '+appdata.tempAddress.state+' '+appdata.tempAddress.zipcode;
        var deliveryInstruction=appdata.tempAddress.delivery_instruction;
        
        $('#deliveryInstruction').html(deliveryInstruction);
        $('#addressinfo').html(addressDisplay);
        $('.merchantContactNo').html(appdata.tempContact);
		$('.data-order').html(appdata.response.details.order_id);
        $('.user-contact').html(appdata.userInfo.contact_phone);
		if(appdata.tempDeliveryData.type!="pickup"){
            if(appdata.tempDeliveryData.delivery_time){
                $('.order-time').html('Your order will arrive in '+appdata.tempDeliveryData.delivery_time);
            }else{
                $('.order-time').html('Your order will arrive in '+appdata.tempMerchantDeliveryEst);
            }
        }else{
            $('.order-time').html('Your order pickup time is '+appdata.tempDeliveryData.delivery_time);

        }
        console.log('sdf');

        appdata.tempAddress='';
        appdata.tempContact='';
        appdata.tempCartHtml='';

    },
    shortText:function(obj){
        var maxLength=10;
        this.allHtml=obj.html();
       // if(this.allHtml.length>maxLength){
            if(!obj.hasClass('ellipsis')){
              obj.addClass('ellipsis').after('<span class="morebtn" onclick="popUpAddressSearh();"><i class="fa fa-pencil" style="font-size: 18px;"></i></span>');
            }
        //}
    },
    htmlTemplate:'',
    renderHtml:function(html,object){
        $.each(object,function(index,value){html=html.replaceAll(index,value);});return html;
    },
    creteHtml:function(template,data){
        this.htmlTemplate=$('#'+template).html();
        if(this.htmlTemplate){
        return this.renderHtml(this.htmlTemplate,data);}
    },
    creteHtmldata:function(template,data){
        this.htmlTemplate=$('#'+template).html();
        var html='';
        if(this.htmlTemplate){
            $.each(data,function(index,value){html=html+appdata.renderHtml(appdata.htmlTemplate,value);});
    }
        return html;
    },
    dataToHtml:function(html,object){
        $.each(object,function(index,value){html=html.replaceAll('_'+index+'_',value||'');});return html;
    },
    renderHtmldata:function(template,data){
        this.htmlTemplate=$('#'+template).html();var html='';
        if(this.htmlTemplate){$.each(data,function(index,value){html=html+appdata.dataToHtml(appdata.htmlTemplate,value);});}
        return html;
    },
    tip:{key:0,val:0,total:0},
    setTip:function(obj){
        var $this=$(obj);
        console.log($this.data('tip'));
        console.log($this.data('val'));

        $("#tip_value").val('');
        var type=$(obj).data("type");
        $(".tips").removeClass("active");
        $(obj).addClass("active");
        if ( type=="tip"){
            var tip=$(obj).data("tip");
            this.setTipPercent(tip);
        } else {
            appdata.setTipCash($('[name=tip_value]').val());
}

    },
    setTipCash:function(val){
        if(val>0){
            val=parseFloat(val);
            var cart_subtotal=getStorage("order_total");
            var delimiter=cart_subtotal.split(';')[0];
            cart_subtotal=cart_subtotal.split(';')[1];
            var totalraw=parseFloat(cart_subtotal)+val;
            $(".total-amount").html(delimiter+';'+totalraw.toFixed(2));
            this.tip.val=val.toFixed(2);
            this.tip.key=0;
            this.tip.total=parseFloat(val.toFixed(2))+parseFloat(cart_subtotal);
        }
    },
    setTipPercent:function(tip){
        if(tip>0){
            this.tip.key=tip;
            var tip_percentage = tip*100;
           // $(".tip_percentage").html(tip_percentage+"%");
            var cart_subtotal=getStorage("order_total");
            var delimiter=cart_subtotal.split(';')[0];
            cart_subtotal=cart_subtotal.split(';')[1];
            var tip_raw = tip*cart_subtotal;
            dump(tip_raw.toFixed(2));
            //display_tip(tip_percentage,tip_raw.toFixed(2));
            var totalraw=parseFloat(cart_subtotal)+parseFloat(tip_raw.toFixed(2));
            $(".total-amount").html(delimiter+';'+totalraw.toFixed(2));
            this.tip.val=tip_raw.toFixed(2);
            this.tip.total=totalraw.toFixed(2);
        }
    }
}

