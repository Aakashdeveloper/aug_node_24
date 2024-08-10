//const request = require('supertest');
const chai = require('chai');
const app =  require('../app');
const chaiHttp = require('chai-http')
chai.use(chaiHttp)

const expect = chai.expect

describe('Api Route', () => { 
    describe('GET /location',() => {
        it('Shoudl return a list of cities', (done) => {
            chai.request('http://127.0.0.1:8778')
            .get('/location')
            .then((res) =>{
                expect(res).to.have.status(200)
                // expect(res).to.have.status(200)
                done()
            })
        })

        it('Shoudl return a list of cities', (done) => {
            chai.request('http://127.0.0.1:8778')
            .post('/placeOrder')
            .send({"test":"123"})
            .then((res) =>{
                expect(res).to.have.status(200)
                // expect(res).to.have.status(200)
                done()
            })
        })
    })
 })