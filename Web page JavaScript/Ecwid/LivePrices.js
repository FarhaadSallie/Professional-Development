let BKBTCAskPrice 
let BKETHAskPrice 
let BKLockedUSDAskPrice 
let BKXRPAskPrice 
let BKUSDAskPrice 

let BKBTCBidPrice 
let BKETHBidPrice 
let BKLockedUSDBidPrice 
let BKXRPBidPrice 
let BKUSDBidPrice 

let BKBTCPrice 
let BKEthPrice 
let BKLockedUSDPrice 
let BKXRPPrice 
let BKUSDPrice

const fetch = require('node-fetch');
import {getSecret} from 'wix-secrets-backend';
const mySecret =  getSecret("ecwid_market_api_secret");

//var $window = $(window);
//window.$ = window.jQuery = require('jquery');
//var $ = require('jquery')(require("jsdom").jsdom().parentWindow);



export function getLivePrices(){
    var requestOptions = {
  method: 'GET',
  redirect: 'follow'
};

fetch("https://api.cryptosrvc.com/exchange/quotes?exchange=BLOCKKOIN", requestOptions)
  .then(response => response.text())
  .then(result => getResponse(result))
  .catch(error => console.log('error', error));

function getResponse(result){
	const shiftResponse = result;
	const parsedShiftResponse = JSON.parse(result);
	for (const x in parsedShiftResponse) {
         if(parsedShiftResponse[x].pair == 'BKUSD'){


		BKUSDAskPrice = parsedShiftResponse[x].ask;
		BKUSDBidPrice = parsedShiftResponse[x].bid;
		var BKUSDPriceSum = parseFloat(BKUSDAskPrice)+parseFloat(BKUSDBidPrice);
		BKUSDPrice = parseFloat(BKUSDAskPrice);
		console.log(BKUSDPrice);
		console.log("Blockkoin USD successful")
		const url = "https://app.ecwid.com/api/v3/57768062/products/371570176?token="+mySecret;
		fetch(url, {
    			method : "PUT",
   			headers: {
      				'Content-Type': 'application/json'
    			},
    			body : JSON.stringify({
         		price:+BKUSDPrice 
     			})
			})


		const url2 = "https://app.ecwid.com/api/v3/57768062/products/336962605?token="+mySecret;
		fetch(url2, {
    			method : "PUT",
   		headers: {
      			'Content-Type': 'application/json'
    			},
    		body : JSON.stringify({
         		price:+BKUSDPrice 
     		})
		})
		
		//BKLockedPrice not taken from the BKLockedPrice Graph on the Exchange
		
		BKLockedUSDAskPrice = parsedShiftResponse[x].ask;
		BKLockedUSDBidPrice = parsedShiftResponse[x].bid;
		var BKLockedUSDPriceSum = parseFloat(BKUSDAskPrice)+parseFloat(BKUSDBidPrice);
		BKLockedUSDPrice = parseFloat(0.7*BKLockedUSDAskPrice);
		console.log(BKLockedUSDPrice);
		console.log("Blockkoin USD Locked successful")
		const url3 = "https://app.ecwid.com/api/v3/57768062/products/337336090?token="+mySecret;
		fetch(url3, {
    			method : "PUT",
   			headers: {
      				'Content-Type': 'application/json'
    				},
    			body : JSON.stringify({
         		price:+BKLockedUSDPrice  
     			})
			})


		} 

	 if(parsedShiftResponse[x].pair == 'BKBTC'){
		BKBTCAskPrice = parsedShiftResponse[x].ask;
		BKBTCBidPrice = parsedShiftResponse[x].bid;
		var BKBTCPriceSum = parseFloat(BKBTCAskPrice)+parseFloat(BKBTCBidPrice);
		BKBTCPrice = parseFloat(BKBTCPriceSum/2);
		
		const url = "https://app.ecwid.com/api/v3/57768062/products/371572286?token="+mySecret;
		fetch(url, {
    			method : "PUT",
   		headers: {
      			'Content-Type': 'application/json'
    			},
    		body : JSON.stringify({
         		price:+BKBTCPrice 
     		})
		})
		} 

         if(parsedShiftResponse[x].pair == 'BK-LOCKEDUSD'){
		
		
		} 
	 if(parsedShiftResponse[x].pair == 'BKETH'){
		BKETHAskPrice = parsedShiftResponse[x].ask;
		BKETHBidPrice = parsedShiftResponse[x].bid;
		var BKEthPriceSum = parseFloat(BKETHAskPrice)+parseFloat(BKETHBidPrice);
		BKEthPrice = parseFloat(BKEthPriceSum/2);
		const url = "https://app.ecwid.com/api/v3/57768062/products/371564968?token="+mySecret;
		fetch(url, {
    		method : "PUT",
   		headers: {
      		'Content-Type': 'application/json'
    		},
    		body : JSON.stringify({
         	price:+BKEthPrice 
     		})
		})
		} 
	 if(parsedShiftResponse[x].pair == 'BKXRP'){
		BKXRPAskPrice = parsedShiftResponse[x].ask;
		BKXRPBidPrice = parsedShiftResponse[x].bid;
		var BKXRPPriceSum = parseFloat(BKXRPAskPrice)+parseFloat(BKXRPBidPrice);
		BKXRPPrice = parseFloat(BKXRPPriceSum/2);
		const url = "https://app.ecwid.com/api/v3/57768062/products/371575299?token="+mySecret;
		fetch(url, {
    			method : "PUT",
   			headers: {
      			'Content-Type': 'application/json'
    			},
    			body : JSON.stringify({
         		price:+BKXRPPrice 
     			})
			})
		} 
		}	
}

}