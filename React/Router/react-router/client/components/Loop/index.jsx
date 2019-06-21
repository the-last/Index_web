import React from 'react';
import CSSTransitionGroup from 'react-addons-css-transition-group';
import './Loop.scss';
import slide1 from './imgs/slide1.png';
import slide2 from './imgs/slide2.png';
import slide3 from './imgs/slide3.png';

class Loop extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            step: 0,
            imgSrc: [
                slide1,
                slide2,
                slide3
            ]
        };
        this.previous = this.previous.bind(this);
        this.next = this.next.bind(this);
    }

    previous () {
        if (this.state.step > 0) {
            this.setState({
                step: this.state.step - 1
            })
        } else {
            this.setState({
                step: 2
            })
        }
    }

    next () {
        var step = this.state.step
        if (step < 2) {
            this.setState({
                step: step + 1
            })
        } else {
            this.setState({
                step: 0
            })
        }
    }

    render() {
        return (
            <section className="Loop-container">
                <aside>
                    <button onClick={this.previous}>&lsaquo;</button>
                </aside>
                <section>
                    <div className="pic-container">
                        
                        <CSSTransitionGroup
                            className={"pic-slip"}
                            transitionName={"pic-slip"}
                            transitionEnterTimeout={800}
                            transitionLeaveTimeout={1}>
                            <img
                                key={this.state.imgSrc[this.state.step]}
                                src={this.state.imgSrc[this.state.step]}
                                alt={'轮播图片'}/>
                        </CSSTransitionGroup>
                    </div>
                </section>
                <aside>
                    <button onClick={this.next}>&rsaquo;</button>
                </aside>
            </section>
    );
  }
}

export default Loop;