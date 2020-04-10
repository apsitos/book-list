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
  const [comparison, setComparison] = useState({title: '', author: ''})
  
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
    setAuthorToUpdate(element.target.name)
    // setComparison({title: })

    
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
    list.forEach(book => { 
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
    const showEditForm = showEdit ? 'open' : 'closed'

    return (
      <ul>{
        list.map((book, i) => {
          return (
          <div>
            <li key={i}>{book.title} by {book.author}
              <button 
                key={`edit-${i}`} 
                className="edit" 
                name={book.title} 
                data-testid={`edit-${book.title}`}
                type='button' 
                onClick={editEntry}>
                Edit
              </button>
              <button 
                key={`remove-${i}`} 
                className="remove" 
                name={book.title} 
                data-testid={`remove-${book.title}`}
                type='button' 
                onClick={removeFromList}>
                Remove
              </button> 
            </li>
            <div className="edit-form">
              <span className={showEditForm}>
                <input 
                  type="text" 
                  name="title" 
                  placeholder="edit-title" 
                  value={titleToUpdate} 
                  onChange={(name) => setTitleToUpdate(name.target.value)} 
                />
                <input 
                  type="text" 
                  name="author" 
                  placeholder="edit-author" 
                  value={authorToUpdate}
                  onChange={(name) => setAuthorToUpdate(name.target.value)} 
                />
                <button onClick={updateEntry}>Submit Change</button>
              </span>
            </div>
          </div>
          )
        })
      }</ul>
    )
  }

  return (
    <div>
      <header className="booklist-header">
        <h1 >My List of Books to Read</h1>
      </header>
      {showList()}
      {errorMessage && <p className="error-message">Entry must include a title.</p>}

      <div>
        <input 
          type="text" 
          name="title" 
          placeholder="title" 
          value={title} 
          onChange={(name) => setTitle(name.target.value)} 
        />
        <input 
          type="text" 
          name="author" 
          placeholder="author" 
          value={author} 
          onChange={(name) => setAuthor(name.target.value)} 
        />
        <button className="add-to-list" onClick={addToList}>Add to List!</button>
      </div>
    </div>
  );
}

export default App;
