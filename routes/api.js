const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  let convertHandler = new ConvertHandler();

  app.route('/api/convert')
    .get(function (req, res) {
      let input = req.query.input;

      // Ottieni il numero iniziale e l'unità iniziale
      let initNum = convertHandler.getNum(input);
      let initUnit = convertHandler.getUnit(input);

      // Gestione errori: invalid number e invalid unit
      if (initNum === 'Invalid Number' && initUnit === 'Invalid Unit') {
        return res.json({ error: 'invalid number and unit' }); // Interrompi qui
      }
      if (initNum === 'Invalid Number') {
        return res.json({ error: 'invalid number' }); // Interrompi qui
      }
      if (initUnit === 'Invalid Unit') {
        return res.json({ error: 'invalid unit' }); // Interrompi qui
      }

      // Conversione (solo se non ci sono errori)
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
      });
    });
};
