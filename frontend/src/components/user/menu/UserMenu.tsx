import { useNavigate } from 'react-router-dom';
import "./menu.scss";

const UserMenu = () => {
    const navigate = useNavigate();
    const navigateProperty = () => navigate('../user/property/mydeals');
    const navigateInvestors = () => navigate('../user/investors/myinvestors');
    const navigateContacts = () => navigate('../user/contacts/mycontacts');

return (
    <> 
    <div className="user">
    <div className="container-fluid text-center">

        <div className="row align-items-start">

            <div className="col left_box">
                <h1>Transactions Tracker</h1>

                <div className="animationContent" style={{position: 'absolute', top: '28%', left: '18%'}}>
                <div className="circle">
                    <div className="circle_title">
                    <h2>Property</h2>
                    <h3>Manage your deals</h3>
                    </div>
                    <div onClick={navigateProperty} className="circle_inner">
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
                    <h2>Investors</h2>
                    <h3>Analyze investor requirements</h3>
                    </div>
                    <div onClick={navigateInvestors} className="circle_inner">
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
                    <h2>People</h2>
                    <h3>Stay on top of your virtual rolodex</h3>
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

export default UserMenu;

