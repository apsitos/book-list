import React, {useState} from 'react';
import './App.css';

function App() {
  const initialList = [{title: 'The Far Pavilions', author: "M.M. Kaye"}, {title: "Justinian's Flea", author: ''}, {title: 'Victorians Undone', author: ''} ]
  const [list, setAddToList] = useState(initialList);
  const [title, setTitle] = useState();
  const [author, setAuthor] = useState()

  const showList = () => {
   return list.map(book => {
     return (
     <li>{book.title} by {book.author}</li>)
    })
  }

  const addToList = () => {
    console.log('WHAT IS THE LIST', list)
    const newBook = list.push({title: title, author: author})
    console.log('WHAT IS NEW LIST', newBook)
    // setAddToList(newBook)
  }

  return (
    <div className="booklist">
      <header>My List of Books to Read</header>
      <ul>
      {showList()}
      </ul>
      <form>
        <input placeholder="title" value={title} onChange={() => setTitle(title)} />
        <input placeholder="author" value={author} onChange={() => setAuthor(author)} />
      </form>
      <button onClick={() => {addToList()}}>Add to List!</button>
    </div>
  );
}

export default App;
