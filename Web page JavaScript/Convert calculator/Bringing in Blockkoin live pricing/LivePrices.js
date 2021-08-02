
let BKUSDAskPrice 
let BKUSDBidPrice 
let BKUSDPrice

const fetch = require('node-fetch');



export function getBKLivePrice(){
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
			BKUSDPrice = BKUSDPriceSum/2;
			console.log(BKUSDPrice);
			//now need to get this price to the web page variable
			}
		}
	}
}