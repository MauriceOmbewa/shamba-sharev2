// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

/**
 * REMIX COMPILATION SETTINGS:
 * - Compiler Version: 0.8.19+
 * - Enable Optimization: YES (200 runs recommended)
 * - Advanced Settings: Enable "viaIR" if stack too deep errors occur
 */

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

/**
 * @title LandListing
 * @dev Smart contract for managing land lease listings on Base
 */
contract LandListing is ReentrancyGuard, Ownable {
    using Counters for Counters.Counter;
    
    Counters.Counter private _listingIds;
    
    enum ListingStatus { Available, Pending, Leased, Cancelled }
    enum PriceUnit { Acre, Hectare }
    
    struct Listing {
        uint256 id;
        address owner;
        string title;
        string location;
        uint256 size;
        uint256 price; // Price in wei per unit
        PriceUnit priceUnit;
        ListingStatus status;
        string description;
        string[] features;
        uint256 createdAt;
        uint256 updatedAt;
        address currentLessee;
        uint256 leaseEndTime;
    }
    
    struct LeaseRequest {
        uint256 listingId;
        address requester;
        uint256 requestedDuration; // Duration in seconds
        uint256 offeredPrice; // Total price offered in wei
        bool approved;
        uint256 createdAt;
    }
    
    // Mappings
    mapping(uint256 => Listing) public listings;
    mapping(uint256 => LeaseRequest[]) public leaseRequests;
    mapping(address => uint256[]) public ownerListings;
    mapping(address => uint256[]) public userLeaseRequests;
    
    // Events
    event ListingCreated(
        uint256 indexed listingId,
        address indexed owner,
        string title,
        uint256 price,
        PriceUnit priceUnit
    );
    
    event ListingUpdated(
        uint256 indexed listingId,
        ListingStatus status
    );
    
    event LeaseRequested(
        uint256 indexed listingId,
        address indexed requester,
        uint256 offeredPrice,
        uint256 duration
    );
    
    event LeaseApproved(
        uint256 indexed listingId,
        address indexed lessee,
        uint256 leaseEndTime
    );
    
    event LeaseCompleted(
        uint256 indexed listingId,
        address indexed lessee
    );
    
    constructor(address initialOwner) Ownable(initialOwner) {}
    
    /**
     * @dev Create a new land listing
     */
    function createListing(
        string calldata _title,
        string calldata _location,
        uint256 _size,
        uint256 _price,
        PriceUnit _priceUnit,
        string calldata _description,
        string[] calldata _features
    ) external returns (uint256) {
        require(bytes(_title).length > 0, "Title cannot be empty");
        require(bytes(_location).length > 0, "Location cannot be empty");
        require(_size > 0, "Size must be greater than 0");
        require(_price > 0, "Price must be greater than 0");

        _listingIds.increment();
        uint256 listingId = _listingIds.current();

        listings[listingId] = Listing({
            id: listingId,
            owner: msg.sender,
            title: _title,
            location: _location,
            size: _size,
            price: _price,
            priceUnit: _priceUnit,
            status: ListingStatus.Available,
            description: _description,
            features: _features,
            createdAt: block.timestamp,
            updatedAt: block.timestamp,
            currentLessee: address(0),
            leaseEndTime: 0
        });

        ownerListings[msg.sender].push(listingId);

        emit ListingCreated(listingId, msg.sender, _title, _price, _priceUnit);

        return listingId;
    }
    
    /**
     * @dev Request to lease a land listing
     */
    function requestLease(
        uint256 _listingId,
        uint256 _duration,
        uint256 _offeredPrice
    ) external payable nonReentrant {
        require(_listingId <= _listingIds.current(), "Listing does not exist");
        require(listings[_listingId].status == ListingStatus.Available, "Listing not available");
        require(listings[_listingId].owner != msg.sender, "Cannot lease your own land");
        require(_duration > 0, "Duration must be greater than 0");
        require(_offeredPrice > 0, "Offered price must be greater than 0");
        require(msg.value >= _offeredPrice, "Insufficient payment");

        // Create and store lease request
        leaseRequests[_listingId].push(LeaseRequest({
            listingId: _listingId,
            requester: msg.sender,
            requestedDuration: _duration,
            offeredPrice: _offeredPrice,
            approved: false,
            createdAt: block.timestamp
        }));

        userLeaseRequests[msg.sender].push(_listingId);

        // Update listing status to pending
        listings[_listingId].status = ListingStatus.Pending;
        listings[_listingId].updatedAt = block.timestamp;

        emit LeaseRequested(_listingId, msg.sender, _offeredPrice, _duration);
        emit ListingUpdated(_listingId, ListingStatus.Pending);
    }
    
    /**
     * @dev Approve a lease request (only listing owner)
     */
    function approveLease(
        uint256 _listingId,
        uint256 _requestIndex
    ) external nonReentrant {
        require(_listingId <= _listingIds.current(), "Listing does not exist");
        require(listings[_listingId].owner == msg.sender, "Only owner can approve lease");
        require(_requestIndex < leaseRequests[_listingId].length, "Invalid request index");

        LeaseRequest storage request = leaseRequests[_listingId][_requestIndex];
        require(!request.approved, "Request already approved");

        // Approve the request
        request.approved = true;

        // Cache values to reduce storage reads
        address requester = request.requester;
        uint256 offeredPrice = request.offeredPrice;
        uint256 leaseEndTime = block.timestamp + request.requestedDuration;

        // Update listing
        listings[_listingId].status = ListingStatus.Leased;
        listings[_listingId].currentLessee = requester;
        listings[_listingId].leaseEndTime = leaseEndTime;
        listings[_listingId].updatedAt = block.timestamp;

        // Transfer payment to owner
        payable(msg.sender).transfer(offeredPrice);

        emit LeaseApproved(_listingId, requester, leaseEndTime);
        emit ListingUpdated(_listingId, ListingStatus.Leased);
    }
    
    /**
     * @dev Complete a lease (when lease period ends)
     */
    function completeLease(uint256 _listingId) external {
        require(_listingId <= _listingIds.current(), "Listing does not exist");
        require(
            listings[_listingId].owner == msg.sender || 
            listings[_listingId].currentLessee == msg.sender,
            "Only owner or lessee can complete lease"
        );
        require(listings[_listingId].status == ListingStatus.Leased, "Listing not currently leased");
        require(block.timestamp >= listings[_listingId].leaseEndTime, "Lease period not ended");
        
        address lessee = listings[_listingId].currentLessee;
        
        // Reset listing to available
        listings[_listingId].status = ListingStatus.Available;
        listings[_listingId].currentLessee = address(0);
        listings[_listingId].leaseEndTime = 0;
        listings[_listingId].updatedAt = block.timestamp;
        
        emit LeaseCompleted(_listingId, lessee);
        emit ListingUpdated(_listingId, ListingStatus.Available);
    }
    
    /**
     * @dev Get listing details
     */
    function getListing(uint256 _listingId) external view returns (Listing memory) {
        require(_listingId <= _listingIds.current(), "Listing does not exist");
        return listings[_listingId];
    }

    /**
     * @dev Get basic listing info (reduced parameters)
     */
    function getListingBasic(uint256 _listingId) external view returns (
        address owner,
        string memory title,
        string memory location,
        uint256 size,
        uint256 price,
        ListingStatus status
    ) {
        require(_listingId <= _listingIds.current(), "Listing does not exist");
        Listing storage listing = listings[_listingId];
        return (
            listing.owner,
            listing.title,
            listing.location,
            listing.size,
            listing.price,
            listing.status
        );
    }
    
    /**
     * @dev Get all available listings
     */
    function getAvailableListings() external view returns (uint256[] memory) {
        uint256 totalListings = _listingIds.current();
        uint256[] memory tempArray = new uint256[](totalListings);
        uint256 availableCount = 0;
        
        for (uint256 i = 1; i <= totalListings; i++) {
            if (listings[i].status == ListingStatus.Available) {
                tempArray[availableCount] = i;
                availableCount++;
            }
        }
        
        // Create array with exact size
        uint256[] memory availableListings = new uint256[](availableCount);
        for (uint256 i = 0; i < availableCount; i++) {
            availableListings[i] = tempArray[i];
        }
        
        return availableListings;
    }
    
    /**
     * @dev Get listings owned by an address
     */
    function getOwnerListings(address _owner) external view returns (uint256[] memory) {
        return ownerListings[_owner];
    }
    
    /**
     * @dev Get lease requests for a listing
     */
    function getLeaseRequests(uint256 _listingId) external view returns (LeaseRequest[] memory) {
        require(_listingId <= _listingIds.current(), "Listing does not exist");
        return leaseRequests[_listingId];
    }
    
    /**
     * @dev Get total number of listings
     */
    function getTotalListings() external view returns (uint256) {
        return _listingIds.current();
    }
    
    /**
     * @dev Cancel a listing (only owner)
     */
    function cancelListing(uint256 _listingId) external {
        require(_listingId <= _listingIds.current(), "Listing does not exist");
        require(listings[_listingId].owner == msg.sender, "Only owner can cancel listing");
        require(listings[_listingId].status != ListingStatus.Leased, "Cannot cancel leased listing");
        
        listings[_listingId].status = ListingStatus.Cancelled;
        listings[_listingId].updatedAt = block.timestamp;
        
        emit ListingUpdated(_listingId, ListingStatus.Cancelled);
    }
}
