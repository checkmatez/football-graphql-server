const fetch = require('node-fetch')
const { GraphQLDateTime } = require('graphql-iso-date')

const User = require('./User')
const Dispute = require('./Dispute')
const Match = require('./Match')
const Team = require('./Team')
const Answer = require('./Answer')

const baseUrl = 'https://api.football.dev.highglossy.com'
const API_KEY =
  '599AA191-9FEA-BC1A39C2100A9DE7B3234A0857633C53-439B-BD87-96F0E85B1ABE'

const resolvers = {
  Query: {
    me: async (parent, args, { accessToken }) => {
      try {
        const response = await fetch(`${baseUrl}/users/me`, {
          headers: { Authorization: accessToken }
        })
        const result = await response.json()
        if (result.error) {
          throw new Error(result.error.message || 'Server error')
        }
        return result.data
      } catch (error) {
        throw error
      }
    },
    dispute: async (parent, { id }, { accessToken }) => {
      try {
        const response = await fetch(`${baseUrl}/disputes/?id=${id}`, {
          headers: { Authorization: accessToken }
        })
        const result = await response.json()
        if (result.error) {
          throw new Error(result.error.message || 'Server error')
        }
        console.log('result', result)
        return result.data
      } catch (error) {
        throw error
      }
    },
    disputes: async (parent, { creatorId, pagination }, { accessToken }) => {
      let url = `${baseUrl}/disputes/?start=${pagination.start}&limit=${
        pagination.limit
      }`
      if (creatorId) {
        url += `&initiatorId=${creatorId}`
      }
      try {
        const response = await fetch(url, {
          headers: { Authorization: accessToken }
        })
        const result = await response.json()
        if (result.error) {
          throw new Error(result.error.message || 'Server error')
        }
        return result.data
      } catch (error) {
        throw error
      }
    },
    answers: async (parent, { creatorId, pagination }, { accessToken }) => []
    // let url = `${baseUrl}/disputes/?start=${pagination.start}&limit=${
    //   pagination.limit
    // }`
    // if (creatorId) {
    //   url += `&responderId=${creatorId}`
    // }
    // try {
    //   const response = await fetch(url, {
    //     headers: { Authorization: accessToken }
    //   })
    //   const result = await response.json()
    //   if (result.error) {
    //     throw new Error(result.error.message || 'Server error')
    //   }
    //   return result.data
    // } catch (error) {
    //   throw error
    // }
  },
  Mutation: {
    sendPinCode: async (parent, { phone }) => {
      try {
        const response = await fetch(`${baseUrl}/auth`, {
          method: 'POST',
          body: JSON.stringify({ username: phone, key: API_KEY }),
          headers: { 'Content-Type': 'application/json' }
        })
        const result = await response.json()
        if (result.error) {
          throw new Error(result.error.message || 'Server error')
        }
        return parseInt(result.data.PIN, 10)
      } catch (error) {
        throw error
      }
    },
    loginByPin: async (parent, { phone, pinCode }) => {
      try {
        const response = await fetch(`${baseUrl}/auth/login`, {
          method: 'POST',
          body: JSON.stringify({
            username: phone,
            password: `${pinCode}`
          }),
          headers: { 'Content-Type': 'application/json' }
        })
        const result = await response.json()
        if (result.error) {
          throw new Error(result.error.message || 'Server error')
        }
        return {
          accessToken: result.data.accessToken,
          currentUser: result.data.user
        }
      } catch (error) {
        throw error
      }
    },
    createDispute: async (
      parent,
      { matchId, text, amount },
      { accessToken }
    ) => {
      try {
        const response = await fetch(`${baseUrl}/disputes`, {
          method: 'POST',
          body: JSON.stringify({ matchId, text, amount }),
          headers: {
            Authorization: accessToken,
            'Content-Type': 'application/json'
          }
        })
        const result = await response.json()
        if (result.error) {
          throw new Error(result.error.message || 'Server error')
        }
        return result.data
      } catch (error) {
        throw error
      }
    },

    deleteDispute: async (parent, { id }, { accessToken }) => {
      try {
        const response = await fetch(`${baseUrl}/disputes?id=${id}`, {
          method: 'DELETE',
          headers: {
            Authorization: accessToken,
            'Content-Type': 'application/json'
          }
        })
        const result = await response.json()
        if (result.error) {
          throw new Error(result.error.message || 'Server error')
        }
        return result.data
      } catch (error) {
        throw error
      }
    },
    createAnswer: async (
      parent,
      { disputeId, comment, amount },
      { accessToken }
    ) => {
      try {
        const response = await fetch(`${baseUrl}/disputes/respond`, {
          method: 'PUT',
          body: JSON.stringify({ disputeId, comment, amount }),
          headers: {
            Authorization: accessToken,
            'Content-Type': 'application/json'
          }
        })
        const result = await response.json()
        if (result.error) {
          throw new Error(result.error.message || 'Server error')
        }
        return result.data
      } catch (error) {
        throw error
      }
    }
  },
  DateTime: GraphQLDateTime,
  User,
  Dispute,
  Match,
  Team,
  Answer
}

module.exports = resolvers
