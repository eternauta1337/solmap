import React, {Component} from 'react';
import ContentEditable from 'react-contenteditable';
import _ from 'lodash';

class CustomTextarea extends Component {

  constructor() {
    super();
    this.state = { content: '' }
    this.updateContent = this.updateContent.bind(this);
  }

  componentDidMount() {
    this.setState({
      content: this.props.initialContent
    });
  }

  updateContent(content) {
    this.setState({ content });
    this.props.updateCallback(content);
  }

  wrapContent(content) {
    const escaped = _.escape(content);
    return `<div>${escaped}</div>`;
  }

  unwrapContent(html) {
    const withoutTags = html.replace(/<[^>]*>/g, '');
    const unescapedSource = _.unescape(withoutTags);
    return unescapedSource;
  }

  render() {
    return (
      <div className='container'>
        <ContentEditable
          className='editable_content'
          html={this.wrapContent(this.state.content)}
          onChange={evt => this.updateContent(this.unwrapContent(evt.target.value))}
        />
      </div>
    );
  }
}

export default CustomTextarea;
