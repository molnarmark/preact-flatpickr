# 📅 Preact Flatpickr

[![Open Source Love](https://badges.frapsoft.com/os/v1/open-source.svg?v=102)](https://github.com/ellerbrock/open-source-badge/)
[![Open Source Love](https://badges.frapsoft.com/os/mit/mit.svg?v=102)](https://github.com/ellerbrock/open-source-badge/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)

> Flatpicker component for Preact.

### Getting Started

Install the package by running:
```
npm install --save preact-flatpickr
```

### Example
```javascript
import { Component } from 'preact';
import Flatpickr from 'preact-flatpickr';

export default class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      flatpickrConfig: {
        'weekNumbers': true
      }
    }
  }
  render() {
    return (
      <div>
        <Flatpickr
          theme="dark"
          config={this.state.flatpickrConfig}
          onChange={() => console.log('You just changed the date.')}>
        </Flatpickr>
      </div>
    );
  }
}
```

### API

Every [Flatpickr](https://flatpickr.js.org/) configuration option is available.
You can check out every option [here](https://flatpickr.js.org/options/).
You can also set themes via the `theme` attribute. Learn more about the options [here](https://flatpickr.js.org/themes/).

### License
- MIT

* I'm new to Preact, do don't bite my head off. 😊