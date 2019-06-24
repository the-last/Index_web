import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './style/tabs.scss'
import { classesname } from './utils'

export default class TabPane extends Component {
    static propTypes = {
        tab: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.node
        ]).isRequired,

        order: PropTypes.string.isRequired,
        disable: PropTypes.bool,
        isActive: PropTypes.bool
    }

    render() {
        const { classPrefix, className, isActive, children }  = this.props
        
        const classes = classesname({
            [className]: className,
            [`${classPrefix}-panel`]: true

        })

        return (
            <div
                role="tabpanel"
                className={classes}
                aria-hidden={!isActive}
            >
                {children}
            </div>
        )
    }
}