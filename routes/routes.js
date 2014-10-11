/**
 * Created by harshssd on 10/10/14.
 */
var GroupExpense = require('./models/group-expense-schema.js');

module.exports = function(app) {
    
    app.post('/api/groups', function(req, res){
        console.log(req.body);
        GroupExpense.create({
            groupName : req.body.groupName,
            members : [{email: req.body.userEmail, name: req.body.userName, admin: true}]
//            $push : { members : req.body.member }
        }, function(err, groupDetails){
            if(err)
                res.send(err);
            console.log(groupDetails);
//            GroupExpense.upda
//            $push : 
            res.json(groupDetails);
        });
        
    });
    
    app.get('/api/groups', function(req, res){
        
        return GroupExpense.find(function(err, groups){
            if(err)
                res.send(err);
            console.log(groups);
            res.json(groups);
        });
        
    });
    
    app.get('/', function(req, res){
        res.sendfile('./public/index.html'); 
    });
    
}