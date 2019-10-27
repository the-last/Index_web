
const route_config = [
    {
        path: '/hello',
        component: 'HELLO',
        children: [{
            path: '/water',
            component: 'WATER'
        }]
    },
    {
        path: '/market',
        component: 'MARKET',
        children: [{
            path: '/vegetable',
            component: 'VEGE',
            children: [{
                path: '/tomato',
                component: 'TOMATO',
                
            }]
        }]
    },
    {
        path: '/food',
        component: 'FOOD'
    },
    {
        path: '/banana',
        component: 'BANANA'
    }
];

module.exports = route_config;
