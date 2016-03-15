import React, {
    Component,
    View,
    Text,
    StyleSheet,
    TouchableHighlight,
    Image
} from 'react-native';

import Bubble from './Bubble';
import ErrorButton from './ErrorButton';

export default class Message extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        Object.assign(styles, this.props.styles);
    }

    renderName(name, displayNames, diffMessage) {
        if (displayNames === true) {
            if (diffMessage === null || name !== diffMessage.name) {
                return (
                    <Text style={[styles.name]}>{name}</Text>
                );
            }
        }
        return null;
    }

    renderImage(rowData, rowID, diffMessage, forceRenderImage, onImagePress) {
        if (rowData.image !== null) {
            if (forceRenderImage === true) {
                diffMessage = null; // force rendering
            }

            if (diffMessage === null || (diffMessage != null && (rowData.name !== diffMessage.name || rowData.id !== diffMessage.id))) {
                if (typeof onImagePress === 'function') {
                    return (
                        <TouchableHighlight
                            underlayColor='transparent'
                            onPress={() => onImagePress(rowData, rowID)}
                            style={styles.imagePosition}>
                            <Image source={rowData.image}
                                style={[
                                styles.imagePosition,
                                styles.image,
                                (rowData.position === 'left' ? styles.imageLeft : styles.imageRight)]}/>
                        </TouchableHighlight>
                    );
                } else {
                    return (
                        <Image source={rowData.image}
                               style={[
                               styles.imagePosition,
                               styles.image,
                               (rowData.position === 'left' ? styles.imageLeft : styles.imageRight)]}/>
                    );
                }
            } else {
                return (
                    <View style={styles.imagePosition}/>
                );
            }
        }
        return (
            <View style={styles.spacer}/>
        );
    }

    renderErrorButton(rowData, rowID, onErrorButtonPress) {
        if (rowData.status && rowData.status.type === 'error') {
            return (
                <ErrorButton
                    onErrorButtonPress={onErrorButtonPress}
                    rowData={rowData}
                    rowID={rowID}
                    styles={styles}/>
            )
        }
        return null;
    }

    renderStatus(status) {
        if (status && status.type !== 'error') {
            if (status.length > 0) {
                status.text = status.type == 'sentOk' ? '✓' : '';
                return (
                    <View><Text style={[ styles.status, styles[status.type] ]}>{status.text}</Text></View>
                );
            }
        }
        return null;
    }

    render() {
        let {
            rowData,
            rowID,
            onErrorButtonPress,
            position,
            displayNames,
            diffMessage,
            forceRenderImage,
            onImagePress
        } = this.props;

        console.log('render message with props: ', this.props);

        let flexStyle = {};
        let RowView = Bubble;
        if (rowData.text.length > 40) {
            flexStyle.flex = 1;
        }

        if (rowData.view) {
            RowView = rowData.view;
        }

        return (
            <View>
                {position === 'left' ? this.renderName(rowData.name, displayNames, diffMessage) : null}
                <View style={[styles.rowContainer, {justifyContent: position==='left' ? "flex-start" : "flex-end"}]}>
                    {position === 'left' ? this.renderImage(rowData, rowID, diffMessage, forceRenderImage, onImagePress) : null}
                    {position === 'right' ? this.renderErrorButton(rowData, rowID, onErrorButtonPress) : null}
                    <RowView
                        {...rowData}
                        renderCustomText={this.props.renderCustomText}
                        styles={styles}/>
                    {rowData.position === 'right' ? this.renderImage(rowData, rowID, diffMessage, forceRenderImage, onImagePress) : null}
                </View>
                {rowData.position === 'right' ? this.renderStatus(rowData.status) : null}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    rowContainer: {
        flexDirection: 'row',
        marginBottom: 10
    },
    name: {
        color: '#aaaaaa',
        fontSize: 12,
        marginLeft: 55,
        marginBottom: 5
    },
    imagePosition: {
        height: 30,
        width: 30,
        alignSelf: 'flex-end',
        marginLeft: 8,
        marginRight: 8
    },
    image: {
        alignSelf: 'center',
        borderRadius: 15
    },
    imageLeft: {},
    imageRight: {},
    spacer: {
        width: 10
    },
    status: {
        color: '#aaaaaa', 
        fontSize: 12,
        textAlign: 'right',
        marginRight: 15,
        marginBottom: 10,
        marginTop: -5
    },
    error: {
      color: 'red'
    },
    sentOk: {
      color: 'green'
    },      
});