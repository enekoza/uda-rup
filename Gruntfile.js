module.exports = function(grunt) {
	var cssMinList = grunt.file.readJSON('cssMinList.json');
    var jsMinList = grunt.file.readJSON('jsMinList.json');
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    clean:{
    	dist:['dist/**']
    },
    copy:{
    	development:{
    		files:[
    		       // Copia de los js
    		       {expand: true, cwd: 'src/', src: '*.js', dest: 'dist/rup/scripts', 
    		    	   rename: function (dest, matchedSrcPath) { 
    		    		   return dest+"/"+ matchedSrcPath.substr(0,matchedSrcPath.lastIndexOf("."))+"-<%= pkg.version %>.js";
    		    	   }
    		       },
    		       {expand: true, cwd: 'src/', src: 'rup_table/*.js', dest: 'dist/rup/scripts', 
    		    	   rename: function (dest, matchedSrcPath) { 
    		    		   return dest+"/"+ matchedSrcPath.substr(0,matchedSrcPath.lastIndexOf("."))+"-<%= pkg.version %>.js";
    		    	   }
    		       },
    		       {expand: true, cwd: 'src/', src: 'core/**/*.*', dest: 'dist/rup/scripts'},
    		       // Copia de los css
    		       
                   {expand: true, cwd: 'css/', src: 'custom-theme/**/*.*', dest: 'dist/rup/'},
                   {expand: true, cwd: 'css/', src: 'basic-theme/theme.rup.*.css', dest: 'dist/rup/', 
    		    	   rename: function (dest, matchedSrcPath) { 
    		    		   return dest+"/"+ matchedSrcPath.substr(0,matchedSrcPath.lastIndexOf("."))+"-<%= pkg.version %>.css";
    		    	   }
    		       },
                   {expand: true, cwd: 'css/', src: ['basic-theme/**/*.*','!basic-theme/theme.rup.*.css'], dest: 'dist/rup/'},
                   {expand: true, cwd: 'i18n/', src: '*.*', dest: 'dist/rup/resources'},
            ]
    	},
    	production:{
    		 
    	}
    },
    concat: {
        // 2. Configuration for concatinating files goes here.
        rupJs:{
        	src: (function() {
    		  var cwd = 'dist/rup/scripts/';
    		  var arr = jsMinList['jsMinFiles'];
    		  // determine file order here and concat to arr
    		  return arr.map(function(file) { return cwd + file; });
    		}()),
            dest: 'dist/rup/scripts/min/rup-<%= pkg.version %>.js',
        },
        rupCss:{
        	src: (function() {
    		  var cwd = 'dist/rup/basic-theme/';
    		  var arr = cssMinList['cssMinFiles'];
    		  // determine file order here and concat to arr
    		  return arr.map(function(file) { return cwd + file; });
    		}()),
            dest: 'dist/rup/basic-theme/rup-<%= pkg.version %>.css',
        }
    },
    uglify: {
    	rupJs: {
            src: 'dist/rup/scripts/min/rup-<%= pkg.version %>.js',
            dest:'dist/rup/scripts/min/rup.min-<%= pkg.version %>.js'
        }
    },
    cssmin: {
    	rupCss: {
		    files: {'dist/rup/basic-theme/rup.min-<%= pkg.version %>.css':['dist/rup/basic-theme/rup-<%= pkg.version %>.css']}
    	}
	}
      
  });

  // Load the plugins.
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');

  // Default task(s).
  grunt.registerTask('default', ['clean', 'copy']);
  grunt.registerTask('dist', ['clean', 'copy', 'concat', 'cssmin']);

};