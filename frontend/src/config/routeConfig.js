// Outsourcing
export const routeConfig = {
	HOME: {
		url: '/'
	},
	AUTH: {
		url: '/auth'
	},
	LOGIN: {
		url: 'login'
	},
	REGISTER: {
		url: 'register'
	},
	USER_ACTIVATE: {
		url: '/user-activate',
		urlID: '/user-activate/:id',
		fullUrl: id => `/user-activate/${id}`
	},
	DASHBOARD: {
		url: '/dashboard'
	},
	MY_PROFILE: {
		url: '/my-profile',
	},
	MY_PRODUCTS: {
		url: '/my-products',
	},
	SHOP: {
		url: '/shop'
	},
}