$(document).ready(function() {

    $('#amount').keyup(function() {

      convertCurrency();
      
      });
    $("#from").click(function(){convertCurrency();})
    $("#to").click(function(){convertCurrency();})
      function convertCurrency() {
        var amount = $('#amount').val();
        var fromCurrency = $('#from').val();
        var toCurrency = $('#to').val();
        if(amount<=0 || fromCurrency===toCurrency){

            $('#result').html('<div class="alert alert-danger">Error converting currency.</div>');
            
    
          }
          else{

            var url = 'https://v6.exchangerate-api.com/v6/bbb0e961587c9229c299ff76/latest/' + fromCurrency;
            $.ajax({
            url: url,
            type: 'GET',
            success: function(response) {
            var rate = response.conversion_rates[toCurrency];
            var convertedAmount = amount * rate;
            
            var resultText = convertedAmount.toFixed(2) + ' ' + toCurrency;
            $('#result').html('<div class="alert alert-success">' + resultText + '</div>');
            },
            error: function() {
            $('#result').html('<div class="alert alert-danger">Error converting currency.</div>');
            }
            });
    
          }
        
      }
       //swap
       $('#swap').click(function() {
      var fromCurrency = $('#from').val();
      var toCurrency = $('#to').val();
      
      // Swap currencie
      $('#from').val(toCurrency);
      $('#to').val(fromCurrency);
      convertCurrency();
      
        });
      });