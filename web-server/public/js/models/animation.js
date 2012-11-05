__resources__["/animation.js"] = {meta: {mimetype: "application/javascript"}, data: function(exports, require, module, __filename, __dirname) {

  /**
   * Module dependencies
   *
   */

  var FrameAnimation = require('frameanimation').FrameAnimation;
  var EntityType = require('consts').EntityType;
  var imgAndJsonUrl = require('config').IMAGE_URL;
  var dataApi = require('dataApi');
  var app = require('app');

  /**
   * Initialize a new 'Animation' with the given 'opts'
   * 
   * @param {Object} opts
   * @api public
   */

  var Animation = function(opts) {
    this.kindId = opts.kindId;
    this.type = opts.type;
    this.name = opts.name;
    this.flipx = opts.flipx;
  };

  /**
   * Create animation, each node owns four basic animations
   * standAnimation, walkAnimation, diedAnimation and attackAnimation
   *
   * @api public
   */
  Animation.prototype.create = function() {
    var animationData = this.getJsonData();
    var width = animationData.width;
    var height = animationData.height;
    var totalFrames = animationData.totalFrames;

    var img = this.getImage();

    var ani = new FrameAnimation({
      flipX: this.flipx,
      image : img,
      w : width,
      h : height,
      totalTime : totalFrames * 50,
      interval : 50
    });
    ani.name = this.name;
    ani.flipx = this.flipx;
    return ani;
  }

  /**
   * Get animation's jsonData.
   *
   * @api public
   */
  Animation.prototype.getJsonData= function() {
    var id = this.kindId, type = this.type, name = this.name, data;
    if (type === EntityType.PLAYER) {
      data = dataApi.animation.get(id)[name];
    }
    if (data) {
      return data;
    } else {
      console.error('the jsonData :'+id+'/'+name+'.json is not exist!');
    }
  }

  /**
   * Get animation's iamge.
   *
   * @api public
   */
  Animation.prototype.getImage = function() {
    var id = this.kindId, type = this.type, name = this.name;
    var aniIamgeUrl;
    if (type === EntityType.PLAYER) {
      aniIamgeUrl = imgAndJsonUrl+'animation/character/'+id+'/'+name+'.png';
    }
    var ResMgr = app.getResMgr();
    var img = ResMgr.loadImage(aniIamgeUrl);
    if(img) {
      return img;
    }else {
      console.error('the iamge :'+id+'/'+name+'.PNG is not exist!');
    }
  };

  module.exports = Animation;

}};

