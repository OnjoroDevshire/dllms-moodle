import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/dllms-moodle/',
  plugins: [react()],
  server: {
    proxy: {
      // Proxy API requests during development
      '/webservice/rest/server.php': {
        target: 'http://localhost/moodle/', // Replace with your Moodle server's domain
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/webservice\/rest\/server.php/, '/webservice/rest/server.php'),
      },
    },
  },
})
