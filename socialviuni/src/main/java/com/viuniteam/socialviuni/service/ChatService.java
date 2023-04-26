package com.viuniteam.socialviuni.service;

import com.viuniteam.socialviuni.entity.ChatEntity;
import com.viuniteam.socialviuni.repository.ChatRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.List;
@Service
public class ChatService {

    @Autowired
    ChatRepository chatRepository;

    /**
     * Insert new chat.
     *
     * @param chatEntity chatEntity
     * @return list entity
     */
    public ChatEntity insert(ChatEntity chatEntity) {
        return chatRepository.save(chatEntity);
    }

    /**
     * Select by chatId.
     *
     * @param chatId chatId
     * @return entity
     */
    public Optional<ChatEntity> getById(Long chatId) {
        return chatRepository.findById(chatId);
    }

    /**
     * Select all.
     *
     * @return list of entity.
     */
    public List<ChatEntity> getAll() {
        return chatRepository.findAll();
    }

}