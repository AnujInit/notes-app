const fs = require('fs');
const chalk = require('chalk');

const getNotes = function () {
  return 'Your Notes...';
};

const addNote = function (title, body) {
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

const loadNotes = function () {
  try {
    const dataBuffer = fs.readFileSync('notes.json');
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (error) {
    console.log(chalk.yellow.inverse.bold('No note exist'));
    return [];
  }
};

const saveNotes = function (notes) {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync('notes.json', dataJSON);
};

module.exports = {
  getNotes: getNotes,
  addNote: addNote,
};
