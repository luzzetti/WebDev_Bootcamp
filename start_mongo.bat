cd "C:\Program Files\MongoDB\Server\4.0\bin"
mongod --port 3001 --dbpath C:\data\db


CRUD
Create
Read
Update
Destroy

The monitoring data will be available on a MongoDB website with a unique URL accessible to you
and anyone you share the URL with. MongoDB may use this information to make product
improvements and to suggest MongoDB products and deployment options to you.

To enable free monitoring, run the following command: db.enableFreeMonitoring()
To permanently disable this reminder, run the following command: db.disableFreeMonitoring()
---

> help
        db.help()                    help on db methods
        db.mycoll.help()             help on collection methods
        sh.help()                    sharding helpers
        rs.help()                    replica set helpers
        help admin                   administrative help
        help connect                 connecting to a db help
        help keys                    key shortcuts
        help misc                    misc things to know
        help mr                      mapreduce

        show dbs                     show database names
        show collections             show collections in current database
        show users                   show users in current database
        show profile                 show most recent system.profile entries with
time >= 1ms
        show logs                    show the accessible logger names
        show log [name]              prints out the last segment of log in memory, 'global' is default
        use <db_name>                set current database
        db.foo.find()                list objects in collection foo
        db.foo.find( { a : 1 } )     list objects in foo where a == 1
        it                           result of the last line evaluated; use to further iterate
        DBQuery.shellBatchSize = x   set default number of items to display on shell
        exit                         quit the mongo shell
> show dbs
admin   0.000GB
config  0.000GB
local   0.000GB
> use demo
switched to db demo
> show dbs
admin   0.000GB
config  0.000GB
local   0.000GB
> db.dogs.insert({name: "Rusty", breed: "Mutt"})
WriteResult({ "nInserted" : 1 })
> show collections
dogs
> db.dogs.find()
{ "_id" : ObjectId("5c93bc43f81af6f5fa279878"), "name" : "Rusty", "breed" : "Mutt" }> db.dogs.insert({name: "Lucy", breed: "Mutt"})
WriteResult({ "nInserted" : 1 })
> db.dogs.find()
{ "_id" : ObjectId("5c93bc43f81af6f5fa279878"), "name" : "Rusty", "breed" : "Mutt" }
{ "_id" : ObjectId("5c93c039f81af6f5fa279879"), "name" : "Lucy", "breed" : "Mutt" }> db.dogs.find({name: "Rusty"});
{ "_id" : ObjectId("5c93bc43f81af6f5fa279878"), "name" : "Rusty", "breed" : "Mutt" }> db.dogs.insert({name: "Lulu", breed: "Poodle"})
WriteResult({ "nInserted" : 1 })
> db.dogs.find()
{ "_id" : ObjectId("5c93bc43f81af6f5fa279878"), "name" : "Rusty", "breed" : "Mutt" }
{ "_id" : ObjectId("5c93c039f81af6f5fa279879"), "name" : "Lucy", "breed" : "Mutt" }
{ "_id" : ObjectId("5c93c08ff81af6f5fa27987a"), "name" : "Lulu", "breed" : "Poodle" }
> db.dogs.find({breed: "Mutt"});
{ "_id" : ObjectId("5c93bc43f81af6f5fa279878"), "name" : "Rusty", "breed" : "Mutt" }
{ "_id" : ObjectId("5c93c039f81af6f5fa279879"), "name" : "Lucy", "breed" : "Mutt" }
> db.dogs.find({breed: "Poodle"});
{ "_id" : ObjectId("5c93c08ff81af6f5fa27987a"), "name" : "Lulu", "breed" : "Poodle" }
> db.dogs.update({name: "Lulu"}, {breed: "Labradoodle"})
WriteResult({ "nMatched" : 1, "nUpserted" : 0, "nModified" : 1 })
> db.dogs.find();
{ "_id" : ObjectId("5c93bc43f81af6f5fa279878"), "name" : "Rusty", "breed" : "Mutt" }
{ "_id" : ObjectId("5c93c039f81af6f5fa279879"), "name" : "Lucy", "breed" : "Mutt" }
{ "_id" : ObjectId("5c93c08ff81af6f5fa27987a"), "breed" : "Labradoodle" }
> db.dogs.update({name: "Rusty"},{$set: {name: "Tater", isCute: true}})
WriteResult({ "nMatched" : 1, "nUpserted" : 0, "nModified" : 1 })
> db.dogs.find({name: "Tater"})
{ "_id" : ObjectId("5c93bc43f81af6f5fa279878"), "name" : "Tater", "breed" : "Mutt", "isCute" : true }
> db.dogs.find()
{ "_id" : ObjectId("5c93bc43f81af6f5fa279878"), "name" : "Tater", "breed" : "Mutt", "isCute" : true }
{ "_id" : ObjectId("5c93c039f81af6f5fa279879"), "name" : "Lucy", "breed" : "Mutt" }
{ "_id" : ObjectId("5c93c08ff81af6f5fa27987a"), "breed" : "Labradoodle" }
> db.dogs.remove({breed: "Labradoodle"})
WriteResult({ "nRemoved" : 1 })
> db.dogs.find()
{ "_id" : ObjectId("5c93bc43f81af6f5fa279878"), "name" : "Tater", "breed" : "Mutt", "isCute" : true }
{ "_id" : ObjectId("5c93c039f81af6f5fa279879"), "name" : "Lucy", "breed" : "Mutt" }
> db.dogs.remove({breed: "Mutt"})
WriteResult({ "nRemoved" : 2 })