# USSD DEMO

This is a demo USSD service for OPay service based on
[Eyeline](https://eyeline.mobi/) [GlobalUSSD](https://globalussd.com/) platform API.

**NOTE:** The author is currently not affiliated with any of: Opera Software, OPay, Eyeline Inc, GlobalUSSD project, SADS project.

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

To download, please clone it from github:

```bash
git clone https://github.com/sgumirov/opay-ussd.git
cd opay-ussd
```

There are two options:
- Local run (requires NodeJS v16)
- Dockerized run (obviously, requires only Docker)

### Local run

```
npm ci
npm start
```

This makes service uses default `3000` port on ipv4 Localhost. So better to use nginx or change
listening address to 0.0.0.0 by changing line in `package.json`:
```
    "start": "micro -l tcp://127.0.0.1:3000 index.js"
```
to (by default the endpoint is: `0.0.0.0:3000`):
```
    "start": "micro index.js"
```

### Dockerized run

```
docker build . -t opay-ussd
docker run -p 3000:3000 opay-ussd
```

## Usage

This service is designed to emulate GlobalUSSD USSD service. It can also work with Android GlobalUSSD emulator.

Example of manual request and response, just to give some perspective (note `index.xml` in url, can also query other mentioned xmls from response):

```
$ curl http://127.0.0.1:3000/index.xml
<page version="2.0">
    <div protocol="ussd">
Welcome to OPay.
    </div>
    <navigation>
        <link accesskey="1" pageId="pin-airtime.xml">Airtime</link>
        <link accesskey="2" pageId="pin-send.xml">Send money</link>
        <link accesskey="3" pageId="otp.xml">Generate OTP</link>
        <link accesskey="4" pageId="pin-balance.xml">My Balance</link>
    </navigation>
</page>
```

# Dependencies

Built on top of [micro](https://github.com/zeit/micro "micro") microservice framework.

# Author

(C) Copyright by Shamil Gumirov, 2017-2025.

Disclaimer: The author served as tech/teamlead for Eyeline's GlobalUSSD project in 2005-2010. Not affiliated currently.

# License

As-is. No warranties, no support obligations. This is not a support account, this repository is **not** part of any official or unofficial docs.
