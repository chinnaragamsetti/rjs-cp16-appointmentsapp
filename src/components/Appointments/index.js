// Write your code here
import './index.css'
import {format} from 'date-fns'
import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import AppointmentItem from '../AppointmentItem'

const initialappointmentslist = []
const isstarredinitialList = []
class Appointments extends Component {
  state = {
    title: '',
    date: '',
    appointmentslist: initialappointmentslist,
    isStarredlist: false,
    starredandUnstarredlist: isstarredinitialList,
  }

  onChangetitle = event => {
    this.setState({title: event.target.value})
  }

  onChangedate = event => {
    this.setState({date: event.target.value})
  }

  onSubmitdetails = event => {
    event.preventDefault()
    const {title, date} = this.state
    const currentDate = format(new Date(date), 'dd MMMM yyyy, EEEE')
    const newappointment = {
      id: uuidv4(),
      title,
      date: currentDate,
      isStarred: false,
    }
    this.setState(prevState => ({
      appointmentslist: [...prevState.appointmentslist, newappointment],
      title: '',
      date: '',
      starredandUnstarredlist: [
        ...prevState.starredandUnstarredlist,
        newappointment,
      ],
    }))
  }

  toggleStar = id => {
    // const {appointmentslist} = this.state
    this.setState(prevState => ({
      appointmentslist: prevState.appointmentslist.map(each => {
        if (id === each.id) {
          return {...each, isStarred: !each.isStarred}
        }
        return each
      }),
      starredandUnstarredlist: prevState.starredandUnstarredlist.map(each => {
        if (id === each.id) {
          return {...each, isStarred: !each.isStarred}
        }
        return each
      }),
    }))
  }

  starredAppointments = () => {
    const {isStarredlist, starredandUnstarredlist} = this.state

    if (isStarredlist === false) {
      this.setState(prevState => ({
        appointmentslist: prevState.appointmentslist.filter(each => {
          if (each.isStarred === true) {
            return each
          }
          return null
        }),
        isStarredlist: !prevState.isStarredlist,
      }))
    } else {
      this.setState(prevState => ({
        appointmentslist: starredandUnstarredlist,
        isStarredlist: !prevState.isStarredlist,
      }))
    }
  }

  render() {
    const {appointmentslist, title, date} = this.state

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
                value={title}
                id="title"
                onChange={this.onChangetitle}
              />
              <label htmlFor="date" className="date">
                DATE
              </label>
              <input
                type="date"
                value={date}
                id="date"
                onChange={this.onChangedate}
              />
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
            <h1 className="bottomheading">Appointments</h1>
            <button
              type="submit"
              className="starredbutton"
              onClick={this.starredAppointments}
            >
              Starred
            </button>
          </div>
          <ul className="appointmentslist">
            {appointmentslist.map(each => (
              <AppointmentItem
                details={each}
                key={each.id}
                toggleStar={this.toggleStar}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Appointments
