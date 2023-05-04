package com.viuniteam.socialviuni.controller.admin;

import com.viuniteam.socialviuni.dto.response.post.PostResponse;
import com.viuniteam.socialviuni.dto.response.share.ShareResponse;
import com.viuniteam.socialviuni.service.PostService;
import com.viuniteam.socialviuni.service.ShareService;
import com.viuniteam.socialviuni.utils.PageInfo;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/admin/share")
@AllArgsConstructor
public class AdminShareController {
    private final ShareService shareService;
    @PostMapping("/getall")
    public Page<ShareResponse> getAllSharedPost(@RequestBody PageInfo pageInfo){
        PageRequest pageRequest = PageRequest.of(pageInfo.getIndex(), pageInfo.getSize());
        return shareService.findAllSharedPost(pageRequest);
    }
}
