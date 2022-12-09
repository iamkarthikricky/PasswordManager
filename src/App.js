/* eslint-disable react/no-unknown-property */
/* eslint-disable react/button-has-type */
import './App.css'
import {Component} from 'react'
import {v4} from 'uuid'

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

const ResultsList = props => {
  const {usersDataList, deleteUser, isChecked} = props
  const {id, website, username, password, initialClassName} = usersDataList
  const userIndex = username[0]

  const onDelete = () => {
    deleteUser(id)
  }
  return (
    <li className="list-item">
      <div className={`suffix-view ${initialClassName}`}>
        <p className="password-text">{userIndex}</p>
      </div>
      <div>
        <p>{website}</p>
        <p>{username}</p>
        {isChecked ? (
          <p>{password}</p>
        ) : (
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png "
            alt="stars"
            className="stars"
          />
        )}
      </div>
      <button className="delete-button" onClick={onDelete} testid="delete">
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png "
          alt="delete"
          className="delete-icon"
        />
      </button>
    </li>
  )
}

class App extends Component {
  state = {
    website: '',
    username: '',
    password: '',
    passwordList: [],
    searchInput: '',
    isChecked: false,
  }

  onWebsiteInputChange = event => {
    this.setState({website: event.target.value})
  }

  onUserNameChange = event => {
    this.setState({username: event.target.value})
  }

  onPasswordChange = event => {
    this.setState({password: event.target.value})
  }

  onCheck = () => {
    this.setState(preValue => {
      const {isChecked} = preValue
      return {
        isChecked: !isChecked,
      }
    })
  }

  addUserData = event => {
    event.preventDefault()
    const {website, username, password} = this.state
    const initialBackgroundColorClassName = `initial-container ${
      initialContainerBackgroundClassNames[
        Math.ceil(
          Math.random() * initialContainerBackgroundClassNames.length - 1,
        )
      ]
    }`
    const newUserData = {
      id: v4(),
      website,
      username,
      password,
      initialClassName: initialBackgroundColorClassName,
    }

    this.setState(preValue => ({
      passwordList: [...preValue.passwordList, newUserData],
      website: '',
      username: '',
      password: '',
    }))
  }

  deleteUser = id => {
    const {passwordList} = this.state

    this.setState({
      passwordList: passwordList.filter(eachData => eachData.id !== id),
    })
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  getFilteredList = () => {
    const {passwordList, searchInput} = this.state
    const filteredList = passwordList.filter(eachObject =>
      eachObject.website.toLowerCase().includes(searchInput.toLowerCase()),
    )
    return filteredList
  }

  render() {
    const {website, username, password, isChecked} = this.state
    const filteredPasswordList = this.getFilteredList()
    return (
      <div className="bg">
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png "
          alt="app logo"
          className="app-logo"
        />
        <div className="user-container">
          <form className="form" onSubmit={this.addUserData}>
            <h1 className="feature-text">Add New Password</h1>
            <div className="input-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                alt="website"
                className="logo"
              />
              <input
                type="text"
                className="user-text"
                placeholder="Enter Website"
                value={website}
                onChange={this.onWebsiteInputChange}
              />
            </div>
            <div className="input-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png "
                alt="username"
                className="logo"
              />
              <input
                type="text"
                className="user-text"
                placeholder="Enter Username"
                value={username}
                onChange={this.onUserNameChange}
              />
            </div>
            <div className="input-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                alt="password"
                className="logo"
              />
              <input
                type="password"
                className="user-text"
                placeholder="Enter Password"
                value={password}
                onChange={this.onPasswordChange}
              />
            </div>
            <button className="add-btn">Add</button>
          </form>
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
            alt="password manager"
            className="container-image"
          />
        </div>
        <div className="results-container">
          <div className="flex-row-container">
            <div className="flex-row-container">
              <h1 className="password-text">Your Passwords</h1>
              <div className="password-container">
                <p className="password-number">{filteredPasswordList.length}</p>
              </div>
            </div>
            <div className="search-bar-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png "
                alt="search"
                className="search-logo"
              />
              <input
                type="search"
                placeholder="Search"
                className="search-bar"
                onChange={this.onChangeSearchInput}
              />
            </div>
          </div>
          <hr className="hr-line" />
          <div className="checkbox-container">
            <input
              type="checkbox"
              id="checkbox"
              className="checkbox"
              onClick={this.onCheck}
            />
            <label htmlFor="checkbox" className="password-text">
              Show Passwords
            </label>
          </div>
          {filteredPasswordList.length === 0 ? (
            <div className="no-password">
              <img
                src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                alt="no passwords"
                className="no-password"
              />
              <p className="password-text">No Passwords</p>
            </div>
          ) : (
            <ul className="list-container">
              {filteredPasswordList.map(eachItem => (
                <ResultsList
                  key={eachItem.id}
                  usersDataList={eachItem}
                  deleteUser={this.deleteUser}
                  isChecked={isChecked}
                />
              ))}
            </ul>
          )}
        </div>
      </div>
    )
  }
}

export default App
