import { Box, Text, Button, Image } from '@skynexui/components';
import { AuthContext } from '../providers/auth';
import { useContext } from 'react';
import imgGitHub from '../../img/gitHub.png';


export default function Header() {

  const {user, setUser , infoGit, setInfoGit } = useContext(AuthContext)

  return (
    <>
      <Box 
        styleSheet={{
        width: '100%',
        marginBottom: '16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
        }} >
        <Box>
          
        <Image
          styleSheet={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            display: 'inline-block',
            marginRight: '8px',
          }}
          src={infoGit.id ? `https://github.com/${user}.png` : imgGitHub.src}
        />
        <Text variant='heading5'>
          Olá, {infoGit.name}!
        </Text>
        </Box>
        <Text variant='heading3' styleSheet={{marginRight: "150px", Bottom: "10px"}}>
          Chat
        </Text>
        <Button
          buttonColors={{
            contrastColor: '#FFFFFF',
            mainColor: '#c21e47',
            mainColorLight: '#d4214e',
            mainColorStrong: '#af1b3f',
          }}
          label='Logout'
          onClick={() => {
            setUser('')
            setInfoGit({ name: 'Usuário', status: true }
            )
          }}
          href="/"
        />
      </Box>
    </>
  )
}

/* function MessageList(props) {
  console.log(props.messageList);
  return (
    <Box
      tag="ul"
      styleSheet={{
        overflow: "auto",
        display: "flex",
        flexDirection: "column-reverse",
        flex: 1,
        color: appConfig.theme.colors.neutrals["000"],
        marginBottom: "16px",
      }}
    >
      {props.messageList.map((message) => {
        return (
          <Text
            key={message.id}
            tag="li"
            styleSheet={{
              borderRadius: "5px",
              padding: "6px",
              marginBottom: "12px",
              hover: {
                backgroundColor: appConfig.theme.colors.neutrals[700],
              },
            }}
          >
            <Box
              styleSheet={{
                marginBottom: "8px",
              }}
            >
              <Image
                styleSheet={{
                  width: "20px",
                  height: "20px",
                  borderRadius: "50%",
                  display: "inline-block",
                  marginRight: "8px",
                }}
                src={`https://github.com/${message.from}.png`}
              />
              <Text tag="strong">
                {message.from}
              </Text>
              <Text
                styleSheet={{
                  fontSize: "10px",
                  marginLeft: "8px",
                  color: appConfig.theme.colors.neutrals[300],
                }}
                tag="span"
              >
                {new Date().toLocaleDateString()}
              </Text>
            </Box>
            {message.text.startsWith(':sticker:')
              ? (
                <Image Width="128px" src={message.text.replace(':sticker:', '')} />
              )
              : (
                message.text
              )
            }
          </Text>
        );
      })}
    </Box>
  );
} */