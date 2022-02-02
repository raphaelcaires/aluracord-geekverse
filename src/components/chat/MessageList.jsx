import { Box, Text, Image, Icon } from "@skynexui/components";
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
          maxWidth: "100%",
          padding: "0px 8px",
        }}
      >
        {messageList.map((message) => {
          return (
            <Text
              key={ message.id }
              tag="li"
              styleSheet={{
                borderRadius: "5px",
                width: '100%',
                padding: "16px",
                hover: {
                  backgroundColor: appConfig.theme.colors.neutrals[700],
                },
              }}
            >
              <Box
                styleSheet={{
                  marginBottom: "10px",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Box>
                  <Image
                    styleSheet={{
                      width: "25px",
                      height: "25px",
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
                    <Icon
                      name={"FaTrashAlt"}
                      styleSheet={{
                        marginLeft: "auto",
                        marginRight: ".2rem",
                        marginTop: ".1rem",
                        cursor: "pointer",
                        transition: ".4s ease all",
                        hover: {
                          color: "#d4214e",
                        },
                      }}
                      onClick={() => messageDelete(message.id)}
                    ></Icon>)
                  }
                </Box>
              </Box>

              {message.text.startsWith(":sticker:") ? (
                <Image
                  src={message.text.replace(":sticker:", "")}
                  styleSheet={{
                    width: "90px",
                    height: "90px",
                    marginLeft: "8px",
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
