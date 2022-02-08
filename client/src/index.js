const displaySignature = async (message, signatureSelector, account) => {
  signature = await signMessage(account, message);
  $("#signature").html(signature)
};

const updateSignature = (messageSelector, signButtonSelector, signatureSelector, account) => {
  let message;
  $("#message").on("change", (e) => {
    message = e.target.value;
  });
  $("#signButton").on("click", async (e) => {
    e.preventDefault();
    await displaySignature(message, signatureSelector, account)
  });
};

async function runGuard() {
  const messageSelector = document.querySelector('#message');
  const signButtonSelector = document.querySelector('#signButton');
  const accountTextSelector = document.querySelector('#accountText');
  const signatureSelector = document.querySelector('#signature');

  const web3 = await getWeb3();
  const accounts = await web3.eth.getAccounts();

  accountTextSelector.innerHTML = accounts[0]
  updateSignature(messageSelector, signButtonSelector, signatureSelector, accounts[0])

};

runGuard();
