import { useState, useEffect } from "react";

import {linkIcon} from '../assets';
import {useLazyGetSummaryQuery} from '../services/article';

import Summary from './Summary';
import SearchHistory from './SearchHistory';

const ArticleSummarizer = () => {
  const [article, setArticle] = useState({
    url:'',
    summary:'',
  })
  const [copied, setCopied] = useState('');
  const [allArticles, setAllArticles]=useState([]);
  const [getSummary, {error, isFetching}]=useLazyGetSummaryQuery();

  useEffect(()=>{
    const articlesFromLocalStorage=JSON.parse(localStorage.getItem('articles'));
    if(articlesFromLocalStorage){
      setAllArticles(articlesFromLocalStorage);
      // console.log(articlesFromLocalStorage)
    }
  }, [])

  //Making summarizing requests to API and saving data to state
  const handleSubmit=async (e) => {
    //to stop app from reloading
    e.preventDefault();

    const {data}=await getSummary({articleUrl:article.url})

    if(data?.summary){
      const newArticle={...article, summary:data.summary};
      setArticle(newArticle);

      const updatedAllArticles=[...allArticles, newArticle];
      setAllArticles(updatedAllArticles);
      
      //Adding Article to localStorage
      localStorage.setItem('articles', JSON.stringify(updatedAllArticles));
    }
    
  }

  //For copying link
  const handleCopy=(copyUrl)=>{
    setCopied(copyUrl);
    navigator.clipboard.writeText(copyUrl);
    setTimeout(()=>setCopied(false), 3000);
    console.log('triggered')
  }

//For Deleting URLs
const handleDeleteUrl=(id)=>{
  // setAllArticles(prevAllArticles=>(
  //   prevAllArticles.filter((singleArticle, index)=> index !== id)
  // ));

  const filteredAllArticles=allArticles.filter((singleArticle, index)=>(index !== id));

  setAllArticles(filteredAllArticles);

  localStorage.setItem('articles', JSON.stringify(filteredAllArticles));
  };
  return (
    <section className="mt-16 w-full max-w-xl"> 
      {/* Search */}
      <div className='flex flex-col w-full gap-2'>
        <form
          className='relative flex justify-center items-center'
          onSubmit={handleSubmit}
        >
          <img 
            src={linkIcon}
            alt='link_icon'
            className= "absolute left-0 my-2 ml-3 w-5"
          />

          <input 
            type='url'
            placeholder='Enter a URL'
            value={article.url}
            onChange={(e)=>setArticle({
              ...article,
              url:e.target.value
            })}
            required
            className='url_input peer'
          />

          <button
            type="submit"
            className="submit_btn peer-focus:border-gray-700 peer-focus:text-gray-700"
          >
            ↵
          </button>
        </form>

        {/* Browse URL History */}
        <SearchHistory allArticles={allArticles} setArticle={setArticle} handleCopy={handleCopy} copied={copied} handleDeleteUrl={handleDeleteUrl}/>    

      </div>

      {/* Display Results */}
      <Summary isFetching={isFetching} error={error} article={article} />

    </section>
  )
}

export default ArticleSummarizer