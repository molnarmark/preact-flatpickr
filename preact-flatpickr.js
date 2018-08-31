import {Component, h} from 'preact';
import Flatpickr from 'flatpickr'

const themes = [
    'dark',
    'material_blue',
    'material_green',
    'material_red',
    'material_orange',
    'airbnb',
    'confetti',
];
const hooks = [
    'onChange',
    'onOpen',
    'onClose',
    'onMonthChange',
    'onYearChange',
    'onReady',
    'onValueUpdate',
    'onDayCreate'
]

class PreactFlatpickr extends Component {
    constructor(props) {
        super(props);
        if (props.theme) {
            if (themes.includes(props.theme)) {
                require(`flatpickr/dist/themes/${props.theme}.css`);
            }
            else {
                console.error(`the theme ${props.theme} is not valid. Valid themes: ${themes.join(", ")}`);
            }
        }
        this.bindNode = node => this.node = node;
    }

    componentWillReceiveProps(props) {
        const {options} = props
        const prevOptions = this.props.options

        // Add prop hooks to options
        hooks.forEach(hook => {
            if (props[hook] !== undefined) {
                options[hook] = props[hook]
            }
            // Add prev ones too so we can compare against them later
            if (this.props[hook] !== undefined) {
                prevOptions[hook] = this.props[hook]
            }
        })

        const optionsKeys = Object.getOwnPropertyNames(options)

        optionsKeys.forEach(key => {
            let value = options[key]

            if (value !== prevOptions[key]) {
                // Hook handlers must be set as an array
                if (hooks.includes(key) && !Array.isArray(value)) {
                    value = [value]
                }
                this.flatpickr.set(key, value)
            }
        });

        if (props.value !== undefined && props.value !== this.props.value) {
            this.flatpickr.setDate(props.value, false)
        }
    }

    componentDidMount() {
        const options = {
            onClose: () => {
                this.node.blur && this.node.blur()
            },
            ...this.props.options
        }

        // Add prop hooks to options
        hooks.forEach(hook => {
            if (this.props[hook] !== undefined) {
                options[hook] = this.props[hook]
            }
        })

        this.flatpickr = new Flatpickr(this.node, options)

        if (this.props.value !== undefined) {
            this.flatpickr.setDate(this.props.value, false)
        }
    }

    componentWillUnmount() {
        this.flatpickr.destroy()
    }

    render() {
        // eslint-disable-next-line no-unused-vars
        const {options, defaultValue, value, children, theme, ...props} = this.props

        // Don't pass hooks to dom node
        hooks.forEach(hook => delete props[hook]);

        return options.wrap
            ? (
                <div {...props} ref={this.bindNode}>
                    {children}
                </div>
            )
            : (
                <input {...props} defaultValue={defaultValue}
                       ref={this.bindNode}/>
            )
    }

}

export default PreactFlatpickr
