import { Component } from "react";
import { userService } from "../services/user-service";
import Lock from '../assets/img/user-lock.PNG'
import Card from '../assets/img/user-card.PNG'


export class UserDetails extends Component {

  state = {
    user: "",
    isEditMode: false
  }

  componentDidMount() {
    this.loadUser()
    this.props.setFooterDisplay(false)
    this.props.setHomePage('user')
  }

  componentWillUnmount() {
    this.props.setFooterDisplay(true)
  }

  loadUser = async () => {
    let sessionUser = sessionStorage.getItem('loggedinUser')
    sessionUser = JSON.parse(sessionUser)
    const user = await userService.getById(sessionUser._id)
    this.setState({ user })
  }

  handleChange = ({ target }) => {
    const { name } = target
    const { value } = target
    this.setState({ user: { ...this.state.user, [name]: value } })
  }

  onUpdateUser = () => {
    this.props.updateUser(this.state.user)
    this.toggleEditMode()
  }

  toggleEditMode = () => {
    this.setState({ isEditMode: !this.state.isEditMode })
  }

  render() {
    const currUser = this.state.user

    if (!currUser) return <h1>loading...</h1>
    const { fullname, username, email, imgUrl } = currUser
    const isEditMode = this.state.isEditMode

    return (

      <main className="user-details main page">
        <h1>Personal info</h1>

        <section className="main-user-details">
          {!isEditMode &&
            <div className="user-details-info">
              <div className="user-info-header">
                <img src={imgUrl} alt="avatar" />
                <span>
                  <h4>{'Hello ' + fullname}</h4>
                  <p>It's nice to have you with us</p>
                </span>
              </div>
              <div>
                <h4>full name</h4>
                <p> {fullname}</p>
              </div>
              <div>
                <h4>username</h4>
                <p>{username}</p>
              </div>
              <div>
                <h4>email</h4>
                <p>{email}</p>
              </div>
              <button onClick={this.toggleEditMode}>Edit</button>
            </div>}

          {isEditMode &&
            <div className="user-details-info user-edit" >

              <div className="user-info-header">
                <img src={imgUrl} alt="avatar" />
                <span>
                  <h4>{'Hello ' + fullname}</h4>
                  <p>It's nice to have you with us</p>
                </span>
              </div>

              <div>
                <h4>full name</h4>
                <p><input type="text" name="fullname" autoComplete="off" onChange={this.handleChange} value={fullname} /></p>
              </div>

              <div>
                <h4>username</h4>
                <p><input type="text" name="username" autoComplete="off" onChange={this.handleChange} value={username} /></p>
              </div>

              <div>
                <h4>email</h4>
                <p><input type="text" name="email" autoComplete="off" onChange={this.handleChange} value={email} /></p>
              </div>
              <button onClick={this.onUpdateUser}>save</button>
            </div>}

          <section className="general-info-container">
            <div>
              <img src={Lock} alt="lock" />
              <h3>Which details can be edited?</h3>
              <p>Details Airbnb uses to verify your identity can’t be changed. Contact info and some personal details can be edited, but we may ask you verify your identity the next time you book or create a listing.</p>
            </div>
            <div>
              <img src={Card} alt="card" />
              <h3>What info is shared with others?</h3>
              <p>Airbnb only releases contact information for hosts and guests after a reservation is confirmed.</p>
            </div>
          </section>
        </section>
      </main>
    );
  }
}
