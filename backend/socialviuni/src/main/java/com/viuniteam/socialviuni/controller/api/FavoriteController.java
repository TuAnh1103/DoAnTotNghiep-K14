package com.viuniteam.socialviuni.controller.api;

import com.viuniteam.socialviuni.dto.request.comment.CommentSaveRequest;
import com.viuniteam.socialviuni.dto.response.comment.CommentResponse;
import com.viuniteam.socialviuni.dto.response.newsfeed.NewsFeedResponse;
import com.viuniteam.socialviuni.entity.Favorite;
import com.viuniteam.socialviuni.service.CommentService;
import com.viuniteam.socialviuni.service.FavoriteService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/auth/favorite")
public class FavoriteController {
    private final FavoriteService favoriteService;

    @GetMapping
    public List<Favorite> getAllFavorite(){
        return favoriteService.findAll();
    }
}
