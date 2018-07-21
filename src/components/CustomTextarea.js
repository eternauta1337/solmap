import React, {Component} from 'react';

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
    this.updateHighlights(this.props.initialContent);
  }

  updateContent(content) {
    this.setState({ content });
    this.props.updateCallback(content);
    this.updateHighlights(content);
  }

  updateHighlights(content) {
    const range = {
      start: 2,
      end: 150
    }
    const pre = content.substring(0, range.start);
    const con = `<mark>${content.substring(range.start, range.end)}</mark>`
    const pos = content.substring(range.end);
    this.refs.highlights.innerHTML = pre + con + pos;
  }

  render() {
    return (
      <div className='container'>

        {/* 
          NOTE: The technique used below for custom highlights in a textarea
          is based on creating a div copy of the textarea behind it, and editing
          its html content with mark tags. It is extremely fragile in terms that the textarea
          and the div need to look identical with css. Tried other options like react components
          and contenteditable divs and they are full of quirks. 
          The technique used here is ugly, but works.
        */}

        {/* Underlay dummy just for highlights. */}
        <div className="backdrop">
          <div class="highlights" ref="highlights"> </div>
        </div>

        {/* Visible/editable text. */}
        <textarea
          className='editable_content'
          onChange={evt => this.updateContent(evt.target.value)}
          value={this.state.content}
        />

      </div>
    );
  }
}

export default CustomTextarea;
