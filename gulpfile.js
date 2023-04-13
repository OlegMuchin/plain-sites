import gulp from 'gulp';
import { rimraf } from 'rimraf';

import postcss from 'gulp-postcss';
import postcssImport from 'postcss-import';
import postcssCsso from 'postcss-csso';
import postcssMinMax from 'postcss-media-minmax';

import babel from 'gulp-babel';
import terser from 'gulp-terser';

import htmlmin from 'gulp-htmlmin';

const { src, dest, series, parallel } = gulp;

/**
 * Processing CSS
 */

const getPostcssTask = () =>
	postcss([postcssImport, postcssCsso, postcssMinMax]);

const stylesBasePostcss = async () => {
	return src('./src/**/*.css').pipe(getPostcssTask()).pipe(dest('./dist'));
};

/**
 * Processing JS
 */

const scripts = async () => {
	return src('./src/**/*.js').pipe(babel()).pipe(terser()).pipe(dest('./dist'));
};

/**
 * Processing HTML
 */

/**
 * @type {import('html-minifier').Options}
 */
const htmlminOptions = {
	caseSensitive: true,
	collapseBooleanAttributes: true,
	collapseInlineTagWhitespace: true,
	collapseWhitespace: true,
	html5: true,
	minifyCSS: true,
	minifyJS: true,
	minifyURLs: true,
	processScripts: false,
	sortAttributes: true,
	removeComments: true,
};

const html = async () => {
	return src('./src/**/*.html')
		.pipe(htmlmin(htmlminOptions))
		.pipe(dest('./dist'));
};

export const clean = async () => {
	return rimraf(['./dist'], {
		glob: true,
	});
};

export const build = parallel(stylesBasePostcss, scripts, html);

export default series(clean, build);
