import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './style/tabs.scss'
import TabNav from './TabNav.js'
import TabContent from './TabContent.js'

export default class Tabs extends Component {
    static propTypes = {
        className: PropTypes.string,
        // 统一样式前缀
        classPrefix: PropTypes.string,
        position: PropTypes.string,
        children: PropTypes.oneOfType([
            PropTypes.arrayOf(PropTypes.node),
            PropTypes.node
        ]),
        defaultActiveIndex: PropTypes.number,
        activeIndex: PropTypes.number,
        onChange: PropTypes.func
    };
    static defaultProps = {
        classPrefix: 'tabs',
        position: 'top',
        onChange: () => { }
    };

    constructor(props) {
        super(props)
        
        // 方法banding
        this.handleTabClick = this.handleTabClick.bind(this)
        const { activeIndex, defaultActiveIndex } = this.props
        let activeIndex_;
        if(activeIndex) {
            activeIndex_ = activeIndex
        } else if (defaultActiveIndex) {
            activeIndex_ = defaultActiveIndex
        }
        
        this.state = {
            activeIndex: activeIndex_,
            prevIndex: activeIndex_,

        }

    };
    
    componentWillReceiveProps = (nextProps) => {
      if ('activeIndex' in nextProps) {
        this.setState({
            activeIndex: nextProps.activeIndex
        })
      }
    }

    handleTabClick(activeIndex) {
        const prevIndex = this.state.activeIndex
        
        if (this.state.activeIndex !== activeIndex && 'defaultActiveIndex' in this.props) {
            this.setState({
                activeIndex,
                prevIndex
            });

            this.props.onChange({activeIndex, prevIndex})
        }

    }

    renderTabNav() {
        const { classPrefix, children, position } = this.props;
        return (
            <TabNav
                key="tabBar"
                classPrefix={classPrefix}
                onTabClick={this.handleTabClick}
                panels={children}
                activeIndex={this.state.activeIndex}
                position={position}
            >
            </TabNav>
        )
    }

    renderTabContent() {
        const { classPrefix, children } = this.props;
        return (
            <TabContent
                key="tabContent"
                classPrefix={classPrefix}
                panels={children}
                activeIndex={this.state.activeIndex}
            >
            </TabContent>
        )
    }
    
    render() {
        const { className, position } = this.props;
        const classes = className ? className + ' ui-tabs' : 'ui-tabs';

        return (
            <div className={classes} {...this.props}>
                <div className={`ui-tabs-${position === 'bottom' ? 'content' : 'nav'}-${position}`}>
                    { position === 'bottom' ? this.renderTabContent() : this.renderTabNav() }
                </div>
                <div className={`ui-tabs-${position === 'bottom' ? 'nav' : 'content'}-${position}`}>
                    { position === 'bottom' ? this.renderTabNav() : this.renderTabContent() }
                </div>
            </div>
        )
    }
}
