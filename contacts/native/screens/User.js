import React from "react";
import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import ContactThumbnail from "../components/ContactThumbnail";
import colors from "../utils/colors";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { handleFetchUser } from "../reducers/userReducer";

class User extends React.Component {
  static navigationOptions = ({ navigation: { navigate } }) => ({
    title: "Me",
    headerTintColor: "white",
    headerStyle: {
      backgroundColor: colors.blue
    },
    headerRight: (
      <MaterialIcons
        name="settings"
        size={24}
        style={{ color: "white", marginRight: 10 }}
        onPress={() => navigate("Options")}
      />
    )
  });

  componentDidMount() {
    this.props.handleFetchUser();
  }

  render() {
    const { isFetchingUser, user, userError } = this.props;
    const { avatar, name, phone } = user;

    return (
      <View style={styles.container}>
        {isFetchingUser && <ActivityIndicator size="large" />}
        {userError && <Text>Error...</Text>}
        {!isFetchingUser && !userError && (
          <ContactThumbnail avatar={avatar} name={name} phone={phone} />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.blue
  }
});

const mapStateToProps = ({ user }) => {
  return user;
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ handleFetchUser }, dispatch);
};

User = connect(
  mapStateToProps,
  mapDispatchToProps
)(User);

export default User;
