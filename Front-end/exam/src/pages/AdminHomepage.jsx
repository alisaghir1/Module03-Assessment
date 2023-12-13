import React from 'react'
import { useState, useEffect} from 'react'
import axios from 'axios'

const AdminHomepage = () => {

  const [articles, setArticles] = useState([])

  const [image, setImage] = useState('')
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('')
  const [author, setAuthor] = useState('')
  const [body, setBody] = useState('')




  useEffect(() => {
    axios.get('http://localhost:5000/articles')
    .then((response) => {
      setArticles(response.data)
    }).catch((error) => {
      console.log(error);
    })
  } , [])

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData() 
    formData.append('image', image)
    formData.append('title', title)
    formData.append('author', author)
    formData.append('body', body)
    formData.append('category', category)

  
    try {
     const response = await axios.post('http://localhost:5000/articles',formData,);
     console.log(response);
     console.log(userData);
     navigate('/')
    } catch (error) {
    console.log(error);
    }
  }

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:5000/articles/${id}`);
      console.log(response);
    } catch (error) {
      console.error('There was an error!', error);
    }
  };

  const handleUpdate = async (id) => {

    const userData = {
    title,
    author,
    body,
    category
    }

  
    try {
     const response = await axios.patch(`http://localhost:5000/articles/${id}`,userData,);
     console.log(response);
     console.log(userData);
     navigate('/')
    } catch (error) {
    console.log(error);
    }
  }

  return (
    <div>
{articles.map((article, index) => (
        <div key={index} className='main-div'>
          <div>
            <img src={`http://localhost:5000/uploads/${article.image}`} alt="" />
          </div>
          <div>
            {article.title}
          </div>
          <div>
          {article.author}
          </div>
          <div>
          {article.category}
          </div>
          <div>
          {article.body}
          </div>
          <button onClick={() => handleDelete(article.id)}>Delete</button>
          <form className='div-create'  onSubmit={() => handleUpdate(article.id)}>
        <label htmlFor="title">title</label>
        <input type='text' onChange={(e) => setTitle(e.target.value)} value={title} />
        <label htmlFor="category">category</label>
        <input type='text' onChange={(e) => setCategory(e.target.value)} value={category}/>
        <label htmlFor="body">body</label>
        <input type='text' onChange={(e) => setBody(e.target.value)} value={body}/>
        <label htmlFor="author">author</label>
        <input type='text' onChange={(e) => setAuthor(e.target.value)} value={author}/>
        <button type='submit'>Update</button>
      </form>
        </div>
      ))}
      <form className='div-create' onSubmit={handleSubmit}>
        <label htmlFor="image">image</label>
        <input type='file' onChange={(e) => setImage(e.target.files[0])} />
        <label htmlFor="title">title</label>
        <input type='text' onChange={(e) => setTitle(e.target.value)} value={title} />
        <label htmlFor="category">category</label>
        <input type='text' onChange={(e) => setCategory(e.target.value)} value={category}/>
        <label htmlFor="body">body</label>
        <input type='text' onChange={(e) => setBody(e.target.value)} value={body}/>
        <label htmlFor="author">author</label>
        <input type='text' onChange={(e) => setAuthor(e.target.value)} value={author}/>
        <button type='submit'>submit</button>
      </form>
    </div>
  )
}

export default AdminHomepage