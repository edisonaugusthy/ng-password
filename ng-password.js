
var passApp = angular.module('andro-angular-password-fields', []);

(function () {
    'use strict'
    passApp.directive('passType', directive);
    directive.$inject = ['$timeout', '$rootScope', '$compile'];
    function directive($timeout, $rootScope, $compile) {
        var directive = {
            link: link,
            restrict: 'A',
        };
        return directive;
        function link(scope, element) {
            var elm = element[0];

            function activate() {
                $(element).hide();
                var newDirective = '<input type="text" change-type>';
                $(elm).after($compile(newDirective)(scope));
                $rootScope.$broadcast('ang-and-new-data-init', { data: elm.value });
            }

            activate();
            element.bind('focusin', function () {
                activate();
            });

            scope.$on('ang-and-new-data-update', function (event, data) {
                elm.value = data.data;
                if (data.status) {
                    element[0].setAttribute("type", "password");
                    $(element).show();
                }
            })

        }
    }

})();;

(function () {
    'use strict'
    passApp.directive('changeType', directive);
    directive.$inject = ['$timeout', '$rootScope', '$compile'];
    function directive($timeout, $rootScope, $compile) {
        var directive = {
            link: link,
            restrict: 'A',
        };
        return directive;

        function link(scope, element) {
            var orginalvalue = [];
            var elem = element[0];
            element.focus();


            element.bind('keyup', function (event) {
                if (event.which == 8) {
                    orginalvalue.pop();
                    elem.value = returnString(elem.value.length - 1);
                    sendValue(orginalvalue, false)
                }
                else {
                    calculate();
                }
            });

            element.bind('focusout', function () {
                focusOut();
            });

            function focusOut() {
                var arr = [];
                for (let index = 0; index < orginalvalue.length; index++) {
                    arr.push('*');
                }
                elem.value = arr.join("");
                sendValue(orginalvalue, true)
            }

            function calculate() {
                if (elem.value.length > 1) {
                    orginalvalue.push(elem.value[elem.value.length - 1]);
                    elem.value = returnString(elem.value.length - 1)
                    sendValue(orginalvalue, false)
                }
                else {
                    orginalvalue.push(elem.value);
                    sendValue(orginalvalue, false)
                }

            }

            function returnString(len) {
                var arr = [];
                for (let index = 0; index < len; index++) {
                    arr.push('*')
                }
                arr.push(orginalvalue[orginalvalue.length - 1]);
                return arr.join("");

            }
            scope.$on('$destroy', function () {
                $(element).unbind("input");
            });

            function sendValue(data, state) {
                $rootScope.$broadcast('ang-and-new-data-update', { data: orginalvalue.join(""), status: state });
                if (state) {
                    $(element).remove();
                }

            }

            scope.$on('ang-and-new-data-init', function (event, data) {
                if (data.data.length > 0) {
                    for (let index = 0; index < data.data.length; index++) {
                        orginalvalue.push(data.data[index]);
                    }
                    elem.value = returnString(data.data.length)
                    sendValue(orginalvalue, false)
                }
            })

        }
    }

})();;
