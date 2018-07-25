import React, { Component } from 'react';
import SplitPane from 'react-split-pane';

import SourceComponent from './SourceComponent';
import OutputComponent from './OutputComponent';

class App extends Component {
  render() {
    return (
      <div>
        <SplitPane split="vertical" defaultSize="55%">
          <SourceComponent/>
          <OutputComponent/>
        </SplitPane>
      </div>
    );
  }
}

export default App;
