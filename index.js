const express=require("express");
const app=express();
const {Web3}=require("web3");

const web3=new Web3("wss://ethereum-sepolia-rpc.publicnode.com");
const Abi=[
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_admin",
				"type": "address"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "goalAmount",
				"type": "uint256"
			}
		],
		"name": "CampaignCreated",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			}
		],
		"name": "CampaignDeleted",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "goalAmount",
				"type": "uint256"
			}
		],
		"name": "CampaignUpdated",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "campaignId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "donor",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "Donated",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "campaignId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "Withdrawn",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "admin",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "campaignDonations",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "campaignId",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "donor",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "campaigns",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "address payable",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "goalAmount",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "totalDonated",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "isDeleted",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_id",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			},
			{
				"internalType": "address payable",
				"name": "_owner",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_goalAmount",
				"type": "uint256"
			}
		],
		"name": "createCampaign",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_id",
				"type": "uint256"
			}
		],
		"name": "deleteCampaign",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_id",
				"type": "uint256"
			}
		],
		"name": "donate",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "donorHistory",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "campaignId",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "donor",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getAllCampaigns",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "id",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "name",
						"type": "string"
					},
					{
						"internalType": "address payable",
						"name": "owner",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "goalAmount",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "totalDonated",
						"type": "uint256"
					},
					{
						"internalType": "bool",
						"name": "isDeleted",
						"type": "bool"
					}
				],
				"internalType": "struct Campaign[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_id",
				"type": "uint256"
			}
		],
		"name": "getCampaign",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_donor",
				"type": "address"
			}
		],
		"name": "getDonationsByDonor",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "campaignId",
						"type": "uint256"
					},
					{
						"internalType": "address",
						"name": "donor",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "amount",
						"type": "uint256"
					}
				],
				"internalType": "struct Donation[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_id",
				"type": "uint256"
			}
		],
		"name": "getDonationsForCampaign",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "campaignId",
						"type": "uint256"
					},
					{
						"internalType": "address",
						"name": "donor",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "amount",
						"type": "uint256"
					}
				],
				"internalType": "struct Donation[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_id",
				"type": "uint256"
			}
		],
		"name": "getDonorsForCampaign",
		"outputs": [
			{
				"internalType": "address[]",
				"name": "",
				"type": "address[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_id",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_amount",
				"type": "uint256"
			}
		],
		"name": "updateCompaign",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_id",
				"type": "uint256"
			}
		],
		"name": "withdrawDonations",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
];
const ca="0x9B65841952AfFbec303eFB32eC82cd7cCC91b139";
const contract=new web3.eth.Contract(Abi,ca);
const pk="0xef54ebfd27d8d1f0d2bfe1950e1265a90803c7bf4a22eb8c7787da45ec607346";
const account=web3.eth.accounts.privateKeyToAccount(pk);
web3.eth.accounts.wallet.add(account);

// 1. Get admin
app.get("/admin", async (req, res) => {
  try {
    const admin = await contract.methods.admin().call();
    res.json({ admin });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// 2. Get campaign by index
app.get("/campaigns/:index", async (req, res) => {
  try {
    const campaign = await contract.methods.campaigns(req.params.index).call();
    res.json(campaign);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// 3. Get donation for a campaign
app.get("/campaignDonations/:campaignId/:index", async (req, res) => {
  try {
    const data = await contract.methods.campaignDonations(
      req.params.campaignId,
      req.params.index
    ).call();
    res.json(data);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// 4. Get donor history
app.get("/donorHistory/:donor/:index", async (req, res) => {
  try {
    const data = await contract.methods.donorHistory(
      req.params.donor,
      req.params.index
    ).call();
    res.json(data);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// 5. Get all campaigns
app.get("/getAllCampaigns", async (req, res) => {
  try {
    const data = await contract.methods.getAllCampaigns().call();
    res.json(data);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// 6. Get campaign by ID
app.get("/getCampaign/:id", async (req, res) => {
  try {
    const data = await contract.methods.getCampaign(req.params.id).call();
    res.json(data);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// 7. Get donations by donor
app.get("/getDonationsByDonor/:donor", async (req, res) => {
  try {
    const data = await contract.methods.getDonationsByDonor(req.params.donor).call();
    res.json(data);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// 8. Get donations for a campaign
app.get("/getDonationsForCampaign/:id", async (req, res) => {
  try {
    const data = await contract.methods.getDonationsForCampaign(req.params.id).call();
    res.json(data);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// 9. Get donors for a campaign
app.get("/getDonorsForCampaign/:id", async (req, res) => {
  try {
    const data = await contract.methods.getDonorsForCampaign(req.params.id).call();
    res.json(data);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.listen(3001,(err)=>{


if(!err)
{
    console.log("this project is running at 3001 port");
	

}
else{
    console.log(err);
}
});