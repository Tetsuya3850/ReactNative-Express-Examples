import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  Linking
} from "react-native";
import ContactListItem from "../components/ContactListItem";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { handleFetchContacts } from "../reducers/contactsReducer";
import getURLParams from "../utils/getURLParams";

const keyExtractor = ({ phone }) => phone;

class Contacts extends React.Component {
  static navigationOptions = {
    title: "Contacts"
  };

  async componentDidMount() {
    this.props.handleFetchContacts();

    Linking.addEventListener("url", this.handleOpenUrl);
    const url = await Linking.getInitialURL();
    this.handleOpenUrl({ url });
  }

  componentWillUnmount() {
    Linking.removeEventListener("url", this.handleOpenUrl);
  }

  handleOpenUrl = event => {
    const {
      navigation: { navigate }
    } = this.props;
    const { url } = event;
    const params = getURLParams(url);
    if (params.name) {
      const queriedContact = this.props.contacts.find(
        contact =>
          contact.name.split(" ")[0].toLowerCase() === params.name.toLowerCase()
      );
      if (queriedContact) {
        navigate("Profile", { contact: queriedContact });
      }
    }
  };

  renderContact = ({ item }) => {
    const {
      navigation: { navigate }
    } = this.props;
    const { id, name, avatar, phone } = item;
    return (
      <ContactListItem
        name={name}
        avatar={avatar}
        phone={phone}
        onPress={() => navigate("Profile", { contact: item })}
      />
    );
  };

  render() {
    const { isFetchingContacts, contacts, contactsError } = this.props;
    const contactsSorted = contacts.sort((a, b) =>
      a.name.localeCompare(b.name)
    );

    return (
      <View style={styles.container}>
        {isFetchingContacts && <ActivityIndicator size="large" />}
        {contactsError && <Text>Error...</Text>}
        {!isFetchingContacts && !contactsError && (
          <FlatList
            data={contactsSorted}
            keyExtractor={keyExtractor}
            renderItem={this.renderContact}
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
  }
});

const mapStateToProps = ({ contacts }) => {
  return contacts;
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ handleFetchContacts }, dispatch);
};

Contacts = connect(
  mapStateToProps,
  mapDispatchToProps
)(Contacts);

export default Contacts;
