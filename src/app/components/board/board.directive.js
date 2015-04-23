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

          scope.loading = true

          // If no subs were defined, open in edit mode
          if (scope.board.subs.length) {
            scope.editing = false;
          }
          else {
            scope.editing = true;
            scope.searchResults = [];
          }


          // Get own instance of reddit service
          var reddit = Reddit(scope.board.subs);
          scope.links = reddit.items;

          // Load initial items if this is an existing board
          if (scope.board.subs.length) {
            reddit.getNextPage().then(function() {
              scope.loading = false;
            });
          }


          //Load next batch of links
          scope.loadNext = function() {
            scope.loading = true
            return reddit.getNextPage().then(function() {
              scope.loading = false;
            });
          };


          // Handle interaction with the options dropdown
          scope.$watch(function() {
            return scope.selectedOption;
          },
          function(option) {
            if (option === 'refresh') {
              scope.loading = true;
              reddit.update(scope.board.subs).then(function() {
                scope.loading = false;
              });

              if (scope.editing) scope.toggleEditMode();
            }
            else if (option === 'edit') {
              scope.toggleEditMode();
            }


            else if (option === 'delete') {
              scope.$parent.removeBoard(scope.board);
            }

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
          };

          scope.addSub = function(sub) {
            scope.board.subs.push(sub);
            reddit.update(scope.board.subs).then(function() {
              scope.loading = false;
            });
            scope.toggleEditMode();
            scope.loading = true;
            scope.$parent.saveBoards();
          };

          scope.removeSub = function(sub) {
            var index = scope.board.subs.indexOf(sub);

            if (index !== -1 && scope.subs.length > 1) {
              scope.loading = true;
              scope.board.subs.splice(scope.board.subs.indexOf(sub), 1);
              reddit.update(scope.board.subs).then(function() {
                scope.loading = false;
              });
              scope.$parent.saveBoards();
            }

          };


        }
      };
    });


})();