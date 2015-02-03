'use strict';
module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt)

    grunt.initConfig({
        clean: {
            build: ["dist/"]
        },
        uglify: {
            build: {
                files: {
                    'dist/app.min.js': ['dist/*.js']
                }
            }
        },
        update_json: {
            bower: {
                src: 'package.json', // where to read from 
                dest: 'bower.json', // where to write to 
                // the fields to update, as a String Grouping 
                fields: 'name version description'
            },
        },
        coffee: {
            build: {
                option: {
                    join: true,
                    extDot: 'last'
                },
                files: {
                    'dist/app.js': 'coffee/*.coffee'
                },

            }
        },

        gitcheckout: {
            task: {
                options: {
                    branch: 'dev',
                    create: true
                }
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
                    branch: "master"
                },
                files: {
                    src: ["dist/*.js", "coffee/*.coffee", "bower.json"]
                }
            }
        },
        gitadd: {
            task: {
                options: {
                    force: true
                },
                files: {
                    src: ["Gruntfile.js", "package.json","dist/*.js", "coffee/*.coffee", "bower.json"]
                }
            }
        },
        gitpush: {
            firstTimer: {
                option: {
                    force: true
                },
                files: {
                    src: ["Gruntfile.js", "package.json"]
                }
            }

        }

    })
    grunt.registerTask('build', ['clean:build', 'coffee:build', 'uglify:build']);
    grunt.registerTask('firstTimer', ['gitadd', 'gitcommit:firstTimer', 'gitpush:firstTimer']);
    grunt.registerTask('commit', ['gitcommit:build', 'gitpull:build']);
};