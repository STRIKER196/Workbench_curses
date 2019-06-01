export default class ProfileVievs extends Component {
    render() {
      return (
        <Container>
          <Header />
          <Content>
            <List>
              <ListItem avatar>
                <Left>
                  <Thumbnail source={{ uri: 'Image URL' }} />
                </Left>
                <Body>
                  <Text>Kumar Pratik</Text>
                  <Text note>Doing what you like will always keep you happy . .</Text>
                </Body>
                <Right>
                  <Text note>3:43 pm</Text>
                </Right>
              </ListItem>
            </List>
          </Content>
        </Container>
      );
    }
  }