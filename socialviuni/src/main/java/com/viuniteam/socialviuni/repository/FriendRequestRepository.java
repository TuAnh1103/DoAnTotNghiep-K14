        package com.viuniteam.socialviuni.repository;
        import com.viuniteam.socialviuni.entity.FriendRequest;
        import com.viuniteam.socialviuni.entity.User;
        import org.springframework.data.domain.Page;
        import org.springframework.data.domain.Pageable;
        import org.springframework.data.jpa.repository.JpaRepository;
        import org.springframework.data.jpa.repository.Modifying;
        import org.springframework.data.jpa.repository.Query;

        import javax.transaction.Transactional;
        import java.util.List;
        @Transactional
        public interface FriendRequestRepository extends JpaRepository<FriendRequest,Long> {
            void deleteById(Long id);
        //    @Modifying
        //    @Query(value = "delete from user_friend_requests where friend_requests_id = ?1",nativeQuery = true)
        //    void deleteFriendRequestById(Long id);
            @Modifying
            @Query(value = "delete from user_friend_requests where user_id = ?1 and friend_requests_id=?2",nativeQuery = true)
            void deleteUserFriendRequestByUserIdAndFriendRequestId(Long userId,Long friendRequestId);
            @Modifying
            @Query(value = "delete from friend_request where id=?1",nativeQuery = true)
            void deleteFriendRequestById(Long id);
        //    @Modifying
        //    @Query(value = "delete from user_friend_requests where friend_requests_id = ?1",nativeQuery = true)
        //    void deleteUserFriendRequests(Long id);
            @Query(value = "select * from friend_request fr join user_friend_requests ufr on fr.id = ufr.friend_requests_id and ufr.user_id=?1 order by fr.id desc",
                    countQuery = "select count(*) from friend_request fr join user_friend_requests ufr on fr.id = ufr.friend_requests_id and ufr.user_id=?1",
                    nativeQuery = true)
            Page<FriendRequest> findByUser(Long id, Pageable pageable);
            @Query(value="select distinct friend_request.* from user_friend_requests inner join friend_request on user_friend_requests.friend_requests_id=friend_request.id where user_friend_requests.user_id=?1",
                    nativeQuery = true)
            List<FriendRequest>getFriendRequestByUserId(Long id);
            @Query(value = "select distinct user_friend_requests.user_id from user_friend_requests inner join friend_request on user_friend_requests.friend_requests_id=friend_request.id where friend_request.user_id=?1",nativeQuery = true)
            List<Long>getListFriendRequestByMe(Long id);
            @Query(value = "select distinct friend_request.user_id from user_friend_requests inner join friend_request on user_friend_requests.friend_requests_id=friend_request.id where user_friend_requests.user_id=?1",nativeQuery = true)
            List<Long>getListFriendRequestToMe(Long id);
        }
