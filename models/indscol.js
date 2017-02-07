var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

/**
 * Create a schema (blueprint) for all users in the database.
 * If you want to collect additional info, add the fields here.
 * We are setting required to true so that if the field is not
 * given, the document is not inserted. Unique will prevent
 * saving if a duplicate entry is found.
 */
var indsCollectionSchema = mongoose.Schema({
	individual:  {
					type: String
				},
  colcategory: {
          type: String
        },
	colction: 	 [
              {}
  ]
});


// Make user model available through exports/require
module.exports = mongoose.model('indscollection', indsCollectionSchema);