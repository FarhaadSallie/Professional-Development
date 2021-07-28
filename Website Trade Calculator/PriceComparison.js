
//blockkoins variables

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


//deposit fees
var lunoDepositFees =0.02
var valrDepositFees = 0
var BKDepositFees = 0.04

//transaction fees

var lunoTransactionFees = 0.001
var valrTransactionFees = 0.001 
var BKTransactionFees = 0 

//withdraw fees

var lunoWithdrawFees = 0.02
var valrWithdrawFees = 0.02 
var BKWithdrawFees = 0.03

// calculation variables

var customerZAR = 100000;
var customerTrades = 2;


var requestOptions = {
    method: 'GET',
    
    headers: {
      
      'Content-Type': 'application/json'
    },
    
    redirect: 'follow'
 };

  //VALR working

  function getValrBTCZAR(){
    var result1;
    fetch("https://api.valr.com/v1/public/BTCZAR/marketsummary", requestOptions)
    .then(response => response.text())
    .then(result => getResponseValrBTCZAR(result))
    .catch(error => console.log('error', error));
    
    var ValrBTCZARResult;
    function getResponseValrBTCZAR(result){
      globalThis.ValrBTCZARResult = result;
      var parsedResponse = JSON.parse(result);
      VALRBTCZARAsk = parsedResponse.askPrice;
      VALRBTCZARBid = parsedResponse.bidPrice;
      console.log('VALR: BTC',VALRBTCZARAsk, VALRBTCZARBid);
       
      //calculations
      var finalcustomerBTCValr = ((VALRBTCZARAsk/customerZAR)*(1-(valrDepositFees+(customerTrades*valrTransactionFees)+valrWithdrawFees)));
      return finalcustomerBTCValr;
    }
    return getResponseValrBTCZAR(globalThis.ValrBTCZARResult);
  }
  

  function getValrETHZAR(){
    fetch("https://api.valr.com/v1/public/ETHZAR/marketsummary", requestOptions)
      .then(response => response.text())
      .then(result => getResponseValrETHZAR(result))
      .catch(error => console.log('error', error));

    function getResponseValrETHZAR(result){//
        globalThis.ValrETHZARResult = result;
        var parsedResponse = JSON.parse(result);
        VALRETHZARAsk = parsedResponse.askPrice;
        VALRETHZARBid = parsedResponse.bidPrice;
        console.log('VALR ETH ',VALRETHZARAsk, VALRETHZARBid)
        //calculations
        var finalcustomerETHValr = ((VALRETHZARAsk/customerZAR)*(1-(valrDepositFees+(customerTrades*valrTransactionFees)+valrWithdrawFees)));
        return finalcustomerETHValr;
      }
      return getResponseValrETHZAR(globalThis.ValrETHZARResult);
    }

  function getValrXRPZAR(){
    fetch("https://api.valr.com/v1/public/XRPZAR/marketsummary", requestOptions)
    .then(response => response.text())
    .then(result => getResponseValrXRPZAR(result))
    .catch(error => console.log('error', error));

    function getResponseValrXRPZAR(result){
        globalThis.ValrXRPZARResult = result;
        var parsedResponse = JSON.parse(result);
        VALRXRPZARAsk = parsedResponse.askPrice;
        VALRXRPZARBid = parsedResponse.bidPrice;
        console.log('VALR XRP ',VALRXRPZARAsk, VALRXRPZARBid)
        //calculations
        var finalcustomerXRPValr = ((VALRXRPZARAsk/customerZAR)*(1-(valrDepositFees+(customerTrades*valrTransactionFees)+valrWithdrawFees)));
        return finalcustomerXRPValr;
    }
    return getResponseValrXRPZAR(globalThis.ValrXRPZARResult);
  }
  
//Blockkoin working

  function getBKPairs(){
    fetch("https://api.cryptosrvc.com/exchange/quotes?exchange=BLOCKKOIN", requestOptions)
    .then(response => response.text())
    .then(result => calculateBKPairs(result))
    .catch(error => console.log('error', error));
  
  
    function calculateBKPairs(result){
      
      var parsedShiftResponse = JSON.parse(result);
      for (var x in parsedShiftResponse) {
        if(parsedShiftResponse[x].pair == 'BKUSD'){
          globalThis.BKBKUSDAsk = parsedShiftResponse[x].ask;
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
   
      console.log('\nBKUSD ',globalThis.BKBKUSDAsk, BKBKUSDBid,'BTC ',BKBKBTCAsk, BKBKBTCBid,'ETH ',BKBKETHAsk,BKBKETHBid,'XRP ',BKBKXRPAsk,BKBKXRPBid);
  
      //now to get the USD transaction price
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
  
        var customerUSD = customerZAR*USDZAR;
        var BK = customerUSD/globalThis.BKBKUSDAsk;
  
        console.log((BKBKBTCBid*BK),'BTC from Blockkoin');
        console.log((BKBKETHBid*BK),'ETH from Blockkoin');
        console.log((BKBKXRPBid*BK),'XRP from Blockkoin');
  
        //calculations 
        var finalcustomerZARBlockkoin = customerZAR*(1-(BKDepositFees+(customerTrades*BKTransactionFees)+BKWithdrawFees)); //if we need the ammount of ZAR post processes
  
        var finalcustomerBTCBlockkoin = (BKBKBTCAsk*BK)*(1-(BKDepositFees+(customerTrades*BKTransactionFees)+BKWithdrawFees));
        var finalcustomerETHBlockkoin = (BKBKETHAsk*BK)*(1-(BKDepositFees+(customerTrades*BKTransactionFees)+BKWithdrawFees));
        var finalcustomerXRPBlockkoin = (BKBKXRPAsk*BK)*(1-(BKDepositFees+(customerTrades*BKTransactionFees)+BKWithdrawFees));

        console.log(finalcustomerZARBlockkoin, finalcustomerBTCBlockkoin, finalcustomerETHBlockkoin, finalcustomerXRPBlockkoin)
    }
    }
  }
  
  
  //Luno working

function getLunoBTCZAR(){
  fetch("https://api.luno.com/api/1/ticker?pair=XBTZAR", requestOptions)
  .then(response => response.text())
  .then(result => getResponseLunoBTCZAR(result))
  .catch(error => console.log('error', error));
  
  function getResponseLunoBTCZAR(result){
      globalThis.LunoBTCZARResult = result;
      var parsedResponse = JSON.parse(result);
      LunoBTCZARAsk = parsedResponse.ask;
      LunoBTCZARBid = parsedResponse.bid;
      console.log('\nLuno : BTC ',LunoBTCZARAsk, LunoBTCZARBid)

      //calculation

      var finalcustomerBTCLuno = ((LunoBTCZARAsk/customerZAR)*(1-(lunoDepositFees+(customerTrades*lunoTransactionFees)+lunoWithdrawFees)));
      return finalcustomerBTCLuno;
  }
      return getResponseLunoBTCZAR(globalThis.LunoBTCZARResult);
}
  
function getLunoETHZAR(){
  fetch("https://api.luno.com/api/1/ticker?pair=ETHZAR", requestOptions)
  .then(response => response.text())
  .then(result => getResponseLunoETHZAR(result))
  .catch(error => console.log('error', error));

  function getResponseLunoETHZAR(result){
    globalThis.LunoETHZARResult = result;
    var parsedResponse = JSON.parse(result);
    LunoETHZARAsk = parsedResponse.ask;
    LunoETHZARBid = parsedResponse.bid;
    console.log('Luno : ETH ',LunoETHZARAsk, LunoETHZARBid)

    //calculation
    var finalcustomerETHLuno = ((LunoETHZARAsk/customerZAR)*(1-(lunoDepositFees+(customerTrades*lunoTransactionFees)+lunoWithdrawFees)));
    return finalcustomerETHLuno;
  }
  return getResponseLunoETHZAR(globalThis.LunoETHZARResult);
}
  
function getLunoXRPZAR(){
  fetch("https://api.luno.com/api/1/ticker?pair=XRPZAR", requestOptions)
    .then(response => response.text())
    .then(result => getResponseLunoXRPZAR(result))
    .catch(error => console.log('error', error));

  function getResponseLunoXRPZAR(result){
    globalThis.LunoXRPZARResult = result;
      var parsedResponse = JSON.parse(result);
      LunoXRPZARAsk = parsedResponse.ask;
      LunoXRPZARBid = parsedResponse.bid;
      console.log('Luno : XRP ',LunoXRPZARAsk, LunoXRPZARBid)

      //calculation
      var finalcustomerXRPLuno = ((LunoXRPZARAsk/customerZAR)*(1-(lunoDepositFees+(customerTrades*lunoTransactionFees)+lunoWithdrawFees)))
      return finalcustomerXRPLuno;
  }
  return getResponseLunoXRPZAR(globalThis.LunoXRPZARResult);
}


//now for BK

getBKPairs();