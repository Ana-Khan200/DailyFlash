import React,{useEffect,useState} from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";

const News=(props)=>{
  const [articles,setArticles]=useState([])
  const [loading,setLoading]=useState(true)
  const [page,setPage]=useState(1)
  const [totalResults,setTotalResults]=useState(0)

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
    // document.title = `${capitalizeFirstLetter(
    //   props.category
    // )} - DailyFlash`;
  
  const updateNews=async()=> {
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=945a67cdb1ba4d3f94a615b91f408562&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true)
    let data = await fetch(url);
    let parsedData = await data.json();
    setArticles(parsedData.articles)
    setTotalResults(parsedData.totalResults)
    setLoading(false);
  }
  useEffect(()=>{
    updateNews();
  },[])

  const handleNextClick = async () => {
    setPage(page+1)
    updateNews();
  };

  const handlePrevClick = async () => {
    setPage(page-1)
    updateNews()
  }
    const mystyle = {
      color: "Black",
      fontFamily: "Arial Black",
      margin: "35px 0px",
    }
    return (
      <>
        <div className="container my-3">
          <h1 align="center" style={mystyle}>
          DailyFlash : Top {capitalizeFirstLetter(props.category)} Headlines</h1>
          {loading && <Spinner />}
          <div className="row ">
            {!loading &&
              articles.map((element) => {
                return (
                  <div className="col-md-4" key={element.url}>
                    <NewsItem
                      title={element.title ? element.title : ""}
                      description={
                        element.description ? element.description : ""
                      }
                      imageUrl={element.urlToImage}
                      author={element.author}
                      date={element.publishedAt}
                      source={element.source.name}
                      newsUrl={element.url}
                    />
                  </div>
                );
              })}
            <div className="container d-flex justify-content-between">
              <button
                type="button"
                disabled={page <= 1}
                className="btn btn-dark "
                onClick={handlePrevClick}
              >
                &larr; Previous
              </button>
              <button
                disabled={
                  page + 1 >
                  Math.ceil(totalResults / props.pageSize)
                }
                type="button"
                className="btn btn-dark"
                onClick={handleNextClick}
              >
                Next &rarr;
              </button>
            </div>
          </div>
        </div>
      </>
    );
  News.defaultProps = {
    country: "in",
    pageSize: 9,
    category: "general",
  };
  News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  }
}
export default News
