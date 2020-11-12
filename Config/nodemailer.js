const nodemailer = require('nodemailer')
const keys = require('./keys');


let transporter = nodemailer.createTransport({
  
    service: 'gmail',
    auth: {
        type: 'OAuth2',
        user: 'allyticc@gmail.com',
        clientId: keys.GOOGLE_CLIENT_ID,
        clientSecret:keys.GOOGLE_CLIENT_SECRET,
        refreshToken: keys.REFRESH_TOKEN,
        accessToken: keys.ACESS_TOKEN,
        },
    
})

let testerAcietou =(nomeTester,email,teste)=> {
    return(
    {
        from: 'Ally <allyticc@gmail.com>',
        to: email,
        subject: 'Convite para teste aceito!',
        html: `<h1>Ally</h1>
                <h2>Seu convite para o teste ${teste} foi aceito ${nomeTester} </h2>`}
    )
}

let contatoEnviado =(nome,email)=> {
    return(
    {
        from: 'Ally <allyticc@gmail.com>',
        to: email,
        subject: 'Mesnagem enviada com sucesso!',
        html: `<h1>Ally</h1>
                <h2>Olá ${nome}, sua mensagem de contato foi enviada com sucesso! Em breve entraremos em contato novamente!`}
    )
}

module.exports={
    testerAcietou,
    transporter,
    contatoEnviado

}