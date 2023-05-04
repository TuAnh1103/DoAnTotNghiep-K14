        package com.viuniteam.socialviuni.repository;
        import com.viuniteam.socialviuni.entity.Address;
        import com.viuniteam.socialviuni.entity.Favorite;
        import com.viuniteam.socialviuni.entity.User;
        import org.springframework.data.domain.Page;
        import org.springframework.data.domain.Pageable;
        import org.springframework.data.jpa.domain.Specification;
        import org.springframework.data.jpa.repository.JpaRepository;
        import org.springframework.data.jpa.repository.Query;

        import java.math.BigInteger;
        import java.util.List;
        import java.util.Optional;

        public interface UserRepository extends JpaRepository<User,Long> {
            @Override
            Optional<User> findById(Long id);
            Optional<User> findByUsername(String username);

            Boolean existsByEmail(String email);
            Boolean existsByUsername(String username);
            User findOneByEmail(String email);
            User findOneByUsername(String username);
            User findOneById(Long id);
            List<User> findByHomeTown(Address address);
            List<User> findByCurrentCity(Address address);
            List<User> findByFavorites(Favorite favorite);
            Page<User> findAll(Specification specification, Pageable pageable);
            @Query(value = "select * from user where id not in (?1)",nativeQuery = true)
            Page<User> getListFriendSuggestion(String listUserId,Pageable pageable);
            @Query(value = "select * from user where id not in (?1) limit 1",nativeQuery = true)
            List<User> getListFriendSuggestion(String listUserId);
            @Query(value="(select distinct u.id from user u join user_favorite u_f on u.id=u_f.user_id where u_f.favorite_id in (\n" +
                    "select favorite_id from user_favorite where user_id=?2)and (u.username like %?1% or u.first_name like %?1% or u.last_name  like %?1%))\n" +
                    "union\n" +
                    "(select distinct u.id from user u where u.id not in (select distinct u.id from user u join user_favorite u_f on u.id=u_f.user_id where u_f.favorite_id in (\n" +
                    "select favorite_id from user_favorite where user_id=?2))and (u.username like %?1% or u.first_name like %?1% or u.last_name  like %?1% ))",
                    nativeQuery = true)
            List<Long> getUserByKeySearch(String key,Long id);
            @Query(value="select distinct u.id from user u join user_favorite u_f on u.id=u_f.user_id " +
                    "where u_f.favorite_id in (select favorite_id from user_favorite where user_id=?1) " +
                    "and u.id not in (select user_friends.user_id from user_friends inner join friend on user_friends.friends_id=friend.id " +
                    "where friend.user_id=?1) " +
                    "and u.id not in (select  friend.user_id from user_friends inner join friend on user_friends.friends_id=friend.id\n" +
                    "                    where user_friends.user_id=22)" +
                    "and u.id not in(select user_friend_requests.user_id from user_friend_requests inner join friend_request " +
                    "on user_friend_requests.friend_requests_id=friend_request.id where friend_request.user_id=?1)" +
                    "and id!=?1",
                    nativeQuery = true)
            List<Long> getSuggestFriendByUserId(Long id);
            @Query(value="select distinct u.* from user u join user_favorite u_f on u.id=u_f.user_id " +
                    "where u_f.favorite_id in (select favorite_id from user_favorite where user_id=?1) " +
                    "and u.id not in (select friend.user_id from user_friends inner join friend on user_friends.friends_id=friend.id " +
                    "where user_friends.user_id=?1)" +
                    "and u.id not in(select user_friend_requests.user_id from user_friend_requests inner join friend_request " +
                    "on user_friend_requests.friend_requests_id=friend_request.id where friend_request.user_id=?1)" +
                    "and id!=?1",

                    nativeQuery = true)
            Page<User> getSuggestFriend(Long id,Pageable pageable);
            @Query(value="(select distinct u.id from user u join user_favorite u_f on u.id=u_f.user_id where u_f.favorite_id in (\n" +
                    "select favorite_id from user_favorite where user_id=?2)and (u.username like %?1% or u.first_name like %?1% or u.last_name  like %?1%))\n" +
                    "union\n" +
                    "(select distinct u.id from user u where u.id not in (select distinct u.id from user u join user_favorite u_f on u.id=u_f.user_id where u_f.favorite_id in (\n" +
                    "select favorite_id from user_favorite where user_id=?2))and (u.username like %?1% or u.first_name like %?1% or u.last_name  like %?1% ))",
                    countQuery = "(select distinct u.id from user u join user_favorite u_f on u.id=u_f.user_id where u_f.favorite_id in (\n" +
                            "select favorite_id from user_favorite where user_id=?2)and (u.username like %?1% or u.first_name like %?1% or u.last_name  like %?1%))\n" +
                            "union\n" +
                            "(select distinct u.id from user u where u.id not in (select distinct u.id from user u join user_favorite u_f on u.id=u_f.user_id where u_f.favorite_id in (\n" +
                            "select favorite_id from user_favorite where user_id=?2))and (u.username like %?1% or u.first_name like %?1% or u.last_name  like %?1% ))",
                    nativeQuery = true)
            Page<BigInteger> searchUserByKey(String key, Long id, Pageable pageable);
        }
