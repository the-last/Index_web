
/*
*  路由入口
*
**/ 
import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './Router.scss'

import imgHead from './imgs/head.png';
import About from '../components/About';
import Home from '../components/Home';
import Loop from '../components/Loop';
import Example from '../components/Example';
import Auth from '../components/Auth';
const PEEPS = [
    {id: 0, name: 'react动画', addr: 'loop' },
    {id: 1, name: '路由', addr: 'child' },
    {id: 2, name: '其他', addr: 'about' },
    {id: 3, name: '认证', addr: 'auth' }
];

const find = id => PEEPS.find(p => p.id === id);
export default (<Router
    forceRefresh={false} >
    <div>
        
        <ul className="collection">
            <Link to='/' className="head" >
                <img src={imgHead} title="主页" alt="图片-标题头"/>
            </Link>
            <h5>基本操作</h5>
            {   
                [0, 1, 2, 3].map(id =>
                <li className="item" key={id}>
                    <Link to={`/${find(id).addr}`} className="item-link">
                    {find(id).name}
                    </Link>
                </li>)
            }
        </ul>
        <div className="view">
            <Route exact path="/" component={Home}/>
            <Route path="/about" component={About}/>
            <Route path="/loop" component={Loop} />
            <Route path="/child" component={Example} />
            <Route path="/auth" component={Auth} />
        </div>
        
    </div>
</Router>)


