import React, {useEffect, useState} from 'react'
import NewsItems from './NewsItems'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";


const News = (props) => {

  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalResults, setTotalResults] = useState(0)
  
  const capitalizedLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const updateNews = async () => {
    props.setProgress(20);
    setPage(page+1)
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    props.setProgress(35);
    setLoading(true);
    props.setProgress(50);
    let data = await fetch(url);
    props.setProgress(75);
    let parsedData = await data.json();
    props.setProgress(90);
    setArticles(parsedData.articles);
    setTotalResults(parsedData.totalResults);
    setLoading(false);
    props.setProgress(100);
  }

  useEffect(()=>{
    
  document.title = `News - ${capitalizedLetter(props.category)}`
    updateNews();
    //eslint-disable-next-line 
  }, [])


  // const handlePrev = async () => {
    // setPage(page-1);
    // updateNews();
  // }
  // const handleNext = async () => {
    // setPage(page+1);
    // updateNews();
  // }

  const fetchMoreData = async () => {
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
    setPage(page+1);
    let data = await fetch(url);
    let parsedData = await data.json();
    setArticles(articles.concat(parsedData.articles));
    setTotalResults(parsedData.totalResult);
  };

    return (
      <div className="container my-3">
        <h2 className='text-center' style={{margin: '90px 0 35px 0'}} >Top Headlines from {capitalizedLetter(props.category)}</h2>
        {loading && <Spinner/>}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Spinner/>}
          >
          <div className="container my-3">
          <div className="row">
            {articles.map((element) => {
              return <div className="col-md-4" key={element.url}>
                <NewsItems title={element.title ? element.title.slice(0, 20) : ""} description={element.description ? element.description.slice(0, 40) : ""} imgUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
              </div>
            })};
          </div>
          </div>
        </InfiniteScroll>
      </div>
    )
}

News.defaultProps = {
  country: "in",
  pageSize: 8,
  category: "technology"
}

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string
}

export default News
