package com.viuniteam.socialviuni.mapper.request.favorite;

import com.viuniteam.socialviuni.dto.request.favorite.FavoriteSaveRequest;
import com.viuniteam.socialviuni.entity.Favorite;
import com.viuniteam.socialviuni.mapper.Mapper;

@org.mapstruct.Mapper(componentModel = "spring")
public interface FavoriteRequestMapper extends Mapper<Favorite, FavoriteSaveRequest> {
}
