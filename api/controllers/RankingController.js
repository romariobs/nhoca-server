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

    //Bad request if invalid score
    if (score <= 0){
      response = {
        status : 400,
        message : "Bad Request, Invalid Score! The score must be a value greater than 0.",
        error : err
      };
      return res.json(400, response);
    }

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
        return res.json(500, response);
      }
      response = {
        status: 201,
        ranking: newRanking
      };
      return res.json(201, response);
    });

  },


  /**
   * `RankingController.destroy()`
   */
  destroy: function (req, res) {
    var responseObject = {};

    Ranking.findOne(req.param('id'), function foundRanking(err, ranking){

      if (err){
        responseObject  = {
          status : 500,
          message : 'Internal Server Error, Fail searching ranking.',
          error : err
        };
        return res.json(responseObject);
      }

      if (!user){
        responseObject = {
          status : 404,
          message : 'Not Found, Ranking doesn\'t exist.'
        };

        return res.json(responseObject);
      }


      Ranking.destroy(req.param('id'), function userDestroyed(err){
        if (err){
          responseObject  = {
            status : 500,
            message : 'Internal Server Error, Fail deleting ranking.',
            error : err
          };
        }
        else {
          responseObject  = {
            status : 200,
            message : 'Ranking deleted successfully.'
          };
        }

        return res.json(responseObject);
      });

    });

  },


  /**
   * `RankingController.find()`
   */
  find: function (req, res) {
    var query = Ranking.find();
    query.limit(10);
    query.sort('score DESC');

    query.exec(function (err, results) {
      var response = {};

      if (err) {
        response.status = 500;
        response.message = "Internal Server Error, fail to search rankings.";
        response.err = err;
        return res.json(response);
      } else {
        response.status = 200;
        response.ranking = results;
        return res.json(response);
      }

    });

  },


  /**
   * `RankingController.findOne()`
   */
  findOne: function (req, res) {
    var responseObject = {};

    Ranking.findOne( req.param('id'), function foundRanking(err, ranking){

      if (err){
        responseObject = {
          status : 500,
          message : "Internal Server Error, Fail searching ranking with id " + req.param('id'),
          error : err
        };
        return res.json(500, responseObject);
      }

      if (!ranking){
        responseObject = {
          status : 404,
          message : "Not Found, Ranking doesn\'t exist."
        };
        return res.json(404, responseObject);
      }

      responseObject = {
        status : 200,
        ranking : ranking
      };
      return res.json(200, responseObject);
    });
  }


};

