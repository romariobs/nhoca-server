/**
 * RankingController
 *
 * @description :: Server-side logic for managing rankings
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  /**
   * `RankingController.create()`
   */
  create: function (req, res) {
    var name = req.param('name');
    var score = req.param('score');
    var ranking = {
      name: name,
      score: score
    };

    Ranking.create(ranking).exec(function (err, newRanking) {
      var response = {};
      if (err) {
        response = {
          status : 500,
          message : "Error creating ranking",
          error : err
        };
        return res.json(response);
      }
      response = {
        status: 201,
        ranking: newRanking
      };
      return res.json(response);
    });
  },


  /**
   * `RankingController.destroy()`
   */
  destroy: function (req, res) {
    return res.json({
      todo: 'destroy() is not implemented yet!'
    });
  },


  /**
   * `RankingController.find()`
   */
  find: function (req, res) {
    return res.json({
      todo: 'find() is not implemented yet!'
    });
  },


  /**
   * `RankingController.findOne()`
   */
  findOne: function (req, res) {
    return res.json({
      todo: 'findOne() is not implemented yet!'
    });
  }
};

