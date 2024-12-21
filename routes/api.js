const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  let convertHandler = new ConvertHandler();

  app.route('/api/convert')
    .get(function (req, res) {
      let input = req.query.input;
      let initNum = convertHandler.getNum(input);
      let initUnit = convertHandler.getUnit(input);

      // Gestione errori
      if (initNum === 'Invalid Number' && initUnit === 'Invalid Unit') {
        return res.json({ error: 'invalid number and unit' }); // Usare res.json
      } 
      if (initNum === 'Invalid Number') {
        return res.json({ error: 'invalid number' }); // Usare res.json
      } 
      if (initUnit === 'Invalid Unit') {
        return res.json({ error: 'invalid unit' }); // Usare res.json
      }

      // Conversione
      let returnNum = convertHandler.convert(initNum, initUnit);
      let returnUnit = convertHandler.getReturnUnit(initUnit);
      let string = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);

      // Risposta valida
      res.json({
        initNum,
        initUnit,
        returnNum,
        returnUnit,
        string
      }); // Usare res.json
    });
};
