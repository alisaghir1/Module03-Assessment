import React from 'react'
import {useState, useEffect} from 'react'
import axios from 'axios'
import '../App.css'

const HomePage = () => {
  const [articles, setArticles] = useState([])

  useEffect(() => {
    axios.get('http://localhost:5000/articles')
    .then((response) => {
      setArticles(response.data)
    }).catch((error) => {
      console.log(error);
    })
  } , [])

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
        </div>
      ))}
    </div>
  )
}

export default HomePage