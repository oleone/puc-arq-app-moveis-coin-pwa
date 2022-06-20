const COINMARKETCAP_BASEURL = `https://pro-api.coinmarketcap.com/v2/cryptocurrency/info?slug=bitcoin,ethereum,tether,usd-coin,bnb,binance-usd,cardano,xrp,solana,dogecoin,multi-collateral-dai,polkadot-new,tron,wrapped-bitcoin,unus-sed-leo,shiba-inu,avalanche,litecoin,ftx-token,polygon,chainlink,cronos,stellar,uniswap,bitcoin-cash,near-protocol,algorand,monero,ethereum-classic,cosmos,vechain,decentraland,hedera,flow,helium,trueusd,internet-computer,tezos,theta-network,filecoin,axie-infinity,elrond-egld,apecoin-ape,bitcoin-sv,the-sandbox,kucoin-token,paxos-standard,eos,zcash,neutrino-usd,huobi-token,aave,usdd,maker,iota,bittorrent-new,the-graph,ecash,klaytn,pax-gold,okb,neo,quant,fantom,chiliz,thorchain,waves,basic-attention-token,loopring,stacks,dash,fei-usd,zilliqa,kusama,pancakeswap,gala,enjin-coin,xinfin,celo,amp,green-metaverse-token,holo,nem,nexo,kava,mina,curve-dao-token,decred,harmony,1inch,kadena,gatetoken,theta-fuel,symbol,bitcoin-gold,gnosis-gno,qtum,bora,arweave,gemini-dollar;`

const state = {
    data: {},
    // criptoList: {}
};
const CACHE_DINAMICO = "coin_exposer_dinamico";

async function loadCriptocurrenciesInfo() {
    fetch('api/criptocurrency-list.json', { mode: 'cors' }).then(result => {
        result.json().then(json => {
            state.data = json.data;
            cacheDinamicoJson();
            renderCards(json.data);
        });
    }).catch(err => {
        console.error(err);
    }).finally(() => {
        // 
    });
}

// async function loadCriptocurrencies() {
//     fetch('api/criptocurrency.json', { mode: 'cors' }).then(result => {
//         result.json().then(json => {
//             cacheDinamicoJson();
//             state.criptoList = json.data;
//         });
//     }).catch(err => {
//         console.error(err);
//     }).finally(() => {
//         // 
//     });
// }

function renderCards(criptos) {

    const cardList = document.getElementById('card-list');

    Object.values(criptos).forEach((cripto, index) => {
        let cardHtml = `
            <div id="card-${cripto.symbol.toLowerCase()}" class="col-sm-6 col-md-6 col-lg-4 card-cripto" onClick="javascript:goToCriptoDetail(\'${cripto.id}\');">
                <div class="card mb-3">
                    <div class="row g-0">
                        <div class="col-4" id="card-image">
                            <img src="${cripto.logo}" class="img-fluid img-logo-cripto rounded-start" alt="Criptocurrency logo">
                        </div>
                        <div class="col-6">
                            <div class="card-body">
                            <h5 class="card-title">${cripto.name}</h5>
                                                        
                            <p>${sanitizeCriptoCategory(cripto.category)}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        cardList.innerHTML += cardHtml;
    });
}

function renderCriptoDetail(cripto) {
    const html = `
        <div id="cripto-detail">
            <div class="container">
                <div class="row">
                    <div class="image-cripto-detail">
                        <img
                            src="${cripto.logo}"
                            alt=""
                        />
                    </div>

                    <div id="cripto-detail-body">
                        <div class="col-12">
                            <h1>${cripto.name}</h1>

                            <p>
                            <b>Descrição:</b> ${cripto.description}
                            </p>
                        </div>

                        ${renderUrls(cripto.urls)}
                    </div>
                </div>
            </div>
        </div>
    `;

    const render = document.getElementById('cripto-detail');
    render.innerHTML = html;
}

function renderUrls(urls) {
    const html = `
        <div class="col-12">
            ${renderMicroUrl('Reddit', urls.reddit)}
            ${renderMicroUrl('Twitter', urls.twitter)}
            ${renderMicroUrl('Website', urls.website)}
            ${renderMicroUrl('Source Code', urls.source_code)}
            ${renderMicroUrl('Documentação', urls.technical_doc)}
        </div>
    `;

    return html;
}

function renderMicroUrl(field, object) {
    if (object && object.length > 0) {
        return `
            <p>
                <b>${field}:</b> <a href="${object[0]}" target="_blank">${object[0]}</a>
            </p>
        `;
    } else {
        return ``;
    }
}

function goToCriptoDetail(criptoId) {
    const pageDetail = document.getElementById('details-page');
    pageDetail.style.display = 'block';

    let cripto = Object.values(state.data).find(c => c.id == criptoId);

    renderCriptoDetail(cripto);
}

function goToBack() {
    const pageDetail = document.getElementById('details-page');
    pageDetail.style.display = 'none';
}

function sanitizeCriptoDescription(description) {
    if (description && description.length > 150) {
        description = description.slice(0, 150) + '...';
    }

    return description;
}

function sanitizeCriptoTags(tags) {
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

function sanitizeCriptoCategory(category) {
    let categoryHtml = ``;

    if (category && category === 'coin') {
        categoryHtml += `<span class="badge bg-coin-outline">${category}</span>`;
    } else if (category && category === 'token') {
        categoryHtml += `<span class="badge bg-token-outline">${category}</span>`;
    }

    return categoryHtml;
}

/*
#
# Cache Dinâmico (json / imgs)
#
*/
var cacheDinamicoJson = function () {
    localStorage[CACHE_DINAMICO] = JSON.stringify(state);
}

/*
#
# Botao de Instalação
#
*/

let windowInstallation = null;
let btnInstall = document.getElementById('btn-install');
window.addEventListener('beforeinstallprompt', loadWindow);

function loadWindow(evt) {
    windowInstallation = evt;
}

let intallApp = function () {

    btnInstall.removeAttribute("hidden");
    btnInstall.addEventListener("click", function () {

        windowInstallation.prompt();

        windowInstallation.userChoice.then((choice) => {

            if (choice.outcome === 'accepted') {
                console.log("Usuário fez a instalação do app");
            } else {
                console.log("Usuário NÃO fez a instalação do app");
            }

        });

    });

}

loadCriptocurrenciesInfo();
// loadCriptocurrencies();