import { Link, useParams } from 'react-router-dom';
import { useState, useEffect } from "react";
import "./plan-component.css"
import axios from 'axios';
import Hours from "./hours.component.js"

function Plan() {

  const [planState, setPlanState] = useState(3)
  
  const [planData, setPlanData] = useState({
    satMin: 0, satMax: 0,
    sunMin: 0, sunMax: 0,
    monMin: 0, monMax: 0,
    tueMin: 0, tueMax: 0,
    wedMin: 0, wedMax: 0,
    thuMin: 0, thuMax: 0,
    friMin: 0, friMax: 0
  })

  const [prevSat, setPrevSat] = useState([])
  const [prevSun, setPrevSun] = useState([])
  const [prevMon, setPrevMon] = useState([])
  const [prevTue, setPrevTue] = useState([])
  const [prevWed, setPrevWed] = useState([])
  const [prevThu, setPrevThu] = useState([])
  const [prevFri, setPrevFri] = useState([])

  const [prevSatMin, setPrevSatMin] = useState([])
  const [prevSatMax, setPrevSatMax] = useState([])

  const [people, setPeople] = useState([])

  const [userData, setUserData] = useState({
    name: "", code: 0, username: ""
  })

  const [nameCSS, setNameCSS] = useState({
    bottom: "", fontSize: "", color:"", checkMark:0
  })

  const nameCheck = (e) => {
    setUserData((prevData) => {
      return {
        ...prevData,
        username : e.target.value
      }
    })

    if (e.target.value.length > 2) {
      setNameCSS((prev) => {
        return {
          ...prev,
          checkMark : 1
        }
      })
    }
    else if ((e.target.value.length < 2)) {
      setNameCSS((prev) => {
        return {
          ...prev,
          checkMark : 0
        }
      })
    }
  }

  const focusNameCSS = (e) => {
    setNameCSS(() => {
      return {
        bottom: "55px",
        fontSize: "18px",
        color: "rgb(0, 224, 131)",
        left: "10px"
      }
    })
  }

  const blurNameCSS = (e) => {
    if (nameCSS.checkMark == 0) {
      setNameCSS(() => {  
        return {
          bottom: "12px",
          fontSize: "22px",
          color: "rgb(0, 138, 80)",
          left: "10px"
        }
      })
    }
    else if (nameCSS.checkMark == 1) {
      setNameCSS(() => {  
        return {
          bottom: "55px",
          fontSize: "18px",
          color: "rgb(0, 224, 131)",
          left: "10px"
        }
      })
    }
  }

  const setChanges = (e) => {
    if(e.target.value >= 0 && e.target.value <= 24) {
      setPlanData((prevData) => {
        return {
          ...prevData,
          [e.target.name] : e.target.value
  
        }
      })
    }
   }
  
  const params = useParams();

  useEffect(() => {
                                                                                        // Getting inserted hours (users)
    axios.get(`https://mern-planable.herokuapp.com/plan/${params.code}`, { params: {
      code: params.code,
      status: 0
    }})
      .then((days) => {
        if (days.data.length == 0) {
          setPlanState(2)
        }
        else {
          setPlanState(0)

        const model = (day) => {
          return ( <div
              className="planBar"
              style={{left: `${day.num1 / 24 * 100}%`,
                    right: `${(24 - day.num2) / 24 * 100}%`}}>
            </div>
          )}

        const pModel = (day) => {
          return (
            <p className='person'>{day.username}</p>
          )
        }

        days.data.map((day) => {

          switch (day.day) {
            case "sat":
              setPrevSat((prev) => [...prev, model(day)])
            
              setPeople((prev) => [...prev, pModel(day)])
              break;
            case "sun":
              setPrevSun((prev) => [...prev, model(day)])
              break;
            case "mon":
              setPrevMon((prev) => [...prev, model(day)])
              break;
            case "tue":
              setPrevTue((prev) => [...prev, model(day)])
              break;
            case "wed":
              setPrevWed((prev) => [...prev, model(day)])
            break;
            case "thu":
              setPrevThu((prev) => [...prev, model(day)])
            break;
            case "fri":
              setPrevFri((prev) => [...prev, model(day)])
          }

        }
        )

      }
    })
      .catch((err) => console.log(err))

  }, [])
                                                                                          // Saving inserted Data
  const saveData = () => {
    if (userData.username.length > 1) {
      const daysData = [
        {day: "sat", min: planData.satMin, max: planData.satMax, username: userData.username},
        {day: "sun", min: planData.sunMin, max: planData.sunMax, username: userData.username},
        {day: "mon", min: planData.monMin, max: planData.monMax, username: userData.username},
        {day: "tue", min: planData.tueMin, max: planData.tueMax, username: userData.username},
        {day: "wed", min: planData.wedMin, max: planData.wedMax, username: userData.username},
        {day: "thu", min: planData.thuMin, max: planData.thuMax, username: userData.username},
        {day: "fri", min: planData.friMin, max: planData.friMax, username: userData.username}
      ]
  
      daysData.forEach((dayData) => {
        axios.post(`https://mern-planable.herokuapp.com/plan/${params.code}`, dayData)
          .catch((err) => console.error(err))
      })

      setPlanState(1)
      alert("Data saved successfully!")
    }
    else {
      alert("You should pick a username")
    }
  }
  
  if (planState === 0) {
    return(
      <div className="planLayout">
          <div className="infoBox">
            <div className="planLogo"></div>
            <h4 className="appTitle" title='Plan Name'>{}</h4>
            <h5 className="appCode" title='Plan Code'>{params.code}</h5>
            <p className="appDescription">Add your schedule for every day and review others.</p>
          </div>
          <div className="plansContainer">
          <div className='peopleTest'>
              {people}
            </div>

            <div className="satSec section">
              <div className="planDayInfo">
                <b className="satPlanDay planDay">sat.</b>
                <p className="satPlanDayDate planDayDate">
                  
                </p>
                <div className="input-table">
                  <input type="number"
                        className='inputMin inputMinsat'
                        onChange={setChanges}
                        name="satMin"
                        placeholder='from'
                  />
                  <input type="number"
                        className='inputMaxsat inputMax'
                        onChange={setChanges}
                        name="satMax"
                        placeholder='to'
                  />
                </div>
              </div>
              <div className="satPlan plan 1">
                <div className="satPlanHours planHours">
                  <Hours/>
                </div>
                <div className="satPlanBar planBar"
                  style={{left: `${planData.satMin / 24 * 100}%`,
                          right: `${(24 - planData.satMax) / 24 * 100}%`}}>   
                </div>
                {prevSat}
              </div>
            </div>
            <br />

            <div className="sunSec section">
              <div className="planDayInfo">
                <b className="sunPlanDay planDay">sun.</b>
                <p className="sunPlanDayDate planDayDate"></p>
                <div className="input-table">
                  <input type="number"
                        className='inputMin inputMinsun '
                        onChange={setChanges}
                        name="sunMin"
                        placeholder='from'
                  />
                  <input type="number"
                        className='inputMaxsun inputMax'
                        onChange={setChanges}
                        name="sunMax"
                        placeholder='to'
                  />
                </div>
              </div>
              <div className="sunPlan plan 1">
                <div className="sunPlanHours planHours">
                  <Hours/>
                </div>
                <div className="sunPlanBar planBar"
                  style={{left: `${planData.sunMin / 24 * 100}%`,
                          right: `${(24 - planData.sunMax) / 24 * 100}%`}}>
                </div>
                {prevSun}
              </div>
            </div>
            <br />

            <div className="monSec section">
              <div className="planDayInfo">
                <b className="monPlanDay planDay">mon.</b>
                <p className="monPlanDayDate planDayDate"></p>
                <div className="input-table">
                  <input type="number"
                        className='inputMin inputMinmon'
                        onChange={setChanges}
                        name="monMin"
                        placeholder='from'
                  />
                  <input type="number"
                        className='inputMaxmon inputMax'
                        onChange={setChanges}
                        name="monMax"
                        placeholder='to'
                  />
                </div>
              </div>
              <div className="monPlan plan 1">
                <div className="monPlanHours planHours">
                  <Hours/>
                </div>
                <div className="monPlanBar planBar"
                  style={{left: `${planData.monMin / 24 * 100}%`,
                          right: `${(24 - planData.monMax) / 24 * 100}%`}}>
                </div>
                {prevMon}
              </div>
            </div>
            <br />

            <div className="tueSec section">
              <div className="planDayInfo">
                <b className="tuePlanDay planDay">tue.</b>
                <p className="tuePlanDayDate planDayDate"></p>
                <div className="input-table">
                  <input type="number"
                        className='inputMin inputMintue '
                        onChange={setChanges}
                        name="tueMin"
                        placeholder='from'
                  />
                  <input type="number"
                        className='inputMaxtue inputMax'
                        onChange={setChanges}
                        name="tueMax"
                        placeholder='to'
                  />
                </div>  
              </div>
              <div className="tuePlan plan 1">
                <div className="tuePlanHours planHours">
                  <Hours/>
                </div>
                <div className="tuePlanBar planBar"
                  style={{left: `${planData.tueMin / 24 * 100}%`,
                          right: `${(24 - planData.tueMax) / 24 * 100}%`}}>
                </div>
                {prevTue}
              </div>
            </div>
            <br />

            <div className="wedSec section">
              <div className="planDayInfo">
                <b className="wedPlanDay planDay">wed.</b>
                <p className="wedPlanDayDate planDayDate"></p>
                <div className="input-table">
                  <input type="number"
                        className='inputMin inputMinwed'
                        onChange={setChanges}
                        name="wedMin"
                        placeholder='from'
                  />
                  <input type="number"
                        className='inputMaxwed inputMax'
                        onChange={setChanges}
                        name="wedMax"
                        placeholder='to'
                  />
                </div>  
              </div>
              <div className="wedPlan plan 1">
                <div className="wedPlanHours planHours">
                  <Hours/>
                </div>
                <div className="wedPlanBar planBar"
                  style={{left: `${planData.wedMin / 24 * 100}%`,
                          right: `${(24 - planData.wedMax) / 24 * 100}%`}}>
                </div>
                {prevWed}
              </div>
            </div>
            <br />

            <div className="thuSec section">
              <div className="planDayInfo">
                <b className="thuPlanDay planDay">thu.</b>
                <p className="thuPlanDayDate planDayDate"></p>
                <div className="input-table">
                  <input type="number"
                        className='inputMin inputMinthu'
                        onChange={setChanges}
                        name="thuMin"
                        placeholder='from'
                  />
                  <input type="number"
                        className='inputMaxthu inputMax'
                        onChange={setChanges}
                        name="thuMax"
                        placeholder='to'
                  />
                </div>
              </div>
              <div className="thuPlan plan 1">
                <div className="thuPlanHours planHours">
                  <Hours/>
                </div>
                <div className="thuPlanBar planBar"
                  style={{left: `${planData.thuMin / 24 * 100}%`,
                          right: `${(24 - planData.thuMax) / 24 * 100}%`}}>
                </div>
                {prevThu}
              </div>
            </div>
            <br />

            <div className="friSec section">
              <div className="planDayInfo">
                <b className="friPlanDay planDay">fri.</b>
                <p className="friPlanDayDate planDayDate"></p>
                <div className="input-table">
                  <input type="number"
                        className='inputMin inputMinfri'
                        onChange={setChanges}
                        name="friMin"
                        placeholder='from'
                  />
                  <input type="number"
                        className='inputMaxfri inputMax'
                        onChange={setChanges}
                        name="friMax"
                        placeholder='to'
                  />
                </div>  
              </div>
              <div className="friPlan plan 1">
                <div className="friPlanHours planHours">
                  <Hours/>
                </div>
                <div className="friPlanBar planBar"
                  style={{left: `${planData.friMin / 24 * 100}%`,
                          right: `${(24 - planData.friMax) / 24 * 100}%`}}>
                </div>
                {prevFri}
              </div>
            </div>
            <br />

            <div className='nameInputDiv'>
                <span
                className='nameInputTitle'
                style={{bottom: `${nameCSS.bottom}`,
                        fontSize: `${nameCSS.fontSize}`,
                        color: `${nameCSS.color}`,
                        left: `${nameCSS.left}`
                }}>Username</span>
              <input 
              minLength="2"
              maxLength="20"
              type="string"
              name='nameInput'
              onChange={nameCheck}
              onFocus={focusNameCSS}
              onBlur={blurNameCSS}
              className='nameFinalInput'
              />
            </div>
          </div>
          <div className="planBtns">
            <button className="planBtn saveData"
                    onClick={saveData}
            >Add Your Schedule</button>
            <Link to="/" style={{ textDecoration: 'none' }} className="planBtn planPageHomeBtn">Home
            </Link>
          </div> 
          <div className="planFooter">
            Made using MERN Stack    
          </div>
      </div>
    );
  }
  else if (planState === 1) {
    return (
        <div className="afterPlanContainer">
          <div className='afterPlanTable2'>
            <div className='afterPlanResponse'>
              <b>Your Schedule added successfully!</b>
              <Link to="/" style={{ textDecoration: 'none' }} className="home-btn-after">Home
              </Link>
            </div>
          </div>
        </div>
    )
  }
  else if (planState === 2) {
    return (
      <div className="errorTable">
        <code className="error">Ooops!
          Looks like the Plan you're looking for doesn't exist :/</code>
        <Link to="/join-plan" style={{ textDecoration: 'none' }} className="error-btn">Back
          </Link>
      </div>
    )  
  }
  else if (planState === 3) {
    return (
      <div className="loadingTable">
        Loading
        <div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
      </div>
    )
  }
}

export default Plan;