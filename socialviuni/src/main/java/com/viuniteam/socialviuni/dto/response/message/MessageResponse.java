package com.viuniteam.socialviuni.dto.response.message;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MessageResponse {

    private String messageTo;

    private String messageFrom;

    private String messageText;

    private String messageTime;
}