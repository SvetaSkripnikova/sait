const {MainViewModel} = require( '../models'); 
const db = require('../utils/sqlitedb'); 

module.exports = (r, q) => { 
    db.getTasks().then(task => { 
        db.getStatuses().then(statuses => { 
            let model = new MainViewModel('TODO LIST', task, statuses); 
            q.render('index', model); 
        }); 
    });
}

exports.update = (r, q) => { 
    r.body.id = +r.body.id; 
    db.getStatuses(+r.body.status).then (x => { 
        r.body.status = x; 
        db.updateTask(r.body).then(y => { 
            q.redirect('/'); 
        }); 
    }); 
}; 

exports.delete = (r, q) => { 
    db.removeTask(+r.params.id).then(x => { 
        q.redirect('/'); 
    }); 
};
