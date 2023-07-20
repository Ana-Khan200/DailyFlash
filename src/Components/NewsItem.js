import React from "react";

const NewsItem =(props)=>{
    let { title, description, imageUrl, newsUrl, author, date, source } = props;
    return (
      <div className="my-3">
        <div className="card border-primary-mb-3 shadow p-3 mb-5 bg-white rounded">
          <span className="position-absolute top-0 translate-middle badge rounded-pill bg-success" style={{left: '90%', zIndex: '1'}} >{source}</span>
            <img src={
              !imageUrl
                ? "https://static.toiimg.com/photo/100877547.cms"
                : imageUrl
            }
            className="card-img-top"
            alt="..."
          />
          <div className="card-body text-primary">
            <h5 className="card-title" style={{color: 'black'}}>{title}</h5>
            <p className="card-text" style={{color:'#585858', FontFace:'Arial Black'}}>{description} </p>
            <p className="card-text">
              <small className="text-primary">
                By {author ? author : "Unknown"} on{" "}
                {new Date(date).toGMTString()}
              </small>
            </p>
            <a
              href={newsUrl}
              target="_blank"
              rel="noreferrer"
              className="btn-btn-sm btn btn-dark" 
            >
              Read More
            </a>
          </div>
        </div>
      </div>
    );
}

export default NewsItem;
