import React, { Component } from 'react';
import SplitPane from 'react-split-pane';

import SourcePanelComponent from './SourcePanelComponent';
import OutputComponent from './OutputComponent';

class App extends Component {
  render() {
    return (
      <div>
        <SplitPane split="vertical" defaultSize="20%">
          <SourcePanelComponent/>
          <SplitPane split="vertical" defaultSize="50%">
            <OutputComponent target='A' defaultCompilationOptions='--bin-runtime'/>
            <OutputComponent target='B' defaultCompilationOptions='--bin-runtime --optimize'/>
          </SplitPane>
        </SplitPane>
      </div>
    );
  }
}

export default App;
