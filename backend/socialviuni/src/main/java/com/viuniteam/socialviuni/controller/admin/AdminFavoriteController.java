package com.viuniteam.socialviuni.controller.admin;

import com.viuniteam.socialviuni.dto.request.address.AddressSaveRequest;
import com.viuniteam.socialviuni.dto.request.favorite.FavoriteSaveRequest;
import com.viuniteam.socialviuni.dto.response.address.AddressResponse;
import com.viuniteam.socialviuni.dto.response.favorite.FavoriteResponse;
import com.viuniteam.socialviuni.entity.Favorite;
import com.viuniteam.socialviuni.service.AddressService;
import com.viuniteam.socialviuni.service.FavoriteService;
import com.viuniteam.socialviuni.utils.Keyword;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/admin/favorite")
@AllArgsConstructor
public class AdminFavoriteController {
    private final FavoriteService favoriteService;
    @PostMapping
    public void addFavorite(@Valid @RequestBody FavoriteSaveRequest favoriteSaveRequest){
        favoriteService.save(favoriteSaveRequest);
    }
    @PostMapping("/delete/{id}")
    public void deleteFavorite(@PathVariable("id") Long id){
        favoriteService.deleteById(id);
    }
    @GetMapping("/{id}")
    public FavoriteResponse getById(@PathVariable("id") Long id){
        return favoriteService.findOneById(id);
    }
//    @GetMapping("/name")
//    public FavoriteResponse getByName(@RequestBody Keyword keyword){
//        return addressService.findOneByName(keyword.getKeyword());
//    }
    @GetMapping("/getall")
    public List<Favorite> getAll(){
        return favoriteService.findAll();
    }
    @PostMapping("/{id}")
    public void updateFavorite(@PathVariable("id") Long  id,@RequestBody FavoriteSaveRequest favoriteSaveRequest){
        favoriteService.update(id,favoriteSaveRequest);
    }
}
