        package com.viuniteam.socialviuni.controller.api;
        import com.viuniteam.socialviuni.dto.Profile;
        import com.viuniteam.socialviuni.dto.request.user.UserFilterRequest;
        import com.viuniteam.socialviuni.dto.request.user.UserUpdateInfoRequest;
        import com.viuniteam.socialviuni.dto.response.user.UserInfoResponse;
        import com.viuniteam.socialviuni.service.UserService;
        import lombok.AllArgsConstructor;
        import org.springframework.data.domain.Page;
        import org.springframework.web.bind.annotation.*;

        import javax.validation.Valid;
        @RestController
        @AllArgsConstructor
        @RequestMapping("/user")
        public class UserController {
            private final UserService userService;
            private final Profile profile;
            @GetMapping( "/id/{id}")//ok
            public UserInfoResponse findById(@PathVariable("id") Long id){
                return userService.findById(id);
            }
            @GetMapping( "/{username}")//ok
            public UserInfoResponse findById(@PathVariable("username") String username){
                return userService.findByUsername(username);
            }
            @GetMapping("/me")//ok
            public UserInfoResponse findById(){
                return userService.findById(profile.getId());
            }
            @GetMapping("/username/{username}")//ok
            public UserInfoResponse findByUsername(@PathVariable("username") String username){
                return userService.findByUsername(username);
            }
            @PostMapping("/update")//ok
            public void updateInfo(@Valid @RequestBody UserUpdateInfoRequest userUpdateInfoRequest){
                userService.updateInfo(userUpdateInfoRequest);
            }
            @PostMapping("/search")//no
            public Page<UserInfoResponse> search(@RequestBody UserFilterRequest userFilterRequest){
                return userService.search(userFilterRequest);
            }

        }
