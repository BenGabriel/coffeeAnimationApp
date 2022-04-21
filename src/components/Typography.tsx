import {Text} from "react-native";
import React, { FC } from "react";

interface Props {
  text: string;
  size?: number;
  color?: string;
  bold?: boolean;
  style?: any;
  alignment?: string
}

const Typography: FC<Props> = ({ text, bold, style, size, color, alignment }) => {
  return (
    <Text
      style={{
        fontSize: size ? size : 14,
        fontWeight: bold ? "bold" : "400",
        color: color ? color : "#333",
        textAlign: alignment,
        ...style
      }}
    >
      {text}
    </Text>
  );
};

export default Typography;
