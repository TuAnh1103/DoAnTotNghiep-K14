package com.viuniteam.socialviuni.dto.response.favorite;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.viuniteam.socialviuni.dto.response.image.ImageResponse;
import com.viuniteam.socialviuni.dto.response.user.UserAuthorResponse;
import lombok.Data;
@Data
public class FavoriteResponse {
        private Long id;
        @JsonProperty("favorite_name")
        private String favorite_name;
}
