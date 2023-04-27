import {copy, tick, deleteIcon} from '../assets';

const SearchHistory = ({allArticles, setArticle, handleCopy, copied, handleDeleteUrl}) => {

//Adding delete URL functionality

  return (
    <div className="flex flex-col gap-1 max-h-60 overflow-y-auto">
            {allArticles.map((articleItem, index)=>(
              <div 
              key={`link-${index}`}
              onClick={()=>setArticle(articleItem)}
              className="link_card"
              >
                <div className="copy_btn" onClick={()=>handleCopy(articleItem.url)}>
                  <img 
                  src={copied ===articleItem.url ? tick :copy}
                  alt="copy_icon"
                  className="w-[50%] h-[50%} object-contain" 
                  />
                </div>
                <p className="flex-1 font-satoshi text-blue-700 font-medium text-sm truncate">
                  {articleItem.url}
                </p>
              {/* Adding Delete Url Functionality */}
                <div className="delete_btn" onClick={()=>handleDeleteUrl(index)}>
                  <img 
                  src={deleteIcon}
                  alt="delete_icon"
                  className="w-[50%] h-[50%} object-contain" 
                  />
                </div>
              </div>
            ))}
        </div>
  )
}

export default SearchHistory