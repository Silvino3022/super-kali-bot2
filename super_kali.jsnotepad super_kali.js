const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

console.log('🚀 Iniciando Super Bot...');

const client = new Client({
    authStrategy: new LocalAuth(),

    puppeteer: {
        headless: false,
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox'
        ]
    }
});

// QR CODE
client.on('qr', qr => {
    console.log('\n📲 Escaneie o QR Code:\n');
    qrcode.generate(qr, { small: true });
});

// ONLINE
client.on('ready', () => {
    console.log('\n✅ SUPER BOT ONLINE!\n');
});

// MENSAGENS
client.on('message_create', async message => {

    const msg = message.body.toLowerCase();

    console.log('📩 Mensagem:', msg);

    // MENU
    if (msg === 'menu') {

        message.reply(
`🤖 *SUPER BOT*

📋 COMANDOS:

• oi
• menu
• hora
• data
• ping
• tudo bem
• dono`
        );
    }

    // OI
    else if (msg === 'oi') {
        message.reply('Olá! Bot funcionando 👍');
    }

    // HORA
    else if (msg === 'hora') {

        const hora = new Date().toLocaleTimeString('pt-BR');

        message.reply(`⏰ Hora atual: ${hora}`);
    }

    // DATA
    else if (msg === 'data') {

        const data = new Date().toLocaleDateString('pt-BR');

        message.reply(`📅 Data de hoje: ${data}`);
    }

    // PING
    else if (msg === 'ping') {
        message.reply('🏓 pong');
    }

    // TUDO BEM
    else if (msg === 'tudo bem') {
        message.reply('Estou funcionando perfeitamente 👍');
    }

    // DONO
    else if (msg === 'dono') {
        message.reply('👑 Meu dono é Silvino3022');
    }

});

// ERRO
client.on('auth_failure', msg => {
    console.log('❌ Falha:', msg);
});

// DESCONECTOU
client.on('disconnected', reason => {
    console.log('⚠️ Desconectado:', reason);
});

client.initialize();