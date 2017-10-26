import React, {Component} from 'react';
import {Image} from 'react-native';
import {
  Container,
  Header,
  View,
  DeckSwiper,
  Card,
  CardItem,
  Thumbnail,
  Text,
  Left,
  Body,
  Icon,
  Button
} from 'native-base';
import {showToast} from "react-native-notifyer";


export default class SoughtPeopleDeckSwiper extends Component {

  static defaultProps = {
    soughtPeople: [],
    navigation: {}
  };

  _deckSwiper;

  _renderDeckSwiper = () => (
    <View>
      <DeckSwiper
        ref={(c) => this._deckSwiper = c}
        dataSource={this.props.soughtPeople}
        renderEmpty={() =>
          <View style={{alignSelf: "center"}}>
            <Text>Ya no queda nadie por buscar. ¡Gracias por tu aporte!</Text>
          </View>
        }
        renderItem={item =>
          <Card style={{elevation: 3}}>
            <CardItem>
              <Left>
                <Thumbnail source={item.image}/>
                <Body>
                <Text>{item.name}</Text>
                <Text note>{item.username}</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem cardBody>
              <Image style={{height: 250, flex: 1}} source={item.image}/>
            </CardItem>
            <CardItem>
              <Icon name="heart" style={{color: '#ED4A6A'}}/>
              <Text>{item.lastSeen}</Text>
            </CardItem>
          </Card>
        }
        onSwipeRight={person => {
          console.debug("[SoughtPeopleDeckSwiper] Swiped right: ", person);
          this.props.navigation.navigate("SupplyInfo", {
            soughtPersonId: person.soughtPersonId,
            onSuccess: () => {
              console.log("[SoughtPeopleDeckSwiper] onSuccess() called. Supplied info correctly.");
              showToast("Gracias por tu ayuda!", {duration: 2000});
              // TODO remove card here...
            },
            onClose: () => {
              console.log("[SoughtPeopleDeckSwiper] onClose() called. Supply info aborted.");
              showToast("Gracias igual!", {duration: 2000});
            }
          });
        }}
        onSwipeLeft={person => {
          console.debug("[SoughtPeopleDeckSwiper] Swiped left: ", person);
          // TODO send card to back, then remove from list?
        }}
      />
    </View>
  );

  _renderSwipeButtons = () => (
    <View style={{
      flexDirection: "row",
      flex: 1,
      position: "absolute",
      bottom: 30,
      left: 0,
      right: 0,
      justifyContent: 'space-between',
      padding: 15
    }}>
      <Button iconLeft onPress={() => this._deckSwiper._root.swipeLeft()}>
        <Icon name="arrow-back"/>
        <Text>No lo he visto :(</Text>
      </Button>
      <Button iconRight onPress={() => this._deckSwiper._root.swipeRight()}>
        <Text>¡Lo he visto!</Text>
        <Icon name="arrow-forward"/>
      </Button>
    </View>
  );

  render() {
    return (
      <Container>
        {/*<Header />*/}
        {this._renderDeckSwiper()}
        {this._renderSwipeButtons()}
      </Container>
    )
  }
}
