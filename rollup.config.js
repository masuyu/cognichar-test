import replace from 'rollup-plugin-replace';
import babel from 'rollup-plugin-babel';
import css from 'rollup-plugin-css-porter';
import svg from 'rollup-plugin-svg';
import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import uglify from 'rollup-plugin-uglify-es';

const env = process.env.NODE_ENV;

export default {
  input: 'src/index.js',
  output: {
    inlineDynamicImports : true,
    file: 'build/js/bundle.js',
    format: 'iife',
  },
  plugins: [
    replace({ 'process.env.NODE_ENV': JSON.stringify(env) }),
    babel({
      exclude: ['node_modules/**'],
      presets: ['@babel/env', '@babel/preset-react'],
    }),
    css({ dest: 'build/css/bundle.css', raw: false, minified: true }),
    svg({ base64: true }),
    nodeResolve({ browser: true }),
    commonjs(),
    env === 'production' && uglify(),
  ],
};
