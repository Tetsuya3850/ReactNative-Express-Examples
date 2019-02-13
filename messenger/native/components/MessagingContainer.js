import {
  BackHandler,
  LayoutAnimation,
  Platform,
  UIManager,
  View
} from "react-native";
import React from "react";

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export const INPUT_METHOD = {
  NONE: "NONE",
  KEYBOARD: "KEYBOARD",
  CUSTOM: "CUSTOM"
};

export default class MessagingContainer extends React.Component {
  static defaultProps = {
    children: null,
    onChangeInputMethod: () => {}
  };

  componentDidMount() {
    this.subscription = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        const { onChangeInputMethod, inputMethod } = this.props;

        if (inputMethod === INPUT_METHOD.CUSTOM) {
          onChangeInputMethod(INPUT_METHOD.NONE);
          return true;
        }

        return false;
      }
    );
  }

  componentWillUnmount() {
    this.subscription.remove();
  }

  componentWillReceiveProps(nextProps) {
    const { onChangeInputMethod } = this.props;

    if (!this.props.keyboardVisible && nextProps.keyboardVisible) {
      // Keyboard shown
      onChangeInputMethod(INPUT_METHOD.KEYBOARD);
    } else if (
      // Keyboard hidden
      this.props.keyboardVisible &&
      !nextProps.keyboardVisible &&
      this.props.inputMethod !== INPUT_METHOD.CUSTOM
    ) {
      onChangeInputMethod(INPUT_METHOD.NONE);
    }

    const { keyboardAnimationDuration } = nextProps;

    // Animate between states
    const animation = LayoutAnimation.create(
      keyboardAnimationDuration,
      Platform.OS === "android"
        ? LayoutAnimation.Types.easeInEaseOut
        : LayoutAnimation.Types.keyboard,
      LayoutAnimation.Properties.opacity
    );
    LayoutAnimation.configureNext(animation);
  }

  render() {
    const {
      children,
      renderInputMethodEditor,
      inputMethod,
      containerHeight,
      contentHeight,
      keyboardHeight,
      keyboardWillShow,
      keyboardWillHide
    } = this.props;

    const useContentHeight =
      keyboardWillShow || inputMethod === INPUT_METHOD.KEYBOARD;

    const containerStyle = {
      height: useContentHeight ? contentHeight : containerHeight
    };

    const showCustomInput =
      inputMethod === INPUT_METHOD.CUSTOM && !keyboardWillShow;

    const keyboardIsHidden =
      inputMethod === INPUT_METHOD.NONE && !keyboardWillShow;

    const keyboardIsHiding =
      inputMethod === INPUT_METHOD.KEYBOARD && keyboardWillHide;

    const inputStyle = {
      height: showCustomInput ? keyboardHeight || 250 : 0
    };

    return (
      <View style={containerStyle}>
        {children}
        <View style={inputStyle}>{renderInputMethodEditor()}</View>
      </View>
    );
  }
}
