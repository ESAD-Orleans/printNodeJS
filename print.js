require('colors');
var child_process = require('child_process');
var walk = require('walk');
var TIME_DELAY = 4000;

function PrintFile(filepath){
	// print a pdf file
	var command = 'lp -d '+'Xerox_Phaser_3250 \''+filepath+'\'';
	console.log(command.bgBlack.white);
	child_process.exec(command,function(error, stdout, stderr){
	  if (error instanceof Error)
	    throw error;
		console.log(filepath.bgGreen.black+" en cours d’impression…".green);
		console.log(stdout.blue);
	});	
}

function CheckScans(){
	var files   = [];

	// Walker options
	var walker  = walk.walk('./scans', { followLinks: false });
	//console.log('START SCAN'.bgYellow.black);

	walker.on('file', function(root, stat, next) {
	    // Add this file to the list of files
		var age = (new Date()).getTime() - stat.ctime.getTime();
		//console.log(stat.name.red + '\t\t > '+(stat.ctime+" ").blue+"\t > "+(age/1000+'s').yellow);
		
		if(age<=TIME_DELAY){
			PrintFile(root + '/' + stat.name);
		}
		
	    files.push(root + '/' + stat.name);
	    next();
	});

	walker.on('end', function() {
	    //console.log(files);
	});
	
}
console.log('En attente de nouveau fichier'.blue);
setInterval(CheckScans,TIME_DELAY);
