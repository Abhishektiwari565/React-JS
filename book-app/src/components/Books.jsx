import {useState} from 'react'
import './Books.css'

export default function Books() {
    const [books,setBooks]=useState([
        {
            title:"1984",
            author:"George orwell",
        }
    ]);

    const [title,setTitle]=useState("");
    const [author,setAuthor]=useState("");
    const [index,setIndex]=useState(0);

    const addBooks=()=>{
        const newBooks={
            title:title,
            author:author
        }
        setBooks([...books,newBooks]);
    }

    function removeBooks(index){
        const temp=[...books];
        temp.splice(index,1);
        setBooks(temp);
    }

    function updateBooks(i){
        setIndex(i);
        setTitle(books[index].title);
        setAuthor(books[index].author);
    }
  return (
   <>
   <input type="text" placeholder='Book name... ' className='input-box'
   value={title}
   onChange={(e)=>setTitle(e.target.value)}
   />
   <input type="text" placeholder='Author name...' className='input-box'
   value={author}
   onChange={(e)=>setAuthor(e.target.value)}
   />
   <button className='add-book' onClick={()=>{
    if(title=="" && author==""){
        alert("Enter both fields !");
    }else if(title==""){
        alert("Enter book name !");
    }else if(author==""){
        alert("Enter author name !");
    }else{
        addBooks();
    }
   }}>Add book</button>
   <button className='update-book' onClick={()=>{
    const temp=[...books];
    temp[index].title=title;
    temp[index].author=author;
    setBooks(temp);
   }}>Update Books</button>
   {
   books.map((book,index)=>{
    return <div>
        <p>
            
            {book.title}-
            {book.author}
            <button className='remove-book' onClick={()=>removeBooks(index)}>X</button>
            <button className='update-book' onClick={()=>updateBooks(index)}>Edit</button>
        </p>
    </div>
   })
   }
   </>
  )
}
