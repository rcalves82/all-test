import http from 'k6/http'
import { sleep, check } from 'k6'
import uuid from '../libs/uuid.js'


export const options = {
  stages:[
    {duration: '1m', target: 100},
    {duration: '2m', target: 100},
    {duration: '1m', target: 0}
  ],
  thresholds: {
    http_req_duration: ['p(95)<20000'], // 95% das requisições devem responder em até 2s
    http_req_failed: ['rate<0.01'] // 1% das requisições podem ocorrer erro
  }
}

export default function () {
  const url = 'https://serverest.dev/usuarios'

  const payload = {
    nome: `${uuid.v4().substring(28)}`,
    email: `${uuid.v4().substring(28)}@qa.test.com`,
    password: "teste",
    administrador: "true"
  }
  
  const res = http.post(url, payload)
 
  check(res, {
    'Cadastro realizado com sucesso': (r) => r.status === 201
  })

  sleep(1)

}


