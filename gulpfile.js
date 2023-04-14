import gulp from 'gulp';
import { rimraf } from 'rimraf';

import postcss from 'gulp-postcss';
import postcssImport from 'postcss-import';
import postcssCsso from 'postcss-csso';
import postcssMinMax from 'postcss-media-minmax';

import babel from 'gulp-babel';
import terser from 'gulp-terser';

import htmlmin from 'gulp-htmlmin';

import imagemin, { gifsicle, mozjpeg, optipng } from 'gulp-imagemin';

const { src, dest, series, parallel } = gulp;

/**
 * Processing CSS
 */

const getPostcssTask = () =>
	postcss([postcssImport, postcssCsso, postcssMinMax]);

const stylesBasePostcss = () => {
	return src('src/**/*.css').pipe(getPostcssTask()).pipe(dest('dist'));
};

/**
 * Processing JS
 */

const scripts = () => {
	return src('src/**/*.js').pipe(babel()).pipe(terser()).pipe(dest('dist'));
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

const html = () => {
	return src('src/**/*.html').pipe(htmlmin(htmlminOptions)).pipe(dest('dist'));
};

/**
 * Processing Images
 */
const IMG_EXTENSIONS = 'jpg,webp,png,jpeg,bmp,gif,svg,avif';

/**
 * @type {import('gulp-imagemin').Options[]}
 */
const imageminOptions = [
	imagemin.gifsicle({ interlaced: true }),
	imagemin.mozjpeg({ quality: 75, progressive: true }),
	imagemin.optipng({ optimizationLevel: 5 }),
];

const images = () => {
	return src(`src/**/*.{${IMG_EXTENSIONS}}`)
		.pipe(imagemin(imageminOptions))
		.pipe(dest('dist'));
};

/**
 * Processing rest files
 */
const REST_EXTENSIONS = 'woff,woff2,eot,ttf,doc,docx,mp3,mp4,ppt,pptx,pdf';

const copyRestFiles = () => {
	return src(`src/**/*.{${REST_EXTENSIONS}}`).pipe(dest('dist'));
};

export const clean = () => {
	return rimraf(['dist'], {
		glob: true,
	});
};

export const build = parallel(
	stylesBasePostcss,
	scripts,
	html,
	images,
	copyRestFiles
);

export default series(clean, build);
