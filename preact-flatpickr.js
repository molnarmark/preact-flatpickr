import { Component, createElement } from 'preact';
import flatpickr from 'flatpickr';

export default class Flatpickr extends Component {
  constructor(props) {
    super(props);

    this.defaultOptions = {
      theme: 'airbnb',
    };

    this.themes = {
      dark: true,
      material_blue: true,
      material_green: true,
      material_red: true,
      material_orange: true,
      airbnb: true,
      confetti: true,
    };

    if (props.theme && !this.themes[props.theme]) {
      console.error('Unsupported theme. Valid themes are: TODO');
    }
    const theme = props.theme || this.defaultOptions.theme;
    import (`flatpickr/dist/themes/${theme}.css`);

    this.state = {
      config: {},
      instance: null,
    };
  }

  render(props) {
    return <input id="flatpickr-instance" />;
  }

  create() {
    const instance = flatpickr('#flatpickr-instance', this.state.config);
    const modifiedConfig = instance.config;

    this.registerEvents(
      [
        'onChange',
        'onClose',
        'onDayCreate',
        'onDestroy',
        'onKeyDown',
        'onMonthChange',
        'onOpen',
        'onParseConfig',
        'onReady',
        'onValueUpdate',
        'onYearChange',
        'onPreCalendarPosition',
      ],
      this.props,
    );

    this.setState({
      config: { ...modifiedConfig, ...this.state.config },
      instance,
    });
  }

  recreate(props) {
    this.state.instance.destroy();
    this.create();
  }

  updateConfiguration(props) {
    let config = this.state.instance.config;

    if (props.config) {
      config = { ...this.state.instance.config, ...props.config };
      Object.keys(props.config).forEach(key => {
        this.state.instance.set(key, props.config[key]);
      });
    }

    this.setState({
      config
    });
  }

  componentWillReceiveProps(props, state) {
    this.updateConfiguration(props);
    this.recreate(props);
  }

  componentDidMount(state) {
    this.create();

    // Recreating so the configuration gets set.
    this.recreate(this.props);
  }

  registerEvents(events, props) {
    events.forEach(event => {
      this.setState({
        config: { ...this.state.config, [event]: props[event] },
      });
    });
  }
}
