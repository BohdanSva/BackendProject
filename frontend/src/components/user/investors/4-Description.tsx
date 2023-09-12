import { useDispatch } from "react-redux";
import { setTargetDescription } from "../../../features/investors/investorSlice";
import '../user.css';

// Types
interface SwitchInterface {
  value: number,
}

const Description = (props:SwitchInterface) => {
  // Definitions
  const dispatch = useDispatch();

  // Functions
  const onDescriptionInput = (keystroke:any) => {
    dispatch(setTargetDescription(keystroke.target.value)); 
  }

  return (
    <>
    <div className="user">
      <div className="container">
        <h2>How would you describe the investment strategy?</h2>
      
        <form>
            <div className="input-group">
                <span className="input-group-text">Additional comments</span>
                <textarea 
                    onInput={onDescriptionInput}
                    rows={10}
                    className="form-control"
                    aria-label="investment-description"
                ></textarea>
            </div>
        </form>

      </div>
    </div>
    </>
  )
}

export default Description;