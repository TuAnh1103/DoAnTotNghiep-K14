package com.viuniteam.socialviuni.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MessageModel {

    private Long chatId;

    private Long userId;

    private String messageFrom;

    private String messageTo;

    private String messageText;

    private String messageTime;
}