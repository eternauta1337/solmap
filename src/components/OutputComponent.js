import React, { Component} from 'react';
import { connect } from 'react-redux';
import Store from '../store';
import SourceActions from '../actions/SourceActions';

class OutputComponent extends Component {

  constructor(props) {
    super(props);

    this.state = {
      lastKnownSource: undefined,
      compilationOptions: this.props.defaultCompilationOptions
    };
  }

  requestCompilation() {
    Store.dispatch(
      SourceActions.compileSource(
        this.props.target,
        this.state.compilationOptions
      )
    );
  }

  componentDidMount() {
    this.evaluateCompilation();
  }

  evaluateCompilation() {
    const newSource = Store.getState().SourceReducer.source
    if(newSource !== this.state.lastKnownSource) {
      this.setState({
        lastKnownSource: newSource
      });
      this.requestCompilation(); 
    }
  }

  componentWillReceiveProps(nextProps) {
    this.evaluateCompilation();
  }

  updateCompilationOptions(evt) {
    this.setState({
      compilationOptions: evt.target.value
    });
  }

  evaluateCompilationOptionsKeyPress(evt) {
    if(evt.key === 'Enter') {
      this.requestCompilation();
    }
  }

  render() {
    return(
      <div style={{height: '100%', width: '100%'}}>
        <div className="form-group" style={{height: '100%'}}>
          <input 
            onChange={evt => this.updateCompilationOptions(evt)}
            onKeyPress={evt => this.evaluateCompilationOptionsKeyPress(evt)}
            className='form-control' 
            type='text' 
            value={this.state.compilationOptions}
          />
          <textarea 
            className="form-control" 
            readOnly
            style={{
              width: '100%',
              height: '100%',
              fontFamily: 'monospace', 
              fontSize: 13
            }}
            value={this.props.output[`output${this.props.target}`]}
          />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    source: state.SourceReducer.source,
    output: state.OutputReducer
  };
}

export default connect(mapStateToProps)(OutputComponent);
