export default class APIService {

  static async _getSmth(setSmth, name) {
    let response = await fetch(`/api/${name}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    let data = await response.json()

    if (response.status === 200) {
      setSmth(data)
    }
  }

  static async _getSmthWithToken(setSmth, name, authTokens) {
    let response = await fetch(`/api/${name}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + String(authTokens.access)
      }
    })
    let data = await response.json()

    if (response.status === 200) {
      setSmth(data)
    }
  }

  static async _postSmth(name, credentials) {
    return await fetch(`/api/${name}/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials)
    }).catch(error => alert(error.response.data))
  }

  static async _putSmthWithToken(name, credentials, authTokens) {
    return await fetch(`api/${name}/`, { 
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + String(authTokens.access)
      },
      body: JSON.stringify(credentials)
    })
  }

  static async getPolls(setPolls) {
    this._getSmth(setPolls, '/polls')
  }

  static async getOnePoll(setPoll, setIsVoted, setCurrentVote, pollSlug, authTokens) {
    let response = await fetch(`/api/polls/${pollSlug}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + String(authTokens.access)
      }
    })

    let data = await response.json()

    if (response.status === 200) {
      setPoll(data['data'])
      setIsVoted(data['is_voted'])
      setCurrentVote(data['main_vote'])
    }
  }

  static async getCurrentUser(setCurrentUser, authTokens) {
    this._getSmthWithToken(setCurrentUser, '/users/current', authTokens)
  }

  static async getPollsForCurrentUser(setPolls, authTokens) {
    this._getSmthWithToken(setPolls, '/polls/for-current-user/', authTokens)
  }

  static async vote(credentials){
    this._postSmth('/polls/vote', credentials)
  }

  static async getAllProfiles(setProfiles){
    this._getSmth(setProfiles, '/users')
  }

  static async changeColor(credentials, authTokens) {
    this._putSmthWithToken('/users/change-color/', credentials, authTokens)
  }
}