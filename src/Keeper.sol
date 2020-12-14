// SPDX-License-Identifier: MIT
pragma solidity ^0.7.4;

/** Contract Store ETH of depositers,
  * Deploy this contract on Remix.
  */

contract Keeper {
    mapping(address => uint) public balanceOf;

    event Deposit(address indexed who, uint amount, uint balance);
    event Withdraw(address indexed who, uint amount, uint balance);

    constructor() public {
    }

    fallback() external payable {
    }

    function deposit() public payable {
        require(msg.value > 0, 'Error, deposit must >= 1 Wei');
        balanceOf[msg.sender] = balanceOf[msg.sender]+msg.value;

        emit Deposit(msg.sender, msg.value, balanceOf[msg.sender]);
    }

    function withdraw(uint amount) public {
        require(balanceOf[msg.sender]>=amount, 'Error, Insufficent balances');
        balanceOf[msg.sender] = balanceOf[msg.sender]-amount;
        msg.sender.transfer(amount);

        emit Withdraw(msg.sender, amount, balanceOf[msg.sender]);
    }
}