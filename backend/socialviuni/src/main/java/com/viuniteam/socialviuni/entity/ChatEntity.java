package com.viuniteam.socialviuni.entity;

import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.*;
import java.io.Serializable;

@EqualsAndHashCode(callSuper = true)
@Entity
@Data
@Table(name = "tbl_chat")
public class ChatEntity extends BaseChatEntity implements Serializable {

    private static final long serialVersionUID = 1L;

    public ChatEntity() {

        super();
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "chat_id", nullable = false)
    private Long chatId;

    @Column(name = "user_id")
    private Long userId;
}