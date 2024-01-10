// Write your code here
import './index.css'
import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import AppointmentItem from '../AppointmentItem'

const initialappointmentslist = []
class Appointments extends Component {
  state = {title: '', date: '', appointmentslist: initialappointmentslist}

  onSubmitdetails = event => {
    event.preventDefault()
    const {title, date} = this.state
    const newappointment = {
      id: uuidv4(),
      title,
      date,
      isStarred: false,
    }
    this.setState(prevState => ({
      appointmentslist: [...prevState.appointmentslist, newappointment],
      title: '',
      date: '',
    }))
  }

  toggleStar = id => {
    this.setState(prevState => ({
      appointmentslist: prevState.appointmentslist.map(each => {
        if (id === each.id) {
          return {...each, isStarred: !each.isStarred}
        }
        return each
      }),
    }))
  }

  onChangetitle = event => {
    this.setState({title: event.target.value})
  }

  onChangedate = event => {
    this.setState({date: event.target.value})
  }

  render() {
    const {appointmentslist} = this.state

    return (
      <div className="maincontainer">
        <div className="subcontainer">
          <div className="topcontainer">
            <form className="inputscontainer" onSubmit={this.onSubmitdetails}>
              <h1 className="mainheading">Add Appointment</h1>
              <label htmlFor="title" className="date">
                TITLE
              </label>
              <input
                type="text"
                className="titleinput"
                placeholder="Tile"
                id="title"
                onChange={this.onChangetitle}
              />
              <label htmlFor="date" className="date">
                DATE
              </label>
              <input type="date" id="date" onChange={this.onChangedate} />
              <button type="submit" className="button">
                Add
              </button>
            </form>
            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              className="image"
              alt="appointments"
            />
          </div>
          <hr className="hrline" />
          <div className="starredcontainer">
            <p className="bottomheading">Appointments</p>
            <button type="submit" className="starredbutton">
              Starred
            </button>
          </div>
          <ul className="appointmentslist">
            {appointmentslist.map(each => (
              <AppointmentItem details={each} toggleStar={this.toggleStar} />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Appointments
