import React, { Component } from 'react';
import SplitPane from 'react-split-pane';

import SourcePanelComponent from './SourcePanelComponent';
import OutputComponent from './OutputComponent';

class App extends Component {
  render() {
    return (
      <div>
        <SplitPane split="vertical" defaultSize="40%">
          <SourcePanelComponent/>
          <OutputComponent/>
        </SplitPane>
      </div>
    );
  }
}

export default App;
