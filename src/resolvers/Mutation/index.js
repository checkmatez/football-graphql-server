const confirmAnswer = require('./confirmAnswer')
const confirmDispute = require('./confirmDispute')
const createAnswer = require('./createAnswer')
const createDispute = require('./createDispute')
const deleteDispute = require('./deleteDispute')
const loginByPin = require('./loginByPin')
const sendPinCode = require('./sendPinCode')

const Mutation = {
  confirmAnswer,
  confirmDispute,
  createAnswer,
  createDispute,
  deleteDispute,
  loginByPin,
  sendPinCode
}

module.exports = Mutation
