const yargs = require('yargs');

const notes = require('./notes');

//Customize yargs version
yargs.version('1.1.0');

//Create add command
yargs.command({
  command: 'add',
  describe: 'Add a new note',
  builder: {
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string',
    },
    body: {
      describe: 'Note body',
      demandOption: true,
      type: 'string',
    },
  },
  handler: function (argv) {
    //console.log(`Title: ${argv.title}, Body: ${argv.body}`);
    notes.addNote(argv.title, argv.body);
  },
});

//Create remove command
yargs.command({
  command: 'remove',
  describe: 'Remove a note',
  builder: {
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string',
    },
  },
  handler: function (argv) {
    //console.log(`Removing Note that has title: ${argv.title}`);
    notes.removeNote(argv.title);
  },
});

//Create list command
yargs.command({
  command: 'list',
  describe: 'List your notes',
  handler: function () {
    //console.log('Listing out all notes');
    notes.listNotes();
  },
});

//Create read command
yargs.command({
  command: 'read',
  describe: 'read a note',
  builder: {
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string',
    },
  },
  handler: function (argv) {
    //console.log('reading a note with title : ', argv.title);
    notes.readNote(argv.title);
  },
});

//console.log(yargs.argv);
yargs.parse();
