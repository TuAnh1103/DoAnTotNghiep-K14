package com.viuniteam.socialviuni.controller.api;

import com.viuniteam.socialviuni.dto.request.comment.CommentSaveRequest;
import com.viuniteam.socialviuni.dto.response.address.AddressResponse;
import com.viuniteam.socialviuni.dto.response.comment.CommentResponse;
import com.viuniteam.socialviuni.dto.response.newsfeed.NewsFeedResponse;
import com.viuniteam.socialviuni.entity.Address;
import com.viuniteam.socialviuni.entity.Favorite;
import com.viuniteam.socialviuni.service.AddressService;
import com.viuniteam.socialviuni.service.CommentService;
import com.viuniteam.socialviuni.service.FavoriteService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/auth")
public class FavoriteController {
    private final FavoriteService favoriteService;
    private final AddressService addressService;

    @GetMapping("/favorite")
    public List<Favorite> getAllFavorite(){
        return favoriteService.findAll();
    }

    @GetMapping("/address")
    public List<AddressResponse> getAllAddress(){
        return addressService.findAll();
    }
}
