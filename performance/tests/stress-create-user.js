import http from 'k6/http'
import { sleep, check } from 'k6'
import uuid from '../libs/uuid.js'
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

// Test result reporting configuration
export function handleSummary(data) {
  return {
    "report.html": htmlReport(data),
  };
}

// Defining the iterations.
export const options = {
  stages: [
    { duration: '10s', target: 50 }, // traffic ramp-up from 1 to a higher 50 users over 10 seconds.
    { duration: '30s', target: 100 }, // stay at higher 500 users for 100 seconds
    { duration: '5s', target: 0 }, // ramp-down to 0 users
  ],
  thresholds: {
    http_req_duration: ['p(95)<20000'], // 95% of requests must respond within 2s.
    http_req_failed: ['rate<0.01'] // 1% of requests may occur in error
  }
}


export default function () {

  //Define the data to create a new user
  const url = 'https://serverest.dev/usuarios'

  const payload = {
    nome: `${uuid.v4().substring(28)}`,
    email: `${uuid.v4().substring(28)}@qa.test.com`,
    password: "teste",
    administrador: "true"
  }

  // Make a POST request to the create user endpoint
  const res = http.post(url, payload)

  // Check if user creation was successful
  check(res, {
    'Cadastro realizado com sucesso': (r) => r.status === 201
  })

  sleep(1)

}


