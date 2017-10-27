const preloadById = (model, modelSettings) => (req, res, next, id) => {
  model.findOne({_id: id, userId: req.userId})
    .then(item => {
      req.itemFromMiddleware = item;
      next();
    })
    .catch(e =>  res.json({success: false, e}))
}

const create = (model, modelSettings) => (req, res) => {
  model.create(Object.assign({}, req.body, {userId: req.userId}))
    .then(item => {
      if (modelSettings.populate) {
        model.populate(item, modelSettings.populate.join(' '))
          .then(item => res.json({success: true, item}))
      } else {
        res.json({success: true, item})
      }
    })
    .catch(e =>  res.json({success: false, e}))
}

const getAll = (model, modelSettings) => (req, res) => {
  let promise = model.find({userId: req.userId})

  if (modelSettings.populate) {
    modelSettings.populate.forEach(path => {
      promise = promise.populate(path)
    })
  }

  promise.then(items => res.json({success: true, items}))
    .catch(e =>  res.json({success: false, e}))
}

const getOne = (model, modelSettings) => (req, res) => {
  res.json({success: true, item: req.itemFromMiddleware})
}

const deleteOne = (model, modelSettings) => (req, res) => {
  return req.itemFromMiddleware.remove()
    .then(item => res.json({success: true, item}))
    .catch(e =>  res.json({success: false, e}))
}

const updateOne = (model, modelSettings) => (req, res) => {
  return model.findByIdAndUpdate(req.params.id, req.body, {new: true})
    .then(item => res.json({success: true, item}))
    .catch(e =>  res.json({success: false, e}))
}

module.exports = (model, modelSettings = {}) => {
  return {
    preloadById: preloadById(model, modelSettings),
    getAll: getAll(model, modelSettings),
    create: create(model, modelSettings),
    getOne: getOne(model, modelSettings),
    deleteOne: deleteOne(model, modelSettings),
    updateOne: updateOne(model, modelSettings),
  }
}