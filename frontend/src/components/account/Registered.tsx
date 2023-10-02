import { useNavigate } from 'react-router-dom';
import './account.css';
import { useSelector } from 'react-redux';
import { selectData } from '../../features/account/accountSlice';

const Registered = () => {
    // Hooks definitions
    const navigate = useNavigate();
    const data:any = useSelector(selectData);
    const clickLogin = () => navigate('/account/login');

    return ( 
    <>
    <div className="account">
    <div className="registered">

    <div className="container-fluid text-center">
      <div className="row align-items-start">

        <div className="col left_box">          

          <div className="d-grid gap-2 col-4 mx-auto">

          {data.status == 1 ?
          <>
          <h2>Registration successful</h2>
          <p>Login with your new username and password</p>
          </>
          :
          <>
          <h2>Registration unsuccessful</h2>
          <p>{data.reason}</p>
          </>
          }

          <button onClick={clickLogin} className="btn btn-outline-primary" type="submit"> Go back to login page </button>

          </div>

        </div>

        <div className="col right_box"></div>

      </div>
    </div>

    </div>
    </div>
    </>
    );
}
 
export default Registered;