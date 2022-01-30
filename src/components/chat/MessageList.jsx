import { Box, Text, Image, Button } from "@skynexui/components";
import { AuthContext } from "../providers/auth";
import { useContext, useState } from "react";
import appConfig from "../../../config.json";


export default function MessageList({ messageList, messageDelete }) {
  const [loader, setLoader] = useState(true);
  const { infoGit } = useContext(AuthContext);

  setTimeout(() => {
    setLoader(false)
  }, 1000);

  if (loader) {
    return ( <div className="loader"></div> )
  } else {
    return (
      <Box
        tag="ul"
        styleSheet={{
          overflow: "auto",
          overflowX: "hidden",
          display: "flex",
          flexDirection: "column-reverse",
          flex: 1,
          color: appConfig.theme.colors.neutrals["000"],
          marginBottom: "16px",
        }}
      >
        {messageList.map((message) => {
          return (
            <Text
              key={ message.id }
              tag="li"
              styleSheet={{
                borderRadius: "5px",
                padding: "6px",
                marginBottom: "12px",
                marginRight: "5px",
                hover: {
                  backgroundColor: appConfig.theme.colors.neutrals[700],
                },
              }}
            >
              <Box
                styleSheet={{
                  marginBottom: "8px",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Box>
                  <Image
                    styleSheet={{
                      width: "20px",
                      height: "20px",
                      borderRadius: "50%",
                      display: "inline-block",
                      marginRight: "8px",
                    }}
                    src={`https://github.com/${message.login}.png`}
                  />
                  <Text tag="strong">{message.from}</Text>
                  <Text
                    styleSheet={{
                      fontSize: "10px",
                      marginLeft: "8px",
                      color: appConfig.theme.colors.neutrals[300],
                    }}
                    tag="span"
                  >
                    {message.date}
                  </Text>
                </Box>
                <Box>
                  {infoGit.login === message.login && (
                    <Button
                      label="Excluir"
                      iconName="trash"
                      buttonColors={{
                        contrastColor: appConfig.theme.colors.neutrals["000"],
                        mainColor: "#29333D",
                        mainColorLight: "#181F25",
                        mainColorStrong: "#af1b3f",
                      }}
                      onClick={() => messageDelete(message.id)}
                    />)
                  }
                </Box>
              </Box>

              {message.text.startsWith(":sticker:") ? (
                <Image
                  src={message.text.replace(":sticker:", "")}
                  styleSheet={{
                    width: "100px",
                    height: "100px",
                  }}
                /> ) : ( message.text)
              }
            </Text>
          )
        })}
      </Box>
    )
  }
}
