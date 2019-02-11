import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";

class CommentList extends React.Component {
  renderItem = (item, index) => (
    <View key={index} style={styles.comment}>
      <Text>{item}</Text>
    </View>
  );

  render() {
    const { items } = this.props;

    return <ScrollView>{items.map(this.renderItem)}</ScrollView>;
  }
}

const styles = StyleSheet.create({
  comment: {
    marginLeft: 20,
    paddingVertical: 20,
    paddingRight: 20,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "rgba(0,0,0,0.05)"
  }
});

export default CommentList;
