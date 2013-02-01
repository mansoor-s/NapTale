/*
    Firefly - Node.js Framework
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

var cluster         = require( 'cluster' );
var numCPUs         = require('os').cpus().length;

var Firefly         = require( '/home/mansoor/projects/Firefly/Firefly/index.js' );
var AppConfig       = require( './AppConfig.js' );
var routes          = require( './Routes.js' );

var HandleBars      = require( 'firefly-handlebars' );

var Mongoskin       = require( './services/firefly-mongoskin.js' );


//new instance of Firefly
var app = new Firefly( routes, AppConfig );

new Mongoskin(app);

//set up renderer. wrapper for Handlebars
var handlebars = new HandleBars(app);
app.setViewEngine(handlebars);



//Initialize 
app.init(function() {
    console.log('Server Started');  
});
