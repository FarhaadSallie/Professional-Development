import requests
import json
import numpy as np
import pandas as pd
import openpyxl
import sched, time
import os
from twisted.internet import task, reactor
import math
import time

def clientAccessAndRefreshToken() : #working
    url = "https://api.cryptosrvc.com/authentication/user_authentication/exchangeToken"

    payload = "{\n\tusername: \"Farhaad.Sallie@blockkoin.io\",\n\tpassword: \"15081998FarhaadSallie!\",\n\ttwoFACode: \"\",\n\texchange: \"BLOCKKOIN\"\n}"
    headers = {
        'Content-Type': 'application/json'
    }

    response = requests.request("POST", url, headers=headers, data=payload)
    jsonResponse = response.json()
    global accessToken
    global refreshToken
    accessToken = jsonResponse["client_access_token"]
    refreshToken = jsonResponse["client_refresh_token"]
    print("Client and Refresh code generated")

def placeNewOrder(): #complete
    milliseconds = int(round(time.time() * 1000))+(int(BurnRate)*1000)

    url = "https://api.cryptosrvc.com/trade/order"

    payload = '{"instrument": "BKBTC","type":"limit", "side":"'+str(ActionBKBTC)+'","quantity":"'+str(Quantity)+'","limit_price":"'+str(BKBTC)+'","time_in_force":"gtd","expire_time":"'+str(milliseconds)+'"}'
    headers = {
    'Authorization': 'Bearer '+str(accessToken)
    }

    response = requests.request("POST", url, headers=headers, data=payload)
    print(response.text)
    print("BKBTC ",str(ActionBKBTC)," order made")
#excel import time

def fetchValues():
    try:
        path = "C:\\Users\\Admin01\\Desktop\\Production.xlsm"
        wb_obj = openpyxl.load_workbook(path, data_only = True)
        sheet_obj = wb_obj.active;
        
        #order parameters
        global Quantity
        global TradeRate
        global BurnRate #seconds so have to multiply 1000
        global ActionBKBTC #buy or sell lower case
        global ActionBKETH #buy or sell lower case
        global ActionBKXRP #buy or sell lower case
        global ActionBKUSD #buy or sell lower case
        global BKBTC
        global BKETH
        global BKXRP
        global BKBK
        global BKUSD
        
    
        Quantity = math.floor(sheet_obj['G19'].value)
        TradeRate = format(sheet_obj['I13'].value)
        ActionBKBTC = format(sheet_obj['F19'].value)
        ActionBKETH = format(sheet_obj['F20'].value)
        ActionBKXRP = format(sheet_obj['F21'].value)
        ActionBKUSD = format(sheet_obj['F22'].value)
        
        BurnRate = format(sheet_obj['H13'].value)
        BKBTC = format(sheet_obj['H19'].value,'.8f')
        BKETH = format(sheet_obj['H20'].value,'.8f')
        BKXRP = format(sheet_obj['H21'].value,'.8f')
        BKUSD = format(sheet_obj['H22'].value,'.8f')
        
        #print('\n Quantity: ',str( Quantity),'\nBKBTC: ',str(BKBTC),'\nBKETH: ',str(BKETH),'\nBKXRP: ',str(BKXRP),'\nBKBK: ',str(BKBK),'\nBKUSD: '+str(BKUSD))
        print('Excel values gotten')
    except:
        botActivation()
    
def getExcelValues():
    excelValuesRefreshTimer = 10.0 
    eVRT = task.LoopingCall(fetchValues)
    eVRT.start(excelValuesRefreshTimer) # call every five seconds
    reactor.run
    print('Excel values gotten')
    
def botActivation():
    # makes sure that the access token for the account is always refreshed
    clientAccessAndRefreshToken()
    #gets the live values from the Excel spreadsheet
    fetchValues()
    #places the order on the exchange
    placeNewOrder()
    #executes this function according to excel sheet
    time.sleep(int(TradeRate))
while True:
    try: 
        botActivation()
    except Exception as e:
        with open('Error.txt', 'a') as f:
            #getting current time for logging the error
            now = datetime.now()
            current_time = now.strftime("%H:%M:%S")
            today = date.today()
            d1 = today.strftime("%d/%m/%Y")
            f.write('\n BKLockedUSD Error at',d1,current_time,'\nError:',str(e.args))

    
