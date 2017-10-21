const create = (model, modelSettings) => (req, res) => {
  model.create(req.body)
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
  let promise = model.find({})

  if (modelSettings.populate) {
    modelSettings.populate.forEach(path => {
      promise = promise.populate(path)
    })
  }

  promise.then(items => res.json({success: true, items}))
    .catch(e =>  res.json({success: false, e}))
}

module.exports = (model, modelSettings = {}) => {
  return {
    getAll: getAll(model, modelSettings),
    create: create(model, modelSettings)
  }
}