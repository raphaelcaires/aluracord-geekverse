import { Box, TextField, Button } from '@skynexui/components';
import { ButtonSendSticker } from '../src/components/chat/ButtonSendSticker';
import { AuthContext } from '../src/components/providers/auth';
import { useContext, useState, useEffect } from 'react';
import { supabaseClient } from '../client';
import imgBackground from '../src/img/background.png';
import appConfig from '../config.json';
import React from 'react';
import Header from '../src/components/chat/Header';
import MessageList from '../src/components/chat/MessageList';
import dateNow from '../src/components/chat/DateNow';
import Title from '../src/components/styles/Title';


function realTimeMessage(addMessage) {
  return supabaseClient
  .from('messages')
  .on('INSERT', (data) => { addMessage(data.new) })
  .subscribe();
}

export default function ChatPage() {
  const [message, setMessage] = useState('');
  const [messageList, setMessageList] = useState([]);
  const { infoGit } = useContext(AuthContext);

  useEffect(() => {
    supabaseClient
    .from('messages')
    .select('*')
    .order('id', { ascending: false })
    .then(({ data }) => { setMessageList(data)});
    
    realTimeMessage((newMessage) => {
      setMessageList((currentList) => [newMessage,...currentList]);
    });
  }, [messageList]);

  function handleNewMessage(newMessage) {
    const message = {
      from: infoGit.name,
      text: newMessage,
      date: dateNow(),
      login: infoGit.login
    }

    newMessage && (supabaseClient
      .from('messages')
      .insert([message])
      .then(),
      setMessage('')
    );
  }

  async function messageDelete(id){
    await supabaseClient.from('messages').delete().match({id})
    await supabaseClient.from('messages').select('*').order('id', { ascending: false })
    .then(({ data }) => setMessageList(data))
  }

  if(infoGit.id) {
    return (
      <Box
        styleSheet={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundImage: `url(${imgBackground.src})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          color: appConfig.theme.colors.neutrals["000"],
        }}
      >
        <Box
          styleSheet={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            boxShadow: "0 2px 10px 0 rgb(0 0 0 / 20%)",
            borderRadius: "5px",
            backgroundColor: appConfig.theme.colors.neutrals[700],
            height: "100%",
            maxWidth: "80%",
            maxHeight: "85vh",
            minWidth: "90%",
            minHeight: "90vh",
            padding: "30px",
            boxShadow: "0 2px 10px 0 rgb(0 0 0 / 90%)",
          }}
        >
          <Header />
          <Box
            styleSheet={{
              position: "relative",
              display: "flex",
              flex: 1,
              height: "90%",
              maxWidth: "100%",
              maxHeight: "90vh",
              minHeight: "70vh",
              backgroundColor: appConfig.theme.colors.neutrals[600],
              flexDirection: "column",
              borderRadius: "5px",
              padding: "16px",
            }}
          >
            <MessageList messageList={messageList} messageDelete={messageDelete} />
  
            <Box
              as="form"
              styleSheet={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "0px 8px",
              }}
            >
              <TextField
                value={message}
                onChange={(event) => {
                  setMessage(event.target.value);
                }}
                onKeyPress={(event) => {
                  if (event.key === "Enter") {
                    event.preventDefault();
                    message.length > 0 && handleNewMessage(message);
                  }
                }}
                placeholder="Insira sua mensagem aqui..."
                type="textarea"
                styleSheet={{
                  width: "100%",
                  border: "0",
                  resize: "none",
                  borderRadius: "5px",
                  padding: "6px 8px",
                  marginTop: '10px',
                  backgroundColor: appConfig.theme.colors.neutrals[800],
                  color: appConfig.theme.colors.neutrals[200],
                }}
              />
              
              <ButtonSendSticker onStickerClick={(sticker) => {
                handleNewMessage(`:sticker:${sticker}`)
              }} />
  
              <Button
                styleSheet={{ height: "70%" }}
                onClick={() => message.length > 0 && handleNewMessage(message)}
                type="button"
                label="Enviar"
                buttonColors={{
                contrastColor: appConfig.theme.colors.neutrals["000"],
                mainColor: appConfig.theme.colors.primary[700],
                mainColorLight: appConfig.theme.colors.primary[400],
                mainColorStrong: appConfig.theme.colors.primary[600],
                }}
              />
            </Box>
          </Box>
        </Box>
        <Title title="Chat" />
      </Box>
    )
  } else {
    return <><Title title="Error" /></>
  }
}
