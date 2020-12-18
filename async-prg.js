const async = require('async');

async.parallel([
	function(callback) {
		setTimeout(function() {
			callback(null, 'one');
		}, 300);
	},
	function(callback) {
		setTimeout(function() {
			callback(null, 'two');
		}, 100);
	}
],
function(err, results) {
	console.log(results);
});

async.parallel({
	one: function(callback) {
		setTimeout(function() {
			callback(null, 1);
		}, 200);
	},
	two: function(callback) {
		setTimeout(function() {
			callback(null, 2);
		}, 200);
	}
}, function (err, results) {
	console.log(results);
});

async.waterfall([
	function(callback) {
		callback(null, 'one', 'two');
	},
	function(arg1, arg2, callback) {
		s = arg1 + ' ' + arg2 + ' ' + 'three';
		callback(null, s);
	},
	function(arg1, callback) {
		s = arg1 + ' ' + 'done';
		callback(null, s);
	},
], function(err, result) {
	console.log(result);
});

async.series([
	function(callback) {
		setTimeout(function() {
			callback(null, 'one_in_series');
		}, 300);
	},
	function(callback) {
		setTimeout(function() {
			callback(null, 'two_in_series');
		}, 100);
	}
],
function(err, results) {
	console.log(results);
});
