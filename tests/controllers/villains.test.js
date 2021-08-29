/* eslint-disable max-len */
const chai = require('chai')
const sinon = require('sinon')
const sinonChai = require('sinon-chai')
const models = require('../../models')
const { before, afterEach, describe, it } = require('mocha')
const { villainList, singleVillain, savedVillain } = require('../mocks/villains')
const { getVillains, villainBySlug, newVillain } = require('../../controllers/villains')

chai.use(sinonChai)
const { expect } = chai

describe('getting all villains', () => {
  let sandbox
  let stubbedFindOne
  let stubbedSend
  let response
  let stubbedSendStatus
  let stubbedStatusSend
  let stubbedStatus

  before(() => {
    sandbox = sinon.createSandbox()

    stubbedFindOne = sandbox.stub(models.scaryVillains, 'findOne')

    stubbedSend = sandbox.stub()
    stubbedSendStatus = sandbox.stub()
    stubbedStatusSend = sandbox.stub()
    stubbedStatus = sandbox.stub()

    response = {
      send: stubbedSend,
      sendStatus: stubbedSendStatus,
      status: stubbedStatus
    }
  })

  afterEach(() => {
    sandbox.reset()
  })

  describe('getVillains', () => {
    it('retrieves and returns a list of villains from the database', async () => {
      const stubbedFindAll = sinon.stub(models.scaryVillains, 'findAll').returns(villainList)

      await getVillains({}, response)

      expect(stubbedFindAll).to.have.callCount(1)
      expect(stubbedSend).to.have.been.calledWith(villainList)
    })
  })


  describe('villainBySlug', () => {
    it('retrieves and returns the villain associated with the provided slug from the database', async () => {
      stubbedFindOne.returns(singleVillain)
      const request = { params: { slug: 'gaston' } }

      await villainBySlug(request, response)

      expect(stubbedFindOne).to.have.been.calledWith({ where: { slug: 'gaston' } })
      expect(stubbedSend).to.have.been.calledWith(singleVillain)
    })

    it('returns a 404 status when no villain is found', async () => {
      stubbedFindOne.returns(null)
      const request = { params: { slug: 'not found' } }

      await villainBySlug(request, response)

      expect(stubbedFindOne).to.have.been.calledWith({ where: { slug: 'not found' } })
      expect(stubbedSendStatus).to.have.been.calledWith(404)
    })
  })

  describe('newVillain', () => {
    it('infomation about a new villain is created and saved into the database. The new villain is sent back with a 201 status', async () => {
      const request = { body: savedVillain }

      stubbedStatus.returns({ send: stubbedStatusSend })
      const stubbedCreate = sinon.stub(models.scaryVillains, 'create').returns(singleVillain)

      await newVillain(request, response)

      expect(stubbedCreate).to.have.been.calledWith(savedVillain)
      expect(stubbedStatus).to.have.been.calledWith(201)
      expect(stubbedStatusSend).to.have.been.calledWith(singleVillain)
    })
  })
})
