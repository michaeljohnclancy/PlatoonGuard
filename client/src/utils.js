const getWeb3 = () => {
  return new Promise((resolve, reject) => {
    window.addEventListener("load", async () => {
      if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        try {
          // ask user permission to access his accounts
          await window.ethereum.request({ method: "eth_requestAccounts" });
          resolve(web3);
        } catch (error) {
          reject(error);
        }
      } else {
        reject("Must install MetaMask");
      }
    });
  });
};

const signMessage = async (account, message) => {
        const msgParams = JSON.stringify({
            domain: {
                chainId: 1,
                name: 'SimpleSign',
                version: '0',
            },
            message: {
                contents: message.value,
                timestamp: Math.floor(Date.now() / 1000)
            },


            //TODO: What the hell is this whole block about?
            primaryType: 'Mail',
            types: {
              // TODO: Clarify if EIP712Domain refers to the domain the contract is hosted on
              EIP712Domain: [
                { name: 'name', type: 'string' },
                { name: 'version', type: 'string' },
                { name: 'chainId', type: 'uint256' },
                { name: 'verifyingContract', type: 'address' },
              ],
              // Not an EIP712Domain definition
              Group: [
                { name: 'name', type: 'string' },
                { name: 'members', type: 'Person[]' },
              ],
              // Refer to PrimaryType
              Mail: [
                { name: 'from', type: 'Person' },
                { name: 'to', type: 'Person[]' },
                { name: 'contents', type: 'string' },
              ],
              // Not an EIP712Domain definition
              Person: [
                { name: 'name', type: 'string' },
                { name: 'wallets', type: 'address[]' },
              ],
            },
        });

        try {
            const result = await ethereum.request({
                method: 'eth_signTypedData_v3',
                params: [
                    // From
                     account,
                    // msgParams
                    msgParams
                ],
            });
            // Handle the result
            return result
        } catch (error) {
            console.error(error);
        }
    };
