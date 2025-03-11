import { useThemeColor } from "../../hooks/useThemeColor.js";
import "../styles/ThemedRadioButton.css";
import { ThemedText } from "./ThemedText.jsx";

export type ThemedRadioButtonProps = {
  id: string;
  label: string;
  selected: boolean;
  onPress: () => void;
}

const SIZE = 20;

export function ThemedRadioButton(props: ThemedRadioButtonProps) {
  const { label, selected, onPress } = props;

  return (
    <view bindtap={onPress}>
      <view className={'Container'}>
        <ThemedText>
          {label}
        </ThemedText>
        {selected ? (
          <view
            className={`OuterSelected`}
          >
            <view className={"InnerSelected"} />
          </view>
        ) : (
          <view
          className={`RadioButton Unselected`}
          />
        )}
      </view>
    </view>
  );
}

