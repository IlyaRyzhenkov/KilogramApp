export class MessageService {
    static createSendMessage(token, chatId) {
        return messageText => {
            if (messageText.length > 0) {
                fetch('https://kilogram-api.yandex-urfu-2021.ru/query', {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json', 'Authorization': token},
                    body: JSON.stringify({
                        query: `mutation SendMessage($chatId: ID!, $text: String!) {
                                sendMessage(chatId: $chatId, text: $text) { createdAt }
                            }`,
                        variables: {chatId: chatId, text: messageText}
                    })
                })
            }
        }
    }

    static createMessageSubscription(callback, chatId, controller=null, token) {
        if (controller === null) {
            controller = new AbortController();
        }
        const signal = controller.signal;

        fetch('https://kilogram-api.yandex-urfu-2021.ru/query', {
            method: 'POST',
            signal: signal,
            headers: { 'Content-Type': 'application/json', 'Authorization': token },
            body: JSON.stringify({
                query: `subscription NewMessage($chatId: ID!) {
			                newMessage(chatId: $chatId) { 
				                text
				                createdAt
				                createdBy {
				                    image
				                    login
				                    name
				                }
			                } 
                        }`,
                variables: {chatId: chatId}
            })
        }).then(res => res.json().then(json => {
            callback(json.data.newMessage, chatId);
            this.createMessageSubscription(callback, chatId, controller, token);
        })).catch(e => setTimeout(this.createMessageSubscription, 5, callback, chatId, controller, token));
    }

    static getChatList(callback, token) {
        fetch('https://kilogram-api.yandex-urfu-2021.ru/query', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Authorization': token
        },
          body: JSON.stringify({
            query: `query GetChats($offset: Int, $first: Int) {
              chats(offset: $offset, first: $first) {
                id
                image
                name
                messages {
                  createdBy { 
                    image
                    login 
                    name
                  }
                  createdAt
                  text
                }
              }
            }`,
            variables: {offset: 0, first: 100}
          })
        })
            .then(response => response.json())
            .then(json => callback({chats: json.data.chats}));
    }
}