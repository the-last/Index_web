import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class EventReact extends Component {
    constructor(){
        super();
        this.state= {
            inputValue: ''
        }
        this.inputnode = '';
    }
    componentDidMount() {
        const $parent = ReactDOM.findDOMNode(this)
        const $child = $parent.querySelector('input')
        console.log($parent, $child, 10000000)
        
        $parent.addEventListener('click', this.onParentDOMClick, false)
        $child.addEventListener('click', this.onChildDOMClick, false)

    }

    onParentDOMClick = () => {
        console.log(800, '父级原生domclick事件--- 冒泡');
    }

    onChildDOMClick = () => {
        console.log(801, '子级原生domclick事件--- 冒泡');
    }


    keydownEvent = (e) => {
        e.stopPropagation();
        // e.preventDefault();
        console.log(900, 'key down event');
    }
    keyUpEvent = (e) => {
        // e.stopPropagation();
        // e.preventDefault();
        console.log(903, 'key up event');
    }
    inputOnChange = (e) => {
        console.log(902, 'onchange event 依赖keydown事件');
    }
    inputOnClick = () => {
        console.log(899, 'onclick event 冒泡');
    }
    inputOnCaptureClick = () => {
        console.log(899, '--capture onclick event 捕获 ');
    }
    onInput = () => {
        console.log(901, 'onInput 事件');
    }
    focusEvent = (e) => {
        console.log(898, 'on focus enent');
    }
    focusEventParent = () => {
        console.log(897, 'divnode  parent onfocus event pop，厉害了我的哥，父级都能支持冒泡！')
    }
    blurEvent = (e) => {
        console.log(904, 'on blur enent');
    }
    blurEventParent = () => {
        console.log(905, 'divnode parent on blur enent 失去焦点 父级冒泡？');
    }

    onliClick = (flag) => {
        console.log(`${flag} 个被点击`);
    }

    render() {
        return (
            <div
                onFocus={this.focusEventParent}
                onBlur={this.blurEventParent}
            >
                <input
                    ref={node => this.inputnode = node}
                    value={this.state.inputValue}
                    onFocus={this.focusEvent}
                    onBlur={this.blurEvent}
                    onClick={this.inputOnClick}
                    onClickCapture={this.inputOnCaptureClick}
                    onKeyDown={this.keydownEvent}
                    onChange={this.inputOnChange}
                    onKeyUp={this.keyUpEvent}
                    onInput={this.onInput}
                />
                <ul>
                    {
                        [0,1,2,3,4].map((v, i) => {
                            return <li key={i} onClick={this.onliClick.bind(this, v)}>{`点击第 ${v} 个`}</li> 
                        })
                    }
                </ul>
            </div>
        )
    }
}

export default EventReact
