
var  {ExpressCassandra,models} = require("./connection.js");

// var Subscribe = models.loadSchema('Subscribe', {
//     fields:{
//         subid: type: "uuid",
           // default: {"$db_function": "uuid()"}
//         name    : "text",
//         web : "text",
//         created : {
//             type: "timestamp"
 
//         }
//     },
  
//      key : ["subid"]
// });
var Subscriberemailist
 = models.loadSchema('Subscriberemailist', {
    fields:{
        subid: {
       
       type: "uuid" },
        emailfirst  : "<text>",
        emailsecond : "<text>"
        created : {
            type: "timestamp"
             
        }
    },
     key : ["subid","created"],
    clustering_order: {"created": "desc"},
    indexes: ["emailfirst", "emailsecond"],
    
});




Subscriberemailist.syncDB(function(err, result) {
    if (err) throw err;    
});


module.exports = {ExpressCassandra,Subscriberemailist,models};