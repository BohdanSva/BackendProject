import { useDispatch, useSelector } from "react-redux";
import axios from 'axios';
import { 
    setHeadline, setTopic, setText, selectText, selectTopic, selectHeadline 
} from "../../../features/blog/blogSlice";

const AddBlogPost = ({getBlog}:any) => {
    // Definitions
    const dispatch = useDispatch();
    const headline = useSelector(selectHeadline);
    const topic = useSelector(selectTopic);
    const text = useSelector(selectText);

    // Save every user input into the store
    const onHeadlineInput = (keystroke: any) => {
        dispatch(setHeadline(keystroke.target.value)); 
    };
    const onTopicInput = (keystroke: any) => {
        dispatch(setTopic(keystroke.target.value)); 
    };
    const onTextInput = (keystroke: any) => {
        dispatch(setText(keystroke.target.value)); 
    };

    // Functions    
    const addNewPost = async () => {
        const blogURL = `http://localhost:3001/admin/blog`;
        const token = localStorage.getItem("token");
        try {
          const {data} = await axios.request({
            url: blogURL,
            method: "post",
            headers: {
              "token": `${token}`,
            },
            data: {
                "articleTopic" : `${topic}`,
                "headline" : `${headline}`,
                "textBlock" : `${text}`,
            }
            });
          if (data.status === 1) {
            console.log("New blog post added")
            getBlog();
          }
        } 
        catch (error) {console.log(error);}
    }

    return ( 
    <>
    <div className="admin">

    <div className="container">
      <h2 className="title">Add new blog post</h2>
      <table className="table"> 
        <thead>
          <tr>
            <th scope="col">Headline</th>
            <th scope="col">Topic</th>
            <th scope="col">Text</th>
          </tr>
        </thead>

        <tbody>
            <tr>
              <td>
                <input
                  name="headline"
                  type="text"
                  onChange={(e) => onHeadlineInput(e)}
                  placeholder="Enter headline"
                  className="form-control"
                />
              </td>
              <td>
                <input
                  name="articleTopic"
                  type="text"
                  onChange={(e) => onTopicInput(e)}
                  placeholder="Enter topic"
                  className="form-control"
                />
              </td>
              <td>
                <textarea
                  name="textBlock"
                  onChange={(e) => onTextInput(e)}
                  placeholder="Enter blog post text"
                  className="form-control"
                  style={{height:"10vh"}}
                />
              </td>
            </tr>
        </tbody>
      </table>
      <div className="row align-items-center justify-content-around">
        <div className="col">
          <button onClick={addNewPost} className="btn btn-outline-primary"> Add new blog post </button>
        </div>
      </div>
    </div>

    </div>
    </>
    );
}
 
export default AddBlogPost;