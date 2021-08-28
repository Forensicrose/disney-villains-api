/* eslint-disable max-len */
const chai = require('chai')
const sinon = require('sinon')
const sinonChai = require('sinon-chai')
const models = require('../../models')
const { describe, it } = require('mocha')
const { villainList, singleVillain, savedVillain } = require('../mocks/villains')
const { getVillains, villainBySlug, newVillain } = require('../../controllers/villains')

chai.use(sinonChai)
const { expect } = chai

describe('getting all villains', () => {
  describe('getVillains', () => {
    it('retrieves and returns a list of villains from the database', async () => {
      const stubbedFindAll = sinon.stub(models.scaryVillains, 'findAll').returns(villainList)
      const stubbedSend = sinon.stub()
      const response = { send: stubbedSend }

      await getVillains({}, response)

      expect(stubbedFindAll).to.have.callCount(1)
      expect(stubbedSend).to.have.been.calledWith(villainList)
    })
  })


  describe('villainBySlug', () => {
    it('retrieves and returns the villain associated with the provided slug from the database', async () => {
      const request = { params: { slug: 'gaston' } }
      const stubbedSend = sinon.stub()
      const response = { send: stubbedSend }
      const stubbedFindOne = sinon.stub(models.scaryVillains, 'findOne').returns(singleVillain)

      await villainBySlug(request, response)

      expect(stubbedFindOne).to.have.been.calledWith({ where: { slug: 'gaston' } })
      expect(stubbedSend).to.have.been.calledWith(singleVillain)
    })
  })

  describe('newVillain', () => {
    it('infomation about a new villain is created and saved into the database. The new villain is sent back with a 201 status', async () => {
      const request = { body: savedVillain }
      const stubbedSend = sinon.stub()
      const stubbedStatus = sinon.stub().returns({ send: stubbedSend })
      const response = { status: stubbedStatus }
      const stubbedCreate = sinon.stub(models.scaryVillains, 'create').returns(singleVillain)

      await newVillain(request, response)

      expect(stubbedCreate).to.have.been.calledWith(savedVillain)
      expect(stubbedStatus).to.have.been.calledWith(201)
      expect(stubbedSend).to.have.been.calledWith(singleVillain)
    })
  })
})
