const express = require('express');
const userRoute = require('./user.route');
const authRoute = require('./auth.route');
const basketRoute = require('./basket.route');
const brandRoute = require('./brand.route');
const productRoute = require('./product.route');

const router = express.Router();

const defaultRoutes = [
    {
        path: '/users',
        route: userRoute,
    },
    {
        path: '/auth',
        route: authRoute,
    },
    {
        path: '/products',
        route: productRoute,
    },
    {
        path: '/brands',
        route: brandRoute,
    },
    {
        path: '/baskets',
        route: basketRoute
    }
];

defaultRoutes.forEach((route) => {
    router.use(route.path, route.route);
});

module.exports = router;
