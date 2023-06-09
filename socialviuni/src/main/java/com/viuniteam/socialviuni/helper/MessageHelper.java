package com.viuniteam.socialviuni.helper;

import com.viuniteam.socialviuni.common.CommonService;
import com.viuniteam.socialviuni.common.Constant;
import com.viuniteam.socialviuni.common.DatetimeConvertFormat;
import com.viuniteam.socialviuni.dto.response.message.MessageResponse;
import com.viuniteam.socialviuni.entity.ChatEntity;
import com.viuniteam.socialviuni.entity.MessageEntity;
import com.viuniteam.socialviuni.model.MessageModel;
import com.viuniteam.socialviuni.service.ChatService;
import com.viuniteam.socialviuni.service.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.util.CollectionUtils;

import java.text.SimpleDateFormat;
import java.util.*;

@Component
public class MessageHelper {

    @Autowired
    CommonService commonService;

    @Autowired
    MessageService messageService;

    @Autowired
    ChatService chatService;

    /**
     * Response message model.
     *
     * @param messageModel messageModel
     * @return response.
     */
    public MessageResponse responseMessage(MessageModel messageModel) {
        String messageTime = new SimpleDateFormat(Constant.PATTERN_HH_MM).format(new Date());

        return MessageResponse.builder()
                .messageFrom(messageModel.getMessageFrom())
                .messageTo(messageModel.getMessageTo())
                .messageText(messageModel.getMessageText())
                .messageTime(messageTime)
                .build();
    }

    /**
     * Select all article.
     *
     * @param messageModel messageModel
     * @param chatId       chatId
     * @return message entity.
     */
    public MessageEntity insert(MessageModel messageModel, Long chatId) {
        List<MessageEntity> messageModelList = messageService
                .selectByMessageFromByMessageToByChatId(messageModel.getMessageFrom(),
                        messageModel.getMessageTo(), chatId);
        if (CollectionUtils.isEmpty(messageModelList)) {
            ChatEntity chatEntity = this.toBuildChatEntity(messageModel.getUserId());
            chatId = chatService.insert(chatEntity).getChatId();
        } else {
            Set<Long> chatIdSet =
                    new HashSet<>(messageModelList.stream().map(MessageEntity::getChatId).toList());
            List<Long> chatIdValues = new ArrayList<>(chatIdSet);
            chatId = chatIdValues.get(0);
        }

        MessageEntity messageEntity = this.toBuildMessage(messageModel, chatId);
        return messageService.insert(messageEntity);
    }

    /**
     * Select all message.
     *
     * @return list message.
     */
    public List<MessageModel> getAll() {
        return messageService.selectAll()
                .stream()
                .map(this::toBuildMessage)
                .toList();
    }

    /**
     * Select all message.
     *
     * @param messageTo   messageTo
     * @param messageFrom messageFrom
     * @param chatId      chatId
     * @return list message.
     */
    public List<MessageModel> getAll(String messageTo, String messageFrom, Long chatId) {
        return messageService.selectByMessageFromByMessageToByChatId(messageFrom, messageTo, chatId)
                .stream()
                .map(this::toBuildMessage)
                .toList();
    }

    /**
     * Select all message.
     *
     * @return list message.
     */
    public List<MessageModel> getByChatId(Long chatId) {
        return messageService.selectByChatId(chatId)
                .stream()
                .map(this::toBuildMessage)
                .toList();
    }

    /**
     * Build entity.
     *
     * @param userId userId
     * @return entity.
     */
    private ChatEntity toBuildChatEntity(Long userId) {
        ChatEntity chatEntity = new ChatEntity();
        chatEntity.setUserId(userId);
        commonService.setCommonCreatedEntity(chatEntity);

        return chatEntity;
    }

    /**
     * Build entity.
     *
     * @param messageModel messageModel
     * @param chatId       chatId
     * @return entity.
     */
    private MessageEntity toBuildMessage(MessageModel messageModel, Long chatId) {
        MessageEntity messageEntity = new MessageEntity();
        messageEntity.setChatId(chatId);
        messageEntity.setMessageText(messageModel.getMessageText());
        messageEntity.setMessageFrom(messageModel.getMessageFrom());
        messageEntity.setMessageTo(messageModel.getMessageTo());
        commonService.setCommonCreatedEntity(messageEntity);

        return messageEntity;
    }

    /**
     * Build message model.
     *
     * @param messageEntity messageEntity
     * @return message model.
     */
    private MessageModel toBuildMessage(MessageEntity messageEntity) {
        MessageModel messageModel = new MessageModel();
        messageModel.setChatId(messageEntity.getChatId());
        messageModel.setMessageText(messageEntity.getMessageText());
        messageModel.setMessageFrom(messageEntity.getMessageFrom());
        messageModel.setMessageTo(messageEntity.getMessageTo());
        messageModel.setMessageTime(DatetimeConvertFormat
                .convertDateToStringWithFormat(Constant.PATTERN_HH_MM, messageEntity.getCreatedDate()));
        return messageModel;
    }
}