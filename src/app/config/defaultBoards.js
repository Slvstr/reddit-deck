(function() {
  'use strict';

  angular.module('redditDeck')

    .run(function(Storage) {
      var defaultBoards = [
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

      if (!Storage.getItem('boards')) {
        Storage.setItem('boards', defaultBoards);
      }

    })

})();