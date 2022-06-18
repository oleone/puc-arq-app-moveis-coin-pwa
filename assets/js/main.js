const COINMARKETCAP_BASEURL = `https://pro-api.coinmarketcap.com/v2/cryptocurrency/info?slug=bitcoin,ethereum,tether,usd-coin,bnb,binance-usd,cardano,xrp,solana,dogecoin,multi-collateral-dai,polkadot-new,tron,wrapped-bitcoin,unus-sed-leo,shiba-inu,avalanche,litecoin,ftx-token,polygon,chainlink,cronos,stellar,uniswap,bitcoin-cash,near-protocol,algorand,monero,ethereum-classic,cosmos,vechain,decentraland,hedera,flow,helium,trueusd,internet-computer,tezos,theta-network,filecoin,axie-infinity,elrond-egld,apecoin-ape,bitcoin-sv,the-sandbox,kucoin-token,paxos-standard,eos,zcash,neutrino-usd,huobi-token,aave,usdd,maker,iota,bittorrent-new,the-graph,ecash,klaytn,pax-gold,okb,neo,quant,fantom,chiliz,thorchain,waves,basic-attention-token,loopring,stacks,dash,fei-usd,zilliqa,kusama,pancakeswap,gala,enjin-coin,xinfin,celo,amp,green-metaverse-token,holo,nem,nexo,kava,mina,curve-dao-token,decred,harmony,1inch,kadena,gatetoken,theta-fuel,symbol,bitcoin-gold,gnosis-gno,qtum,bora,arweave,gemini-dollar;`

async function LoadCriptocurrencies() {
    fetch('assets/mocks/criptocurrency-list.json', { mode: 'cors' }).then(result => {
        result.json().then(json => {
            RenderCards(json.data);
        });
    }).catch(err => {
        console.error(err);
    }).finally(() => {

    });
}

function RenderCards(data) {

    const cardList = document.getElementById('card-list');

    Object.values(data).forEach(d => {
        let cardHtml = `
            <div class="card mb-3">
                <div class="row g-0">
                    <div class="col-4" id="card-image">
                        <img src="${d.logo}" class="img-fluid rounded-start" alt="...">
                    </div>
                    <div class="col-8">
                        <div class="card-body">
                        <h5 class="card-title">${d.name} #${d.symbol}</h5>
                        <p class="card-text">${SanitizeCriptoDescription(d.description)}</p>
                        
                        <p>${SanitizeCriptoTags(d.tags)}</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
        // console.log(d);
        cardList.innerHTML += cardHtml;
    });
}

function SanitizeCriptoDescription(description) {
    if (description && description.length > 150) {
        description = description.slice(0, 150) + '...';
    }

    return description;
}

function SanitizeCriptoTags(tags) {
    let tagsHtml = ``;

    if (tags) {
        tags.forEach((tag, index) => {
            if (tag && index <= 3) {
                tagsHtml += `<span class="badge bg-secondary">${tag}</span>`;
            } else {
                return;
            }
        });
    }

    return tagsHtml;
}

LoadCriptocurrencies();