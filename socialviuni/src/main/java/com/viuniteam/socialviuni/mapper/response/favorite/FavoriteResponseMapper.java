package com.viuniteam.socialviuni.mapper.response.favorite;

import com.viuniteam.socialviuni.dto.response.favorite.FavoriteResponse;
import com.viuniteam.socialviuni.entity.Favorite;
import com.viuniteam.socialviuni.mapper.Mapper;

@org.mapstruct.Mapper(componentModel = "spring")
public interface FavoriteResponseMapper extends Mapper<Favorite, FavoriteResponse> {
}