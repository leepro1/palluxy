import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

const __dirname = path.resolve();

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  resolve: {
    alias: [
      { find: '@', replacement: path.resolve(__dirname, 'src') },
      { find: '@api', replacement: path.resolve(__dirname, 'src/api') },
      { find: '@assets', replacement: path.resolve(__dirname, 'src/assets') },
      {
        find: '@components',
        replacement: path.resolve(__dirname, 'src/components'),
      },
      { find: '@hooks', replacement: path.resolve(__dirname, 'src/hooks') },
      { find: '@pages', replacement: path.resolve(__dirname, 'src/pages') },
      { find: '@router', replacement: path.resolve(__dirname, 'src/router') },
      { find: '@store', replacement: path.resolve(__dirname, 'src/store') },
      { find: '@style', replacement: path.resolve(__dirname, 'src/style') },
      { find: '@utils', replacement: path.resolve(__dirname, 'src/utils') },
      { find: '@api', replacement: path.resolve(__dirname, 'src/api') },
      { find: '@data', replacement: path.resolve(__dirname, 'src/data') },
      { find: '@layout', replacement: path.resolve(__dirname, 'src/layout') },
    ],
  },
});
