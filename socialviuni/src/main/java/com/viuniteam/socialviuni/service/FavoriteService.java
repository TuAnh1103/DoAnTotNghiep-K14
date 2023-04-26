package com.viuniteam.socialviuni.service;

import com.viuniteam.socialviuni.dto.request.address.AddressSaveRequest;
import com.viuniteam.socialviuni.dto.request.favorite.FavoriteSaveRequest;
import com.viuniteam.socialviuni.dto.response.favorite.FavoriteResponse;
import com.viuniteam.socialviuni.entity.Favorite;

import java.util.List;

public interface FavoriteService {
    FavoriteResponse findOneById(Long id);
    List<Favorite> findAll();
    void save(FavoriteSaveRequest favoriteSaveRequest);
    void deleteById(Long id);
    void update(Long id,FavoriteSaveRequest favoriteSaveRequest);
}
