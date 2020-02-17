import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { accountInfo } from './reducer';

class GitAccount extends Component {
  componentDidMount() {
    console.log("componentDidMount props: " + JSON.stringify(this.props));
    console.log("componentDidMount state: " + JSON.stringify(this.state));
    // initiates the function call defined in the reducer
    this.props.accountInfo('google');
  }
  render() {
    console.log("render props: " + JSON.stringify(this.props));
    console.log("render state: " + JSON.stringify(this.state));
    const { account } = this.props;
    return (
      <View style={styles.container}>
        <Text>{JSON.stringify(account)}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 16,
  }
});

// Map the state of the redux store to the component props.
const mapStateToProps = state => {
  console.log("mapStateToProps state: " + JSON.stringify(state));
  let storedAccount = {...state.account};// { key: state.account.id, ...state.account };
  return {
    account: storedAccount
  };
};

// Map the dispatched actions to the component props.
// This makes the function call 'this.props.accountInfo('google')' in componentDidMount possible.
const mapDispatchToProps = {
    accountInfo
};

// currying function https://blog.benestudio.co/currying-in-javascript-es6-540d2ad09400
export default connect(mapStateToProps, mapDispatchToProps)(GitAccount);
