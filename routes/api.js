var express = require('express');
var router = express.Router();
var shortid = require('shortid');
var indsCol = require('../models/indscol.js');

var extend = function(obj, extObj) {
    if (arguments.length > 2) {
        for (var a = 1; a < arguments.length; a++) {
            extend(obj, arguments[a]);
        }
    } else {
        for (var i in extObj) {
            obj[i] = extObj[i];
        }
    }
    return obj;
};


/* api individual collections router */

// get specified individuals collections list ( GET route )
router.get('/:individ/:collection', function(req, res, next) {
  indsCol.findOne({individual: req.params.individ, colcategory: req.params.collection}, function(err, doc){
	 	if(doc){
	 			res.send(doc.colction);
	 	}else{
	 			res.send([])
	 	}
  })
});

// post an item to specified individuals collections list ( POST route )
router.post('/:individ/:collection', function(req, res, next) {
	req.body = extend(req.body, {_id: shortid.generate()});

	indsCol.findOne({individual: req.params.individ, colcategory: req.params.collection}, function(err, ind){
		if (err) return console.error(err);

		if(ind){
			ind.colction.push(req.body);

			ind.save(function(err, doc){
                if (err) return console.error(err);
                
				res.send(doc);
			})
		}else{
			var newIndsCol = new indsCol();
			newIndsCol.individual = req.params.individ;
			newIndsCol.colcategory = req.params.collection;


			newIndsCol.colction = [req.body];

			newIndsCol.save(function(err, doc){
                if (err) return console.error(err);
                
				res.send(doc);
			})
		}

	});
});

// get a specific item from specified individuals collections list ( GET route )
router.get('/:individ/:collection/:id', function(req, res, next) {
  indsCol.findOne({individual: req.params.individ, colcategory: req.params.collection}, function(err, ind){
		if (err) return console.error(err);

		if (ind){
			for (var i = 0; i < ind.colction.length; i++) {
				if(ind.colction[i]._id == req.params.id){
					res.send(ind.colction[i]);
					break;
				}
			}
		}else{
			res.end("That certain item was not found");
		}
        
	});
});

// put (update) a specific item in specified individuals collections list ( PUT route )
router.put('/:individ/:collection/:id', function(req, res, next) {
  indsCol.findOne({individual: req.params.individ, colcategory: req.params.collection}, function(err, ind){
		if (err) return console.error(err);

		if (ind){

			for (var i = 0; i < ind.col.length; i++) {
				if(ind.colction[i]._id == req.params.id){
						if(req.body){ ind.colction[i] = extend(ind.colction[i], req.body) }
				}
			}
			
			ind.save(function(err, doc){
                            if (err) return console.error(err);
							return res.send(doc.colction[i]);
						});

		}else{
			res.end("That certain item was not found. Therefore unable to update item.");
		}

	});
});

// delete a specific item from specified individuals collections list ( DELETE route )
router.delete('/:individ/:collection/:id', function(req, res, next) {
  indsCol.findOne({individual: req.params.individ, colcategory: req.params.collection}, function(err, ind){
		if (err) return console.error(err);

		if (ind){

			for (var i = 0; i < ind.colction.length; i++) {
				if(ind.colction[i]._id == req.params.id){
						ind.colction.splice(i,1)
				}
			}
			
			ind.save(function(err, doc){
                            if (err) return console.error(err);
							return res.send(doc.colction[i]);
						});

		}else{
			res.end("That certain item was not found. Therefore unable to delete item.");
		}

	});
});

module.exports = router;
