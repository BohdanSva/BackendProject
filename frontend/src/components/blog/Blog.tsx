import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectBlogPosts, setBlogPosts } from '../../features/blog/blogSlice';
import axios from "axios";
import './blog.scss';

const Blog = () => {
    // Hooks definitions
    const dispatch = useDispatch();
    const blogPosts = useSelector(selectBlogPosts); // Sorted by latest by way of SQL command

    // Functions
    const getBlog = async () => {
        const blogURL = `http://localhost:3001/blog`;
        try {
        const {data} = await axios.get(blogURL);
        dispatch(setBlogPosts(data.results)); // Data received from Axios is saved in the store and ready to be mapped over
        }
        catch (error) {console.log(error);}
    }
    useEffect(() => {
        getBlog();
    }, []);

    return (
    <>
    <div className="blog">

    <header>
        <h1 className="text-center mt-5 mb-5"> Blog </h1>
    </header>

    {/* Component grid cards / Bootstrap */}
    <div className='container'>
    <div className="row row-cols-1 row-cols-md-3 g-4">
        
    {/* Map over the sorted blogPosts to render blog cards */}
    {blogPosts.map((item, index) => {
        return(
            <div key={index} className="col">
            <a href={`/blog/${blogPosts.indexOf(item)}`}>
                <p className="card-text" style={{color: 'black'}}>{new Date(item.articleDate).toLocaleString("en-UK", {day: "numeric", month: "long", year: "numeric"})}</p>
                    <div className="parallax">
                        <div className="parallax-top-left"></div>
                        <div className="parallax-top-right"></div>
                        <div className="parallax-bottom-left"></div>
                        <div className="parallax-bottom-right"></div>
                        <div className="parallax-content">
                        <div className="parallax-front">        
                        </div>
                        <div className="parallax-back">
                            <div className="card h-100">
                            <div className="card-body">
                            <h5 className="card-title">{item.headline}</h5>
                                <p className="card-text">{item.textBlock}</p>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                </a>
            </div>
        )
    })}

    </div>
    </div>

    </div>
    </>
    );
}
 
export default Blog;