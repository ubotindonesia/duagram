const { duaGram } = require("duagram");
const fetch = require('node-fetch'); //you must install node-fetch first

const bot = new duaGram({
    api_id: 1,
    api_hash: 'your-api-hash',

    logLevel: 1, 
    logDetail: "info", // none, error, warn, info, debug

    session: ''
});

bot.cmd("downloadImage", async (ctx) => {   
	fetch("https://raw.githubusercontent.com/ubotindonesia/duagram/main/asset/2gram%20banner.jpg")
	.then(res => res.buffer())
	.then(async buffer => {
		let wait = await bot.sendMessage(ctx, 'Downloading...', { replyToMsgId: ctx.id });
		var chat_id, message_id;
		if (wait.updates) {
			chat_id = wait.chats[0].id;
			message_id = wait.updates[0].id
		} else {
			chat_id = ctx.peer.id;
			message_id = wait.id;
		}
		const downEdit = async (num) => {
			num = Math.floor(num * 100);
			var log = `\r[${num}%]`
			return bot.client.editMessage(chat_id, {message: message_id, text: 'Downloading... '+log}).catch(e => terminal.error(e.message))
		}
		bot.client.sendFile(chat_id, {file: buffer, replyTo: ctx.id, progressCallback: downEdit})
		.then(() => bot.deleteMessage(chat_id, message_id))
	})
})

bot.start();