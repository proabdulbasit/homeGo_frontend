import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { StayDetails } from './pages/StayDetails';
import { UserDetails } from './pages/UserDetails';
import { Explore } from './pages/Explore';
import { Wishlist } from './pages/Whislist';
import { LoginSignup } from './pages/LoginSignup';
import { Home } from './pages/Home';
import { Header } from './cmps/Header';
import { Footer } from './cmps/Footer';
import { Dashboard } from './pages/Dashboard';
import { Orders } from './pages/Orders';
import { BecomeHost } from './pages/BecomeHost';
import { Notifications } from './pages/Notifications';
import { Component } from 'react';
import { connect } from 'react-redux';
import { loadStays, removeStay, loadHostStays, loadWishlist, updateStay } from './store/actions/stayActions';
import { stayService } from './services/stay-service'
import { socketService } from './services/socketService'
import { userService } from './services/user-service'
import { loadOrders, removeOrder, updateOrder } from './store/actions/orderActions';
import { addTrip, loadTrip, removeTrip } from './store/actions/tripActions';
import { updateUser, loadUsers, logout, login } from './store/actions/userActions';
import { DynamicModal } from './cmps/app/DynamicModal';
import { UserMsg } from './cmps/app/UserMsg';

class _App extends Component {
  state = {
    userMsg: '',
    isUserMsg: false,
    modalType: '',
    dynamicModal: {
      modalContent: '',
      modalPosition: { top: 0, left: 0, height: 0, width: 0 },
    },
    topRatedStays: [],
    nearbayStays: [],
    isFooterOn: true,
    currPage: 'home',
    isNewNotif: false
  };

  async componentDidMount() {
    this.loadRated();
    this.loadNearby();
    await socketService.setup()
    await socketService.on('ORDER_IN', this.onOrderIn)
  }

  onOrderIn = async (order) => {
    const user = this.props.loggedInUser

    if (user._id === order.host._id) {
      const host = await userService.getById(order.host._id)
      const txt = `${order.user.fullname} booked your stay`
      const createdAt = new Date()
      const imgUrl = order.user.imgUrl
      const fullname = order.user.fullname
      const type = 'from'
      const msg = { txt, createdAt, imgUrl, fullname, type }
      this.setNotifStatus(true)

      if (host.notifications) {
        host.notifications.unshift(msg)
      } else {
        host.notifications = []
        host.notifications.unshift(msg)
      }
      this.props.updateUser(host)

    } else if (user._id === order.user._id) {
      const txt = `Your order has been sent to ${order.host.fullname}`
      const createdAt = new Date()
      const imgUrl = order.host.imgUrl
      const fullname = order.host.fullname
      const type = 'to'
      const msg = { txt, createdAt, imgUrl, fullname, type }

      this.setNotifStatus(true)

      if (user.notifications) {
        user.notifications.unshift(msg)
      } else {
        user.notifications = []
        user.notifications.unshift(msg)
      }
      this.props.updateUser(user)
    }
  }

  setNotifStatus = (isNewNotif) => {
    this.setState({ isNewNotif })
  }

  async componentWillUnmount() {
    await socketService.off('ORDER_IN', this.onOrderIn)
    socketService.terminate()
  }

  loadRated = async () => {
    const topRatedStays = await stayService.getTopRatedStays();
    this.setState({ topRatedStays })
  }

  loadNearby = async () => {
    const nearbayStays = await stayService.getNearbyStays('portugal');
    this.setState({ nearbayStays })
  }

  onSearch = (trip) => {
    this.props.addTrip(trip);
    this.props.loadStays(trip);
  };

  toggleMsgModal = (msg) => {
    this.setState({ userMsg: msg, isUserMsg: true });
    setTimeout(() => {
      this.setState({ isUserMsg: false });
    }, 4000);
    setTimeout(() => {
      this.setState({ userMsg: '' });
    }, 6000);
  };

  setModalContent = (dynamicModal, modalType) => {
    this.setState({ dynamicModal, modalType });
  };

  closeDynamicModal = (ev) => {
    if (ev.type === 'scroll') {
      this.setState({ modalType: '' }, () => {
        window.removeEventListener('click', this.closeDynamicModal, true);
        window.removeEventListener('scroll', this.closeDynamicModal, true);
      });
      return;
    }

    if (ev.target.closest('.dynamic-modal')) return;
    if (ev.target.nodeName === 'BUTTON') return;

    this.setState({ modalType: '' }, () => {
      window.removeEventListener('click', this.closeDynamicModal, true);
      window.removeEventListener('scroll', this.closeDynamicModal, true);
    });
  };

  openDynamicModal = (modalType, ev = null) => {
    if (ev && ev.target.innerText === 'logout') {
      this.setState({ modalType: '' })
      return
    }
    this.setState({ modalType }, () => {
      window.addEventListener('click', this.closeDynamicModal, true);
      window.addEventListener('scroll', this.closeDynamicModal, true);
    });
  };

  setFooterDisplay = (isFooterOn) => {
    this.setState({ isFooterOn })
  }

  setHomePage = (page) => {
    this.setState({ currPage: page })
  }


  render() {

    const {
      stays,
      orders,
      updateUser,
      trip,
      addTrip,
      removeTrip,
      loggedInUser,
      logout,
      loadStays,
      loadOrders,
      removeOrder,
      loadWishlist,
      updateStay,
      login,
      updateOrder
    } = this.props;

    const { userMsg,
      isUserMsg,
      modalType,
      dynamicModal,
      topRatedStays,
      nearbayStays,
      isFooterOn,
      currPage,
      isNewNotif
    } = this.state;

    return (
      <Router>
        <Header
          trip={trip}
          addTrip={addTrip}
          removeTrip={removeTrip}
          modalType={modalType}
          onSearch={this.onSearch}
          loggedInUser={loggedInUser}
          logout={logout}
          openDynamicModal={this.openDynamicModal}
          closeDynamicModal={this.closeDynamicModal}
          setModalContent={this.setModalContent}
          currPage={currPage}
          loadStays={loadStays}
          isNewNotif={isNewNotif}
        />
        <Switch>
          <Route path="/login" render={(props) => (<LoginSignup {...props} setFooterDisplay={this.setFooterDisplay} />)} />
          <Route
            path="/orders"
            render={(props) => (
              <Orders
                {...props}
                loadOrders={loadOrders}
                orders={orders}
                loggedInUser={loggedInUser}
                removeOrder={removeOrder}
                toggleMsgModal={this.toggleMsgModal}
                setFooterDisplay={this.setFooterDisplay}
                setHomePage={this.setHomePage}
              />
            )}
          />
          <Route
            path="/host/:userId"
            render={(props) => (
              <Dashboard
                {...props}
                loggedInUser={loggedInUser}
                updateUser={updateUser}
                toggleMsgModal={this.toggleMsgModal}
                loadOrders={loadOrders} orders={orders}
                setFooterDisplay={this.setFooterDisplay}
                setHomePage={this.setHomePage}
                updateOrder={updateOrder}
              />
            )}
          />
          <Route
            path="/host"
            render={(props) => (
              <BecomeHost
                {...props}
                loggedInUser={loggedInUser}
                setFooterDisplay={this.setFooterDisplay}
              />
            )}
          />
          <Route
            path="/wishlist"
            render={(props) => (
              <Wishlist
                {...props}
                stays={stays}
                loadWishlist={loadWishlist}
                loggedInUser={loggedInUser}
                toggleMsgModal={this.toggleMsgModal}
                login={login}
                setHomePage={this.setHomePage}
                updateUser={updateUser}
                trip={trip}
                addTrip={addTrip}
              />
            )}
          />
          <Route
            path="/stay/:stayId"
            render={(props) => (
              <StayDetails
                {...props}
                onSearch={this.onSearch}
                loggedInUser={loggedInUser}
                toggleMsgModal={this.toggleMsgModal}
                login={login}
                openDynamicModal={this.openDynamicModal}
                modalType={modalType}
                updateStay={updateStay}
                updateUser={updateUser}
                setModalContent={this.setModalContent}
                setHomePage={this.setHomePage}
                setHostSocket={this.setHostSocket}
              />
            )}
          />
          <Route
            path="/explore"
            render={(props) => (
              <Explore
                {...props}
                trip={trip}
                loadStays={loadStays}
                stays={stays}
                updateUser={updateUser}
                loggedInUser={loggedInUser}
                openDynamicModal={this.openDynamicModal}
                closeDynamicModal={this.closeDynamicModal}
                setModalContent={this.setModalContent}
                setHomePage={this.setHomePage}
                toggleMsgModal={this.toggleMsgModal}
                login={login}
                addTrip={addTrip}
              />
            )}
          />
          <Route
            path="/user"
            render={(props) => (
              <UserDetails {...props}
                updateUser={updateUser}
                setHomePage={this.setHomePage}
                setFooterDisplay={this.setFooterDisplay}
              />
            )}
          />
          <Route
            path="/notif"
            render={(props) => (
              <Notifications {...props}
                updateUser={updateUser}
                loggedInUser={loggedInUser}
                setHomePage={this.setHomePage}
                setFooterDisplay={this.setFooterDisplay}
                setNotifStatus={this.setNotifStatus}
              />
            )}
          />
          <Route
            path="/"
            render={(props) => (
              <Home
                {...props}
                onSearch={this.onSearch}
                stays={stays}
                loggedInUser={loggedInUser}
                loadStays={loadStays}
                topRatedStays={topRatedStays}
                nearbayStays={nearbayStays}
                setHomePage={this.setHomePage}
                addTrip={addTrip}
              />
            )}
          />
        </Switch>
        {isFooterOn && <Footer
          onSearch={this.onSearch}
          stays={stays}
          topRatedStays={topRatedStays}
          nearbayStays={nearbayStays}
        />}

        <DynamicModal
          openDynamicModal={this.openDynamicModal}
          modalPosition={dynamicModal.modalPosition}
          modalType={modalType}
        >
          {dynamicModal.modalContent}
        </DynamicModal>

        <UserMsg>
          <section className={`user-msg ${isUserMsg && 'on'} `}>
            {userMsg}
          </section>
        </UserMsg>
      </Router>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    stays: state.stayModule.stays,
    orders: state.orderModule.orders,
    trip: state.tripModule.trip,
    users: state.userModule.users,
    loggedInUser: state.userModule.loggedInUser,
  };
};

const mapDispatchToProps = {
  loadStays,
  addTrip,
  updateUser,
  loadUsers,
  loadTrip,
  removeTrip,
  logout,
  removeStay,
  loadHostStays,
  loadOrders,
  removeOrder,
  loadWishlist,
  updateStay,
  login,
  updateOrder
};

export const App = connect(mapStateToProps, mapDispatchToProps)(_App);
