        package com.viuniteam.socialviuni.repository;
        import com.viuniteam.socialviuni.dto.response.post.PostResponse;
        import com.viuniteam.socialviuni.entity.Post;
        import com.viuniteam.socialviuni.entity.User;
        import com.viuniteam.socialviuni.entity.mapper.UserFollowers;
        import org.springframework.data.domain.Page;
        import org.springframework.data.domain.Pageable;
        import org.springframework.data.jpa.domain.Specification;
        import org.springframework.data.jpa.repository.JpaRepository;
        import org.springframework.data.jpa.repository.Modifying;
        import org.springframework.data.jpa.repository.Query;
        import org.springframework.data.repository.PagingAndSortingRepository;

        import java.util.List;
        import java.util.Optional;
        public interface PostRepository extends JpaRepository<Post,Long>{
            Post findOneByAuthorAndId(User author, Long id);
            void deleteById(Long id);
            Post save(Post post);
            Post findOneById(Long id);
            Page<Post> findAllByAuthorOrderByIdDesc(User author,Pageable pageable);
            Page<Post> findAll(Specification specification, Pageable pageable);
            @Query(value = "select * from post order by post.id desc",
                    countQuery = "select * from post",
                    nativeQuery = true)
            Page<Post> findAllOrderByIdDesc(Pageable pageable);
            List<Post> findByAuthorOrderByIdDesc(User author);
            @Query(value = "select * from post where (post.user_id=?1) || (post.user_id in(select fr.user_id as userId from friend fr join user_friends u_fr on fr.id=u_fr.friends_id join user u on u.id = u_fr.user_id and u_fr.user_id=?1))||" +
                    "(post.user_id  in(select flw.user_id as userId from following flw join user_followings u_flw on flw.id=u_flw.followings_id join user u on u.id = u_flw.user_id and u_flw.user_id=?1))||" +
                    "(post.privacy=1)" +
                    "order by post.id desc",
                    countQuery = "select * from post where (post.user_id=?1) || (post.user_id in(select fr.user_id as userId from friend fr join user_friends u_fr on fr.id=u_fr.friends_id join user u on u.id = u_fr.user_id and u_fr.user_id=?1))||" +
                            "(post.user_id  in(select flw.user_id as userId from following flw join user_followings u_flw on flw.id=u_flw.followings_id join user u on u.id = u_flw.user_id and u_flw.user_id=?1))||(post.privacy=1)",
                    nativeQuery = true)
            Page<Post> getPostNewsfeed(Long userId,Pageable pageable);

        }
