import React, {Component} from 'react';
import {connect} from 'react-redux';
import Store from '../store'
import SourceActions from '../actions/SourceActions';

class SourceComponent extends Component {

  constructor() {
    super();
    this.updateSource = this.updateSource.bind(this);
  }

  componentDidMount() {
    Store.dispatch(SourceActions.compileSource());
  }

  updateSource(evt) {
    const source = evt.target.value;
    Store.dispatch(SourceActions.sourceUpdated(source));
    Store.dispatch(SourceActions.compileSource());
  }

  componentWillReceiveProps(nextProps) {
    // console.log(`nextProps: ${ JSON.stringify(nextProps, null, 2) }`);
  }

  render() {
    return (
      <div className='container'>
        <textarea
          style={{
            width: '100%',
            height: '100%',
            fontFamily: 'monospace', 
            fontSize: 13
          }}
          onChange={evt => this.updateSource(evt)}
          value={this.props.source}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    source: state.SourceReducer.source,
    selection: state.SelectionReducer.sourceSelRange
  };
}

export default connect(mapStateToProps)(SourceComponent);
