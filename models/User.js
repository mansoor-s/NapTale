'use strict';

var User = module.exports = function(firefly) {
    firefly.Model.extend(this);
    
    firefly.setModelInit = this._onInit();
};


User.prototype._onInit = function() {
    
};