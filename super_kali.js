const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const { GoogleGenerativeAI } = require('@google/generative-ai');

// ====================================
// API KEY GEMINI
// ====================================
const genAI = new GoogleGenerativeAI("AIzaSyA0-_wSGnn790uf6uff02StEr_5a9NtEi4");

// ====================================
// CONFIG BOT
// ====================================
const NOME_BOT = "SUPER KALI";
const DONO = "NETO";

console.log(`🚀 Iniciando ${NOME_BOT}...`);

const client = new Client({
    authStrategy: new LocalAuth(),

    puppeteer: {
        headless: false,

        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-gpu'
        ]
    }
});

// ====================================
// QR CODE
// ====================================
client.on('qr', (qr) => {

    console.log('\n📲 Escaneie o QR Code:\n');

    qrcode.generate(qr, {
        small: true
    });
});

// ====================================
// ONLINE
// ====================================
client.on('ready', () => {

    console.log(`\n✅ ${NOME_BOT} ONLINE!\n`);
});

// ====================================
// MENSAGENS
// ====================================
client.on('message_create', async (message) => {

    if (!message.body) return;

    const msg = message.body.toLowerCase().trim();

    console.log('📩 Mensagem:', msg);

    // MENU
    if (msg === 'menu') {

        return message.reply(
`🤖 ${NOME_BOT}

📋 COMANDOS:

• oi
• menu
• hora
• data
• ping
• dono
• ia: pergunta`
        );
    }

    // OI
    if (msg === 'oi') {

        return message.reply('Olá! Bot funcionando 👍');
    }

    // HORA
    if (msg === 'hora') {

        const hora = new Date().toLocaleTimeString('pt-BR');

        return message.reply(`⏰ Hora atual: ${hora}`);
    }

    // DATA
    if (msg === 'data') {

        const data = new Date().toLocaleDateString('pt-BR');

        return message.reply(`📅 Data de hoje: ${data}`);
    }

    // PING
    if (msg === 'ping') {

        return message.reply('🏓 pong');
    }

    // DONO
    if (msg === 'dono') {

        return message.reply(`👑 Meu dono é ${DONO}`);
    }

    // ====================================
    // IA
    // ====================================
    if (msg.startsWith('ia:')) {

        try {

            const pergunta = msg.replace('ia:', '').trim();

            if (!pergunta) {

                return message.reply('❌ Digite uma pergunta.');
            }

            await message.reply('🤖 Pensando...');

            const model = genAI.getGenerativeModel({
    model: "gemini-3.1-flash-lite",
    systemInstruction: "Você é um assistente útil dentro do WhatsApp"
});

            const result = await model.generateContent(pergunta);

            const resposta = result.response.text();

            if (!resposta) {

                return message.reply('❌ IA não respondeu.');
            }

            return message.reply(resposta);

        } catch (erro) {

            console.log('ERRO IA:', erro);

            return message.reply('❌ Erro na IA.');
        }
    }

});

// ====================================
// ERROS
// ====================================
client.on('auth_failure', msg => {

    console.log('❌ Falha:', msg);
});

client.on('disconnected', reason => {

    console.log('⚠️ Desconectado:', reason);
});

// ====================================
// INICIAR
// ====================================
client.initialize();