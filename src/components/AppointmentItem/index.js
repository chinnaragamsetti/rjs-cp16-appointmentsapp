// Write your code here

import './index.css'

const AppointmentItem = props => {
  const {details} = props
  const {id, title, date, isStarred, toggleStar} = details

  const starredimage = isStarred
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
  const onClickstar = () => {
    toggleStar(id)
  }
  return (
    <li className="list">
      <div className="detailscontainer">
        <p className="title">{title}</p>
        <p className="date">Date: {date}</p>
      </div>
      <button type="button" onClick={onClickstar}>
        <img src={starredimage} alt="starred" className="star" />
      </button>
    </li>
  )
}

export default AppointmentItem
