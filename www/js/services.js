function Service($rootScope, $http, $ionicPopup) {

    var api = {
        website: '/restconnect/store/websiteinfo',
        store: '/restconnect/store/storeinfo',
        getStaticBlock: '/restconnect/index/getstaticblock',
        getBannerBlock: '/restconnect/index/getbannerblock',
        user: '/restconnect/customer/statusData',
        forgotpwd: '/restconnect/customer/forgotpwd',
        menus: '/restconnect/?cmd=menu',
        products: '/restconnect/',
        login: '/restconnect/customer/login',
        editAddress: '/restconnect/customer/editAddress',
        deleteAddress: '/restconnect/customer/deleteAddress',
        logout: '/restconnect/customer/logout',
        register: '/restconnect/customer/register',
        socialLogin: '/restconnect/customer/socialLogin',
        search: '/restconnect/search',
        certGet: '/clnews/api/article',
        getwishlist: '/restconnect/wishlist/getwishlist',
        getAddress: '/restconnect/customer/getAddress',
        searchAdvField: '/restconnect/searchadv/getfield',
        searchAdv: '/restconnect/searchadv/index',
        searchAgent: '/storelocator/index/city',
        //order: '/restconnect/products/test2',
        order: '/restconnect/products/myOrderList',
        placeorder: 'restconnect/cart/placeOrder',
		myOrderDetail: '/restconnect/products/myOrderDetail',
		contactUs: 'restconnect/customer/contactUs',
        productDetail: '/restconnect/products/getproductdetail',
        productoptions: '/restconnect/products/getproductoptions',
		rateAndReview: '/restconnect/products/rateAndReview',
        addwishlist: '/restconnect/wishlist/addToWishlist',
        removeWishlist: '/restconnect/wishlist/removeWishlist',
        productImg: '/restconnect/products/getPicLists',
        productOption: '/restconnect/products/getcustomoption',
        cart: '/restconnect/cart/getCartInfo',	//获�?�购物车内容
        cartGetQty: '/restconnect/cart/getQty',	//
        cartGetTotal: '/restconnect/cart/getTotal',	//
        cartAdd: '/restconnect/cart/add',	//直接post到这个接�?�就返回�?�数
		 addquote: 'restconnect/cart/addQuote',
		 removecart: '/restconnect/cart/remove',
		 paymentmethods: '/restconnect/checkout/getPayMethodsList',
    }, showError = false;

    $rootScope.service = {
        get: function (key, params, success, error) {
			
            if (typeof params === 'function') {
                error = success;
                success = params;
                params = null;
            }
            if(params==null){
    var params  = {};
    params['___store'] = Config.getLocale(); 
   }else{
    params.___store = Config.getLocale();
   }
			//console.log(params);
		//params+='&__store='+ Config.getLocale();
            var url = Config.baseUrl  + api[key] ;

            $http.get(url, {
                params: params,
                timeout: 20000
            }).then(function (res) {
                success(res.data);
            }, handleError(error));
        },
        post: function (key, params, success, error) {
            if (typeof params === 'function') {
                callback = params;
                params = null;
            }
if(params==null){
    var params  = {};
    params['___store'] = Config.getLocale(); 
   }else{
    params.___store = Config.getLocale();
   }            

            var url = Config.baseUrl+ api[key];
url+='?___store='+ Config.getLocale();
            $.post(url, {
                params: params,
                timeout: 20000
            }).then(function (res) {
                success(res.data);
            }, handleError(error));
        },
        sendSms: function (params, success, error) {
            if (typeof params === 'function') {
                error = success;
                success = params;
                params = null;
            }

            var url = Config.baseUrl + 'smsapi/SendTemplateSMS.php';
            $http.get(url, {
                params: params
            }).then(function (res) {
                success(res.data);
            }, handleError(error));
        }
    };

    function handleError(error) {
        return function (err) {
            if (error) error(err);
            if (showError) {
                return;
            }
            showError = true;
            alert($rootScope.translations.network_error+'\r\n'+$rootScope.translations.check_network);
            /*
            $ionicPopup.alert({
                title: $rootScope.translations.network_error,
                template: $rootScope.translations.check_network,
                buttons: [{
                    text: $rootScope.translations.ok,
                    onTap: function () {
                        showError = false;
                    }
                }]
            });
            */
        };
    }
}
