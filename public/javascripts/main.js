/*
  Script by Edilson Fernando Gonzalez
  @efgm1024
*/

$(document).ready(function() {
  // Returns a random integer between min (included) and max (excluded)
  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }
  
  function getRandomString(length) {
    var randomString = "";
    for (var i = 0; i < length; i++) {
      randomString += String.fromCharCode(getRandomInt(65, 91));
    }
    return randomString;
  }
  
  function caesarCipher(plainText, shift) {
    console.log(plainText);
    var cipherString = "";
    var alphabet = [];
    
    for (var i = 0; i < 26; i++) {
      alphabet[i] = String.fromCharCode(65 + i);
    }
    
    for (var j = 0; j < plainText.length; j++) {
      var currentCharacterNumber = plainText.charCodeAt(j);
      cipherString += alphabet[(currentCharacterNumber - 65 + shift) % 26]
    }
    
    return cipherString;
  }
  
  function analizeCipherString(cipherString) {
    var alphabet = {};
    for (var i = 0; i < 26; i++) {
      alphabet[String.fromCharCode(65 + i)] = 0;
    } 
    
    for (var j = 0; j < cipherString.length; j++) {
      alphabet[cipherString.charAt(j)]++;
    }
    
    return alphabet;
  }
  
  var $plainText = "";
  
  $('#general_parameters').on('submit', function(e) {
    e.preventDefault();
    
    if (parseInt($('#string_length').val()) < 0 || $('#string_length').val() === '') {
      alert('Check string length.');
      return false;
    }
    
    $plainText = getRandomString(parseInt($('#string_length').val()))
    
    return false;
  });
  
  $('#caesar_cipher_form').on('submit', function(e) {
    e.preventDefault();
    
    if ($('#caesar_cipher_shift').val() < 0 || $('#caesar_cipher_shift').val() === '') {
      alert('Check shift value.')
      return false;
    }
    
    if ($plainText === '') {
      alert('Check string value.')
      return false;
    }
    
    var cipherString = caesarCipher($plainText, parseInt($('#caesar_cipher_shift').val()));
    console.log(cipherString);
    var frequency = analizeCipherString(cipherString);
    
    var values = []
    for (var key in frequency)
      values.push(frequency[key]);
    
    
    var data = {
        labels: Object.keys(frequency),
        datasets: [
            {
                label: "Caesar Cipher",
                fillColor: "rgba(220,220,220,0.5)",
                strokeColor: "rgba(220,220,220,0.8)",
                highlightFill: "rgba(220,220,220,0.75)",
                highlightStroke: "rgba(220,220,220,1)",
                data: values
            }
        ]
    };
    
    
    var $caesar_context = $('#caesar_chart').get(0).getContext('2d');
    var $caesar_chart = new Chart($caesar_context).Bar(data);
    
    return false;
  });
  
  $('#playfair_cipher_form').on('submit', function(e) {
    e.preventDefault();
    if (!(/^[a-z]+$/.test($('#playfair_cipher_key').val()))) {
      alert("Check key.");
      return false;
    }
    
    if ($plainText === '') {
      alert('Check string value.');
      return false;
    }
    
    var cipherString = Playfair(1, $plainText, "L", "N", $('#playfair_cipher_key').val(), 0x01);
    var frequency = analizeCipherString(cipherString);
    
    var values = []
    for (var key in frequency)
      values.push(frequency[key]);
    
    
    var data = {
        labels: Object.keys(frequency),
        datasets: [
            {
                label: "Playfair Cipher",
                fillColor: "rgba(220,220,220,0.5)",
                strokeColor: "rgba(220,220,220,0.8)",
                highlightFill: "rgba(220,220,220,0.75)",
                highlightStroke: "rgba(220,220,220,1)",
                data: values
            }
        ]
    };
    
    var $playfair_context = $('#playfair_chart').get(0).getContext('2d');
    var $playfair_chart = new Chart($playfair_context).Bar(data);
    
    return false;
  });
  
  
  
});