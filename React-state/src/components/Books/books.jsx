import { useState } from 'react'
import './books.css'

export default function Books() {
    const [bookList, setBookList] = useState([{ id: 1, title: "The Literature", author: "Shakespere" }]);
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    return (
        <>
            <input type="text"
                placeholder='Enter book name...'
                className='input-box'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />

            <input type="text"
                placeholder='Enter author name...'
                className='input-box'
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
            />

            <button className='add-book'
                onClick={() => {
                    if (title == "" && author == "") {
                        alert("plaease enter required field !");
                    }
                    else if (title == "") {
                        alert("Enter book name")
                    } else if (author == "") {
                        alert("Enter author name")
                    }
                    else {
                        const book = {
                            id: Date.now(),
                            title: title,
                            author: author
                        }
                        setBookList([...bookList, book]);
                    }
                }
                }
            >
                Add book</button>

            {
                bookList.map((book, index) => (
                    <p>
                        {book.title}-{book.author}
                        <button className='remove-book'
                            onClick={() => {
                                // const temp=[...bookList];
                                // temp.splice(index,1);

                                let temp = bookList.filter((bk) => book.id != bk.id);
                                setBookList(temp);
                            }}>
                            X</button>
                            <button className='edit-book' 
                            onClick={()=>{
                                    
                            }}>Edit</button>
                    </p>
                ))}
        </>


    )
}
