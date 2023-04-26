        package com.viuniteam.socialviuni.controller.api;
        import com.viuniteam.socialviuni.dto.Profile;
        import com.viuniteam.socialviuni.dto.request.user.UserFilterRequest;
        import com.viuniteam.socialviuni.dto.request.user.UserUpdateInfoRequest;
        import com.viuniteam.socialviuni.dto.response.address.AddressResponse;
        import com.viuniteam.socialviuni.dto.response.user.UserInfoResponse;
        import com.viuniteam.socialviuni.service.AddressService;
        import com.viuniteam.socialviuni.service.UserService;
        import com.viuniteam.socialviuni.utils.PageInfo;
        import lombok.AllArgsConstructor;
        import org.springframework.data.domain.Page;
        import org.springframework.data.domain.PageRequest;
        import org.springframework.data.domain.Pageable;
        import org.springframework.data.repository.query.Param;
        import org.springframework.web.bind.annotation.*;

        import javax.validation.Valid;
        import java.util.List;
        @RestController
        @AllArgsConstructor
        @RequestMapping("/user")
        public class UserController {
            private final UserService userService;
            private final AddressService addressService;
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
            @PostMapping("/searchKey")
            public Page<UserInfoResponse> searchFriend(@RequestBody UserFilterRequest userFilterRequest)
            {
                return userService.searchFriend(userFilterRequest);
            }
            @GetMapping("/getAddress")
            public List<AddressResponse> getAddressList()
            {
                return addressService.findAll();
            }

        }