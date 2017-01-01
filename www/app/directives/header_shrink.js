angular
    .module('starter', [])
    .directive('headerShrinkGroup', headerShrinkGroup)
    .directive('headerShrink', headerShrink);

headerShrink.$inject = ['$document','searchPanelDelegate'];

function headerShrinkGroup() {
    return {
        restrict : 'A',
        template : '<div class="header-shrink-group" ng-transclude></div>',
        transclude : true
    };
}

function headerShrink($document, searchPanelDelegate) {
    var fadeAmt;
    var min;
    var group = $document[0].body.querySelector('.header-shrink-group');
    var shrink = function(header, content, amt, max) {
        amt = Math.min(min, amt);
        fadeAmt = 1 - amt / min;
        ionic.requestAnimationFrame(function() {
            if(group) {
                group.style[ionic.CSS.TRANSFORM] = 'translate3d(0, -' + amt + 'px, 0)';
                searchPanelDelegate.togglePanelIfOpen();
            } else {
                header.style[ionic.CSS.TRANSFORM] = 'translate3d(0, -' + amt + 'px, 0)';
            }
            for(var i = 0, j = header.children.length; i < j; i++) {
                header.children[i].style.opacity = fadeAmt;
            }
        });
    };

    return {
        restrict: 'A',
        link: link
    };

    function link($scope, $element, $attr) {

        var starty = $scope.$eval($attr.headerShrink) || 0;
        var shrinkAmt;
        min = $scope.$eval($attr.headerShrinkLen) || 24;

        var header = $document[0].body.querySelector('.bar-header');
        var headerHeight = header.offsetHeight;

        $element.bind('scroll', function(e) {
            var scrollTop = null;
            if(e.detail){
                scrollTop = e.detail.scrollTop;
            }else if(e.target){
                scrollTop = e.target.scrollTop;
            }
            if(scrollTop > starty){
                // Start shrinking
                shrinkAmt = headerHeight - Math.max(0, (starty + headerHeight) - scrollTop);
                shrink(header, $element[0], shrinkAmt, headerHeight);
            } else {
                shrink(header, $element[0], 0, headerHeight);
            }
        });
    }
}
