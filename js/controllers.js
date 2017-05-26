'use strict';

var solleControllers = angular.module('solleControllers', []);

solleControllers.controller('CartCtrl', ['$scope', 'Cart', function($scope, Cart) {
    $scope.cart = Cart.getCart();

}]);


//SolleApp.controller('CartCtrl', function($scope, Cart) {
//    $scope.cart = cart;
//
//    $scope.getCart = function() {
//        console.log("Angular Get Cart");
//        //$scope.cart = Cart.getCart(null);
//    }
//
//});







//var CartCtrl = function ($scope, $http, $window, basket, orderService, messageManager, membershipService, Catalog) {
//    $scope.basket = basket;
//    $scope.orderService = orderService;
//    $scope.Catalog = Catalog;
//    $scope.items = {};
//    $scope.details = {};
//    $scope.order = {};
//    $scope.tax = 0;
//
//    $scope.getUserDetails = function () {
//        membershipService.get_customer_details().then(function (response) {
//            if (response.status != 'false') {
//                angular.forEach(response, function (item) {
//                    $scope.details.shippingName = response.shippingName;
//                    $scope.details.shippingAddressLine1 = response.shippingAddressLine1;
//                    $scope.details.shippingAddressLine2 = response.shippingAddressLine2;
//                    $scope.details.shippingCity = response.shippingCity;
//                    $scope.details.shippingPostalCode = response.shippingPostalCode;
//                    $scope.details.shippingPhoneNumber = response.shippingPhoneNumber;
//                    $scope.details.shippingState = response.shippingState;
//                    $scope.details.shippingCountry = response.shippingCountry;
//                });
//            }
//        });
//    };
//
//    $scope.checkCart = function () {
//        basket.get().then(function (response) {
//            var url = new URI(window.location);
//            if (response === 0 && url.segment(1) == 'cart.php') {
//                window.location.href = redirect_path + 'store/store.php';
//            }
//
//            $scope.items = response;
//            var sum = 0;
//            angular.forEach(response, function (item) {
//                sum += item.product_quantity * item.wholeSalePrice;
//            });
//
////            if (document.location.href == base_path + 'store/cart.php') {
////                if (sum >= 50 && loginService.is_logged_in() === false) {
////                    $('#memberRegisterModal').modal('toggle');
//////                    Modal('.member_register', '#member_inner');
////                }
////            }
//        });
//    };
//
//    $scope.basketSum = function () {
//        var url = new URI(window.location);
//
//        //loginService.check_authorized().then(function (response) {
//        //    if (url.segment(1) == "cart.php" && response.status == false) {
//        //    }
//        //
//        //    if (url.segment(1) == "store.php" && response.status == false) {
//        //        basket.sum().then(function (response) {
//        //        });
//        //    }
//        //});
//    };
//
//    //********************************************************************************
//    //* Update the cart session. Check if order has been totaled and total again
//    //********************************************************************************
//    $scope.UpdateCart = function ($event, items) {
//        $event.preventDefault();
//        orderService.updateCart(items).then(function (response) {
//            $scope.checkCart();
//        });
//
//        //* order has already been calculated once just do it here if they update the cart
//        if (orderService.orderHasBeenTotaled()) {
//            $scope.CalculateTotals($event, $scope.gift_card_number, $scope.details);
//        }
//    };
//
//    $scope.$watch('basket.count()', function (newValue, oldValue, scope) {
//        $scope.checkCart();
//    });
//
//    //********************************************************************************
//    //* Calculate the order totals
//    //********************************************************************************
//    $scope.CalculateTotals = function ($event, gift_card_number, details) {
//        $event.preventDefault();
//        orderService.calculateTotals(gift_card_number, details).then(function (response) {
//            if (response.error) {
//                messageManager.showError(response.error);
//            } else {
//                $scope.order = response.Result;
//            }
//        });
//    };
//
//    $scope.CompleteOrder = function ($event, details, total, payment) {
//        $event.preventDefault();
//        orderService.completeOrder(details, total, payment).then(function (response) {
//            if (response.success) {
//                $scope.record_order(response.order_number);
//                window.location.href = redirect_path + 'store/receipt.php';
//            } else {
//                messageManager.showError(response.error);
//            }
//        });
//    };
//
//    $scope.remove = function ($event, item) {
//        basket.remove(item).then(function (response) {
//            if (orderService.orderHasBeenTotaled()) {
//                $scope.CalculateTotals($event, $scope.gift_card_number, $scope.details);
//            }
//            $scope.$watch('basket.count()', function (newValue, oldValue, scope) {
//                var url = window.location.href;
//                if (newValue === 0 && url.search('store/cart.php') > 0) {
//                }
//            });
//        });
//    };
//
//    $scope.total = function () {
//        var sum = 0;
//        angular.forEach($scope.items, function (item) {
//            sum += item.product_quantity * item.wholeSalePrice;
//        });
//        return sum;
//    };
//
//    $scope.shipping = function () {
//        var sum = 0;
//        angular.forEach($scope.items, function (item) {
//            sum += item.product_quantity * item.wholeSalePrice;
//        });
//        if (sum < 200) {
//            return 10;
//        } else {
//            return 15;
//        }
//    };
//
//    $scope.grand_total = function () {
//        return $scope.total() + $scope.shipping();
//    };
//
//    $scope.discount = function () {
//        var order_discount = 0;
//        if ($scope.order) {
//            angular.forEach($scope.order.products, function (item) {
//                if (item.product == 152) {
//                    order_discount = item.cost;
//                }
//            });
//            return order_discount;
//        } else {
//            return 0;
//        }
//    };
//
//    $scope.saveBillingInfo = function() {
//
//    };
//
//    $scope.record_order = function (order_number) {
//        orderService.getOrder().then(function (response) {
//            $scope.tax = response.Result.tax;
//        });
//        $window.ga('ecommerce:addTransaction', {
//            'id': order_number,
//            'affiliation': 'Solle Naturals',
//            'revenue': $scope.total(),
//            'shipping': $scope.shipping(),
//            'tax': $scope.tax
//        });
//        angular.forEach($scope.items, function (item) {
//            $window.ga('ecommerce:addItem', {
//                'id': order_number,
//                'name': item.name,
//                'sku': item.sku,
//                'category': '',
//                'price': item.wholeSalePrice,
//                'quantity': item.product_quantity
//            });
//        });
//        $window.ga('ecommerce:send');
//    };
//
//    $scope.checkCart();
//    $scope.getUserDetails();
//    // $scope.basketSum();
//
//};
