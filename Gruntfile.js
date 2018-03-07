module.exports = grunt => {

    grunt.initConfig({
        
        jshint: {
            src: [
                'src/js/**/*.js',
                'src/js/*.js'
            ]
        },
        clean: {
            src: [
                'vendor/',
                '.tpm/',
                'dist/',
                'src/css/*.css',
                'src/css/*.css.map'
            ]
        },
        sass: {
            dist: {
                options: {
                    style: 'expanded',
                },
                files: {
                    'src/css/main.css': 'src/scss/main.scss'
                }
            }
        },
        imagemin: {
            dynamic: {
                files: [{
                    cwd: 'src/',
                    expand: true,
                    src: [
                        '**/*.{png,jpg,gif}',
                        '*.{png,jpg,gif}'
                    ],
                    dest: 'vendor/src/'
                }]
            }
        },
        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: [{
                    cwd: '',
                    expand: true,
                    src: [ '*.html' ],
                    dest: 'vendor/'
                }]
            }
        },
        cssmin: {
            target: {
                files: [{
                    expand: true,
                    cwd: 'src/css',
                    ext: '.min.css',
                    src: [
                        '**/*.css',
                        '!*.min.css',
                        '*.css'
                    ],
                    dest: 'vendor/src/css'
                }]
            }
        },
        watch: {
            options: {
                livereload: true,
            },
            sass: {
                files: [ 
                    'src/scss/**/*.scss',
                    'src/scss/*.scss'
                ],
                task: ['sass']
            },
            styles: {
                files: ['src/css/*.css'],
                tasks: ['cssmin']
            },
            js: {
                files: [
                    'src/js/**/*.js', 
                    'src/js/*.js'
                ],
                tasks: ['jshint']
            },
            html: {
                files: ['*.html'],
                tasks: ['htmlmin']
            }
        },
        browserSync: {
            dev: {
                bsFiles: {
                    src: [
                        'src/css/*.css',
                        '*.html'
                    ]
                },
                options: {
                    watchTask: true,
                    server: './'
                }
            }
        }


    });

    // Carregar todos os plugins utilizados;
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-browser-sync');
    grunt.loadNpmTasks('grunt-browser-sync');

    // environment dev
    grunt.registerTask('dev', ['clean', 'browserSync', 'watch']);

    // environment prod
    grunt.registerTask('prod', ['clean', 'jshint', 'sass', 'imagemin', 'htmlmin', 'cssmin']);
};