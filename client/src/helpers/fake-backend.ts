import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

type User = {
  id: number
  email?: string
  username: string
  password: string
  firstName: string
  lastName: string
  role: string
  token: string
}

const TOKEN =
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJjb2RlcnRoZW1lcyIsImlhdCI6MTU4NzM1NjY0OSwiZXhwIjoxOTAyODg5NDQ5LCJhdWQiOiJjb2RlcnRoZW1lcy5jb20iLCJzdWIiOiJzdXBwb3J0QGNvZGVydGhlbWVzLmNvbSIsImxhc3ROYW1lIjoiVGVzdCIsIkVtYWlsIjoic3VwcG9ydEBjb2RlcnRoZW1lcy5jb20iLCJSb2xlIjoiQWRtaW4iLCJmaXJzdE5hbWUiOiJIeXBlciJ9.P27f7JNBF-vOaJFpkn-upfEh3zSprYfyhTOYhijykdI'

var mock = new MockAdapter(axios, { onNoMatch: 'passthrough' })

export function configureFakeBackend() {
  let users: User[] = [
    {
      id: 1,
      username: 'test',
      password: 'test',
      firstName: 'Test',
      lastName: 'User',
      role: 'Admin',
      token: TOKEN
    }
  ]

  mock.onPost('/login/').reply(function (config) {
    return new Promise(function (resolve, reject) {
      setTimeout(function () {
        let params = JSON.parse(config.data)

        let filteredUsers = users.filter((user) => {
          return (
            user.username === params.username &&
            user.password === params.password
          )
        })

        if (filteredUsers.length) {
          let user = filteredUsers[0]
          resolve([200, user])
        } else {
          resolve([401, { message: 'Username or password is incorrect' }])
        }
      }, 1000)
    })
  })

  mock.onPost('/register/').reply(function (config) {
    return new Promise(function (resolve, reject) {
      setTimeout(function () {
        let params = JSON.parse(config.data)

        // add new users
        let [firstName, lastName] = params.fullname.split(' ')
        let newUser: User = {
          id: users.length + 1,
          username: firstName,
          password: params.password,
          firstName: firstName,
          lastName: lastName,
          role: 'Admin',
          token: TOKEN
        }
        users.push(newUser)

        resolve([200, newUser])
      }, 1000)
    })
  })

  mock.onPost('/forget-password/').reply(function (config) {
    return new Promise(function (resolve, reject) {
      setTimeout(function () {
        let params = JSON.parse(config.data)

        let filteredUsers = users.filter((user) => {
          return user.username === params.username
        })

        if (filteredUsers.length) {
          let responseJson = {
            message:
              "We've sent you a link to reset password to your registered email."
          }
          resolve([200, responseJson])
        } else {
          resolve([
            401,
            {
              message:
                'Sorry, we could not find any registered user with entered username'
            }
          ])
        }
      }, 1000)
    })
  })
}
