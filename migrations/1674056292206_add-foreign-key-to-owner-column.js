/* eslint-disable camelcase */

exports.up = (pgm) => {
  // create new user
  pgm.sql("INSERT INTO users(id, username, password, fullname) VALUES('old_notes', 'old_notes', 'old_notes', 'old_notes')");

  // update owner value in notes contains null
  pgm.sql("UPDATE notes SET owner = 'old_notes' WHERE owner IS NULL");

  // add foreign key constraint to owner in notes table that references to users table
  pgm.addConstraint('notes', 'fk_notes.owner_user.id', 'FOREIGN KEY(owner) REFERENCES users(id) ON DELETE CASCADE');
};

exports.down = (pgm) => {
  // delete foreign key constraint from notes table
  pgm.dropConstraint('notes', 'fk_notes.owner_user.id');

  // revert update owner column to null
  pgm.sql("UPDATE notes SET owner = NULL WHERE owner = 'old_notes");

  // delete new user
  pgm.sql("DELETE FROM users WHERE id = 'old_notes'");
};
