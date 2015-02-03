'use strict';
module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt)
    var config

    grunt.initConfig({
        config: config,
        clean: {
            build: ["dist/", "build/"],
            postbuild: ["build/"]
        },
        version: {
            options: {
                pkg: "bower.json"
            },
            project: {
                src: ['bower.json']
            }
        },
        bower: {
            install: {}
        },
        bower_concat: {
            all: {
                dest: 'build/_bower.js',
            }
        },
        concat: {
            options: {
                separator: '\n',
            },
            dist: {
                src: ['build/_bower.js', 'build/*.js'],
                dest: 'dist/app.js',
            },
        },
        uglify: {
            build: {
                files: {
                    'dist/app.min.js': 'dist/app.js'
                }
            }
        },
        coffee: {
            build: {
                option: {
                    join: true,
                    extDot: 'last'
                },
                files: {
                    'build/app.js': 'coffee/*.coffee'
                },

            }
        },
        gitcommit: {
            build: {
                options: {},
                files: {
                    src: ["dist/*.js", "coffee/*.coffee", "bower.json"]
                }
            },
            firstTimer: {

                files: {
                    src: ["Gruntfile.js", "package.json"]
                }
            }
        },
        gitpull: {
            build: {
                options: {

                }
            }
        },
        gitpush: {
            build: {
                option: {
                    branch: "dev"
                },
                files: {
                    src: ["dist/*.js", "coffee/*.coffee", "bower.json"]
                }
            },
            firstTimer: {
                option: {
                    force: true
                },
                files: {
                    src: ["Gruntfile.js", "package.json"]
                }
            }

        },
        gitadd: {
            firstTimer: {
                option: {
                    force: true
                },
                files: {
                    src: ["Gruntfile.js", "package.json", "dist/*.js", "coffee/*.coffee", "bower.json"]
                }
            }

        },
        gittag : {
            main: {
                options: {
                    tag : grunt.file.readJSON('bower.json').version,
                    message : "update from grunt to : " + grunt.file.readJSON('bower.json').version
                },
                file: {
                    src: ["Gruntfile.js", "package.json", "dist/*.js", "coffee/*.coffee", "bower.json"]
                }
            }
        }

    })
    grunt.registerTask('build', ['clean:build', 'coffee:build', 'bower', 'bower_concat', 'concat', 'uglify:build', 'clean:postbuild']);
    grunt.registerTask('commit', ['gitcommit:build', 'gitpull:build']);
    grunt.registerTask('tag', ['version:project:patch' , 'gittag']);
    grunt.registerTask('firstTimer', ['gitadd:firstTimer', 'gitcommit:firstTimer', 'gitpush:firstTimer']);


};