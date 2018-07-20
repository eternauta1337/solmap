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
      <div style={{height: '100%'}}>
        <div className="form-group" style={{height: '100%'}}>
          <textarea 
            className="form-control rounded-0" 
            style={{
              height: '100%',
              fontFamily: 'monospace', 
              fontSize: 13
            }}
            onChange={evt => this.updateSource(evt)}
            value={this.props.source}/>
        </div>
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
