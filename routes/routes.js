/**
 * Created by harshssd on 10/10/14.
 */
var Group = require('./models/group-schema.js');
var Expense = require('./models/expense-schema.js');

module.exports = function(app) {
    
    //create a group with a default member
    app.post('/api/groups', function(req, res){
        Group.create({
            groupName : req.body.groupName,
            members : [ req.body.admin ]
        }, function(err, groupDetails){
            if(err)
                res.send(err);
            res.json(groupDetails);
        });
        
    });
    
    //get the details of all the existing groups
    app.get('/api/groups', function(req, res){
        Group.find(function(err, groups){
            if(err)
                res.send(err);
            res.json(groups);
        });
        
    });
    
    //get data of a particular group
    app.get('/api/groups/:group_id', function(req, res){
        Group.findById(req.params.group_id, function(err, group){
            if(err)
                res.send(err);
            res.json(group);
        })
    });
    
    //delete data of a particular group
    app.delete('/api/groups/:group_id', function(req, res){
        Group.findByIdAndRemove(req.params.group_id, function(err, group){
            if(err)
               res.send(err);
            res.json({message: 'Successfully Deleted'});
        });
    });
    
    //add member to the group
    app.put('/api/groups/:group_id/members', function(req, res){
        Group.findByIdAndUpdate(req.params.group_id, 
                {$push: { members: {email: req.body.email, firstName: req.body.firstName, lastName: req.body.lastName, admin: req.body.isAdmin}}}, function(err, group){
            if(err)
                res.send(err);
            res.json(group);
        })
    });
    
    //get all the members list
    app.get('/api/groups/:group_id/members', function(req, res){
        Group.findById(req.params.group_id, { members: 1, _id: 0 }, function(err, members){
            if(err)
                res.send(err);
            res.json(members);
        })
    });
    
    //add expense
    app.post('/api/groups/:group_id/expenses', function(req, res){
        Expense.create({
            amount : req.body.amount,
            paidBy : req.body.paidEmail,
            createdOn : req.body.date,
            createdBy : req.body.enteredEmail,
            cleared : req.body.isCleared,
            description : req.body.description
        }, function(err, expense) {
            if(err)
                res.send(err);
            Group.findByIdAndUpdate(req.params.group_id, {$push : {expenses : expense._id, unclearedExpenses : expense._id}}, function(err, group) {
            if(err){
                Expense.findByIdAndRemove(expense._id);
                res.send(err);
            }
            res.json(expense);
            });
            
        });
    });
    
    //get all the expenses
    app.get('/api/groups/:group_id/expenses', function(req, res){
        Group.findById(req.params.group_id, {expenses : 1, _id : 0}, function(err, expenseIds){
            if(err)
                res.send(err);
            Expense.find({_id: {$in: expenseIds.expenses}}, function(err, expenses) {
                if(err)
                    res.send(err);
                res.json(expenses);
            });
        });
    });
    
    //clear an uncleared expense
    app.put('/api/groups/:group_id/expenses/:expense_id', function(req, res){
        Group.findByIdAndUpdate(req.params.group_id, {$pull : {unclearedExpenses: req.params.expense_id}}, function(err){
            if(err)
                res.send(err);
            Expense.findByIdAndUpdate(req.params.expense_id, {$set : {cleared : true}}, function(err, num){  
                if(err){
                    Group.findByIdAndUpdate(req.params.group_id, {$push : {expenses: req.params.expense_id}})
                    res.send(err);   
                }
                res.send(num);
            });
        }) 
    });
    
    //get all the only uncleared expenses
    app.get('/api/groups/:group_id/unclearedExpenses', function(req, res){
        Group.findById(req.params.group_id, {unclearedExpenses : 1, _id : 0}, function(err, expenseIds){
            if(err)
                res.send(err);
            Expense.find({_id: {$in: expenseIds.unclearedExpenses}}, function(err, expenses) {
                if(err)
                    res.send(err);
                res.json(expenses);
            });
        });
    });
    
    app.get('/', function(req, res){
        res.sendfile('./public/index.html'); 
    });
    
}