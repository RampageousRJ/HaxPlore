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

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner {
        require(msg.sender == owner);
        _;
    }

    function setRecord (string memory _bookingId,string memory _transactionId) public onlyOwner {
        Record memory record = Record(_bookingId, _transactionId);
        records[_bookingId] = record; 
    }

    function getRecord (string memory _bookingId) public view returns (string memory) {
        require(bytes(records[_bookingId].bookingId).length !=0 , "Record is not available");
        Record memory record = records[_bookingId];
        return (record.transactionId);
    }

    /*function getAllRecords() public view returns (Record[] memory){
        return RecordArray;
    }*/

    /*function updateRecord(uint256 _bookingId, string memory _name, uint256 _price, uint256 _quantity) public onlyOwner {
        require(records[_bookingId].bookingId !=0 , "Record is not available");
        deleteRecord(_bookingId);
        records[_bookingId] = Record(_bookingId, _name, _price, _quantity);
        RecordArray.push(Record(_bookingId, _name, _price, _quantity));
    }
    */

    function deleteRecord(string memory _bookingId) public onlyOwner {
        require(bytes(records[_bookingId].bookingId).length !=0 , "Record is not available");
        delete records[_bookingId];
    }

}