const Thing = require('../models/thing');
const fs = require('fs');
exports.createThing = (req, res, next) => {
  req.body.thing = JSON.parse(req.body.thing);
  const url = req.protocol + '://' + req.get('host');
  const thing = new Thing({
    name: req.body.thing.name,
    manufacturer: req.body.thing.manufacturer,
    description: req.body.thing.description,
    mainPepper: req.body.thing.mainPepper,
    imageUrl: url + '/images/' + req.file.filename,
    heat: req.body.thing.heat,
    likes: req.body.thing.likes,
    dislikes: req.body.thing.dislikes,
    userId: req.body.thing.userId
  });
  thing.save().then(
    () => {
      res.status(201).json({
        message: 'Post saved successfully!'
      });
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};

exports.getOneThing = (req, res, next) => {
  Thing.findOne({
    _id: req.params.id
  }).then(
    (thing) => {
      res.status(200).json(thing);
    }
  ).catch(
    (error) => {
      res.status(404).json({
        error: error
      });
    }
  );
};

exports.modifyThing = (req, res, next) => {
  let thing = new Thing({ _id: req.params._id});
if (req.file){
  const url = req.protocol + '://' + req.get('host');
  thing = {
    _id: req.params._id,
    name: req.body.thing.name,
    manufacturer: req.body.thing.manufacturer,
    description: req.body.thing.description,
    mainPepper: req.body.thing.mainPepper,
    imageUrl: url + '/images/' + req.file.filename,
    heat: req.body.thing.heat,
    likes: req.body.thing.likes,
    dislikes: req.body.thing.likes,
    userId: req.body.thing.userId
  };
}else{
  thing = {
    _id: req.params._id,
    name: req.body.thing.name,
    manufacturer: req.body.thing.manufacturer,
    description: req.body.thing.description,
    mainPepper: req.body.thing.mainPepper,
    imageUrl: url + '/images/' + req.file.filename,
    heat: req.body.thing.heat,
    likes: req.body.thing.likes,
    dislikes: req.body.thing.likes,
    userId: req.body.thing.userId
  };
}
  Thing.updateOne({_id: req.params.id}, thing).then(
    () => {
      res.status(201).json({
        message: 'Thing updated successfully!'
      });
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};

exports.deleteThing = (req, res, next) => {
  Thing.findOne({_id: req.params.id}).then(
    (thing) => {
      const filename = thing.imageUrl.split('/images/')[1];
      fs.unlink('images/' + filename, () => {
        Thing.deleteOne({_id: req.params.id}).then(
          () => {
            res.status(200).json({
              message: 'Deleted!'
            });
          }
        ).catch(
          (error) => {
            res.status(400).json({
              error: error
            });
          }
        );
      });
    }
  );
};

exports.getAllSauce = (req, res, next) => {
  Thing.find().then(
    (things) => {
      res.status(200).json(things);
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};