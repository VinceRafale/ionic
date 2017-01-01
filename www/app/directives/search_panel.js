angular
    .module('starter')
    .constant('ionic',window.ionic)
    .directive('searchPanel', searchPanel)
    .factory('searchPanelDelegate',searchPanelDelegate);

searchPanel.$inject = ['ionic','$rootScope'];

function searchPanel(ionic, $rootScope) {

    var SearchPanelView = ionic.views.View.inherit({
        initialize : function(opts) {
            opts = ionic.extend({},opts);
            ionic.extend(this, opts);
            this.el = opts.el;
            this.el.style.display = 'block';
            this.isOpen = true;
            this.panelAnimDuration = opts.duration;
            this.dstY = opts.dstY;
        },
        setY : function(y) {
            this.el.style[ionic.CSS.TRANSFORM] = 'translate3d(0px,'+ y + 'px, 0)';
        },
        setTransform : function() {
            this.el.style[ionic.CSS.TRANSITION] = '-webkit-transform '+this.panelAnimDuration+'s ease';
        },
        toggle : function() {
            var self = this;
            ionic.requestAnimationFrame(function(){
                self.setTransform();
                if(self.isOpen) {
                    self.setY(self.dstY);
                    self.isOpen = false;
                } else {
                    self.setY(0);
                    self.isOpen = true;
                }
            });
        },
        toggleIfOpen : function() {
            var self = this;
            ionic.requestAnimationFrame(function(){
                if(self.isOpen) {
                    self.toggle();
                }
            });
        }
    });

    return {
        restrict : 'E',
        template: '<div class="searchpanel-border" ng-transclude></div>',
        transclude : true,
        link : function($scope, $element, $attr) {
            var el = $element[0];
            var searchPanelView = new SearchPanelView({
                el: el,
                duration : $attr['duration'] || 0.5,
                dstY : $attr['dstY'] || -105
            });
            $rootScope.$on('searchPanel.toggle',function(){
                searchPanelView.toggle();
            });
            $rootScope.$on('searchPanel.toggleIfOpen',function(){
                searchPanelView.toggleIfOpen();
            });
        }
    };
}

searchPanelDelegate.$inject = ['$rootScope'];

function searchPanelDelegate($rootScope){
    return {
        togglePanel : function() {
            $rootScope.$emit('searchPanel.toggle');
        },
        togglePanelIfOpen : function() {
            $rootScope.$emit('searchPanel.toggleIfOpen');
        }
    };
}