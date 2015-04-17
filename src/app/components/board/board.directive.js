(function() {
  'use strict';

  angular.module('redditDeck')

    .directive('board', function(Reddit) {

      return {
        restrict: 'E',
        templateUrl: 'app/components/board/board.html',
        scope: {
          subs: '=',
          name: '@'
        },
  
        link: function(scope, element, attrs) {
          // Get own instance of reddit service
          scope.reddit = Reddit(scope.subs);

          scope.links = scope.reddit.items;

          scope.reddit.getNextPage();
        }
      }
    });


})();