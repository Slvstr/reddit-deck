(function() {
  'use strict';

  angular.module('redditDeck')

    .directive('board', function(Reddit, $rootScope) {

      return {
        restrict: 'E',
        templateUrl: 'app/components/board/board.html',
        scope: {
          board: '='
        },
  
        link: function(scope, element, attrs) {

          // If no subs were defined, open in edit mode
          if (scope.board.subs.length) {
            scope.editing = false;
          }
          else {
            scope.editing = true;
            scope.searchResults = [];
          }


          // Get own instance of reddit service and load initial items
          var reddit = Reddit(scope.board.subs);
          scope.links = reddit.items;
          reddit.getNextPage();


          //Load next batch of links
          scope.loadNext = function() {
            return reddit.getNextPage();
          };


          // Handle interaction with the options dropdown
          scope.$watch(function() {
            return scope.selectedOption;
          },
          function(option) {
            if (option === 'refresh') {
              reddit.update(scope.board.subs);
              if (scope.editing) scope.toggleEditMode();
            }
            else if (option === 'edit') {
              scope.toggleEditMode();
            }

            // TODO (Erik Hellenbrand) : Add support for deleting board.  Maybe use $rootScope.broadcast?

            scope.selectedOption = '';

          });

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
            scope.board.subs.push(sub);
            reddit.update(scope.board.subs);
            scope.editing = false;
          };

          scope.removeSub = function(sub) {
            var index = scope.board.subs.indexOf(sub);

            if (index !== -1 && scope.subs.length > 1) {
              scope.board.subs.splice(scope.board.subs.indexOf(sub), 1);
              reddit.update(scope.board.subs);          
            }

          };


        }
      }
    });


})();