(this["webpackJsonpcrypto-monitor"]=this["webpackJsonpcrypto-monitor"]||[]).push([[0],{36:function(e){e.exports=JSON.parse('{"crypto":{"BTC":"Bitcoin","XBTUSD":"XBTUSD","ETH":"Ethereum","IGG":"IG Gold","XRP":"XRP","LTC":"Litecoin","KNC":"Kyber Network","USDT":"Tether","BCH":"Bitcoin Cash","LINK":"Chainlink","XTZ":"Tezos","XLM":"Stellar","EOS":"EOS","BNB":"Binance Coin","ZRX":"0x","OMG":"OMG Network","OXT":"Orchid Protocol","ETC":"Ethereum Classic","ADA":"Cardano","VET":"VeChain","EUR":"EUR","XMR":"Monero","ATOM":"Cosmos","REP":"Augur","ALGO":"Algorand","ZIL":"Zilliqa","DASH":"Dash","WAVES":"Waves","DBY":"Dobuy","BAT":"Basic Attention Token","TRX":"TRON","ZEC":"ZCash","MIOTA":"IOTA","DAI":"Multi Collateral Dai","USDC":"USD Coin","BSV":"Bitcoin SV","BTCVT":"Bitcoin Vault","NANO":"Nano","ENJ":"Enjin Coin","WAXP":"Worldwide Asset eXchange","NEO":"NEO","SOLO":"Sologenic","SENSO":"SENSO","USDK":"USDK","CTAG":"CTAGtoken","PAXG":"PAX Gold","PLTC":"PlatinCoin","THX":"Thorenext","ICX":"ICON Project","DGB":"DigiByte","HBAR":"Hedera Hashgraph","RVN":"Ravencoin","QTUM":"QTUM","THR":"Thorecoin","EBASE":"EURBASE","THCH":"Thorecash","MINX":"InnovaMinex","SON":"Simone","LEO":"LEO Token","LSK":"Lisk","PZM":"Prizm","PAX":"Paxos Standard","DOGE":"Dogecoin","XEM":"NEM","SWYFTT":"SWYFT","GBP":"GBP","MKR":"Maker","XSD":"SounDAC","ANCT":"Anchor","SOLVE":"SOLVE","EDO":"Eidoo","TUSD":"True USD","GT":"Gatechain Token","SNGLS":"SingularDTV","OWC":"Oduwa","ULTRA":"Ultra","HNT":"Hymnode","XPR":"Proton","ABBC":"ABBC Coin","SC":"Siacoin","GUSD":"Gemini Dollar","ATB":"ATB coin","SGA":"SAGA","ADRX":"Adrenaline Chain","ETP":"Metaverse","GNO":"Gnosis","BTG":"Bitcoin Gold","UTK":"Utrust","CCRB":"CryptoCarbon","XCHF":"CryptoFranc","SMART":"SmartCash","WABI":"WABI","MNC":"MainCoin","SAN":"Santiment","ZEN":"Horizen","NEC":"Ethfinex Nectar Token","BOTX":"BOTXCOIN","XVG":"Verge","HIVE":"Hive","CGLD":"Celo Gold","QASH":"Quoine Liquid"}}')},38:function(e,t,n){e.exports=n(73)},48:function(e,t,n){},67:function(e,t,n){},69:function(e,t,n){},70:function(e,t,n){},71:function(e,t,n){},72:function(e,t,n){},73:function(e,t,n){"use strict";n.r(t);var c=n(0),a=n.n(c),r=n(18),o=n.n(r),i=n(9),l=(n(47),n(48),n(3)),u=n(12),s=n.n(u),m="https://min-api.cryptocompare.com/data/",E={prices:{getPrice:function(e,t){var n="".concat(m,"price?fsym=").concat(e,"&tsyms=").concat(t);return s.a.get(n).then((function(e){return e.data})).catch((function(e){console.error(e)}))}},toplists:{getTopListByMarketCap:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:10,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"USD",n="".concat(m,"top/mktcapfull?limit=").concat(e,"&tsym=").concat(t);return s.a.get(n).then((function(e){return e.data})).catch((function(e){console.error(e)}))},getTopListByTierVolume:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:10,t=arguments.length>1?arguments[1]:void 0,n="".concat(m,"top/totaltoptiervolfull?limit=").concat(e,"&tsym=").concat(t);return s.a.get(n).then((function(e){return e.data})).catch((function(e){console.error(e)}))}},coinInfo:{getCoinInfo:function(e,t){var n="".concat(m,"pricemultifull?fsyms=").concat(e,"&tsyms=").concat(t);return s.a.get(n).then((function(e){return e.data})).catch((function(e){console.error(e)}))},getCoinsBaseInfo:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:100,t=arguments.length>1?arguments[1]:void 0,n="".concat(m,"top/volumes?extraParams=https:%2F%2Fwww.cryptocompare.com&limit=").concat(e,"&tsym=").concat(t);return s.a.get(n).then((function(e){return e.data})).catch((function(e){console.error(e)}))}}},C=function(e){return e.coinInfo.coinInfo},p=function(e){return e.coinInfo.isFetching},f=function(e){return e.coinInfo.targetCoinCode},d=n(10),O=n.n(d),T=n(16),h=n(2),g=n(36),N={USD:"United States Dollar",RUB:"Russian Ruble",EUR:"Euro"},S=Object(h.a)(Object(h.a)({},N),g.crypto),v=function(e){return{type:"TOP_COINS/GET_COINS:FAILURE",payload:e}},y=function(e){return e.topCoinsList.coins},I=function(e){return e.topCoinsList.isFetching},b=(n(67),n(11)),R=function(e){var t=e.coins;return a.a.createElement("div",{className:"top-coins"},a.a.createElement("h2",null,"Top 10 crypto currency"),a.a.createElement("table",{className:"table top-coins-table"},a.a.createElement("thead",null,a.a.createElement("tr",null,a.a.createElement("th",{scope:"col-2"},"#"),a.a.createElement("th",{scope:"col"},"Name"),a.a.createElement("th",{scope:"col"},"Price"),a.a.createElement("th",{scope:"col"},"Direct Vol"),a.a.createElement("th",{scope:"col"},"Total Vol"),a.a.createElement("th",{scope:"col"},"Market cap."))),a.a.createElement("tbody",null,t.map((function(e,t){return a.a.createElement("tr",{key:e.code},a.a.createElement("th",{scope:"row"},++t),a.a.createElement("td",null,a.a.createElement(b.b,{to:"coins/".concat(e.code),className:"top-coins__coin-name"},a.a.createElement("img",{className:"top-coins__coin-image",src:e.imageUrl,alt:"coin logo"}),a.a.createElement("span",{className:"top-coins__coin-text"},a.a.createElement("strong",null,e.code),a.a.createElement("br",null),a.a.createElement("small",null,e.name)))),a.a.createElement("td",null,e.price),a.a.createElement("td",null,e.directVol),a.a.createElement("td",null,e.totalVol),a.a.createElement("td",null,e.mktcap))})))))},U=n(13),A=n.n(U),_=function(e){var t=e.className,n=e.center,c=void 0===n||n,r=e.small,o=void 0!==r&&r;return a.a.createElement("div",{className:A()("loader",{"d-flex justify-content-center":c},t)},a.a.createElement("div",{className:A()("spinner-border",{"spinner-border-sm":o}),role:"status"},a.a.createElement("span",{className:"sr-only"},"Loading...")))},j=(n(69),function(e){return e.currencyConverter.price}),D=function(e){return e.currencyConverter.isFetching},L=function(e){return e.currencyConverter.currencyCode},P=function(e){return e.currencyConverter.currencyTargetCode},B=function(e){return{type:"CURRENCY_CONVERTER/GET_PRICE:FAILURE",payload:e}},F=n(20),G=(n(70),n(71),function(e){var t=e.className,n=e.placeholder,c=e.value,r=e.onChange,o=e.type,i=e.valueType;return a.a.createElement("input",{className:A()("form-control",t),placeholder:n,type:o||"text",value:c,onChange:function(e){var t=e.currentTarget.value;"number"===i&&(t=t.replace(/[^.\d]+/g,"").replace(/^([^\.]*\.)|\./g,"$1")),r(t)}})}),M=function(e){var t=e.value,n=e.onChange,c=e.options,r=e.className;return a.a.createElement("select",{className:A()("custom-select",r),value:t,onChange:function(e){n(e.currentTarget.value)}},c)},V=function(e){var t=e.price,n=e.getPrice,r=e.currencyCode,o=e.currencyTargetCode,i=Object(c.useState)("0"),l=Object(F.a)(i,2),u=l[0],s=l[1],m=Object(c.useState)("0"),E=Object(F.a)(m,2),C=E[0],p=E[1],f=Object(c.useMemo)((function(){return Object.entries(S).map((function(e){var t=Object(F.a)(e,2),n=t[0],c=t[1];return a.a.createElement("option",{key:n,value:n},c)}))}),[S]),d=function(e){s(e),p((+e*t).toString())},O=function(e){p(e),s("0"===e?"0":(+e/t).toString())};return Object(c.useEffect)((function(){d(u)}),[r]),Object(c.useEffect)((function(){O(C)}),[o]),a.a.createElement("div",{className:"converter"},a.a.createElement("div",{className:"converter-field input-group mt-2"},a.a.createElement(G,{valueType:"number",value:u,onChange:d}),a.a.createElement(M,{options:f,value:r,onChange:function(e){return n(e,o)}})),a.a.createElement("div",{className:"converter-field input-group mt-2"},a.a.createElement(G,{valueType:"number",value:C,onChange:O}),a.a.createElement(M,{options:f,value:o,onChange:function(e){return n(r,e)}})))},w=Object(i.b)((function(e){return{price:j(e),isFetching:D(e),currencyCode:L(e),currencyTargetCode:P(e)}}),{getPrice:function(e,t){return function(){var n=Object(T.a)(O.a.mark((function n(c){var a,r;return O.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return c({type:"CURRENCY_CONVERTER/GET_PRICE:REQUEST"}),n.prev=1,n.next=4,E.prices.getPrice(e,t);case 4:a=n.sent,(r=a[t])?c({type:"CURRENCY_CONVERTER/GET_PRICE:SUCCESS",payload:{price:r,currencyCode:e,currencyTargetCode:t}}):B("Cannot load data from server."),n.next=12;break;case 9:n.prev=9,n.t0=n.catch(1),B(n.t0);case 12:case"end":return n.stop()}}),n,null,[[1,9]])})));return function(e){return n.apply(this,arguments)}}()}})((function(e){var t=e.price,n=e.getPrice,r=e.isFetching,o=e.currencyCode,i=e.currencyTargetCode;return Object(c.useEffect)((function(){n(o,i)}),[]),a.a.createElement("div",{className:"currency-converter"},a.a.createElement("div",{className:"d-flex justify-content-between"},a.a.createElement("span",{className:"h5"},"Currency converter"),r&&a.a.createElement(_,{className:"d-inline align-text-top",small:!0,center:!1})),a.a.createElement(V,{price:t,currencyCode:o,currencyTargetCode:i,getPrice:n}),a.a.createElement("div",{className:"currency-converter__price mt-2"},"1 ".concat(o," = ").concat(t," ").concat(i)))})),X=Object(i.b)((function(e){return{coins:y(e),isFetching:I(e)}}),{getCoins:function(){return function(){var e=Object(T.a)(O.a.mark((function e(t,n){var c,a,r,o;return O.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t({type:"TOP_COINS/GET_COINS:REQUEST"}),e.prev=1,c=n().coinInfo.targetCoinCode,10,e.next=6,E.toplists.getTopListByTierVolume(10,c);case 6:a=e.sent,r=a.Data,100===a.Type?(o=r.map((function(e){return{code:e.CoinInfo.Name,name:e.CoinInfo.FullName,price:e.DISPLAY.USD.PRICE,directVol:e.DISPLAY.USD.VOLUME24HOURTO.replace(/[,]/gi," ").split(".")[0],totalVol:e.DISPLAY.USD.TOTALVOLUME24HTO,mktcap:e.DISPLAY.USD.MKTCAP,imageUrl:"https://www.cryptocompare.com"+e.CoinInfo.ImageUrl}})),t({type:"TOP_COINS/GET_COINS:SUCCESS",payload:o})):v("Cannot load data from server."),e.next=14;break;case 11:e.prev=11,e.t0=e.catch(1),v(e.t0);case 14:case"end":return e.stop()}}),e,null,[[1,11]])})));return function(t,n){return e.apply(this,arguments)}}()}})((function(e){var t=e.coins,n=e.getCoins,r=e.isFetching;return Object(c.useEffect)((function(){n();var e=setInterval((function(){n()}),13e4);return function(){clearInterval(e)}}),[]),a.a.createElement("section",{className:"coins"},a.a.createElement("div",{className:"container"},a.a.createElement("div",{className:"row"},a.a.createElement("div",{className:"col-md-8"},r&&!t.length?a.a.createElement(_,null):a.a.createElement(a.a.Fragment,null,t.length&&a.a.createElement(R,{coins:t}))),a.a.createElement("div",{className:"col-md-4"},a.a.createElement(w,null)))))})),k=function(e){return{type:"COIN_INFO/LOAD:FAILURE",payload:e}},x=Object(i.b)((function(e){return{coinInfo:C(e),isFetching:p(e)}}),{getCoinInfo:function(e){return function(){var t=Object(T.a)(O.a.mark((function t(n,c){var a,r,o,i;return O.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n({type:"COIN_INFO/LOAD:REQUEST"}),t.prev=1,a=c().coinInfo.targetCoinCode,t.next=5,E.coinInfo.getCoinInfo(e,a);case 5:r=t.sent,o=r.RAW[e][a],"Error"!==r.Response?(i={code:e,name:S[e],price:o.PRICE,mktcap:o.MKTCAP,directVol:o.VOLUME24HOURTO,totalVol:o.TOTALVOLUME24HTO,imageUrl:"https://www.cryptocompare.com"+o.IMAGEURL},n({type:"COIN_INFO/LOAD:SUCCESS",payload:i})):k("err"),t.next=13;break;case 10:t.prev=10,t.t0=t.catch(1),k(t.t0);case 13:case"end":return t.stop()}}),t,null,[[1,10]])})));return function(e,n){return t.apply(this,arguments)}}()},resetCoinInfo:function(){return{type:"COIN_INFO/RESET"}}})((function(e){var t=e.match,n=e.getCoinInfo,r=e.resetCoinInfo,o=e.isFetching,i=e.coinInfo,u=t.params.code.toUpperCase(),s=S[u];return Object(c.useEffect)((function(){return s&&n(u),function(){r()}}),[u]),s?a.a.createElement("div",{className:"coin"},a.a.createElement("div",{className:"container"},o?a.a.createElement(_,null):a.a.createElement(a.a.Fragment,null,i&&a.a.createElement("div",{className:"coin-content"},a.a.createElement("h2",null,i.name),a.a.createElement("h3",null,i.code))))):a.a.createElement(l.a,{to:"/home"})})),H=(n(72),function(){return a.a.createElement("div",{className:"header"},a.a.createElement("div",{className:"container"},a.a.createElement("div",{className:"header-logo"},a.a.createElement(b.b,{to:"/"},a.a.createElement("img",{src:"https://uploads-ssl.webflow.com/5d5f02be87f780005e708e1f/5db01a351c624d3ecf624e6d_reactlogo.jpg",alt:"logo"})))))}),Y=Object(i.b)((function(e){return{targetCoinCode:f(e)}}))((function(e){var t=e.targetCoinCode;return Object(c.useEffect)((function(){try{E.coinInfo.getCoinsBaseInfo(100,t).then((function(e){var t,n=e.Data.map((function(e){return[e.SYMBOL,e.NAME]})),c=Object.fromEntries(n);c&&(t=c,S=Object(h.a)(Object(h.a)({},N),t))}))}catch(e){console.log(e)}}),[]),a.a.createElement("div",{className:"App"},a.a.createElement(H,null),a.a.createElement(l.d,null,a.a.createElement(l.b,{exact:!0,path:"/home",component:X}),a.a.createElement(l.b,{exact:!0,path:"/coins/:code",component:x}),a.a.createElement(l.a,{from:"*",to:"/home"})))})),K=n(14),Q=n(37),W={coins:[],isFetching:!1,_error:""},Z=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:W,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"TOP_COINS/GET_COINS:SUCCESS":return Object(h.a)(Object(h.a)({},e),{},{isFetching:!1,coins:t.payload});case"TOP_COINS/GET_COINS:FAILURE":return Object(h.a)(Object(h.a)({},e),{},{isFetching:!1,_error:t.payload});case"TOP_COINS/GET_COINS:REQUEST":return Object(h.a)(Object(h.a)({},e),{},{isFetching:!0});default:return e}},J={currencyCode:"BTC",currencyTargetCode:"USD",price:0,isFetching:!1,_error:""},z=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:J,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"CURRENCY_CONVERTER/GET_PRICE:REQUEST":return Object(h.a)(Object(h.a)({},e),{},{isFetching:!0});case"CURRENCY_CONVERTER/GET_PRICE:FAILURE":return Object(h.a)(Object(h.a)({},e),{},{isFetching:!0,_error:t.payload});case"CURRENCY_CONVERTER/GET_PRICE:SUCCESS":return Object(h.a)(Object(h.a)({},e),{},{isFetching:!1,price:t.payload.price,currencyCode:t.payload.currencyCode,currencyTargetCode:t.payload.currencyTargetCode});default:return e}},q={coinInfo:{},targetCoinCode:"USD",isFetching:!1,_error:""},$=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:q,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"COIN_INFO/LOAD:SUCCESS":return Object(h.a)(Object(h.a)({},e),{},{coinInfo:t.payload,isFetching:!1,_error:""});case"COIN_INFO/LOAD:FAILURE":return Object(h.a)(Object(h.a)({},e),{},{isFetching:!1,_error:t.payload});case"COIN_INFO/LOAD:REQUEST":return Object(h.a)(Object(h.a)({},e),{},{isFetching:!0});case"COIN_INFO/RESET":return Object(h.a)(Object(h.a)({},e),{},{coinInfo:{}});default:return e}},ee=Object(K.c)({topCoinsList:Z,currencyConverter:z,coinInfo:$}),te=window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__||K.d,ne=Object(K.e)(ee,te(Object(K.a)(Q.a)));o.a.render(a.a.createElement(a.a.StrictMode,null,a.a.createElement(b.a,null,a.a.createElement(i.a,{store:ne},a.a.createElement(Y,null)))),document.getElementById("root"))}},[[38,1,2]]]);
//# sourceMappingURL=main.bd8f2422.chunk.js.map