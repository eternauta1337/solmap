import React, {Component} from 'react';
import _ from 'lodash';

class CustomTextarea extends Component {

  constructor(props) {
    super(props);
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

  applyMarkHighlights(content) {
    const range = {
      start: 2,
      end: 50
    }
    const pre = content.substring(0, range.start);
    const con = `<mark>${content.substring(range.start, range.end)}</mark>`
    const pos = content.substring(range.end);
    return pre + con + pos;
  }

  wrapContent(content) {
    // content = _.escape(content);
    // content = content.replace(/\r\n/g, '<br>')
    // content = this.applyMarkHighlights(content);
    // content = `<div>${content}</div>`;
    return content;
  }

  unwrapContent(content) {
    // content = content.replace(/<[^>]*>/g, '');
    // content = content.replace(/<br>/g, '\n');
    // content = _.unescape(content);
    return content;
  }

  render() {
    return (
      <div className='container'>

        <textarea
          className='editable_content'
          onChange={evt => this.updateContent(this.unwrapContent(evt.target.value))}
          value={this.wrapContent(this.state.content)}
        />

      </div>
    );
  }
}

export default CustomTextarea;
