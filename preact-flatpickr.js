import {Component, h} from 'preact'
import Flatpickr from 'flatpickr'

const themes = [
    'dark',
    'material_blue',
    'material_green',
    'material_red',
    'material_orange',
    'airbnb',
    'confetti',
]
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

    static defaultProps = {
        options: {}
    }

    constructor({theme, ...props}) {
        super(props)
        if (theme && !themes.includes(theme)) {
            console.error(`the theme ${theme} is not valid. Valid themes: ${themes.join(", ")}`)
        }
        else if (theme) {
            require(`flatpickr/dist/themes/${theme}.css`)
        }
        this.bindNode = node => this.node = node
    }

    componentWillReceiveProps(props) {
        const {options} = props
        const prevOptions = this.props.options

        // Add prop hooks to options
        hooks.forEach(hook => {
            if (props.hasOwnProperty(hook)) {
                options[hook] = props[hook]
            }
            // Add prev ones too so we can compare against them later
            if (this.props.hasOwnProperty(hook)) {
                prevOptions[hook] = this.props[hook]
            }
        })

        const optionsKeys = Object.getOwnPropertyNames(options)

        for (let index = optionsKeys.length - 1; index >= 0; index--) {
            const key = optionsKeys[index]
            let value = options[key]

            if (value !== prevOptions[key]) {
                // Hook handlers must be set as an array
                if (hooks.indexOf(key) !== -1 && !Array.isArray(value)) {
                    value = [value]
                }

                this.flatpickr.set(key, value)
            }
        }

        if (props.hasOwnProperty('value') && props.value !== this.props.value) {
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
            if (this.props[hook]) {
                options[hook] = this.props[hook]
            }
        })

        this.flatpickr = new Flatpickr(this.node, options)

        if (this.props.hasOwnProperty('value')) {
            this.flatpickr.setDate(this.props.value, false)
        }
    }

    componentWillUnmount() {
        this.flatpickr.destroy()
    }

    render() {
        // eslint-disable-next-line no-unused-vars
        const {options, theme, defaultValue, value, children, ...props} = this.props

        // Don't pass hooks to dom node
        hooks.forEach(hook => {
            delete props[hook]
        })

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
