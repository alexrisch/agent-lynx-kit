
import { ThemedRadioButton, type ThemedRadioButtonProps } from "./ui/ThemedRadioButton.js"
import { ThemedText } from "./ui/ThemedText.jsx";
import "./styles/RadioButtonGroup.css";

type RadioButtonGroupProps = {
  title: string;
  options: ThemedRadioButtonProps[];
}

export function RadioButtonGroup({ options, title }: RadioButtonGroupProps) {

  return (
    <view
      className="container"
    >
      <ThemedText
        type="subtitle"
        className="title"
      >
        {title}
      </ThemedText>
      <view>
        {options.map(option => {
          return (
            <view key={option.id}
            className="itemContainer"
            >
              <ThemedRadioButton
                {...option}
              />
            </view>
          )
        })}
      </view>
    </view>

  );
}
