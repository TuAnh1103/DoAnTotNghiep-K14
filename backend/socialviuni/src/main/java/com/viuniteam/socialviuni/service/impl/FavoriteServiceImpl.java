package com.viuniteam.socialviuni.service.impl;

import com.viuniteam.socialviuni.dto.request.address.AddressSaveRequest;
import com.viuniteam.socialviuni.dto.request.favorite.FavoriteSaveRequest;
import com.viuniteam.socialviuni.dto.response.favorite.FavoriteResponse;
import com.viuniteam.socialviuni.entity.Address;
import com.viuniteam.socialviuni.entity.Favorite;
import com.viuniteam.socialviuni.entity.User;
import com.viuniteam.socialviuni.mapper.request.favorite.FavoriteRequestMapper;
import com.viuniteam.socialviuni.mapper.response.address.AddressResponseMapper;
import com.viuniteam.socialviuni.mapper.response.favorite.FavoriteResponseMapper;
import com.viuniteam.socialviuni.repository.FavoriteRepository;
import com.viuniteam.socialviuni.service.FavoriteService;
import com.viuniteam.socialviuni.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
public class FavoriteServiceImpl implements FavoriteService {
    private final FavoriteRepository favoriteRepository;
    private final FavoriteResponseMapper favoriteResponseMapper;
    private final FavoriteRequestMapper favoriteRequestMapper;
    private final UserService userService;
    @Override
    public FavoriteResponse findOneById(Long id){
        return favoriteResponseMapper.from(favoriteRepository.findOneById(id));
    }
    @Override
    public void save(FavoriteSaveRequest favoriteSaveRequest) {
        favoriteRepository.save(favoriteRequestMapper.to(favoriteSaveRequest));
    }
    @Override
    public void deleteById(Long id) {
        Favorite favorite = favoriteRepository.findOneById(id);
        if (favorite != null){
            List<User> userListFavorite= userService.findByFavorite(favorite);
            userListFavorite.forEach(user -> {
                List<Favorite> oldFavorites=user.getFavorites();
                List<Favorite> newFavorites=new ArrayList<>();
                oldFavorites.forEach(favorite1->{
                    if(favorite1.getId()!=id)
                    {
                        newFavorites.add(favorite1);
                    }
                });
                user.setFavorites(newFavorites);
                userService.update(user);
            });

            favoriteRepository.deleteById(id);
        }
    }
    @Override
    public void update(Long id, FavoriteSaveRequest favoriteSaveRequest) {
        Favorite favorite = favoriteRepository.findOneById(id);
        if(favorite != null){
            favorite.setFavorite_name(favoriteSaveRequest.getFavorite_name());
            favoriteRepository.save(favorite);
        }
    }
    @Override
    public List<Favorite> findAll(){return favoriteRepository.findAll();}
}
