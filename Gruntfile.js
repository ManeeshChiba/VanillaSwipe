module.exports = function(grunt) {
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.initConfig({ pkg: grunt.file.readJSON('package.json'), 
        less: {
            options: {
                paths: 'css',
                yuicompress: true
            },
            myTarget : {
                files: {
                    'css/main-unprefixed.css': 'css/less/main.less'
                }
            }

        },
        autoprefixer: {
            single_file: {
                options: {
                    browsers: ['Android > 4', 'BlackBerry > 7', 'Chrome > 25', 'Firefox > 20', 'Explorer > 7', 'iOS > 4', 'Opera > 20', 'Safari > 5', 'OperaMobile > 12', 'ChromeAndroid > 30', 'FirefoxAndroid > 30', 'ExplorerMobile > 10']
                },
                src: 'css/main-unprefixed.css',
                dest: 'css/main.css'
            }
        },
        watch: {
            less: {
                files: 'css/less/**/*.less',
                tasks: 'less'
            },
            autoprefixer: {
                files: 'css/main-unprefixed.css',
                tasks: 'autoprefixer'
            }
        }
    });
}