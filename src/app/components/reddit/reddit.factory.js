(function() {
  'use strict';

  angular.module('redditDeck')

  .factory('Reddit', function($http){
    var _baseUrl = 'http://api.reddit.com/';
    var POSTS_PER_PAGE = 10;

    function getSubsUrl(subsArray) {
      return subsArray.join('+');
    }


    return function(subs) {
        var _items = [];
        var _after = '';
        var _busy = '';
        var _subs = subs || [];


        return {
          after: _after,
          getNextPage: function() {

            var self = this;

            var _url = _baseUrl
                    + 'r/'
                    + getSubsUrl(_subs)
                    + '?after='
                    + _after
                    + '&limit=' + POSTS_PER_PAGE
                    + '&jsonp=JSON_CALLBACK';

            return $http.jsonp(_url).success(function(data) {
              var items = data.data.children;
              for (var i = 0; i < items.length; i++) {
                _items.push(items[i].data);
              }
              _after = 't3_' + _items[_items.length - 1].id;
              _busy = false;
            });
          },

          items: _items,

          searchSubs: function(query) {
            var query = encodeURIComponent(query);
            var _url = 'http://www.reddit.com/api/' + 'subreddits_by_topic.json?query=' + query;
            var results = [];
            $http.get(_url).success(function(data) {
              for (var i = 0; i < data.length; i++) {
                results.push(data[i].name);
              }
            });

            return results;
          },

          update: function(subs) {
            _after = '';
            _subs = subs;

            while(_items.length) {
              _items.pop();
            }

            return this.getNextPage();
          }
        };
      };

  });

})();