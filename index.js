import MetaMaskOnboarding from "@metamask/onboarding";

const onboarding = new MetaMaskOnboarding();

const player = document.querySelector(".success-anim");

const btn = document.querySelector(".onboard")
const statusText = document.querySelector("h1")
const StatusDesc = document.querySelector(".desc")
const loader = document.querySelector(".loader")
const upArrow = document.querySelector(".up")
const confetti = document.querySelector(".confetti")


const isMetaMaskInstalled = () => {
    const {ethereum} = window;
    return Boolean(ethereum && ethereum.isMetaMask);
}

const onClickInstallMetaMask = () => {
    onboarding.startOnboarding();
    loader.style.display = "block";
}

async function connectwallet(){
    return await ethereum.request({method: "eth_accounts"});
}

let connected = (accounts) => {
    statusText.innerHTML = "Connected!";
    statusDesc.classList.add("account");
    statusDesc.innerHTML = accounts[0];
    btn.style.display = "none";
    loader.style.display = "none";
    upArrow.style.display = "none";
    confetti.style.display = "block";
    player.play();
    statusDesc.classList.add("account");
}


const MetaMaskClientCheck = () => {
    if(!isMetaMaskInstalled()){
        statusText.innerText = "You need to Install a Wallet";
        StatusDesc.innerText = "We recommend the MetaMask wallet."
        btn.innerText = "Install MetaMask";
        btn.onclick = onClickInstallMetaMask;

    } else {
        connectwallet().then((accounts) => {
            if(accounts && accounts[0] > 0){
                connected(accounts);
            }else{
                statusText.innerHTML = "Connect your wallet";
                statusDesc.innerHTML = "To begin please connect metamask wallet"
                btn.innerText = "Connect Metamask";
                upArrow.style.display = "block";
            }
        })
    }
}

btn.addEventListener("click", async () =>{
    btn.style.backgroundColor = "#cccccc";
    loader.style.display = "block";

    try{
        const accounts = await ethereum.request({method: "eth_requestAccounts"})
        connected(accounts)
    }catch(error){
        console.error(error);
    }
})

MetaMaskClientCheck();