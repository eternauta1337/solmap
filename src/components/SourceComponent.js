import React, {Component} from 'react';
import {connect} from 'react-redux';
import Store from '../store';
import CompilationActions from '../actions/CompilationActions';
import CustomTextarea from './CustomTextarea';

class SourceComponent extends Component {

  constructor() {
    super();
    this.updateSource = this.updateSource.bind(this);
  }

  updateSource(source) {
    Store.dispatch(CompilationActions.sourceUpdated(source));
    Store.dispatch(CompilationActions.compileSource());
  }

  render() {
    return (
      <div className='container'>
        <CustomTextarea 
          initialContent={this.props.source}
          updateCallback={this.updateSource}
          highlightRange={this.props.selection}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    source: state.SourceReducer.source,
    selection: state.MappingReducer.sourceSelRange
  };
}

export default connect(mapStateToProps)(SourceComponent);
