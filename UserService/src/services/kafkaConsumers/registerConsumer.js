import consumeMessage from '../../utils/config/kafkaConfig'
import topicConstants from '../utils/constants/topicConstants.js'

consumeMessage(topicConstants.TopicNames.USER_TOPIC, (message)=> {
    console.log(message)
})