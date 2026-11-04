import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
	plugins: [react()],
	server: {
		host: '0.0.0.0',
		allowedHosts: [
		'ivaans-clothings-alb-67130045.ap-southeast-2.elb.amazonaws.com'
		]
	}
})
