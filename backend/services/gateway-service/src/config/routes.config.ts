interface RouteConfig {
    path: string,
    target: string,
    auth?: boolean,
    roles?: ('user' | 'seller' | 'admin')[],
    rateLimit?: number
    pathRewrite?: Record<string, string>
}


export const routeConfigs: RouteConfig[] = [
    {
        path: '/auth/register',
        target: 'http://localhost:3000',
        auth: false,
        roles: ['user', 'seller'],
        rateLimit: 100,
        pathRewrite: { '^/': '/register' }
    },
    {
        path: '/auth/health',
        target: 'http://localhost:3000',
        auth: false,
        roles: ['user', 'seller'],
        rateLimit: 100,
        pathRewrite: { '^/': '/health' }
    },
    {
        path: '/auth/login',
        target: 'http://localhost:3000',
        auth: false,
        roles: ['user', 'seller'],
        rateLimit: 100,
        pathRewrite: { '^/': '/login' }
    },
    {
        path: '/auth/verify',
        target: 'http://localhost:3000',
        auth: false,
        roles: ['user', 'seller'],
        rateLimit: 100,
        pathRewrite: { '^/': '/verify' }
    },
    {
        path: '/auth/forgot-password',
        target: 'http://localhost:3000',
        auth: false,
        roles: ['user', 'seller'],
        rateLimit: 100,
        pathRewrite: { '^/': '/forgot-password' }
    },
    {
        path: '/auth/verify-forgot-password-otp',
        target: 'http://localhost:3000',
        auth: false,
        roles: ['user', 'seller'],
        rateLimit: 100,
        pathRewrite: { '^/': '/verify-forgot-password-otp' }
    },
    {
        path: '/auth/update-password',
        target: 'http://localhost:3000',
        auth: false,
        roles: ['user', 'seller'],
        rateLimit: 100,
        pathRewrite: { '^/': '/update-password' }
    },
    {
        path: '/auth/me',
        target: 'http://localhost:3000',
        auth: true,
        roles: ['user', 'seller'],
        rateLimit: 100,
        pathRewrite: { '^/': '/me' }
    },

]