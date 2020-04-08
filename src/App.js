import React, {useState, Fragment} from 'react';
import './App.css';

function App() {
  const [list, setAddToList] = useState('');
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [errorMessage, setErrorMessage] = useState(false)
  const [showEdit, setShowEdit] = useState(false);
  const [titleToUpdate, setTitleToUpdate] = useState('');
  const [authorToUpdate, setAuthorToUpdate] = useState('');
  
  const addToList = () => {
    if (!title) {
     return setErrorMessage(true)
    }
    const updatedList = [...list]
    updatedList.push({title: title, author: author})
    setTitle('')
    setAuthor('')
    setAddToList(updatedList)
  }
  
  const editEntry = (element) => {
    setTitleToUpdate(element.target.name)
    setShowEdit(!showEdit)
  }
  
  const updateEntry = () => {
    const updatingList = [...list]
    list.forEach((book, i) => {
      if (book.title === titleToUpdate) {
        updatingList.splice(i, 1, {title: titleToUpdate, author: authorToUpdate})
      }
      return updatingList
    })
    setAddToList(updatingList)
    setAuthorToUpdate('')
    setShowEdit(false)
  }

  const removeFromList = (name) => {
    const extractList = [];
    list.forEach(book =>{ 
      if (book.title !== name.currentTarget.name) {
        extractList.push(book)
      }
      return extractList
    })
    setAddToList(extractList)
  }

  const showList = () => {
    if (!list) {
      return <p className='suggestion'>Start Adding Books to Your List!</p>
    }
    return (
      <ol>{
        list.map((book, i) => {
          return (
          <li key={i}>{book.title} by {book.author}
            <button key={`edit-${i}`} className="edit" name={book.title} type='button' onClick={editEntry} >Edit</button>
            <button key={`remove-${i}`} className="remove" name={book.title} type='button' onClick={removeFromList}>Remove</button> 
          </li>)
        })
      }</ol>
    )
  }

  return (
    <div className="booklist">
      <header>My List of Books to Read</header>
      {showList()}
      {errorMessage && <p className="error-message">Entry must include a title.</p>}

      <div>
        <input type="text" name='title' placeholder="title" value={title} onChange={(name, value) => setTitle(name.target.value)} />
        <input type="text" name='author' placeholder="author" value={author} onChange={(name, value) => setAuthor(name.target.value)} />
        <button className="add-to-list" onClick={addToList}>Add to List!</button>
      </div>

      {showEdit && (
        <Fragment>
          <input type="text" name='title' placeholder="title" value={titleToUpdate} onChange={(name, value) => setTitle(name.target.value)} />
          <input type="text" name='author' placeholder="author" value={authorToUpdate} onChange={(name, value) => setAuthorToUpdate(name.target.value)} />
          <button onClick={updateEntry}>Submit Change</button>
        </Fragment>
      )}
    </div>
  );
}

export default App;
