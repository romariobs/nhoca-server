
const uuidV1 = require('uuid/v1');

/**
 * PlayerController
 *
 * @description :: Server-side logic for managing players
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  /**
   * Player create.
   *
   * Unity WWW has not a PUT or DELETE method, then we need
   * Always received the PUT as a POST method.
   *
   * This solution is a workaround to solve the problem!!!
   *
   * When a request POST don't have the field 'uuid' this request will be considered as POST.
   * In the otherwise, if a POST request has the field 'uuid' this request will be handled as PUT.
   *
   */
  create: function (req, res) {

    var uuid = req.param('uuid');

    if (uuid){
      //Handle this request as a PUT request.
      var responseObject = {};

      Player.findOne({'uuid' : uuid }, function foundPlayer(err, player){

        if (err){
          responseObject  = {
            status : 500,
            message : 'Internal Server Error, Fail search the player',
            error : err
          };
          return res.json(responseObject);
        }

        if (!player){

          responseObject = {
            status : 404,
            message : 'Not Found, Player doesn\'t exist.'
          };

          return res.json(responseObject);
        }

        //var score = player.bestScore;
        //var coins = player.coins;

        var playedUpdated = req.params.all();

        //Check if we have a better score
        //Only update if the score is better then the saved score.
        //if (playedUpdated.bestScore < score){
        //  playedUpdated.bestScore = score;
        //}

        //Check and increase the number of coins.
        //if (playedUpdated.coins){
        //  playedUpdated.coins += player.coins;
        //}

        Player.update(player.id, playedUpdated, function playerUpdated(err){
          if(err){

            responseObject = {
              status : 500,
              message : "Internal Server Error, Fail updating the player",
              err : err
            };
            return res.json(responseObject);
          }

          responseObject = {
            status :  200,
            message : "Player updated successfully."
          };

          return res.json(responseObject);
        });

      });

    }
    else{

      //Handle this request as a normal POST request.
      var newPlayer = {
        name: req.param('name'),
        bestScore: req.param('bestScore'),
        coins: req.param('coins'),
        uuid: uuidV1()
      };

      Player.create(newPlayer).exec(function (err, player) {
        var response = {};
        if (err) {
          response = {
            status : 500,
            message : "Error creating Player",
            error : err
          };
          return res.json(500, response);
        }
        response = {
          status: 201,
          player: player
        };
        return res.json(201, response);
      });
    }

  },

  /**
   * Player find
   */
  find: function (req, res) {
    var query = Player.find();

    query.exec( function (err, players) {
      var response = {};
      if (err) {
        response.status = 500;
        response.message = "Internal Server Error, Fail to search players.";
        response.err = err;
        return res.json(response);
      } else {
        response.status = 200;
        response.players = players;
        return res.json(response);
      }
    });

  },

  /**
   * `RankingController.findOne()`
   */
  findOne: function (req, res) {
    var responseObject = {};

    Player.findOne( req.param('id'), function foundRanking(err, player){

      if (err){
        responseObject = {
          status : 500,
          message : "Internal Server Error, Fail searching player with id " + req.param('id'),
          error : err
        };
        return res.json(500, responseObject);
      }

      if (!player){
        responseObject = {
          status : 404,
          message : "Not Found, Player doesn\'t exist."
        };
        return res.json(404, responseObject);
      }

      responseObject = {
        status : 200,
        player : player
      };

      return res.json(200, responseObject);
    });
  },


  /**
   * `PlayerController.destroy()`
   */
  destroy: function (req, res) {
    var responseObject = {};

    Player.findOne(req.param('id'), function foundRanking(err, player){

      if (err){
        responseObject  = {
          status : 500,
          message : 'Internal Server Error, Fail searching player.',
          error : err
        };
        return res.json(responseObject);
      }

      if (!player){
        responseObject = {
          status : 404,
          message : 'Not Found, Player doesn\'t exist.'
        };

        return res.json(responseObject);
      }


      Player.destroy(req.param('id'), function playerDestroyed(err){
        if (err){
          responseObject  = {
            status : 500,
            message : 'Internal Server Error, Fail deleting player.',
            error : err
          };
        }
        else {
          responseObject  = {
            status : 200,
            message : 'Player deleted successfully.'
          };
        }

        return res.json(responseObject);
      });

    });

  }

};

