import * as ActionTypes from '../actions/ActionTypes';

const defaultSource = 
`pragma solidity ^0.4.24;

contract BasicToken {
  mapping(address => uint256) balances;

  uint256 totalSupply_;
  constructor(uint256 _initialSupply) public {
      totalSupply_ = _initialSupply;
      balances[msg.sender] =  _initialSupply;
  }

  function totalSupply() public view returns (uint256) {
    return totalSupply_;
  }

  function transfer(address _to, uint256 _value) public returns (bool) {
    require(_to != address(0));
    require(_value <= balances[msg.sender]);

    balances[msg.sender] = balances[msg.sender] - _value;
    balances[_to] = balances[_to] + _value;
    return true;
  }

  function balanceOf(address _owner) public view returns (uint256) {
    return balances[_owner];
  }
}`

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
