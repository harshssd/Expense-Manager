/**
 * Created by harshssd on 10/10/14.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ExpenseSchema = new Schema({
    amount : Number,
    paidBy : String,
    createdOn : Date,
    createdBy : String,
    cleared : Boolean,
    description : String
});

module.exports = mongoose.model('Expense', ExpenseSchema);