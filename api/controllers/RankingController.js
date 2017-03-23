/**
 * RankingController
 *
 * @description :: Server-side logic for managing rankings
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  /**
   * `RankingController.find()`
   */
  find: function (req, res) {
    var query = Player.find();
    query.limit(10);
    query.sort('bestScore DESC');

    query.exec(function foundPlayer(err, players) {
      var response = {};

      if (err) {
        response.status = 500;
        response.message = "Internal Server Error, fail to search players.";
        response.err = err;
        return res.json(response);
      } else {

        var results = [];

        players.forEach(function(player){
          results.push({ name : player.name , score: player.bestScore })
        });

        response.status = 200;
        response.ranking = results;
        return res.json(response);
      }

    });

  }

};

