/**
 * @NApiVersion 2.x
 * @NScriptType UserEventScript
 */

define(['N/currentRecord'], function (currentRecord) {

  function numberToWords(amount) {
  // Define arrays of words to use in the conversion
  var ones = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten',              'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
  var tens = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
  var thousands = ['', 'thousand', 'million', 'billion', 'trillion'];

  // Convert the number to a string and split it into groups of three digits
  var numString = String(amount);
  var groups = [];
  while (numString.length > 0) {
    groups.unshift(numString.slice(-3));
    numString = numString.slice(0, -3);
  }

  // Convert each group of three digits to words
  var words = '';
  for (var i = 0; i < groups.length; i++) {
    var group = parseInt(groups[i]);

    if (group > 0) {
      var hundreds = Math.floor(group / 100);
      var tensAndOnes = group % 100;

      if (hundreds > 0) {
        words += ones[hundreds] + ' hundred ';
      }

      if (tensAndOnes > 0) {
        if (tensAndOnes < 20) {
          words += ones[tensAndOnes];
        } else {
          var tensDigit = Math.floor(tensAndOnes / 10);
          var onesDigit = tensAndOnes % 10;
          words += tens[tensDigit] + ' ';
          if (onesDigit > 0) {
            words += ones[onesDigit];
          }
        }
      }

      if (i < thousands.length && group > 0) {
        words += thousands[i] + ' ';
      }
    }
  }

  return words.trim();
}
  function beforeSubmit(context) {
    var currentRec = context.newRecord;
      
    if (currentRec.getValue('usertotal')) {
      // Get the value of the number field
      var numberValue = currentRec.getValue({
        fieldId: 'usertotal'
      });
      log.debug({
        title: "numberValue: ",
        details: numberValue
     });
        
      // Convert the number to words
      var wordsValue = numberToWords(numberValue);
      
      // Set the value of the words field
      currentRec.setValue({
        fieldId: 'custbody3',
        value: wordsValue
      });
      log.debug({
        title: "wordsValue: ",
        details: wordsValue
     });
    }
  }

  return {
    beforeSubmit: beforeSubmit
  };
});
