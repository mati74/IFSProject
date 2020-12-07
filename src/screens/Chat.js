import React from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Modal from 'react-native-modal';
import { connect } from 'react-redux';
import { addMessage, changeUser } from '../redux/actions/ChatAction';

class Chat extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showModal: false,
            message: ""
        }
    }

    _renderItem = ({ item }) => {
        let backgroundColor = item.userId === this.props.currentUserId ? "#371adb" : "#ddd"
        let color = item.userId === this.props.currentUserId ? "#fff" : "#000"
        let alignItems = item.userId === this.props.currentUserId ? "flex-end" : "flex-start"
        let marginLeft = item.userId === this.props.currentUserId ? 40 : 0
        let marginRight = item.userId === this.props.currentUserId ? 0 : 40
        return (
            <View style={[styles.flatListItem, { alignItems }]}>
                <Text style={[styles.flatListItemTxt, { backgroundColor, color, marginLeft, marginRight }]}>{item.message}</Text>
            </View>
        )
    }

    _onChangeText = (text) => {
        this.setState({ message: text });
    }

    _send = () => {
        this.props._addMessage({ message: this.state.message, userId: this.props.currentUserId, id: this.props.messages.length + 1 });
        this.setState({ message: "" });
        this.textInput.clear();
    }

    _showModal = () => {
        this.setState({ showModal: true });
    }

    _changeUser = (userId) => {
        this.props._changeUser(userId);
        this._closeModal();
    }

    _closeModal = () => {
        this.setState({ showModal: false });
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.flatListContainer}>
                    <FlatList
                        inverted={true}
                        ref={list => { this.flatList = list }}
                        data={this.props.messages}
                        extraData={this.props}
                        renderItem={this._renderItem}
                        keyExtractor={(item, index) => item.id.toString()}
                    />
                </View>
                <View style={styles.footer}>
                    <TouchableOpacity disabled={this.state.message === ""} style={styles.sendBtn} onPress={this._send}>
                        <Icon name="send" size={30} color={this.state.message === "" ? "#9c9695" : "blue"} />
                    </TouchableOpacity>
                    <TextInput
                        ref={input => { this.textInput = input }}
                        style={styles.textInput}
                        onChangeText={this._onChangeText}
                    />
                    <TouchableOpacity onPress={this._showModal} style={styles.changeUserBtn}>
                        <Text style={{ color: "#fff" }}>userId {this.props.currentUserId}</Text>
                        <Icon name="keyboard-arrow-up" color="#fff" size={20} />
                    </TouchableOpacity>
                </View>
                <Modal
                    isVisible={this.state.showModal}
                    onBackdropPress={this._closeModal}
                    onBackButtonPress={this._closeModal}
                >
                    <View style={styles.modal}>
                        <View style={styles.modalContent}>
                            <Text style={styles.modalTitle}>please select user</Text>
                            <SelectItem text="User 1" onPress={() => this._changeUser(1)} />
                            <SelectItem text="User 2" onPress={() => this._changeUser(2)} />
                        </View>
                    </View>
                </Modal>
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        messages: state.chat.messages,
        currentUserId: state.chat.currentUserId
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        _addMessage: (message) => { dispatch(addMessage(message)) },
        _changeUser: (userId) => { dispatch(changeUser(userId)) }
    }
}

const ChatPage = connect(mapStateToProps, mapDispatchToProps)(Chat)
export default ChatPage

const SelectItem = ({ text, onPress }) => (
    <TouchableOpacity
        style={styles.modalItem}
        onPress={onPress}
    >
        <Text style={styles.modalItemTxt}>{text}</Text>
    </TouchableOpacity>
)


const styles = StyleSheet.create({
    modalItem: {
        borderRadius: 5,
        borderColor: "#ddd",
        marginVertical: 5,
        padding: 5,
        paddingVertical: 10,
        backgroundColor: "#ddd"
    },
    modalTitle: {
        textAlign: "center",
        marginBottom: 10
    },
    modalContent: {
        backgroundColor: "#fff",
        width: "70%",
        padding: 15
    },
    modal: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    changeUserBtn: {
        marginHorizontal: 3,
        paddingLeft: 5,
        height: "100%",
        borderRadius: 10,
        flexDirection: "row",
        alignItems: 'center',
        backgroundColor: "blue"
    },
    textInput: {
        borderWidth: 1,
        borderColor: "black",
        borderRadius: 10,
        flex: 1
    },
    sendBtn: {
        marginLeft: 10
    },
    footer: {
        padding: 10,
        flexDirection: "row-reverse",
        alignItems: "center"
    },
    flatListContainer: {
        flex: 1,
        justifyContent: "flex-end",
        paddingBottom: 10
    },
    container: {
        backgroundColor: "#ffff",
        flex: 1
    },
    modalItemTxt: {
        textAlign: "center"
    },
    flatListItem: {
        marginTop: 20,
        marginHorizontal: 20,
    },
    flatListItemTxt: {
        padding: 10,
        borderRadius: 5
    }
})