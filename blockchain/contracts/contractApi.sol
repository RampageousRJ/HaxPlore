// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

contract contractApi {
    struct Record {
        string bookingId;
        string transactionId;
    }
    address owner;

    Record public removeMe; 

    mapping (string => Record) public records;
    Record[] public recordArray;

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner {
        require(msg.sender == owner, "Only owner can perform this action");
        _;
    }

    function setRecord (string memory _bookingId, string memory _transactionId) public onlyOwner {
        Record memory record = Record(_bookingId, _transactionId);
        records[_bookingId] = record; 
        recordArray.push(record);
    }

    function getRecord (string memory _bookingId) public view returns (string memory) {
        require(bytes(records[_bookingId].bookingId).length != 0, "Record is not available");
        return records[_bookingId].transactionId;
    }

    function getAllRecords() public view returns (Record[] memory){
        return recordArray;
    }

    function deleteRecord(string memory _bookingId) public onlyOwner {
        require(bytes(records[_bookingId].bookingId).length != 0, "Record is not available");
        delete records[_bookingId];
        for (uint i = 0; i < recordArray.length; i++) {
            if (keccak256(bytes(recordArray[i].bookingId)) == keccak256(bytes(_bookingId))) {
                removeMe = recordArray[i];
                recordArray[i] = recordArray[recordArray.length-1];
                recordArray[recordArray.length - 1] = removeMe;
            }
        }
        recordArray.pop();
    }
}
