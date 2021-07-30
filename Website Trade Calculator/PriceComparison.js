//Farhaad Sallie 18/07/2021

//Global Variables used to take in the bid ask prices for each pair from the various exchange APIs 

//blockkoins exchange variables

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

//The deposit,transaction and withdrawal fees for each exchange

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

// The amount of money in ZAR the customer would like to put into the exchange

var customerZAR = 1000000;

//The number of trades the customer is planning to make on the exchange

var customerTrades = 2;

//The type of request that are going to be made by fetch aswell as what type of content is expected back

var requestOptions = {
    method: 'GET',
    
    headers: {
      
      'Content-Type': 'application/json'
    },
    
    redirect: 'follow'
 };

  //Fetch requests and parsing of data for the VALR Exchange

  function getValrBTCZAR(){
    
    //fetch request from VALRs Exchange
    fetch("https://api.valr.com/v1/public/BTCZAR/marketsummary", requestOptions)
    .then(response => response.text())
    .then(result => getResponseValrBTCZAR(result))
    .catch(error => console.log('error', error));
    
    //Parsing the retrieved result 
    function getResponseValrBTCZAR(result){
      //Using an ES2020 method to set the result as a global variable in order to be referenced outside the function
      globalThis.ValrBTCZARResult = result;
      //parsing the retrieved response in a JSON format
      var parsedResponse = JSON.parse(result);
      //retrieving the ask and bid price for the pair 
      VALRBTCZARAsk = parsedResponse.askPrice;
      VALRBTCZARBid = parsedResponse.bidPrice;

     
       
      //calculating how much BTC the customer gets after their journey through the exchange   
      var finalcustomerBTCValr = ((VALRBTCZARAsk/customerZAR)*(1-(valrDepositFees+(customerTrades*valrTransactionFees)+valrWithdrawFees)));
      
      //calculating the amount of coin the customer gets after coming into the exchange
      var customerZARAfterDeposit = customerZAR*(1-valrDepositFees);
      var noOfBTCCoins = (customerZARAfterDeposit/VALRBTCZARBid);
    
      return noOfBTCCoins;
    }
    return getResponseValrBTCZAR(globalThis.ValrBTCZARResult);
  }
  

  function getValrETHZAR(){
    fetch("https://api.valr.com/v1/public/ETHZAR/marketsummary", requestOptions)
      .then(response => response.text())
      .then(result => getResponseValrETHZAR(result))
      .catch(error => console.log('error', error));

    function getResponseValrETHZAR(result){
        globalThis.ValrETHZARResult = result;
        var parsedResponse = JSON.parse(result);
        VALRETHZARAsk = parsedResponse.askPrice;
        VALRETHZARBid = parsedResponse.bidPrice;
        
        //calculations
        var finalcustomerETHValr = ((VALRETHZARAsk/customerZAR)*(1-(valrDepositFees+(customerTrades*valrTransactionFees)+valrWithdrawFees)));

        var customerZARAfterDeposit = customerZAR*(1-valrDepositFees); 
        var noOfETHCoins = (customerZARAfterDeposit/VALRETHZARBid);
        return noOfETHCoins;
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
        //calculations
        var finalcustomerXRPValr = ((VALRXRPZARAsk/customerZAR)*(1-(valrDepositFees+(customerTrades*valrTransactionFees)+valrWithdrawFees)));

        var customerZARAfterDeposit = customerZAR*(1-valrDepositFees);
        var noOfXRPCoins = (customerZARAfterDeposit/VALRXRPZARBid);
        return noOfXRPCoins;
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
      globalThis.calcBKPairsResult = result;
      var parsedShiftResponse = JSON.parse(result);
      for (var x in parsedShiftResponse) {
        if(parsedShiftResponse[x].pair == 'BKUSD'){
          globalThis.BKBKUSDAsk = parsedShiftResponse[x].ask;
          BKBKUSDBid = parsedShiftResponse[x].bid;
        
        } 
  
      if(parsedShiftResponse[x].pair == 'BKBTC'){
          BKBKBTCAsk = parsedShiftResponse[x].ask;
          globalThis.BKBKBTCBid = parsedShiftResponse[x].bid;
        } 
      if(parsedShiftResponse[x].pair == 'BKETH'){
          BKBKETHAsk = parsedShiftResponse[x].ask;
          globalThis.BKBKETHBid = parsedShiftResponse[x].bid;
        }
        if(parsedShiftResponse[x].pair == 'BKXRP'){
          BKBKXRPAsk = parsedShiftResponse[x].ask;
          globalThis.BKBKXRPBid = parsedShiftResponse[x].bid;
        }
      }
   
      //console.log('\nBKUSD ',globalThis.BKBKUSDAsk, BKBKUSDBid,'BTC ',BKBKBTCAsk, BKBKBTCBid,'ETH ',BKBKETHAsk,BKBKETHBid,'XRP ',BKBKXRPAsk,BKBKXRPBid);
  
      //now to get the USD transaction price
      fetch("https://v6.exchangerate-api.com/v6/016cf99ebf10c90a2ca3333d/latest/USD", requestOptions)
      .then(response => response.text())
      .then(result => getResponseR1(result))
      .catch(error => console.log('error', error));
  
    function getResponseR1(result){
        globalThis.R1Result = result;
        var parsedResponse = JSON.parse(result);
        var conversionrates = parsedResponse.conversion_rates;
        ZARUSD = conversionrates.ZAR;
        USDZAR = 1/ZARUSD;
        console.log('Conversion Rate ', USDZAR);
  
        var customerUSD = customerZAR*USDZAR;
        var BK = customerUSD/globalThis.BKBKUSDAsk;
  
        //console.log((BKBKBTCBid*BK),'BTC from Blockkoin');
        //console.log((BKBKETHBid*BK),'ETH from Blockkoin');
        //console.log((BKBKXRPBid*BK),'XRP from Blockkoin');
  
        //calculations 
        var finalcustomerZARBlockkoin = customerZAR*(1-(BKDepositFees+(customerTrades*BKTransactionFees)+BKWithdrawFees)); //if we need the amount of ZAR post processes
  
        var finalcustomerBTCBlockkoin = (BKBKBTCAsk*BK)*(1-(BKDepositFees+(customerTrades*BKTransactionFees)+BKWithdrawFees));
        var finalcustomerETHBlockkoin = (BKBKETHAsk*BK)*(1-(BKDepositFees+(customerTrades*BKTransactionFees)+BKWithdrawFees));
        var finalcustomerXRPBlockkoin = (BKBKXRPAsk*BK)*(1-(BKDepositFees+(customerTrades*BKTransactionFees)+BKWithdrawFees));

        //console.log(finalcustomerZARBlockkoin, finalcustomerBTCBlockkoin, finalcustomerETHBlockkoin, finalcustomerXRPBlockkoin)
        var customerZARAfterDeposit = customerZAR*(1-BKDepositFees);
        var customerUSDAfterDeposit = customerZARAfterDeposit*USDZAR;
        var BKAfterDeposit = customerUSDAfterDeposit/globalThis.BKBKUSDAsk;

        var noOfBTCCoins = (BKAfterDeposit*globalThis.BKBKBTCBid);
        //console.log('BTC Coins',noOfBTCCoins);
        var noOfETHCoins = (BKAfterDeposit*globalThis.BKBKETHBid);
        //console.log('ETH Coins',noOfETHCoins);
        var noOfXRPCoins = (BKAfterDeposit*globalThis.BKBKXRPBid);
        //console.log('XRP Coins',noOfXRPCoins);

        var bkkoins = [noOfBTCCoins, noOfETHCoins, noOfXRPCoins]
        return bkkoins;
      }
      return getResponseR1(globalThis.R1Result);
    }
    return calculateBKPairs(globalThis.calcBKPairsResult);
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

      //calculation

      var finalcustomerBTCLuno = ((LunoBTCZARAsk/customerZAR)*(1-(lunoDepositFees+(customerTrades*lunoTransactionFees)+lunoWithdrawFees)));

      var customerZARAfterDeposit = customerZAR*(1-lunoDepositFees);
      var noOfBTCCoins = (customerZARAfterDeposit/LunoBTCZARBid);

      return noOfBTCCoins;
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

    //calculation
    var finalcustomerETHLuno = ((LunoETHZARAsk/customerZAR)*(1-(lunoDepositFees+(customerTrades*lunoTransactionFees)+lunoWithdrawFees)));

    var customerZARAfterDeposit = customerZAR*(1-lunoDepositFees);
    var noOfETHCoins = (customerZARAfterDeposit/LunoETHZARBid);

    return noOfETHCoins;
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
      //calculation
      var finalcustomerXRPLuno = ((LunoXRPZARAsk/customerZAR)*(1-(lunoDepositFees+(customerTrades*lunoTransactionFees)+lunoWithdrawFees)))

      var customerZARAfterDeposit = customerZAR*(1-lunoDepositFees);
      var noOfXRPCoins = (customerZARAfterDeposit/LunoXRPZARBid);

      return noOfXRPCoins;
  }
  return getResponseLunoXRPZAR(globalThis.LunoXRPZARResult);
}

var test = getValrBTCZAR();
console.log('VALRBTC',test);

var test1 = getValrETHZAR();
console.log('VALRETH',test1);

var test2 = getValrXRPZAR();
console.log('VALRXRP',test2);

var test3 = getLunoBTCZAR();
console.log('LunoBTC',test3);

var test4 = getLunoETHZAR();
console.log('LunoETH',test4);

var test5 = getLunoXRPZAR();
console.log('LunoXRP',test5);

var test6 = getBKPairs();
console.log('BkBTC',test6[0],'BkETH',test6[1],'BkXRP',test6[2]);