module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jasmine: {
        test: {
            src: 'jstreetable.js',
            options: {
                specs: ['test/jstreetable.spec.js'],
                vendor: [
                    'http://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js',
                    'https://code.jquery.com/ui/1.11.4/jquery-ui.js',
                    'https://static.jstree.com/latest/assets/dist/jstree.min.js'
                ]
            },
        }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jasmine');
};