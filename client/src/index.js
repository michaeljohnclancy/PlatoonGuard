const displaySignature = async (web3, message) => {
  hash = web3.utils.sha3(message)
  accounts = await web3.eth.getAccounts()
  signature = await web3.eth.personal.sign(hash, accounts[0])
  $("#signature").html(signature);
};

const updateSignature = (web3) => {
  let message;
  $("#signMessage").on("change", (e) => {
    message = e.target.value;
  });
  $("#signButton").on("click", async (e) => {
    e.preventDefault();
    await displaySignature(web3, message);
  });
};

const displaySignedByAddress = async (web3, message, signature) => {
  hash = web3.utils.sha3(message)
  signedBy = await web3.eth.accounts.recover(hash, signature);
  $("#signedBy").html(signedBy);
}

const updateSignedByAddress = (web3) => {
  let verifyMessage;
  let verifySignature;
  $("#verifyMessage").on("change", (e) => {
    verifyMessage = e.target.value;
  });
  $("#verifySignature").on("change", (e) => {
    verifySignature = e.target.value;
  });
  $("#verifyButton").on("click", async (e) => {
    e.preventDefault();
    await displaySignedByAddress(web3, verifyMessage, verifySignature);
  });
}

async function runGuard() {
  const web3 = await getWeb3();
  const accounts = await web3.eth.getAccounts();
  $("#accountText").html(accounts[0]);
  updateSignature(web3);
  updateSignedByAddress(web3)
};

runGuard();
