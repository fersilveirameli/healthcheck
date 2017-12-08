
process.env.NODE_ENV = 'test';

const server   = require('../index');
const chai     = require('chai');
const chaiHttp = require('chai-http');
const should   = chai.should();
chai.use(chaiHttp);

describe('Health', function() {

    beforeEach(function(done) {
        done();
    });

    afterEach(function(done) {
        done();
    });


    it('Check status DOWN global', function(done) {

        chai.request(server)
        .get('/health')
        .end(function(err, res){
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.be.a('object');
            res.body.should.have.property('status');
            res.body.should.have.property('services');
            res.body.status.should.equal('UP');
            res.body.services.should.be.a('array');

            done();
        });
    });

    it('Check status DOWN por instancia', function(done) {

        chai.request(server)
        .get('/health?service=app1')
        .end(function(err, res){
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.be.a('object');
            res.body.should.have.property('name');
            res.body.should.have.property('url');
            res.body.should.have.property('health');
            res.body.name.should.equal('app1');
            res.body.url.should.equal('http://app1:8080/health');
            res.body.health.should.equal('Error: getaddrinfo ENOTFOUND app1:8080');

            done();
        });
    });
});
