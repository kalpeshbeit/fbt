angular.module('app.filters', [])
    .filter('discount', function () {
        return function (product) {
            return ~~(-100 * (product.regular_price_with_tax -
                product.final_price_with_tax) /
                product.regular_price_with_tax) + '%';
        };
    })
		
	.filter('unsafe', ['$sce', function ($sce) {
			return function (val) {
					return $sce.trustAsHtml(val);
			};
	}])

	/* 手机前端有问题，暂时停用
	.filter('minqty', function () {
			return function (qty) {
				if (!qty) qty = 1;
				if ( qty < 1)	qty=1;
					return qty;
			};
	})
	*/

	.filter('price', function () {
		return function (price) {
			return ~~price;
		};
	});