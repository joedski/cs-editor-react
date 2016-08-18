/* eslint no-console: "off" */

'use strict';

let path = require( 'path' );

let gulp = require( 'gulp' );
let less = require( 'gulp-less' );
let sourcemaps = require( 'gulp-sourcemaps' );

let LessAutoprefix = require( 'less-plugin-autoprefix' );
let autoprefix = new LessAutoprefix({ browsers: [ 'last 2 versions' ] });

let source = require( 'vinyl-source-stream' );
let buffer = require( 'vinyl-buffer' );
let browserify = require( 'browserify' );
let babelify = require( 'babelify' );



//////// Settings

let sourceDir = 'source';
let outputDir = 'public';
let stylesSourceDir = 'styles';
let stylesOutputDir = 'styles';
let scriptsOutputDir = 'scripts';

let envProduction = process.NODE_ENV === 'production';
// let envDebug = process.NODE_ENV === 'debug' || process.NODE_ENV === '';



//////// General

gulp.task( 'default', [ 'site' ]);
gulp.task( 'watch', [ 'watch-site' ]);

gulp.task( 'site', [
	'site:assets',
	'site:styles',
	'site:scripts',
]);

gulp.task( 'watch-site', () => {
	gulp.watch([ `${ sourceDir }/assets/**/*` ], [
		'site:assets:site',
	]);

	gulp.watch([ `${ sourceDir }/${ stylesSourceDir }/**/*` ], [
		'site:styles',
	]);

	gulp.watch([ `${ sourceDir }/app/**/*` ], [
		'site:scripts',
	]);
});



//////// Scripts

gulp.task( 'site:scripts', [
	'site:scripts:main'
]);

gulp.task( 'site:scripts:main', () => {
	let stream = browserify( `${ sourceDir }/app/index.js`, { debug: envProduction === false })
		.transform( babelify )
		.bundle()
		.on( 'error', function( err ) {
			console.error( err.message );
			if( err.codeFrame ) console.error( err.codeFrame );
			this.emit( 'end' );
		})
		.pipe( source( 'app.js' ) )
		.pipe( buffer() )
		;

	if( envProduction === false ) {
		stream = stream
			.pipe( sourcemaps.init({ loadMaps: true }) )
			.pipe( sourcemaps.write( './' ) )
	}

	stream = stream
		.pipe( gulp.dest( `${ outputDir }/${ scriptsOutputDir }` ) )
		;

	return stream;
});



//////// Assets

gulp.task( 'site:assets', [
	'site:assets:site',
	// 'site:assets:jquery',
	// 'site:assets:bootstrap:scripts',
	'site:assets:bootstrap:fonts',
]);

gulp.task( 'site:assets:site', () => {
	return gulp.src([ `${ sourceDir }/assets/**/*` ])
		.pipe( gulp.dest( `${ outputDir }` ) )
		;
});

gulp.task( 'site:assets:jquery', () => {
	return gulp.src([
		'node_modules/jquery/dist/jquery.min.js',
	], { base: 'node_modules/jquery/dist' })
		.pipe( gulp.dest( `${ outputDir }/${ scriptsOutputDir }` ) )
		;
})

gulp.task( 'site:assets:bootstrap:scripts', () => {
	return gulp.src([
		'node_modules/bootstrap/dist/js/bootstrap.min.js',
	], { base: 'node_modules/bootstrap/dist/js' })
		.pipe( gulp.dest( `${ outputDir }/${ scriptsOutputDir }` ) )
		;
});

gulp.task( 'site:assets:bootstrap:fonts', () => {
	return gulp.src([ 'node_modules/bootstrap/dist/fonts/**/*' ])
		.pipe( gulp.dest( `${ outputDir }/fonts` ) )
		;
});



//////// Styles

gulp.task( 'site:styles', () => {
	return gulp.src([ `${ sourceDir }/${ stylesSourceDir }/*.less` ])
		.pipe( sourcemaps.init() )
		.pipe( less({
			paths: [
				path.join( __dirname, 'node_modules', 'bootstrap', 'less' )
			],
			plugins: [ autoprefix ]
		}))
		.on( 'error', function( err ) { console.error( err.message ); console.error( err.codeFrame ); this.emit( 'end' ); })
		.pipe( sourcemaps.write( './' ) )
		.pipe( gulp.dest( `${ outputDir }/${ stylesOutputDir }` ) )
		;
});

