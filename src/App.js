import React, { useState, useReducer } from "react";
import uuid from "uuid";
import moment from "moment";
import "./styles.css";

//github rick test
//notes app
//functionality:
//-create note,
//-remove note,
//-update note

//note structure
// object
//properties:
// -id - uuid
// -note - user
// -author -user
// -createdAt - Date.now()

//Update
const updateNote = note => {
  console.log(note);
};

//Delete
const deleteNote = () => {};

const SingleNote = props => {
  return (
    <div>
      <p>{props.note.noteText}</p>
      <p>{props.note.author}</p>
      <p>{props.note.createdAt.format("MMM Do, YYYY")}</p>
      <p>------------</p>
      <button onClick={updateNote}>Update</button>
      <button onClick={deleteNote}>Delete</button>
    </div>
  );
};

const NoteForm = props => {
  const [title, setTitle] = useState("foo");
  const [author, setAuthor] = useState("Dustin");
  const [noteText, setNoteText] = useState("text here");

  const onChangeTitle = e => {
    const title = e.target.value;
    setTitle(title);
  };

  const onChangeAuthor = e => {
    const author = e.target.value;
    setAuthor(author);
  };

  const onChangeNoteText = e => {
    const noteText = e.target.value;
    setNoteText(noteText);
  };

  const submitForm = e => {
    e.preventDefault();

    console.log("in submiet");

    props.dispatch({
      type: "create",
      payload: {
        id: uuid(),
        noteText,
        title,
        author,
        createdAt: moment()
      }
    });
  };

  return (
    <div>
      <form onSubmit={submitForm}>
        <input
          value={title}
          onChange={onChangeTitle}
          placeholder="Title"
          required
        />
        <input
          value={author}
          onChange={onChangeAuthor}
          placeholder="Author"
          required
        />
        <input
          value={noteText}
          onChange={onChangeNoteText}
          placeholder="Note"
          required
        />
        <button>Submit</button>
      </form>
    </div>
  );
};

const App = () => {
  //useState is a function from which we are receving an array with two items

  let initialState = {};

  let reducer = (state, action) => {
    console.log("in reducer");

    switch (action.type) {
      case "create":
        console.log("in create");
        state[uuid()] = action.payload;
        console.log(state);
        return { ...state };

      default:
        throw new Error();
    }
  };

  const [notes, dispatch] = useReducer(reducer, initialState);

  return (
    <div className="App">
      <h1>Our Notes</h1>
      <NoteForm dispatch={dispatch} notes={notes} />
      {Object.values(notes).map(note => {
        console.log("in map");
        // console.log(notes);
        return <SingleNote note={note} key={note.id} />;
      })}
    </div>
  );
};

export default App;
