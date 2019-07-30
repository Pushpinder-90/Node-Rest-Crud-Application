var MongoClient = require('mongodb').MongoClient;

// Connect to the db
MongoClient.connect("mongodb://localhost:27017/User_DB", function (err, db) {
    
    db.collection('User', function (err, collection) {
        
        collection.insert({ id: 1, name: 'Steve', address: 'Jobs' });
        collection.insert({ id: 2, name: 'Bill', address: 'Gates' });
        collection.insert({ id: 3, name: 'James', address: 'Bond' });
        
        

        db.collection('User').count(function (err, count) {
            if (err) throw err;
            
            console.log('Total Rows: ' + count);
        });
    });
                
});