import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator
} from "react-native";
import ContactThumbnail from "../components/ContactThumbnail";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { handleFetchContacts } from "../reducers/contactsReducer";

const keyExtractor = ({ phone }) => phone;

class Favorites extends React.Component {
  static navigationOptions = {
    title: "Favorites"
  };

  componentDidMount() {
    if (this.props.contacts.length === 0) {
      this.props.handleFetchContacts();
    }
  }

  renderFavoriteThumbnail = ({ item }) => {
    const {
      navigation: { navigate }
    } = this.props;
    const { avatar } = item;
    return (
      <ContactThumbnail
        avatar={avatar}
        onPress={() => navigate("Profile", { contact: item })}
      />
    );
  };

  render() {
    const { isFetchingContacts, contacts, contactsError } = this.props;
    const favorites = contacts.filter(contact => contact.favorite);

    return (
      <View style={styles.container}>
        {isFetchingContacts && <ActivityIndicator size="large" />}
        {contactsError && <Text>Error...</Text>}
        {!isFetchingContacts && !contactsError && (
          <FlatList
            data={favorites}
            keyExtractor={keyExtractor}
            numColumns={3}
            contentContainerStyle={styles.list}
            renderItem={this.renderFavoriteThumbnail}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    justifyContent: "center",
    flex: 1
  },
  list: {
    alignItems: "center"
  }
});

const mapStateToProps = ({ contacts }) => {
  return contacts;
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ handleFetchContacts }, dispatch);
};

Favorites = connect(
  mapStateToProps,
  mapDispatchToProps
)(Favorites);

export default Favorites;
