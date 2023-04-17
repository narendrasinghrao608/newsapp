import React from "react";
import { useEffect,useState } from "react";
import NewsItem from "./NewsItem";
import Spiner from "./Spiner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News=(props)=> {
  //class props
  // static defaultProps = {
  //   country: "in",
  // };
  // static propTypes = {
  //   country: PropTypes.string,
  //   category: PropTypes.string,
  // };
  const [articles,setArticles]=useState([])
  const [loading,setloading]=useState(true)
  const [page,setpage]=useState(1)
  const [totalResults,settotalResults]=useState(0)
  const capitalizefirstletter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  const updatenews=async ()=>{
    props.setProgress(10)
    // this.props.setProgress(10)
    setloading(true)
    // this.setState({ loading: true });
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${page}`;
    let data = await fetch(url);
    let parsedata = await data.json();
    setArticles(parsedata.articles)
    settotalResults(parsedata.totalResults)
    setloading(false)
    // this.setState({
      //   articles: parsedata.articles,
      //   loading: false,
      //   totalResults: parsedata.totalResults,
      // });
      props.setProgress(100);
    }
    const fetchMoreData = async () => {
      // a fake async api call like which sends
      // 20 more records in 1.5 secs
      // this.setState({ page: this.state.page + 1 });
      const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${page+1}`;
      setpage(page+1)
      let data = await fetch(url);
      let parsedata = await data.json();
      setArticles(articles.concat(parsedata.articles))
      settotalResults(parsedata.totalResults)
      // this.setState({
        //   articles: this.state.articles.concat(parsedata.articles),
        //   totalResults: parsedata.totalResults,
        // });
      };
      useEffect(()=>{
        updatenews();
        document.title = `${capitalizefirstletter(props.category)}-News`;
        //eslint-disable-next-line
      },[])
  // componentDidMount = async () => {
  //   // this.setState({loading:true})
  //   // let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=9685cd9b70f04ad8a9475ff8a55dd877&page=1`
  //   // let data=await fetch(url)
  //   // let parsedata=await data.json()
  //   // this.setState({articles:parsedata.articles,
  //   // loading:false})
  //   this.updatenews();
  // };
  const handlenextclick = async () => {
    // this.setState({loading:true})
    // console.log("hare krishna");
    // let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=9685cd9b70f04ad8a9475ff8a55dd877&page=${this.state.page+1}`
    // let data=await fetch(url)
    // let parsedata=await data.json()
    // this.setState({loading:false})
    // this.setState({
    //   page:this.state.page+1,
    //   articles:parsedata.articles
    // })
    setpage(page+1)
    // this.setState({
    //   page: this.state.page + 1,
    // });
    updatenews();
  };
  const handleprevclick = async () => {
    // this.setState({loading:true})
    // console.log("hari bol")
    // let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=9685cd9b70f04ad8a9475ff8a55dd877&page=${this.state.page-1}`
    // let data=await fetch(url)
    // let parsedata=await data.json()
    // this.setState({loading:false})
    // this.setState({
    //   page:this.state.page-1,
    //   articles:parsedata.articles
    // })
    setpage(page-1)
    // this.setState({
    //   page: this.state.page - 1,
    // });
    updatenews();
  };
    return (
      <>
        <h2 className="text-center" style={{ margin: "90px 0px 30px 0px" }}>
          News - top {capitalizefirstletter(props.category)} headline{" "}
        </h2>
        {loading && <Spiner/>}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Spiner/>}
        >
          <div className="container">
            <div className="row">
              {articles.map((element) => {
                return (
                  <div className="col-md-4" key={element.url}>
                    <NewsItem
                      title={element.title ? element.title.slice(0, 44) : ""}
                      description={
                        element.description
                          ? element.description.slice(0, 88)
                          : ""
                      }
                      imgurl={element.urlToImage}
                      newurl={element.url}
                      author={element.author}
                      date={element.publishedAt}
                      source={element.source.name}
                    />
                  </div>
                );
              })}
            </div>
            </div>
        </InfiniteScroll>
        {/* <div className="container d-flex justify-content-between">
          <button
            disabled={this.state.page <= 1}
            type="button"
            className="btn btn-dark"
            onClick={this.handleprevclick}
          >
            &larr; Previous
          </button>
          <button
            type="button"
            disabled={this.state.page >= 2}
            className="btn btn-dark"
            onClick={this.handlenextclick}
            >
            Next &rarr;
            </button>
          </div> */}
          </>
    );
  }
News.defaultProps = {
  country: "in",
};
News.propTypes = {
  country: PropTypes.string,
  category: PropTypes.string,
};
export default News;
