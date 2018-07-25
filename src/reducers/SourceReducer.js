import * as ActionTypes from '../actions/ActionTypes';

const defaultSource = 
`pragma solidity ^0.4.24;

contract Ownable {
  address public owner;

  event OwnershipRenounced(address indexed previousOwner);
  event OwnershipTransferred(
    address indexed previousOwner,
    address indexed newOwner
  );

  constructor() public {
    owner = msg.sender;
  }

  modifier onlyOwner() {
    require(msg.sender == owner);
    _;
  }

  function renounceOwnership() public onlyOwner {
    emit OwnershipRenounced(owner);
    owner = address(0);
  }

  function transferOwnership(address _newOwner) public onlyOwner {
    _transferOwnership(_newOwner);
  }

  function _transferOwnership(address _newOwner) internal {
    require(_newOwner != address(0));
    emit OwnershipTransferred(owner, _newOwner);
    owner = _newOwner;
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
