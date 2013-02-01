'use strict';

var async = require('async');


var Site = module.exports = function( app ) {
	this._app = app;
	this._sessionManager = app.get('SessionManager');
	
    this._db = app.get('Mongoskin');
    
    this._dreams = this._db.collection('dreams');
};



Site.prototype.homeAction = function(req, res) {
    this.topAction(req, res);
};


Site.prototype.topAction = function(req, res, page) {
    //res.render('home.html');
    //for now there is no diffrence between Top and New posts, until we get the ranking system implemented
    this.newAction(req, res, page);
};



Site.prototype.newAction = function(req, res, page) {
    page = parseInt(page) || 0;
    var skip = page * 15;
    this._dreams.find({}, {limit: 15, skip: skip, sort: {'_id': -1}}).toArray(function(err, results) {
        if (err) {
            throw new Error(err);
        }
        var dreams = [];
        
        var len = results.length;
        
        for(var i = 0; i < len; ++i) {
            var item = results[i];
            var month = item.d.getMonth() + 1;
            var day = item.d.getDate();
            var year = item.d.getFullYear();
            
            var date = month + '/' + day + '/' + year;
            
            var time = item.d.getHours() + ':' + item.d.getMinutes() + ':' + item.d.getSeconds() + ' GMT';
        
            dreams.push({author: item.a, title: item.t, story: item.dr, votes: item.v, date: date, time: time, id: item._id});
        }
        
        
        
        res.render('new.html', {prev: (!page), nextPage: (page + 1),dreams: dreams});
    });
};

Site.prototype.readAction = function(req, res, id) {
    var self = this;
    var idObj = this._db.bson_serializer.ObjectID.createFromHexString(id);
    
    this._dreams.findOne({_id: idObj}, function(err, doc) {
        if (err) {
            throw new Error(err);
        }
        if(!doc) {
            res.setStatusCode(400);
            res.setContent('Bad Request');
            res.send();
            return;
        }
        
        var month = doc.d.getMonth() + 1;
        var day = doc.d.getDate();
        var year = doc.d.getFullYear();
        
        var date = month + '/' + day + '/' + year;
        
        var time = doc.d.getHours() + ':' + doc.d.getMinutes() + ':' + doc.d.getSeconds() + ' GMT';
        var dream = {author: doc.a, title: doc.t, story: doc.dr, votes: doc.v, date: date, time: time, id: doc._id};
        res.render('read.html', {dream: dream});
    });
};

Site.prototype.submitAction = function(req, res) {
    var form = req.getFormData().fields;
    
    if (!form.author || !form.dream || !form.title) {
        res.setStatusCode(400);
        res.setContent('Bad Request');
        res.send();
        return;
    }
    
    var titleLength = form.title.length;
    var authorLength = form.author.length;
    var dreamLength = form.dream.length;
    
    if (titleLength < 4 || authorLength < 3 || dreamLength < 10) {
        res.setStatusCode(400);
        res.setContent('Bad Request');
        res.send();
        return;
    }
    
    this._dreams.insert({t: form.title, a: form.author, d: new Date(), dr: form.dream, v: 1, s: 0}, {}, function(err, results) {
        if (err) {
            throw new Error(err);
        }
        
        res.setContent('Ok!');
        res.send();
    });
};





Site.prototype.catch404 = function(req, res) {
    res.render('404.html');
};


Site.prototype.catch500 = function(req, res) {
    res.render('500.html');
};