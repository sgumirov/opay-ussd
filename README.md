# OPay USSD

This is a demo USSD service for OPay service based on API of
[Eyeline](https://eyeline.mobi/) [GlobalUSSD](https://globalussd.com/) platform.

## Menu hierarchy

```
Start -> 
  Airtime (inputs phone number) -> 
  Amount (selects or Other amount) -> [Other (enters amount)] -> 
  Payment (selects type of payment: M-Pesa(+)|Airtel|Card) -> 
  M-Pesa (manual payment) - user closes dialog.
Start again -> 
  Transaction confirmation
```

## USSD screen example (this is service start)

```
Welcome to OPay!
1> Airtime
2> Send money
3> Generate OTP
4> My Balance
```

## How to run

To get and run:

```bash
git clone https://github.com/sgumirov/opay-ussd.git
cd opay-ussd
npm ci
npm start
```

This makes service uses default `3000` port on ipv4 Localhost. So better to use nginx or change
listening address to 0.0.0.0 by changing line in `package.json`:
```
    "start": "micro -H 127.0.0.1 index.js"
```
to:
```
    "start": "micro -H 0.0.0.0 index.js"
```

# Dependencies

Built on top of [micro](https://github.com/zeit/micro "micro") microservice framework.

# Author

Shamil Gumirov, 2017-2019.

Disclaimer: I'm first PM of GlobalUSSD (aka SADS) project (started circa 2005).
Feel free to reach me if you have questions.

# License

As-is. No warranties, no support obligations.
