package com.viuniteam.socialviuni.controller.api;

import com.viuniteam.socialviuni.dto.response.message.MessageResponse;
import com.viuniteam.socialviuni.helper.MessageHelper;
import com.viuniteam.socialviuni.model.MessageModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;
import java.util.Optional;

@CrossOrigin("*")
@RestController
public class MessageController {

    @Autowired
    MessageHelper messageHelper;

    /**
     * Response message from client.
     *
     * @param message message
     * @return message response.
     */
    @MessageMapping("/chat")
    @SendTo("/topic/messages")
    public MessageResponse send(MessageModel message) {

        // insert new value
        messageHelper.insert(message, message.getChatId());

        return messageHelper.responseMessage(message);
    }

    /**
     * Get all list message.
     *
     * @param messageFrom messageFrom
     * @param messageTo   messageTo
     * @param chatId      chatId
     * @return list message.
     */
    @GetMapping(value = {
            "/api/messages",
            "/api/messages/{messageFrom}/{messageTo}",
            "/api/messages/chat/{chatId}"})
    public List<MessageModel> getListMessageChat(@PathVariable Optional<String> messageFrom,
                                                 @PathVariable Optional<String> messageTo,
                                                 @PathVariable Optional<Long> chatId) {
        if (messageFrom.isPresent() && messageTo.isPresent()) {
            return messageHelper.getAll(messageFrom.get(), messageTo.get(), chatId.orElse(null));
        }
        if (chatId.isPresent()) {
            return messageHelper.getByChatId(chatId.get());
        }

        return messageHelper.getAll();
    }
}