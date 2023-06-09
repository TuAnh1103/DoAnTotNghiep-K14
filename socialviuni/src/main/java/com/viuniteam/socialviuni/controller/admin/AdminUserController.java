        package com.viuniteam.socialviuni.controller.admin;

        import com.viuniteam.socialviuni.dto.response.user.UserInfoResponse;
        import com.viuniteam.socialviuni.service.UserService;
        import com.viuniteam.socialviuni.utils.PageInfo;
        import lombok.AllArgsConstructor;
        import org.springframework.data.domain.Page;
        import org.springframework.data.domain.PageRequest;
        import org.springframework.web.bind.annotation.*;

        @RestController
        @AllArgsConstructor
        @RequestMapping("/admin/user")
        public class AdminUserController {
            private final UserService userService;
            @PostMapping("/all")
            public Page<UserInfoResponse> findAll(@RequestBody PageInfo pageInfo){
                PageRequest pageRequest = PageRequest.of(pageInfo.getIndex(), pageInfo.getSize());
                Page<UserInfoResponse> userInfoResponsePage = userService.findAll(pageRequest);
                return userInfoResponsePage;
            }
        }
