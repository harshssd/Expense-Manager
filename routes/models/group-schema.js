/**
 * Created by harshssd on 10/10/14.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// define schema
var GroupSchema = new Schema({
    groupName : String,
    members : [ MemberSchema ],
    unclearedExpenses : [ {type: mongoose.Schema.Types.ObjectId, ref: 'Expense'} ],
    expenses : [ {type: mongoose.Schema.Types.ObjectId, ref: 'Expense'} ]
});

var MemberSchema = new Schema({
    email : String,
    name : String,
    admin : Boolean
});

module.exports = mongoose.model('Group', GroupSchema);