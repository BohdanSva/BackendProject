import { useNavigate } from 'react-router-dom';
import "./menu.scss";

const AdminMenu = () => {
    const navigate = useNavigate();
    const navigateUsers = () => navigate('../admin/users/');
    const navigateBlog = () => navigate('../admin/blog');
    const navigateContacts = () => navigate('../admin/contacts/');

return (
    <> 
    <div className="admin">
    <div className="container-fluid text-center">

        <div className="row align-items-start">

            <div className="col left_box">
                <h1>App Admin Portal</h1>

                <div className="animationContent" style={{position: 'absolute', top: '28%', left: '18%'}}>
                <div className="circle">
                    <div className="circle_title">
                    <h2>Users</h2>
                    <h3>Manage app users</h3>
                    </div>
                    <div onClick={navigateUsers} className="circle_inner">
                    <div className="circle_inner__layer">
                        <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/217233/pc4.png"/>
                    </div>
                    <div className="circle_inner__layer">
                        <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/217233/pc5.png"/>
                    </div>
                    <div className="circle_inner__layer">
                        <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/217233/pc6.png"/>
                    </div>
                    </div>
                    <div className="content_shadow"></div>
                </div>
                </div>

                <div className="animationContent" style={{position: 'absolute', top: '50%', left: '7%'}}>
                <div className="circle">
                    <div className="circle_title">
                    <h2>Blog</h2>
                    <h3>Add new blog posts</h3>
                    </div>
                    <div onClick={navigateBlog} className="circle_inner">
                    <div className="circle_inner__layer">
                        <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/217233/pc7.png"/>
                    </div>
                    <div className="circle_inner__layer">
                        <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/217233/pc8.png"/>
                    </div>
                    <div className="circle_inner__layer">
                        <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/217233/pc9.png"/>
                    </div>
                    </div>
                    <div className="content_shadow"></div>
                </div>
                </div>

                <div className="animationContent" style={{position: 'absolute', top: '50%', left: '30%'}}>
                <div className="circle">
                    <div className="circle_title">
                    <h2>Databases</h2>
                    <h3>Manage app databases</h3>
                    </div>
                    <div onClick={navigateContacts} className="circle_inner">
                    <div className="circle_inner__layer">
                        <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/217233/pc1.png"/>
                    </div>
                    <div className="circle_inner__layer">
                        <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/217233/pc3.png"/>
                    </div>
                    <div className="circle_inner__layer">
                        <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/217233/pc2.png"/>
                    </div>
                    </div>
                    <div className="content_shadow"></div>
                </div>
                </div>
            </div>

            <div className="col right_box"></div>

        </div>

    </div>
    </div>
    </>
)};

export default AdminMenu;

