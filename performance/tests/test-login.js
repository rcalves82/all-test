import http from 'k6/http'
import { sleep, check } from 'k6'

// Definindo as iterações
export const options = {
    vus: 2,
    duration: '5s'
}

export default function () {
    // Defina os dados de login
    const payload = {
        email: 'fulano@qa.com',
        password: 'teste'
    }

    // Realize uma requisição POST para o endpoint de login
    const response = http.post('https://serverest.dev/login', payload)


    // Verifique se o login foi bem-sucedido
    check(response, {
        'Login realizado com sucesso': (r) => r.status === 200
    })

    sleep(1)

}


