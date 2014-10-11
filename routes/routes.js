/**
 * Created by harshssd on 10/10/14.
 */
var GroupExpense = require('./models/group-expense-schema.js');

module.exports = function(app) {
    
    //create a group with a default member
    app.post('/api/groups', function(req, res){
        console.log(req.body);
        GroupExpense.create({
            groupName : req.body.groupName,
            members : [{email: req.body.userEmail, name: req.body.userName, admin: true}]
        }, function(err, groupDetails){
            if(err)
                res.send(err);
            console.log(groupDetails);
            res.json(groupDetails);
        });
        
    });
    
    //get the details of all the existing groups
    app.get('/api/groups', function(req, res){
        GroupExpense.find(function(err, groups){
            if(err)
                res.send(err);
            console.log(groups);
            res.json(groups);
        });
        
    });
    
    //get data of a particular group
    app.get('/api/groups/:group_id', function(req, res){
        GroupExpense.findById(req.params.group_id, function(err, group){
            if(err)
                res.send(err);
            res.json(group);
        })
    });
    
    //delete data of a particular group
    app.delete('/api/groups/:group_id', function(req, res){
        GroupExpense.findByIdAndRemove(req.params.group_id, function(err, group){
            if(err)
               res.send(err);
            res.json({message: 'Successfully Deleted'});
        });
    });
    
    //add member to the group
    app.put('/api/groups/:group_id/members', function(req, res){
        GroupExpense.findByIdAndUpdate(req.params.group_id, 
                {$push: {members: {email: req.body.userEmail, name: req.body.userName, admin: req.body.isAdmin}}}, function(err, group){
            if(err)
                res.send(err);
            res.json(group);
        })
    });
    
    //get all the members list
    
    //add expense
    
    //get all the expenses
    
    //get only uncleared expenses
    
    app.get('/', function(req, res){
        res.sendfile('./public/index.html'); 
    });
    
}