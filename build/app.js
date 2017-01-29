(function() {
  'use strict';
  module.exports = function(ndx) {
    return ndx.app.post('/api/database/exec', ndx.authenticate('superadmin'), function(req, res) {
      var notCritical, output, props, sql;
      sql = '';
      if (req.body.sql) {
        sql = req.body.sql;
      }
      props = [];
      if (req.body.props) {
        try {
          props = JSON.parse(req.body.props);
        } catch (undefined) {}
      }
      notCritical = false;
      if (req.body.notCritical) {
        notCritical = req.body.notCritical;
      }
      if (sql && props) {
        output = ndx.database.exec(sql, props, notCritical);
        return res.json(output);
      } else {
        return res.json({
          error: 'bad command'
        });
      }
    });
  };

}).call(this);

//# sourceMappingURL=app.js.map
