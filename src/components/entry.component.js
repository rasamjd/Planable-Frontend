import { Link } from 'react-router-dom';
import "./entry-component-test.css"
import logo from "../PLANABLE(2).png"

function Entry() {
    return (
        <div className="entry-container">
          <img src={logo} className="logo"/>
          <p className="description">
            Create or Join a plan with people you're looking forward to have a meeting with.
            Review other timings and add your own schedule. Find the best time simply.
          </p>
          <div className="btns">
            <div className="join-div hoverable">
              <Link to="/join-plan" style={{ textDecoration: 'none' }} className="join btn">Join Plan
              </Link>
              <br />
            <p className='ep'>Join an existing Plan easily</p>
            </div>
            <div className="create-div hoverable">
              <Link to="/create-plan" style={{ textDecoration: 'none' }} className="create btn">Create Plan
              </Link>
              <br />
              <p className='ep'>Create a Plan and share it with others so that they can also join</p>
            </div>
          </div>
          <div className="footer">
            Made using MERN Stack    
        </div>
        </div>
    );
}

export default Entry;