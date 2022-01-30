import React from "react";
import { Box, Button, Text, Image } from "@skynexui/components";
import appConfig from "../../../config.json";
import imgSad from "../../img/sad.svg";
import imgHappy from "../../img/happy.svg";

export function ButtonSendSticker({ onStickerClick }) {
  const [isOpen, setOpenState] = React.useState('');

  return (
    <Box
      styleSheet={{
        position: "relative",
      }}
    >
      <Image
        src={!isOpen ? imgSad.src : imgHappy.src}
        styleSheet={{
          hover: { cursor: "pointer" },
        }}
        onClick={() => setOpenState(!isOpen)}
      />

      {isOpen && (
        <Box
          styleSheet={{
            display: "flex",
            flexDirection: "column",
            borderRadius: "5px",
            position: "absolute",
            backgroundColor: appConfig.theme.colors.neutrals[800],
            width: {
              xs: "200px",
              sm: "290px",
            },
            height: "300px",
            right: "30px",
            bottom: "50px",
            padding: "16px",
            boxShadow:
              "rgba(4, 4, 5, 0.15) 0px 0px 0px 1px, rgba(0, 0, 0, 0.24) 0px 8px 16px 0px",
          }}
          onClick={() => setOpenState(false)}
        >
          <Text
            styleSheet={{
              color: appConfig.theme.colors.neutrals["000"],
              fontWeight: "bold",
              marginBottom: "5px",
            }}
          >
            Sticker
          </Text>
          <Box
            tag="ul"
            styleSheet={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
              flex: 1,
              paddingTop: "16px",
              overflow: "auto",
            }}
          >
            {appConfig.stickers.map((sticker) => (
              <Text
                tag="li"
                key={sticker}
                onClick={() => onStickerClick(sticker)}
                styleSheet={{
                  width: "30%",
                  borderRadius: "5px",
                  padding: "10px",
                  focus: {
                    backgroundColor: appConfig.theme.colors.neutrals[600],
                  },
                  hover: {
                    backgroundColor: appConfig.theme.colors.neutrals[600],
                    cursor: "pointer",
                  },
                }}
              >
                <Image src={sticker} />
              </Text>
            ))}
          </Box>
        </Box>
      )}
    </Box>
  );
}
