'use strict';

angular.module('redditDeck')
  .controller('MainCtrl', function ($scope) {

    $scope.boards = [
      {
        subs: ['news'],
        name: 'News'
      },

      {
        subs: ['funny', 'wtf'],
        name: 'Funny / WTF'
      },

      {
        subs: ['learnprogramming'],
        name: 'Learn Programming'
      }
    ];
  
  });
