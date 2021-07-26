//blockkoins variables
var BKBTCZARAsk
var BKBTCZARBid

var BKBKBTCAsk
var BKBKBTCBid

var BKBKUSDAsk
var BKBKUSDBid

var BKBKETHAsk
var BKBKETHBid

var BKBKXRPAsk
var BKBKXRPBid

//VALRs variables
var VALRBTCZARAsk
var VALRBTCZARBid

var VALRETHZARAsk
var VALRETHZARBid

var VALRXRPZARAsk
var VALRXRPZARBid

//Lunos variables
var LunoBTCZARAsk
var LunoBTCZARBid

var LunoETHZARAsk
var LunoETHZARBid

var LunoXRPZARAsk
var LunoXRPZARBid

//Money conversion

var USDZAR
var ZARUSD 

//actual calculation variable

var customerZAR = 100000







//VALR working

var requestOptions = {
    method: 'GET',
    
    headers: {
      
      'Content-Type': 'application/json'
    },
    
    redirect: 'follow'
 };


function getValrPairs(){
  fetch("https://api.valr.com/v1/public/BTCZAR/marketsummary", requestOptions)
  .then(response => response.text())
  .then(result => getResponseV1(result))
  .catch(error => console.log('error', error));

  function getResponseV1(result){
      var parsedResponse = JSON.parse(result);
      VALRBTCZARAsk = parsedResponse.askPrice;
      VALRBTCZARBid = parsedResponse.bidPrice;
      console.log('VALR: BTC ',VALRBTCZARAsk, VALRBTCZARBid)
  }


  fetch("https://api.valr.com/v1/public/ETHZAR/marketsummary", requestOptions)
    .then(response => response.text())
    .then(result => getResponseV2(result))
    .catch(error => console.log('error', error));

  function getResponseV2(result){//
      var parsedResponse = JSON.parse(result);
    VALRETHZARAsk = parsedResponse.askPrice;
    VALRETHZARBid = parsedResponse.bidPrice;
      console.log('VALR ETH ',VALRETHZARAsk, VALRETHZARBid)
    }


  fetch("https://api.valr.com/v1/public/XRPZAR/marketsummary", requestOptions)
    .then(response => response.text())
    .then(result => getResponseV3(result))
    .catch(error => console.log('error', error));

  function getResponseV3(result){
      var parsedResponse = JSON.parse(result);
      VALRXRPZARAsk = parsedResponse.askPrice;
      VALRXRPZARBid = parsedResponse.bidPrice;
      console.log('VALR XRP ',VALRXRPZARAsk, VALRXRPZARBid)
  }
  
}





//Blockkoin working

function getBKPairs(){
  fetch("https://api.cryptosrvc.com/exchange/quotes?exchange=BLOCKKOIN", requestOptions)
  .then(response => response.text())
  .then(result => getResponse(result))
  .catch(error => console.log('error', error));


  function getResponse(result){
    var shiftResponse = result;
    var parsedShiftResponse = JSON.parse(result);
    for (var x in parsedShiftResponse) {
      if(parsedShiftResponse[x].pair == 'BKUSD'){
        BKBKUSDAsk = parsedShiftResponse[x].ask;
        BKBKUSDBid = parsedShiftResponse[x].bid;
      
      } 

    if(parsedShiftResponse[x].pair == 'BKBTC'){
        BKBKBTCAsk = parsedShiftResponse[x].ask;
        BKBKBTCBid = parsedShiftResponse[x].bid;
      } 
    if(parsedShiftResponse[x].pair == 'BKETH'){
        BKBKETHAsk = parsedShiftResponse[x].ask;
        BKBKETHBid = parsedShiftResponse[x].bid;
      }
      if(parsedShiftResponse[x].pair == 'BKXRP'){
        BKBKXRPAsk = parsedShiftResponse[x].ask;
        BKBKXRPBid = parsedShiftResponse[x].bid;
      }
    }
    console.log('\nBKUSD ',BKBKUSDAsk, BKBKUSDBid,'BTC ',BKBKBTCAsk, BKBKBTCBid,'ETH ',BKBKETHAsk,BKBKETHBid,'XRP ',BKBKXRPAsk,BKBKXRPBid);
    outputBKPairs(BKBKUSDBid, BKBKBTCBid, BKBKETHBid, BKBKXRPBid, customerZAR)
  }
  
  
}


//Luno working
function getLunoPairs(){
  fetch("https://api.luno.com/api/1/ticker?pair=XBTZAR", requestOptions)
  .then(response => response.text())
  .then(result => getResponseL1(result))
  .catch(error => console.log('error', error));

  function getResponseL1(result){
      var parsedResponse = JSON.parse(result);
      LunoBTCZARAsk = parsedResponse.ask;
      LunoBTCZARBid = parsedResponse.bid;
      console.log('\nLuno : BTC ',LunoBTCZARAsk, LunoBTCZARBid)
  }

  fetch("https://api.luno.com/api/1/ticker?pair=ETHZAR", requestOptions)
    .then(response => response.text())
    .then(result => getResponseL2(result))
    .catch(error => console.log('error', error));

  function getResponseL2(result){
      var parsedResponse = JSON.parse(result);
      LunoETHZARAsk = parsedResponse.ask;
      LunoETHZARBid = parsedResponse.bid;
      console.log('Luno : ETH ',LunoETHZARAsk, LunoETHZARBid)
  }

  fetch("https://api.luno.com/api/1/ticker?pair=XRPZAR", requestOptions)
    .then(response => response.text())
    .then(result => getResponseL3(result))
    .catch(error => console.log('error', error));

  function getResponseL3(result){
      var parsedResponse = JSON.parse(result);
      LunoXRPZARAsk = parsedResponse.ask;
      LunoXRPZARBid = parsedResponse.bid;
      console.log('Luno : XRP ',LunoXRPZARAsk, LunoXRPZARBid)
  }
  outputLunoPairs(LunoBTCZARBid, LunoETHZARBid, LunoXRPZARBid, customerZAR)
}

//calculation


//sorts out straight forward pairs
function outputLunoPairs(LunoBTCZAR,LunoETHZAR,LunoXRPZAR, customerZAR){
  console.log((LunoBTCZAR/customerZAR),'BTC from Luno');
  console.log((LunoETHZAR/customerZAR),'ETH from Luno');
  console.log((LunoXRPZAR/customerZAR),'XRP from Luno');
}

function outputValrPairs(VALRBTCZAR, VALRETHZAR, VALRXRPZAR, customerZAR){
  console.log((VALRBTCZAR/customerZAR),'BTC from VALR');
  console.log((VALRETHZAR/customerZAR),'ETH from VALR');
  console.log((VALRXRPZAR/customerZAR),'XRP from VALR'); 
}


//now for BK
function outputBKPairs(BKBKUSD, BKBKBTC, BKBKETH, BKBKXRP, customerZAR){
  

  //USD ZAR conversion rate

  fetch("https://v6.exchangerate-api.com/v6/016cf99ebf10c90a2ca3333d/latest/USD", requestOptions)
    .then(response => response.text())
    .then(result => getResponseR1(result))
    .catch(error => console.log('error', error));

  function getResponseR1(result){
      var parsedResponse = JSON.parse(result);
      var conversionrates = parsedResponse.conversion_rates;
      ZARUSD = conversionrates.ZAR;
      USDZAR = 1/ZARUSD;
      console.log('Conversion Rate ', USDZAR);
  }

  var customerUSD = customerZAR*USDZAR;
  var BK = customerUSD/BKBKUSD;
  
  console.log((BKBKBTC*BK),'BTC from Blockkoin');
  console.log((BKBKETH*BK),'ETH from Blockkoin');
  console.log((BKBKXRP*BK),'XRP from Blockkoin');
}

getBKPairs();
getValrPairs();
outputValrPairs(VALRBTCZARBid, VALRETHZARBid, VALRXRPZARBid, customerZAR);
getLunoPairs();