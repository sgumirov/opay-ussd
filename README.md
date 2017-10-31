# OPay USSD

This is a demo USSD service for OPay based on SADS subsystem of Eyeline MiniApps platform.

## Pages

Start -> 
  Airtime (inputs phone number) -> 
  Amount (selects or Other amount) -> [Other (enters amount)] -> 
  Payment (selects type of payment: M-Pesa(+)|Airtel|Card) -> 
  M-Pesa (manual payment) - user closes dialog.
Start again -> 
  Transaction confirmation

## How to start

To get and start service behind local nginx:

```bash
git clone https://github.com/sgumirov/opay-ussd
cd opay-ussd
npm install
npm install -g micro
npm start
```