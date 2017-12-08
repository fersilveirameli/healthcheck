const config  = require(__base + 'config');
const Promise = require("bluebird");
const request = require('request-promise');

module.exports = function(){

    return healthcheck;

};


const healthcheck = function(req, res) {

    if(req.query.service){
        return Promise.filter(config.instances, function(instance){
            return instance.name===req.query.service;
        })
        .then(function(instances){
            if(instances.length>0){
                return checkPerInstance(instances[0])
                .then(function(result){
                    res.status(200).send(result);
                });
            }
            res.status(200).send({'message':'Service not found'});
            return;
        });
    }else{
        return Promise.map(config.instances, checkPerInstance)
        .then(function(result){
            res.status(200).send({
                'status': 'UP',
                'services': result
            });
        });
    }
};

const checkPerInstance = function(instance){

    var options = {
        rejectUnauthorized: false,
        resolveWithFullResponse: true,
        method: 'GET',
        url: instance.endpoint
    };

    if(instance.username){
        options.auth = {
            user: instance.username,
            pass: instance.password,
            sendImmediately: false
        }
    }

    const urlCheck = request(options)
    .then(onCheckSuccess)
    .catch(onCheckError);

    return urlCheck.then(function(health){
        return {
            name: instance.name,
            url: instance.endpoint,
            health: health
        };
    });
};


const onCheckSuccess = function(result){
    if(result.statusCode===200){
        return  JSON.parse(result.body);
    }
    return result;
};

const onCheckError = function(err){
    return err.message;
};
