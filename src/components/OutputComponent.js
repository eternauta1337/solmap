import React, { Component} from 'react';
import { connect } from 'react-redux';
import Store from '../store';
import SelectionActions from '../actions/SelectionActions';

class OutputComponent extends Component {

  onTextAreaSelected(textarea) {
    Store.dispatch(
      SelectionActions.mapSelectionOnSource({
        start: textarea.selectionStart,
        end: textarea.selectionEnd
      })
    );
  }

  render() {
    return(
      <div style={{height: '100%', width: '100%'}}>
        <div className="form-group" style={{height: '100%'}}>
          <textarea 
            className="form-control" 
            readOnly
            style={{
              width: '100%',
              height: '100%',
              fontFamily: 'monospace', 
              fontSize: 13
            }}
            onSelect={evt => this.onTextAreaSelected(evt.target)}
            value={this.props.output}
          />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    source: state.SourceReducer.source,
    output: state.OutputReducer.output
  };
}

export default connect(mapStateToProps)(OutputComponent);
