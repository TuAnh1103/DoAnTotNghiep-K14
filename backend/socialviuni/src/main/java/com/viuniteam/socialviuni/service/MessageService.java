package com.viuniteam.socialviuni.service;

import com.viuniteam.socialviuni.entity.MessageEntity;
import com.viuniteam.socialviuni.repository.MessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
@Service
public class
MessageService {

    @Autowired
    MessageRepository messageRepository;

    /**
     * Insert message into database.
     *
     * @param messageEntity messageEntity
     * @return entity
     */
    public MessageEntity insert(MessageEntity messageEntity) {
        return messageRepository.save(messageEntity);
    }

    /**
     * Select all by messageTo and messageFrom.
     *
     * @return list entity
     */
    public List<MessageEntity> selectAll() {
        return messageRepository.findAll();
    }

    /**
     * Select all by chatId.
     *
     * @param chatId chatId
     * @return list entity
     */
    public List<MessageEntity> selectByChatId(Long chatId) {
        return messageRepository.findAll(chatId);
    }

    /**
     * Select all by messageTo, messageFrom and chatId.
     *
     * @param messageFrom messageFrom
     * @param messageTo   messageTo
     * @param chatId      chatId
     * @return list entity
     */
    public List<MessageEntity> selectByMessageFromByMessageToByChatId(String messageFrom,
                                                                      String messageTo, Long chatId) {
        return messageRepository.findAll(messageFrom, messageTo, chatId);
    }
}