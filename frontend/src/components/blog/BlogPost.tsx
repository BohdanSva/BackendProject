import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { selectBlogPosts } from '../../features/blog/blogSlice';
import NotFound from "../general/NotFound";
import './blogPost.css';

const BlogPost = () => {
    // Hooks definitions
    const blogPosts = useSelector(selectBlogPosts); 
    const { blogSlug }: any = useParams(); // blogSlug path configuration

    if (!blogPosts[blogSlug]) return <NotFound/>;

    return ( 
    <>
    <div className="blogPost">
        <div className="container">
            <div className="col-lg-8 m-15px-tb">

                    <article className="article">
                        <div className="articleTitle">
                            <h6><a href="#">{blogPosts[blogSlug].articleTopic}</a></h6>
                            <h1> {blogPosts[blogSlug].headline} </h1>
                            <div className="media" style={{display: 'flex'}}>
                                <div className="articleDate">
                                    <span>{new Date(blogPosts[blogSlug].articleDate).toLocaleString("en-UK", {day: "numeric", month: "long", year: "numeric"})}</span>
                                </div>
                            </div>
                        </div>

                        <div className="articleContent">
                            <p>{blogPosts[blogSlug].textBlock}</p>
                        </div>
                    </article>

            </div>
        </div>
    </div>
    </>
    );
}
 
export default BlogPost;