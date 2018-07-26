import * as ActionTypes from '../actions/ActionTypes';

const defaultSource = 
// `pragma solidity ^0.4.24;

// contract BasicToken {
//   mapping(address => uint256) balances;

//   uint256 totalSupply_;
//   constructor(uint256 _initialSupply) public {
//       totalSupply_ = _initialSupply;
//       balances[msg.sender] =  _initialSupply;
//   }

//   function totalSupply() public view returns (uint256) {
//     return totalSupply_;
//   }

//   function transfer(address _to, uint256 _value) public returns (bool) {
//     require(_to != address(0));
//     require(_value <= balances[msg.sender]);

//     balances[msg.sender] = balances[msg.sender] - _value;
//     balances[_to] = balances[_to] + _value;
//     return true;
//   }

//   function balanceOf(address _owner) public view returns (uint256) {
//     return balances[_owner];
//   }
// }`
`6080604052348015600f57600080fd5b50609c8061001e6000396000f300608060405260043610603e5763ffffffff7c0100000000000000000000000000000000000000000000000000000000600035041663c1c14ef881146043575b600080fd5b348015604e57600080fd5b5060556068565b6040805191825251602090910181900390f35b6003600201905600a165627a7a723058202fbf193744be01570c776ae17d0e23a2dc5c93eac5b2619b1eac16f61ed37e2e0029`

const initialState = { 
  name: 'SourceReducer',
  source: defaultSource
};

const SourceReducer = (state = initialState, action) => {
  let newState = state;

  if(action.type === ActionTypes.SOURCE_UPDATED) {
    newState = {
      ...state,
      source: action.source
    }
  }

  return newState;
};

export default SourceReducer;
