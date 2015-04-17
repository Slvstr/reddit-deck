(function() {
  'use strict';

  angular.module('redditDeck')

  .factory('Reddit', function($http){
    var _baseUrl = 'http://api.reddit.com/r/';
    var POSTS_PER_PAGE = 10;

    function getSubsUrl(subsArray) {
      return subsArray.join('+');
    }


    return {
      init: function(subs) {
        var _items = [];
        var _after = '';
        var _busy = '';
        var _url = _baseUrl
                + getSubsUrl(subs)
                + '?after='
                + _after
                + '&limit=' + POSTS_PER_PAGE
                + '&jsonp=JSON_CALLBACK';


        return {
          after: _after,
          getNextPage: function() {
            return $http.jsonp(_url).success(function(data) {
              var items = data.data.children;
              for (var i = 0; i < items.length; i++) {
                _items.push(items[i].data);
              }
              _after = 't3_' + _items[_items.length - 1].id;
              _busy = false;
            });
          },
          items: _items
        };
      },

      searchSubs: function(query) {

      }
    };

  });

})();