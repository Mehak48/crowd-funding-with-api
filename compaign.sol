// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

struct Campaign {
    uint id;
    string name;
    address payable owner;
    uint goalAmount;
    uint totalDonated;
    bool isDeleted;
}

struct Donation {
    uint campaignId;
    address donor;
    uint amount;
}

contract CampaignSystem {
    Campaign[] public campaigns;
    mapping(uint => Donation[]) public campaignDonations; // campaignId => donations
    mapping(address => Donation[]) public donorHistory;   // donor address => donations

    address public admin;

    constructor(address _admin) {
        admin = _admin;
    }

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can perform this");
        _;
    }

    modifier validCampaign(uint _id) {
        require(_id < campaigns.length, "Invalid campaign ID");
        require(!campaigns[_id].isDeleted, "Campaign is deleted");
        _;
    }

    event CampaignCreated(uint id, string name, address owner, uint goalAmount);
    event CampaignUpdated(uint id, string name, uint goalAmount);
    event CampaignDeleted(uint id);
    event Donated(uint campaignId, address donor, uint amount);
    event Withdrawn(uint campaignId, address owner, uint amount);

    // Create a new campaign
    function createCampaign(uint _id, string memory _name, address payable _owner, uint _goalAmount) public onlyAdmin {
        campaigns.push(Campaign(_id, _name, _owner, _goalAmount, 0, false));
        emit CampaignCreated(_id, _name, _owner, _goalAmount);
    }

    // Get campaign by ID
    function getCampaign(uint _id) public view validCampaign(_id) returns (uint, string memory, address, uint, uint    ) {
        return (campaigns[_id].id, campaigns[_id].name, campaigns[_id].owner,campaigns[_id].goalAmount, campaigns[_id].totalDonated);
    }

    // Get all campaigns
    function getAllCampaigns() public view returns (Campaign[] memory) {
        return campaigns;
    }

    function updateCompaign(uint _id, string memory _name, uint _amount) public onlyAdmin {
    campaigns[_id].name = _name;
    campaigns[_id].goalAmount = _amount;
 }


    // Donate to a campaign
    function donate(uint _id) public payable validCampaign(_id) {
      
        campaigns[_id].totalDonated += msg.value;

        Donation memory newDonation = Donation(_id, msg.sender, msg.value);
        campaignDonations[_id].push(newDonation);
        donorHistory[msg.sender].push(newDonation);

        emit Donated(_id, msg.sender, msg.value);
    }

    // Get all donations for a specific campaign
    function getDonationsForCampaign(uint _id) public view validCampaign(_id) returns (Donation[] memory) {
        return campaignDonations[_id];
    }

    // Get all donors for a specific campaign
    function getDonorsForCampaign(uint _id) public view validCampaign(_id) returns (address[] memory) {
        Donation[] memory donations = campaignDonations[_id];
        address[] memory donors = new address[](donations.length);
        for (uint i = 0; i < donations.length; i++) {
            donors[i] = donations[i].donor;
        }
        return donors;
    }

    // Get all donations by a specific donor
    function getDonationsByDonor(address _donor) public view returns (Donation[] memory) {
        return donorHistory[_donor];
    }

    // Delete a campaign
    function deleteCampaign(uint _id) public onlyAdmin validCampaign(_id) {
        campaigns[_id].isDeleted = true;
        emit CampaignDeleted(_id);
    }

    // Withdraw donations from a campaign
    function withdrawDonations(uint _id) public validCampaign(_id) {
        Campaign storage c = campaigns[_id];
        require(msg.sender == c.owner, "Only owner can withdraw");
        require(c.totalDonated > 0, "No donations to withdraw");

        uint amount = c.totalDonated;
        c.totalDonated = 0;
        c.owner.transfer(amount);

        emit Withdrawn(_id, msg.sender, amount);
    }
}
