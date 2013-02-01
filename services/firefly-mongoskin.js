/*
    Firefly-Mongoskin - Mongoskin service for Firefly
    Copyright (C) <2012>  <Mansoor Sayed>

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

'use strict';


var mongoskin = require('mongoskin');



/**
* Initialize Mongoskin and set it as a service named 'Mongoskin' with Firefly
*
* @class Mongoskin
* @module Services
* @constructor
* @param {Object} firefly reference to Firefly instance
* @param {Object} opts mongodb connection options
* @param {String} [serviceName='Mongoskin'] name for the service
*/
var Mongoskin = module.exports = function(firefly, serviceName) {
    if (!firefly) {
        throw new Error('`Mongoskin` service requires Firefly instance as its first parameters in constructor');
    }

    this.app = firefly;
    
    var url = firefly.config.MongoDB.HOST + ':' + firefly.config.MongoDB.PORT + '/' + firefly.config.MongoDB.DB_NAME + '?auto_reconnect=true';
    
    this.db = mongoskin.db(url);
    
    this.app.set(serviceName || 'Mongoskin', this.db);
};
