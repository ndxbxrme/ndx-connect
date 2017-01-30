'use strict'

module.exports = (ndx) ->
  ndx.app.post '/api/database/exec', ndx.authenticate('superadmin'), (req, res) ->
    sql = ''
    if req.body.sql
      sql = req.body.sql
    props = []
    if req.body.props
      try
        props = JSON.parse req.body.props
    notCritical = false
    if req.body.notCritical
      notCritical = req.body.notCritical
    if sql and props
      output = ndx.database.exec sql, props, notCritical
      res.json output
    else
      throw 'bad command'