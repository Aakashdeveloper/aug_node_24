import request from 'supertest';
import {expect} from 'chai';
import app from '../app';

describe('Api Route', () => { 
    describe('GET /location',() => {
        it('Shoudl return a list of cities', async function(){
            const res = await request(app).get('/location');
            expect(res.status).to.equal(200);
            expect(res.body).to.be.an(array)
        })
    })
 })