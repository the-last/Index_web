
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './style/tabs.scss'
import { classesname } from './utils'

export default class TabNav extends Component {
    static propTypes = {
        
        classPrefix: PropTypes.string,
        panels: PropTypes.node,
        activeIndex: PropTypes.number,
        onTabClick: PropTypes.func
    };
    
    getTabs () {
        const { panels, classPrefix, activeIndex, position  } = this.props 
        return React.Children.map(panels, child => {
            
            if (!child || typeof child === 'string') {
                return ;
            }

            const order = parseInt(child.props.order, 10)

            let classes = classesname({
                [`${classPrefix}-tab-${position}`]: true,
                [`${classPrefix}-active-${position}`]: activeIndex === order,
                [`${classPrefix}-disabled`]: child.props.disabled                
            })
            let classtab = classesname({
                [`${classPrefix}-bar-line-${position}`]: true
            })

            let events = {}
            if(!child.props.disabled) {
                events = {
                    onClick: this.props.onTabClick.bind(this, order)
                }
            }

            const ref = {}
            if (activeIndex === order) {
                ref.ref = 'activeTab';
            }
            return (
                <li
                   role = 'tab'
                   aria-disabled={child.props.disabled ? 'true' : 'false'}
                   aria-selected={activeIndex === order ? 'true' : 'false'}
                   {...events}
                   className={classes}
                   key={order}
                   {...ref}
                >
                    {child.props.tab}
                    <div className={classtab}></div>
                </li>
            )

        })
    }
    
    render() {
        const { classPrefix } = this.props
        
        const rootClasses = classesname({
            [`${classPrefix}-bar`]: true,
        })

        const classes = classesname({
            [`${classPrefix}-nav`]: true
        })
        
        return (
            <div
                className={rootClasses}
                role = "tablist"
            >
                <div className={classes}>
                    {this.getTabs()}
                </div>
                
            </div>
        )
    }

}