import { Component } from "react";
import { Link } from "react-router-dom";
import { utilService } from '../services/util-service'

export class Notifications extends Component {

  async componentDidMount() {
    this.props.setFooterDisplay(false)
    this.props.setHomePage('user')
    this.props.setNotifStatus(false)
  }

  async componentWillUnmount() {
    this.props.setFooterDisplay(true)
  }

  onClearNotif = () => {
    const currUser = this.props.loggedInUser
    currUser.notifications = []
    this.props.updateUser(currUser)
  }

  render() {
    const { notifications } = this.props.loggedInUser

    return (
      <main className="notifications main page">
        <section className="notif-list">
          <h1>Notifications</h1>
          {notifications && notifications.map(msg => {
            return (
              <div key={Math.random()} className="notif-card">
                <img src={msg.imgUrl} alt="avatar" />
                <span>
                  <h3>{msg.fullname}</h3>
                  <h4>{utilService.getTimeFormat(msg.createdAt)}</h4>
                </span>
                <h4 className="notif-card-txt">{msg.txt}</h4>
                {msg.type === 'from' && <Link to={`/host/${this.props.loggedInUser._id}`}>Read More</Link>}
                {msg.type === 'to' && <Link to={`/orders`}>Read More</Link>}
              </div>
            )
          })}
          <button onClick={this.onClearNotif}>Clear all</button>
        </section>
      </main>
    );
  }
}
