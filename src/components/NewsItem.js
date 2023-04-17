import React from "react";

// export class NewsItem extends Component {
const NewsItem =(props)=> {
   let {title,description,imgurl,newurl,author,date,source}=props;
    return (
      <div className="my-3">
        this  news item
        <div className="card">
          <img src="" className="card-img-top" alt=''/>
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">
              {description}
            </p>
            <p className="card-text"><small className="text-muted">By {author?author:'unknown author'} on {new Date(date).toGMTString()}</small></p>
            <a href={newurl} target='_blank' rel ="noreferrer" className="btn btn-sm btn-primary">
              Read more..
            </a>
          </div>
        </div>
      </div>
    );
}

export default NewsItem;
