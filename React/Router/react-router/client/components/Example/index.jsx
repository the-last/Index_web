// configuration 
import './Example.scss';
import React from 'react';
import { Route, Link } from "react-router-dom";

const OPTIONS = [
    {id: 1, name: '音乐', addr: 'music' },
    {id: 2, name: '体育', addr: 'gym' },
    {id: 3, name: '电影', addr: 'movie' },
    {id: 4, name: '新闻', addr: 'news' },
    {id: 5, name: '反馈', addr: 'questions' }
]

const Example = ({ match }) => (
  <div>
        <h2>二级路由</h2>
        <ul className="option-list">
        {
            OPTIONS.map(item => (
                <li className="option-item" key={item.id}>
                    <Link className='icon' to={`/child/${item.addr}`} >
                        {item.name}      
                    </Link>
                </li>
            ))
        } 
        </ul>
        <Route path={`${match.url}/:optionId`} component={Option}/>
        <Route exact path={`${match.url}`} render={() => (
            <div>使用一个组件，请选择一种操作</div>
        )} />
  </div>
)
const Option = ({ match }) => (
    <div>
      <h3>{match.params.optionId}</h3>
      {
          
      }
    </div>
)


export default Example;