import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import axios from 'axios';
import { addCommas, addPercent, formatDate, timeFromToday } from "../../../utils/formatting";
import { selectBlogPosts, selectDate, selectHeadline, selectText, selectTopic, setBlogPosts, setDate, setHeadline, setText, setTopic } 
from "../../../features/blog/blogSlice";

const EditBlogPost = () => {
  // Definitions
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { blogSlug }: any = useParams(); // blogSlug path configuration
  const blogPosts = useSelector(selectBlogPosts);
  const [editable,setEditable] = useState(1);
  const headline = useSelector(selectHeadline);
  const topic = useSelector(selectTopic);
  const text = useSelector(selectText);
  const date = useSelector(selectDate);

  // Functions
  const getBlog = async () => {
    const blogURL = `http://localhost:3001/blog`;
    const {data} = await axios.get(blogURL);
    Object.keys(blogPosts).forEach(async function(post:any) { 
      if (data.results[post].id == blogSlug) {
        dispatch(setHeadline(data.results[post].headline));
        dispatch(setTopic(data.results[post].articleTopic));
        dispatch(setText(data.results[post].textBlock));
        dispatch(setDate(data.results[post].articleDate));
      }});
  }
  useEffect(() => {
      getBlog();
  }, []);

  const backToDashboard = () => { 
    navigate('/admin/blog');
  }

  const onEditClick = () => { // Remove readonly property
    setEditable(-1);
  }

  const onHeadlineInput = (keystroke: any) => {
    dispatch(setHeadline(keystroke.target.value));
  }
  const onTopicInput = (keystroke: any) => {
    dispatch(setTopic(keystroke.target.value));
  }
  const onTextInput = (keystroke: any) => {
    dispatch(setText(keystroke.target.value));
  }
  const onDateInput = (keystroke: any) => {
    dispatch(setDate(keystroke.target.value));
  }

  const onDeleteClick = async (e:any) => {
    const blogManagementURL = `http://localhost:3001/admin/blog/${blogSlug}`;
    try {
      const {data} = await axios.request({
        url: blogManagementURL,
        method: "delete",
        headers: {
        "token": localStorage.getItem("token"),
      },
      data: {
        "id" : `${blogSlug}`
      }
      });
      console.log(data);
      if (data.status === 1) {
        console.log("Delete successful")
        backToDashboard(); 
      }
    } 
      catch (error) {console.log(error);}
    }

  const onSaveClick = async (e:any) => {
    setEditable(+1);
    const blogManagementURL = `http://localhost:3001/admin/blog/${blogSlug}`;
    const token = localStorage.getItem("token");
    
    // Loop over data and if property ID matches editedID of the clicked button, save details to state
    Object.keys(blogPosts).forEach(async function(post:any) { 
      if (blogPosts[post].id == blogSlug) {
        try {
          // console.log(name, street, editedId);
          const results = await axios.request({
            url: blogManagementURL,
            method: "patch",
            headers: {
              "token": `${token}`,
            },
            data: {
              "articleTopic" : `${topic}`,
              "headline" : `${headline}`,
              "articleDate" : `${date}`,
              "textBlock" : `${text}`,
            }
          });
          if (results.data.status === 1) {
            console.log("Update successful")
          }
        } 
        catch (error) {console.log(error);}
      }
    });
  };

    return (
    <>
    <div className="user">   

      <div className="container text-center">  
        <h1 className="text-start">Edit Blog Post</h1>
        <p className="mb-5 text-start"> Created on {formatDate(date)}</p>

        <div className="row text-start">
          <div className="col mb-5">
            <h3 className="mb-3">Basic details</h3>
              <div>Headline: 
                <input
                  className={editable==1 ? "uneditableStyle" : ""}
                  readOnly={editable==1 ? true : false}
                  name="headline"
                  value={headline}
                  type="text"
                  onChange={onHeadlineInput}
                  placeholder={headline ? "Headline" : ""}
                />
              </div>
              <div>Topic: 
                <input
                  className={editable==1 ? "uneditableStyle" : ""}
                  readOnly={editable==1 ? true : false}
                  name="topic"
                  value={topic}
                  type="text"
                  onChange={onTopicInput}
                  placeholder={topic ? "Topic" : ""}
                />
              </div>
              <div className="col mb-5">
              {editable==1 ? 
              <p className="mb-0">Date: {date ? formatDate(date) : "n/a"}</p>
              :
              <div>Date: <input
                name="date"
                value={date}
                type="date"
                onChange={onDateInput}
              /></div> 
              }
            </div>
          </div>
          <div className="col mb-2">
            <h3 className="mb-3">Text</h3>
              <div> 
                <textarea
                  className={editable==1 ? "form-control" : ""}
                  readOnly={editable==1 ? true : false}
                  name="textBlock"
                  value={text}
                  onChange={onTextInput}
                  placeholder={text ? "Blog text" : ""}
                  style={{height:"20vh", width:"100%"}}
                />
              </div>
          </div>
          <div className="col-1 mb-2"></div>
          
        </div>

        <div className="row mt-5">
          <div className="d-grid gap-2 col-2 mx-auto">
            <button className="btn btn-outline-primary" type="button" onClick={backToDashboard}>Back to dashboard</button>
          </div>

          <div className="d-grid gap-2 col-2 mx-auto">
            {editable==1 ?
            <button className="btn btn-outline-warning" type="button" onClick={onEditClick}>Edit details</button> 
            :
            <button className="btn btn-outline-danger" type="button" onClick={onSaveClick}>Save details</button>             
            }
          </div>

          <div className="d-grid gap-2 col-2 mx-auto">
            <button
              className="btn btn-outline-danger"
              data-bs-toggle="modal"
              data-bs-target="#deleteModal" 
              type="button" 
              > Delete blog post
            </button>
          </div>
          
        </div>
      </div>
    
    {/* Modal for deletion */}
    <div className="modal fade" id="deleteModal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex={-1} aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title fs-2" id="deleteModalLabel">Delete blog post</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            This blog post will be irretrievably deleted. Do you wish to continue?
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Go back</button>
            <button 
              type="button" 
              className="btn btn-danger"
              data-bs-dismiss="modal"
              onClick={onDeleteClick}
            > Delete contact
            </button>
          </div>
        </div>
      </div>
    </div>

    </div>
    </>
    )
}

export default EditBlogPost;