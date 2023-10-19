const faker = require('faker')

const web = {
    name1: faker.name.firstName(),
    email1:faker.internet.email(),
    userRegistered:faker.internet.email(),
    userToTransfer:faker.internet.email(),
    password:"senha123",
    url: 'https://bugbank.netlify.app/#'
}

export  default web