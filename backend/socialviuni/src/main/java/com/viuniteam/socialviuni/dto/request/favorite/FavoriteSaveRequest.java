package com.viuniteam.socialviuni.dto.request.favorite;

import lombok.Data;
import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
@Data
public class FavoriteSaveRequest {
    @NotNull(message = "Sở thích không được để trống")
    @NotBlank(message = "Sở thích không được để trống")
    @Length(min = 1,max = 100,  message = "Sở thích phải có độ dài từ 1 đến 100")
    private String favorite_name;
}
