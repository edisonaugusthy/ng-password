(function() {

        'use strict';
        var passApp = angular.module('andro-angular-password-fields', []);
        
        passApp.directive('changeType', directive);
        directive.$inject = ['$timeout', '$rootScope'];
        function directive($timeout, $rootScope) {
            var directive = {
                link: link,
                restrict: 'A',
                scope: {
                    time: "=",
                },
            };

            return directive;

            function link(scope, element) {
                var timer = null;
                
                /* add your time here*/
                var Tout = scope.time ? scope.time : 700;

                var process = function() {
                    setTimer();
                    var elem = element[0];
                    /* change type*/
                    elem.value.length > 0 ?
                        element[0].setAttribute("type", "text") : element[0].setAttribute("type", "password");
                }

                function setTimer() {
                    timer = $timeout(function() {
                        element[0].setAttribute("type", "password");
                    }, Tout)

                }

                function clearTimer() {
                    $timeout.cancel(timer);
                }

                element.bind('input', function() {
                    clearTimer();
                    process();
                });

                element.bind('keyup', function() {
                    clearTimer();
                    process();
                });

                scope.$on('$destroy', function() {
                    $(element).unbind("input");
                    $(element).unbind("keyup");
                });
            }
        }
    })()
