package com.viuniteam.socialviuni.controller.admin;

import com.viuniteam.socialviuni.dto.response.post.PostResponse;
import com.viuniteam.socialviuni.service.PostService;
import com.viuniteam.socialviuni.utils.PageInfo;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/admin/post")
@AllArgsConstructor
public class AdminPostController {
    private final PostService postService;
    @PostMapping("/getall")
    public Page<PostResponse> getAllPost(@RequestBody PageInfo pageInfo){
        PageRequest pageRequest = PageRequest.of(pageInfo.getIndex(), pageInfo.getSize());
        return postService.findAllPost(pageRequest);
    }
}
