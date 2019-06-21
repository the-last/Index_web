
import ReactDOM from 'react-dom';
import RouteConfig from './Router'
import './index.css';
import registerServiceWorker from './registerServiceWorker';


ReactDOM.render(
    RouteConfig
, document.getElementById('root'))

registerServiceWorker();
