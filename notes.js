const fs = require('fs');
const chalk = require('chalk');

const getNotes = () => {
  return 'Your Notes...';
};

const addNote = (title, body) => {
  //load notes from file
  const notes = loadNotes();

  //check for title exists or not
  const duplicateNotes = notes.filter((note) => note.title === title);
  if (duplicateNotes.length > 0) {
    console.log(
      chalk.yellow.bold('Title already exists. Please choose unique title')
    );
    return;
  }

  // add note in file
  try {
    notes.push({
      title: title,
      body: body,
    });
    saveNotes(notes);
    console.log(chalk.green('New note added successfully!'));
  } catch (error) {
    console.log(chalk.red.inverse.bold('Problem to save note'));
  }
};

const removeNote = (title) => {
  //load notes from file
  const notes = loadNotes();

  //check for title exists or not
  const note = notes.filter((note) => note.title === title);

  if (note.length > 0) {
    //Remove note
    try {
      const index = notes.indexOf(note);
      const deletedNote = notes.splice(index, 1);
      saveNotes(notes);
      console.log(chalk.green('Note removed successfully! - '), deletedNote);
    } catch (error) {
      console.log(chalk.red.inverse.bold('Problem to remove note'));
    }
  } else {
    // display message could not find note
    console.log(chalk.yellow.bold(`Note is not exist with title "${title}".`));
  }
};

const listNotes = () => {
  console.log(chalk.inverse('Your notes'));
  const notes = loadNotes();
  notes.forEach((note, index) => {
    console.log(`  ${index + 1} - ${note.title}`);
  });
};

const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync('notes.json');
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (error) {
    console.log(chalk.yellow.inverse.bold('No note exist'));
    return [];
  }
};

const saveNotes = (notes) => {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync('notes.json', dataJSON);
};

module.exports = {
  getNotes: getNotes,
  addNote: addNote,
  removeNote: removeNote,
  listNotes: listNotes,
};
