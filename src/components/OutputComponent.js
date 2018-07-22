import React, { Component} from 'react';
import { connect } from 'react-redux';
import Store from '../store';
import SelectionActions from '../actions/SelectionActions';
import CustomTextarea from './CustomTextarea';

class OutputComponent extends Component {

  onTextAreaSelected(textarea) {
    Store.dispatch(
      SelectionActions.mapSelectionOnSource(
        textarea.value, 
        { start: textarea.selectionStart, end: textarea.selectionEnd }
      )
    );
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps.output);
  }

  updateContent(source) {

  }

  render() {
    return(
      <div className='container'>
        <CustomTextarea 
          initialContent={this.props.output}
          updateCallback={this.updateContent}
          highlightRange={this.props.selection}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    output: state.OutputReducer.output,
    selection: state.SelectionReducer.outputSelRange
  };
}

export default connect(mapStateToProps)(OutputComponent);
