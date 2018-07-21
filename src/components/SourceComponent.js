import React, {Component} from 'react';
import {connect} from 'react-redux';
import Store from '../store'
import SourceActions from '../actions/SourceActions';
import ContentEditable from 'react-contenteditable';
import _ from 'lodash';

class SourceComponent extends Component {

  constructor() {
    super();

    this.state = {
      source: ''
    }

    this.updateSource = this.updateSource.bind(this);
  }

  componentDidMount() {

    // Set initial source.
    this.setState({
      source: this.props.source
    });

    Store.dispatch(SourceActions.compileSource());
  }

  updateSource(source) {

    // Update component state.
    this.setState({
      source: source
    });

    // Update redux state and trigger re-compilation.
    Store.dispatch(SourceActions.sourceUpdated(source));
    Store.dispatch(SourceActions.compileSource());
  }

  wrapSource(source) {

    // String to html.
    const escapedSource = _.escape(source);
    return `<div>${escapedSource}</div>`;
  }

  unwrapSource(html) {

    // Html to string.
    const withoutTags = html.replace(/<[^>]*>/g, '');
    const unescapedSource = _.unescape(withoutTags);
    return unescapedSource;
  }

  render() {
    return (
      <div className='container'>
        <ContentEditable
          className='editable_content'
          html={this.wrapSource(this.state.source)}
          onChange={evt => this.updateSource(this.unwrapSource(evt.target.value))}
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
