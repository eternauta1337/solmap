import React, { Component} from 'react';
import { connect } from 'react-redux';
import Store from '../store';
import SelectionActions from '../actions/SelectionActions';
import CustomTextarea from './CustomTextarea';

class OutputComponent extends Component {

  onTextAreaSelected(textarea) {
    const range = { start: textarea.selectionStart, end: textarea.selectionEnd };
    Store.dispatch(
      SelectionActions.mapSelectionOnSource(
        textarea.value, 
        range
      )
    );
  }

  render() {
    return(
      <div className='container'>
        <CustomTextarea 
          initialContent={this.props.output}
          highlightRange={this.props.selection}
          onSelect={textarea => this.onTextAreaSelected(textarea)}
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
