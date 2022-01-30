import { Box, Button, Text, TextField, Image } from '@skynexui/components';
import { AuthContext, Api } from '../src/components/providers/auth';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import imgBackground from '../src/img/background.png';
import imgNotFound from '../src/img/notFound.png';
import imgGitHub from '../src/img/gitHub.png';
import Title from '../src/components/styles/Title';
import appConfig from '../config.json';
import React from 'react';


export default function Home() {
  const router = useRouter();
  const { user, setUser, infoGit, setInfoGit } = useContext(AuthContext);

  function newUser(user) {
    Api(user).then(resp => {
      if (resp.message == 'Not Found') {
        setInfoGit({});
      } else {
        setInfoGit(resp);
        setTimeout(() => {
          router.push(`/Chat`)
        }, 700);
      }
    });
  }

  return (
    <>
      <Title title='GeekVerse 😀' />
      <Box
        styleSheet={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundImage: `url(${imgBackground.src})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <Box
          styleSheet={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexDirection: {
              xs: "column",
              sm: "row",
            },
            width: "100%",
            maxWidth: "600px",
            borderRadius: "5px",
            padding: "32px",
            margin: "16px",
            boxShadow: "0 2px 10px 0 rgb(0 0 0 / 90%)",
            backgroundColor: appConfig.theme.colors.neutrals[700],
          }}
        >
          {/* Formulário */}
          <Box
            as="form"
            onSubmit={function (eventInfo) {
              eventInfo.preventDefault();
              route.push(`/chat?username=${username}`);
            }}
            styleSheet={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              width: { xs: "100%", sm: "50%" },
              textAlign: "center",
              marginBottom: "32px",
              margin: "16px",
            }}
          >
          <Text 
            tag='h2'
            variant='heading1'
            styleSheet={{
              color: appConfig.theme.colors.primary[500],
              fontSize: '24px',
            }}
            >
              Seja bem-vindo(a)!
            </Text>

            <Text
              variant="body3"
              styleSheet={{
                marginTop: "2px",
                marginBottom: "32px",
                color: appConfig.theme.colors.neutrals[300],
              }}
            >
              {appConfig.name}
            </Text>

            <TextField
              placeholder='Insira seu usuário do GitHub'
              value={user}
              onKeyPress={(event) => {
                if(event.key === "Enter") {
                  event.preventDefault();
                  user.length > 0 && newUser(user);
                }
              }}
              onChange={(event) => setUser(event.target.value)}
              fullWidth
              textFieldColors={{
                neutral: {
                  textColor: appConfig.theme.colors.neutrals[200],
                  mainColor: appConfig.theme.colors.neutrals[900],
                  mainColorHighlight: appConfig.theme.colors.primary[900],
                  backgroundColor: appConfig.theme.colors.neutrals[800],
                },
              }}
            />
            <Button
              type='button'
              label='Entrar'
              disabled={user.length < 1 && true}
              onClick={() => newUser(user)}
              fullWidth
              buttonColors={{
                contrastColor: appConfig.theme.colors.neutrals["000"],
                mainColor: appConfig.theme.colors.primary[700],
                mainColorLight: appConfig.theme.colors.primary[400],
                mainColorStrong: appConfig.theme.colors.primary[600],
              }}
              styleSheet={{marginTop: "2px",}}
            />
          </Box>

          {/* Photo Area */}
          <Box
            styleSheet={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              maxWidth: "200px",
              padding: "16px",
              backgroundColor: appConfig.theme.colors.neutrals[800],
              border: "1px solid",
              borderColor: appConfig.theme.colors.neutrals[999],
              borderRadius: "10px",
              flex: 1,
              minHeight: "240px",
            }}
          >
            <Image
              styleSheet={{
                borderRadius: "50%",
                marginBottom: "16px",
                width: '166px',
                height: '166px',
              }}
              src={infoGit.login ? `https://github.com/${infoGit.login}.png` : infoGit.status ? imgGitHub.src : imgNotFound.src}
            />
            <Text
              variant="body4"
              styleSheet={{
                color: appConfig.theme.colors.neutrals[200],
                backgroundColor: appConfig.theme.colors.neutrals[900],
                padding: "3px 10px",
                borderRadius: "1000px",
              }}
            >
              {infoGit.name ? infoGit.name : 'Desculpe, não encontrado!'}
            </Text>
          </Box>
        </Box>
      </Box>
    </>
  );
}
