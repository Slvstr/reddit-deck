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

          // If no subs were defined, open in edit mode
          if (scope.subs.length) {
            scope.editing = false;
          }
          else {
            scope.editing = true;
            scope.searchResults = [];
          }


          // Get own instance of reddit service and load initial items
          var reddit = Reddit(scope.subs);
          scope.links = reddit.items;
          reddit.getNextPage();


          //Load next batch of links
          scope.loadNext = function() {
            return reddit.getNextPage();
          };

          // TODO (Erik Hellenbrand) : Would probably be better to move form logic to its own controller

          // Show addBoardForm
          scope.toggleEditMode = function() {
            scope.editing = !scope.editing;
            scope.searchResults = [];
          };

          // search for new subs
          scope.searchSubs = function(query) {
            scope.searchResults = reddit.searchSubs(query);
            console.dir(scope.searchResults);
          };

          scope.addSub = function(sub) {
            scope.subs.push(sub);
            reddit.update(scope.subs);
            scope.editing = false;
          };

          scope.removeSub = function(sub) {
            var index = scope.subs.indexOf(sub);

            if (index !== -1 && scope.subs.length > 1) {
              scope.subs.splice(scope.subs.indexOf(sub), 1);
              reddit.update(scope.subs);          
            }

          };


        }
      }
    });


})();