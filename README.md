# 📅 Preact Flatpickr

[![Open Source Love](https://badges.frapsoft.com/os/v1/open-source.svg?v=102)](https://github.com/ellerbrock/open-source-badge/)
[![Open Source Love](https://badges.frapsoft.com/os/mit/mit.svg?v=102)](https://github.com/ellerbrock/open-source-badge/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)

> Flatpickr component for Preact ported from react-flatpickr.

### Getting Started
Install the package by running:
`npm install --save preact-flatpickr` or `yarn add preact-flatpickr`


### Example
```jsx
import 'flatpickr/dist/themes/material_green.css'

import { Component, h } from 'preact'
import Flatpickr from 'preact-flatpickr'

class App extends Component {
  constructor() {
    super();

    this.state = {
      date: new Date()
    };
  }

  render(props, state) {
    return (
      <Flatpickr
        value={state.date}
        onChange={date => { this.setState({date}) }} />
    )
  }
}
```
* `flatpickr options`: you can pass all `flatpickr parameters` to `props.options`
* All flatpickr [hooks](https://flatpickr.js.org/events/)  can be passed as a JSX prop, or to `props.options`

```jsx
<Flatpickr options={{minDate: '2017-01-01'}} />
```


### Themes
You can import the style for flatpickr manually, like so: `import 'flatpickr/dist/themes/theme.css'`
or you can use the `theme` attribute:
```jsx
<Flatpickr
        theme="material_green"
        value={date}
        onChange={date => { this.setState({date}) }} />
```

Learn more about the themes [here](https://flatpickr.js.org/themes/).


### API
Every [Flatpickr](https://flatpickr.js.org/) configuration option is available.
You can check out every option [here](https://flatpickr.js.org/options/).


### License
- MIT

**I'm new to Preact, so don't bite my head off. 😊**
