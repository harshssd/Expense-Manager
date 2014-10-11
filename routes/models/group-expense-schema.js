/**
 * Created by harshssd on 10/10/14.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// define schema
var GroupExpenseSchema = new Schema({
    groupName : String,
    members : [ Member ],
    Expenses : [{
        amount : Number,
        paidBy : String,
        cleared : Boolean,
        details : String
    }]
});

var Member = new Schema({
    email : String,
    name : String,
    admin : Boolean
});

// create an export function to encapsulate the model creation
module.exports = mongoose.model('GroupExpense', GroupExpenseSchema);